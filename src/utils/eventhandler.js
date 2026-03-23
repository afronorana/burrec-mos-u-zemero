class EventBus {
  constructor() {
    this.eventTarget = new EventTarget();
  }

  fire(event, data = null) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.eventTarget.dispatchEvent(customEvent);
  }

  listen(event, callback) {
    if (typeof callback !== 'function') {
      return () => {};
    }

    const handler = (e) => callback(e.detail);
    this.eventTarget.addEventListener(event, handler);

    return () => {
      this.eventTarget.removeEventListener(event, handler);
    };
  }
}

const eventBusInstance = new EventBus();
export default eventBusInstance;
