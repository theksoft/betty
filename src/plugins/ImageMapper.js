import JSZip from "jszip";
import Map from "./ImageMapper/ImageMap.js";

/*
  ImageMapper
  Private data
*/

const _extension = ".bgm";
const _descriptor = "package.json";
const _ERRORS = {
  BAD_FILE: "ERROR The provided file is not an image map definition file!"
};

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
  let reader = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = e => reject(e);
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(blob);
  });
  let zip = await JSZip.loadAsync(await reader);

  // Process descriptor
  let descriptor = JSON.parse(await zip.file(_descriptor).async("string"));
  if (!descriptor.header || descriptor.header.type !== Map.type()) {
    throw new Error(_ERRORS.BAD_FILE);
  }
  // TODO: check version

  // Interpret content - Currently basic
  return zip
    .folder(descriptor.content.location)
    .file(descriptor.content.name)
    .async("string");
};

const _createFrom = obj => {
  return Map.reload(obj);
};

/*
  ImageMapper
  Public data
*/

const ImageMapper = {
  create: e => {
    return new Map(e);
  },

  defaultParams: () => {
    return {
      name: ""
    };
  },

  extension() {
    return _extension;
  },

  filename: map => {
    return map.id + _extension;
  },

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
