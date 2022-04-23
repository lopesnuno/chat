export default class RoomMembers {
  private _id: string;
  private _roomId: string;
  private _userId: string;
  private _joinedAt: Date;

  constructor(id, roomId, userId, joinedAt: Date = new Date()) {
    this._id = id;
    this._roomId = roomId;
    this._userId = userId;
    this._joinedAt = joinedAt;
  }

  json() {
    return {
      id: this.id,
      roomId: this.roomId,
      userId: this.userId,
      joinedAt: this.joinedAt,
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get roomId(): string {
    return this._roomId;
  }

  set roomId(value: string) {
    this._roomId = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get joinedAt(): Date {
    return this._joinedAt;
  }

  set joinedAt(value: Date) {
    this._joinedAt = value;
  }
}
