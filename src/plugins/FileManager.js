/*
  FileManager
  Private data
*/

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

/*
  FileManager
  Public data
*/

const FileManager = {
  selectFiles: (filter, multiple) => {
    return new Promise(resolve => {
      let input = document.createElement("input");
      input.defaultValue = input.value = "";
      input.type = "file";
      // input.style.display = 'none'
      input.setAttribute("accept", filter);
      if (!multiple) {
        input.onchange = e => {
          if (e.target.files.length) resolve(e.target.files[0]);
        };
      } else {
        input.setAttribute("multiple", true);
        input.onchange = e => {
          if (e.target.files.length) resolve(e.target.files);
        };
      }

      document.body.onfocus = () => {
        document.body.onfocus = null;
        // Focus occurs before input change and before its value is set
        window.setTimeout(
          e => {
            if (!e.value.length) resolve();
          },
          1000,
          input
        );
      };

      const e = new MouseEvent("click", {
        bubbles: true,
        cancelable: false,
        view: window
      });
      input.dispatchEvent(e);
    });
  },

  readAsArrayBuffer: file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = e => reject(e);
      reader.onload = () => resolve(reader.result);
      reader.readAsArrayBuffer(file);
    });
  },

  readAsDataUrl: file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = e => reject(e);
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  },

  readAsText: file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = e => reject(e);
      reader.onload = () => resolve(reader.result);
      reader.readAsText(file);
    });
  },

  saveBlobAs: (blob, filename) => {
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

export { FileManager };
