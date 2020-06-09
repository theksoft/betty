import { v4 as uuid } from "uuid";

const _TYPE = "boardgame";
const _ERRORS = Object.freeze({
  COMPATIBILITY:
    "ERROR: Provided data is not compatible with boardgame object!",
  INSTANCE: "ERROR: Provided object is not a boardgame object instance!"
});

export default class Boardgame {
  constructor(e) {
    let params = Object.assign({}, Boardgame.defaultParams(), e);
    this.params = params;
    this._type = _TYPE;
    this._id = uuid();
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

  get version() {
    return this._version;
  }
  set version(version) {
    this._version = version;
  }

  get params() {
    return {
      name: this._name,
      id: this._id,
      version: this._version
    };
  }

  set params(params) {
    this._name = params.name;
    this._version = params.version;
  }

  compare(params) {
    return this._name === params.name && this._version === params.version;
  }

  static defaultParams() {
    return {
      name: "<untitled>",
      version: 1
    };
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
    if (!Boardgame.match(src) || !src.type || !src.id) {
      throw new Error(_ERRORS.INSTANCE);
    }
  }

  static clone(src) {
    Boardgame.checkInstance(src);
    let clone = new Boardgame();
    clone.params = src.params;
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
