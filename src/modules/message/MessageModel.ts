export default class Message {
  private _id: string;
  private _content: string;
  private _senderId: string;
  private _recipientId: string;
  private _replyTo: string;
  private _roomId: string;
  private _sentAt: Date;

  constructor(id, content, senderId, recipientId, replyTo, roomId, sentAt: Date = new Date()) {
    this._id = id;
    this._content = content;
    this._senderId = senderId;
    this._recipientId = recipientId;
    this._replyTo = replyTo;
    this._roomId = roomId;
    this._sentAt = sentAt;
  }

  json() {
    return {
      id: this.id,
      content: this.content,
      senderId: this.senderId,
      recipientId: this.recipientId,
      replyTo: this.replyTo,
      roomId: this.roomId,
      sentAt: this.sentAt
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get senderId(): string {
    return this._senderId;
  }

  set senderId(value: string) {
    this._senderId = value;
  }

  get recipientId(): string {
    return this._recipientId;
  }

  set recipientId(value: string) {
    this._recipientId = value;
  }

  get replyTo(): string {
    return this._replyTo;
  }

  set replyTo(value: string) {
    this._replyTo = value;
  }

  get roomId(): string {
    return this._roomId;
  }

  set roomId(value: string) {
    this._roomId = value;
  }

  get sentAt(): Date {
    return this._sentAt;
  }

  set sentAt(value: Date) {
    this._sentAt = value;
  }
}
