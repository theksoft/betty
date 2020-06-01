import { v4 as uuid } from "uuid";

const _TYPE = "image-map";

export default class ImageMap {
  constructor(e) {
    this._type = _TYPE;
    this._id = uuid();
    this._name = e ? e.name : "<untitled>";
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

  static reload(src) {
    if (!src || !src._type || src._type !== _TYPE) {
      throw new Error("ERROR: Provided data is not an image map object!");
    }
    let map = new ImageMap();
    if (src._id) {
      map._id = src._id;
    }
    map._name = src._name;
    return map;
  }
}
