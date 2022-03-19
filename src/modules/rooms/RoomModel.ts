export default class Room {
  private _id: string;
  private _name: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id, name, createdAt: Date, updatedAt: Date) {
    this._id = id;
    this._name = name;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  json() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
