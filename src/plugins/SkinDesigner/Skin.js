import { v4 as uuid } from "uuid";

const _TYPE = "skin";
const _ERRORS = Object.freeze({
  COMPATIBILITY: "ERROR: Provided data is not compatible with skin object!",
  INSTANCE: "ERROR: Provided object is not a skin object instance!"
});

export default class Skin {
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

  static type() {
    return _TYPE;
  }

  static match(src) {
    return src && src._type && src._type === _TYPE;
  }

  static checkCompatibility(src) {
    if (!Skin.match(src)) {
      throw new Error(_ERRORS.COMPATIBILITY);
    }
  }

  static checkInstance(src) {
    // Check also presence of one getter for a true object
    if (!Skin.match(src) || !src.type) {
      throw new Error(_ERRORS.INSTANCE);
    }
  }

  static clone(src) {
    Skin.checkInstance(src);
    let clone = new Skin();
    // WARNING Object.assign copies only enumerable properties!
    Object.assign(clone, src);
    return clone;
  }

  static reload(src) {
    Skin.checkCompatibility(src);
    let skin = new Skin();
    // WARNING Object.assign copies only enumerable properties!
    Object.assign(skin, src);
    return skin;
  }
}
