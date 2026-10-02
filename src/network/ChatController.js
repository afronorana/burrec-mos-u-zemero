import ApplicationStore from '../utils/ApplicationStore';

const ROOM_TYPE = 1; // Nakama channel type: room
const MAX_MESSAGES = 100;

class ChatControllerService {
  constructor() {
    this.socket = null;
    this.channelId = null;
  }

  attach(socket) {
    this.socket = socket;
    socket.onchannelmessage = (message) => this.handleMessage(message);
  }

  async join(matchId) {
    if (!this.socket) {
      return;
    }
    // Persistent so a Report on a message can be checked by the server
    // against its own copy (moderation.ts) instead of the reporter's text.
    const channel = await this.socket.joinChat(`ludo-${matchId}`, ROOM_TYPE, true, false);
    this.channelId = channel.id;
  }

  // Own messages are echoed locally straight away and send errors are
  // ignored: a Shadowbanned sender's message is refused by the server, and
  // this is what keeps that invisible to them (CONTEXT.md: Shadowban).
  send(text) {
    const message = String(text || '').trim().slice(0, 200);
    if (!message || !this.socket || !this.channelId) {
      return;
    }
    const online = ApplicationStore.online;
    this.localCounter = (this.localCounter || 0) + 1;
    this.push({
      id: `local-${this.localCounter}`,
      senderId: online.selfUserId,
      username: online.displayName,
      message,
      createTime: new Date().toISOString(),
      pending: true,
    });
    this.socket.writeChatMessage(this.channelId, { message }).catch(() => {});
  }

  handleMessage(message) {
    const online = ApplicationStore.online;
    const content = message.content || {};
    const text = String(content.message || '');
    if (message.sender_id === online.selfUserId) {
      // The server's copy of our own optimistic echo: adopt its real id.
      const echo = online.chat.find((entry) => entry.pending && entry.message === text);
      if (echo) {
        echo.id = message.message_id;
        echo.pending = false;
        return;
      }
    }
    if (online.blockedIds.includes(message.sender_id)) {
      return;
    }
    this.push({
      id: message.message_id,
      senderId: message.sender_id,
      username: message.username,
      message: text,
      createTime: message.create_time,
    });
  }

  push(entry) {
    const chat = ApplicationStore.online.chat;
    chat.push(entry);
    if (chat.length > MAX_MESSAGES) {
      chat.splice(0, chat.length - MAX_MESSAGES);
    }
  }

  async leave() {
    if (this.socket && this.channelId) {
      try {
        await this.socket.leaveChat(this.channelId);
      } catch (error) {
        // Socket may already be gone; nothing to clean up server-side.
      }
    }
    this.channelId = null;
    ApplicationStore.online.chat.splice(0, ApplicationStore.online.chat.length);
  }
}

export default new ChatControllerService();
