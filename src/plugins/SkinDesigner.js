import JSZip from "jszip";
import Skin from "./SkinDesigner/Skin.js";

/*
  SkinDesigner
  Private data
*/

const _extension = ".bgs";
const _descriptor = "package.json";
const _ERRORS = {
  BAD_FILE: "ERROR The provided file is not a skin definition file!",
  UNSUPPORTED_FILE: "ERROR The provided file format is no more supported!"
};

const _buildDescriptor = skin => ({
  header: {
    version: "0.1",
    type: Skin.type()
  },
  content: {
    name: skin.id + _extension,
    location: Skin.type()
  }
});

const _manageVersion = (/*descriptor*/) => {
  // TODO: Develop version compatibility
  return true;
};

const _buildBlob = skin => {
  // This may throw an exception
  Skin.checkInstance(skin);

  let zip = new JSZip();
  zip.file(_descriptor, JSON.stringify(_buildDescriptor(skin)));
  zip.folder(skin.type).file(skin.id + _extension, JSON.stringify(skin));
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
  if (!descriptor.header || descriptor.header.type !== Skin.type()) {
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
  return Skin.reload(obj);
};

/*
  SkinDesigner
  Public data
*/

const SkinDesigner = {
  create: e => {
    return new Skin(e);
  },

  defaultParams: () => {
    return {
      name: ""
    };
  },

  extension: () => {
    return _extension;
  },

  filename: skin => {
    return skin.id + _extension;
  },

  blob: skin => {
    // Elaborate opbject clone for cleanup purpose
    let clone = Skin.clone(skin);
    delete clone.modified;
    return _buildBlob(clone);
  },

  loadBlob: async blob => {
    return _createFrom(JSON.parse(await _loadBlob(blob)));
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$skinner", {
      value: SkinDesigner
    });
  }
};
