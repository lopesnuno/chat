export default class Room {
  private _id: string;
  private _name: string;
  private _owner: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id, name, owner, createdAt: Date = new Date(), updatedAt: Date = new Date()) {
    this._id = id;
    this._name = name;
    this._owner = owner;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  json() {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner,
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

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }
}
