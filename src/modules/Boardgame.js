import { v4 as uuid } from "uuid";

export class Boardgame {
  constructor() {
    this._type = "boardgame";
    this._id = uuid();
    this._name = "untitled";
  }

  get type() {
    return this._type;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}
