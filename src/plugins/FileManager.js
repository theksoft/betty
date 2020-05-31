const _saveAs = (getURL, releaseURL, filename) => {
  let url = getURL();
  let a = document.createElement("a");
  a.download = filename || "download";
  a.href = url;
  a.onClick = () => {
    window.URL.revokeObjectURL(url);
  };
  const e = new MouseEvent("click", {
    bubbles: true,
    cancelable: false,
    view: window
  });
  a.dispatchEvent(e);
};

const _saveBlobAs = (blob, filename) => {
  _saveAs(
    () => window.URL.createObjectURL(blob),
    u => window.URL.revokeObjectURL(u),
    filename
  );
};

const FileManager = {
  saveBlobAs(blob, filename) {
    _saveBlobAs(blob, filename);
  },
  saveAs: options => {
    _saveBlobAs(
      new Blob([options.data], {
        type: options.mime || "application/octet-stream"
      }),
      options.filename
    );
  },
  saveDataAs: (data, filename, mime) => {
    _saveBlobAs(
      new Blob([data], { type: mime || "application/octet-stream" }),
      filename
    );
  },
  saveObjectAs: (object, filename) => {
    _saveBlobAs(
      new Blob([JSON.stringify(object)], {
        type: "application/json"
      }),
      filename
    );
  },
  saveUrlAs: (url, filename) => {
    _saveAs(
      () => url,
      () => {},
      filename
    );
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$files", {
      value: FileManager
    });
  }
};
