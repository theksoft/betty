import { v4 as uuid } from "uuid";

const _TYPE = "boardgame";
const _ERRORS = {
  COMPATIBILITY:
    "ERROR: Provided data is not compatible with boardgame object!",
  INSTANCE: "ERROR: Provided object is not a boardgame object instance!"
};

export default class Boardgame {
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
    if (!Boardgame.match(src)) {
      throw new Error(_ERRORS.COMPATIBILITY);
    }
  }

  static checkInstance(src) {
    // Check also presence of one getter for a true object
    if (!Boardgame.match(src) || !src.type) {
      throw new Error(_ERRORS.INSTANCE);
    }
  }

  static clone(src) {
    Boardgame.checkInstance(src);
    let clone = new Boardgame();
    // WARNING Object.assign copies only enumerable properties!
    Object.assign(clone, src);
    return clone;
  }

  static reload(src) {
    Boardgame.checkCompatibility(src);
    let game = new Boardgame();
    // WARNING Object.assign copies only enumerable properties!
    Object.assign(game, src);
    return game;
  }
}
