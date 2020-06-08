import JSZip from "jszip";
import Map from "./ImageMapper/ImageMap.js";
import { FileManager as Files } from "./FileManager.js";

/*
  ImageMapper
  Private data
*/

const _extension = ".bgm";
const _descriptor = "package.json";
const _ERRORS = Object.freeze({
  BAD_FILE: "ERROR The provided file is not an image map definition file!",
  UNSUPPORTED_FILE: "ERROR The provided file format is no more supported!"
});

const _buildDescriptor = map => ({
  header: {
    version: "0.1",
    type: Map.type()
  },
  content: {
    name: map.id + _extension,
    location: Map.type()
  }
});

const _manageVersion = (/*descriptor*/) => {
  // TODO: Develop version compatibility
  return true;
};

const _buildBlob = map => {
  // This may throw an exception
  Map.checkInstance(map);

  let zip = new JSZip();
  zip.file(_descriptor, JSON.stringify(_buildDescriptor(map)));
  zip.folder(map.type).file(map.id + _extension, JSON.stringify(map));
  return zip.generateAsync({ type: "blob" });
};

const _loadBlob = async blob => {
  // Read blob content as array buffer for JSZip
  let data = await Files.readAsArrayBuffer(blob);
  let zip = await JSZip.loadAsync(data);

  // Process descriptor
  let descriptor = JSON.parse(await zip.file(_descriptor).async("string"));
  if (!descriptor.header || descriptor.header.type !== Map.type()) {
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

const _createFrom = obj => Map.reload(obj);

/*
  ImageMapper
  Public data
*/

const ImageMapper = {
  create: e => new Map(e),

  defaultParams: () => ({
    name: ""
  }),

  extension: () => _extension,
  filename: map => map.id + _extension,

  blob: map => {
    // Elaborate opbject clone for cleanup purpose
    let clone = Map.clone(map);
    delete clone.modified;
    return _buildBlob(clone);
  },

  loadBlob: async blob => {
    return _createFrom(JSON.parse(await _loadBlob(blob)));
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$mapper", { value: ImageMapper });
  }
};

export { Map };
