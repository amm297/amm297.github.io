export default class EventEmitter {
  on(eventType, cb) {
    this['_on' + eventType] = cb;
  }
  notify(eventType, s) {
    if (this['_on' + eventType]) {
      this['_on' + eventType](s);
    }
  }
}

export const eventEmitter = new EventEmitter();
