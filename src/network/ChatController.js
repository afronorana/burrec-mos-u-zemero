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
    const channel = await this.socket.joinChat(`ludo-${matchId}`, ROOM_TYPE, false, false);
    this.channelId = channel.id;
  }

  async send(text) {
    const message = String(text || '').trim().slice(0, 200);
    if (!message || !this.socket || !this.channelId) {
      return;
    }
    await this.socket.writeChatMessage(this.channelId, { message });
  }

  handleMessage(message) {
    const content = message.content || {};
    ApplicationStore.online.chat.push({
      id: message.message_id,
      senderId: message.sender_id,
      username: message.username,
      message: String(content.message || ''),
      createTime: message.create_time,
    });
    if (ApplicationStore.online.chat.length > MAX_MESSAGES) {
      ApplicationStore.online.chat.splice(0, ApplicationStore.online.chat.length - MAX_MESSAGES);
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
