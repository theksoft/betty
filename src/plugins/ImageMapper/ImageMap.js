import { v4 as uuid } from "uuid";

export default class ImageMap {
  constructor() {
    this._type = "image-map";
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
