import JSZip from "jszip";
import Boardgame from "./BoardgamePackager/Boardgame.js";

/*
  BoardgamePackager
  Private data
*/

const _extension = ".bgp";
const _descriptor = "package.json";
const _ERRORS = Object.freeze({
  BAD_FILE: "ERROR The provided file is not a boardgame definition file!",
  UNSUPPORTED_FILE: "ERROR The provided file format is no more supported!"
});

const _buildDescriptor = game => ({
  header: {
    version: "0.1",
    type: Boardgame.type()
  },
  content: {
    name: game.id + _extension,
    location: Boardgame.type()
  }
});

const _manageVersion = (/*descriptor*/) => {
  // TODO: Develop version compatibility
  return true;
};

const _buildBlob = game => {
  // This may throw an exception
  Boardgame.checkInstance(game);

  let zip = new JSZip();
  zip.file(_descriptor, JSON.stringify(_buildDescriptor(game)));
  zip.folder(game.type).file(game.id + _extension, JSON.stringify(game));
  return zip.generateAsync({ type: "blob" });
};

const _loadBlob = async blob => {
  // Read blob content as array buffer for JSZip
  let reader = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = e => reject(e);
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(blob);
  });
  let zip = await JSZip.loadAsync(await reader);

  // Process descriptor
  let descriptor = JSON.parse(await zip.file(_descriptor).async("string"));
  if (!descriptor.header || descriptor.header.type !== Boardgame.type()) {
    throw new Error(_ERRORS.BAD_FILE);
  }
  // Manage file version compatibility
  if (!_manageVersion(descriptor)) {
    throw new Error(_ERRORS.UNSUPPORTED_FILE);
  }

  // Interpret content - Currently basic
  return zip
    .folder(descriptor.content.location)
    .file(descriptor.content.name)
    .async("string");
};

const _createFrom = obj => {
  return Boardgame.reload(obj);
};

/*
  BoardgamePackager
  Public data
*/

const BoardgamePackager = {
  create: e => {
    return new Boardgame(e);
  },

  defaultParams: () => {
    return {
      name: ""
    };
  },

  extension: () => {
    return _extension;
  },

  filename: game => {
    return game.id + _extension;
  },

  blob: game => {
    // Elaborate opbject clone for cleanup purpose
    let clone = Boardgame.clone(game);
    delete clone.modified;
    return _buildBlob(clone);
  },

  loadBlob: async blob => {
    return _createFrom(JSON.parse(await _loadBlob(blob)));
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$packager", {
      value: BoardgamePackager
    });
  }
};

export { Boardgame };
