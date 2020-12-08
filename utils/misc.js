import { setTheme } from "./theme";

/**
 * Loads an image with progress callback.
 *
 * The `onprogress` callback will be called by XMLHttpRequest's onprogress
 * event, and will receive the loading progress ratio as an whole number.
 * However, if it's not possible to compute the progress ratio, `onprogress`
 * will be called only once passing -1 as progress value. This is useful to,
 * for example, change the progress animation to an undefined animation.
 *
 * @param  {string}   imageUrl   The image to load
 * @param  {Function} onprogress
 * @return {Promise}
 */
const loadImage = (imageUrl, onprogress) => {
  const tempProgressObj = {
    total: undefined,
    loaded: undefined,
    percent: 1,
  };
  onprogress({
    mode: "image",
    type: "image",
    ProgressEvent: { nope: "nope" },
    progressObj: tempProgressObj,
  });
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var notifiedNotComputable = false;

    xhr.open("GET", imageUrl, true);
    xhr.responseType = "arraybuffer";

    xhr.onprogress = function (ev) {
      const percentLoaded = (ev.loaded / ev.total) * 100;
      const percentRounded =
        Math.round((percentLoaded + Number.EPSILON) * 100) / 100;
      const progressObj = {
        total: ev.total,
        loaded: ev.loaded,
        percent: percentRounded,
      };
      onprogress({
        mode: "image",
        type: "image",
        ProgressEvent: ProgressEvent,
        progressObj: progressObj,
      });
      // if (ev.lengthComputable) {
      //   onprogress(parseInt((ev.loaded / ev.total) * 100));
      // } else {
      //   if (!notifiedNotComputable) {
      //     notifiedNotComputable = true;
      //     onprogress(-1);
      //   }
      // }
    };

    xhr.onloadend = function () {
      if (!xhr.status.toString().match(/^2/)) {
        reject(xhr);
      } else {
        if (!notifiedNotComputable) {
          // onprogress(100);
          const tempProgressObj = {
            total: undefined,
            loaded: undefined,
            percent: 100,
          };
          onprogress({
            mode: "image",
            type: "image",
            ProgressEvent: { nope: "nope" },
            progressObj: tempProgressObj,
          });
        }

        var options = {};
        var headers = xhr.getAllResponseHeaders();
        var m = headers.match(/^Content-Type\:\s*(.*?)$/im);

        if (m && m[1]) {
          options.type = m[1];
        }

        var blob = new Blob([this.response], options);

        resolve(window.URL.createObjectURL(blob));
      }
    };

    xhr.send();
  });
};

/** CONTENT SWITCH
 * Returns the type of content
 * Used when mumultiple file types are treated the same
 * Eg. png, jpg, gif
 */

const contentSwitch = (fileType) => {
  console.log("misc fileType", fileType);
  switch (fileType) {
    case "glb":
    case "obj":
    case "usdz":
    case "gltf":
      return "threed";
      break;
    case "vox":
      return "voxel";
      break;
    case "mp4":
    case "mov":
      return "video";
      break;
    case "mp3":
      return "audio";
      break;
    case "pdf":
      return "pdf";
      break;
    case "rtf":
    case "txt":
      return "text";
      break;
    default:
      return "image";
  }
};

/** truncate
 * returns shorter text if it is longer than the length
 */

const truncate = (text, length, clamp) => {
  // console.log('truncate: ', {text, length, clamp});
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  const returnContent =
    content.length > length ? content.slice(0, length) + clamp : content;
  return returnContent;
};

/**
 * Set Class
 * adds a class to an element with id, and optionally removes another
 */

const setClass = (targetId, classToAdd, classToRemove) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.classList.add(classToAdd);
    classToRemove && targetElement.classList.remove(classToRemove);
  }
};

/**
 * Remove from array (by id)
 *
 */

const removeFromArrayById = (array, id) => {
  if (!array || !id) {
    console.log("no array or id");
    return null;
  }
  const newArray = array.slice().filter((array) => array.id !== id);
  console.log("newArray", newArray);
  return newArray;
};

/**
 * HUMAN FILE SIZE
 *
 */

const humanFileSize = (size) => {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

export {
  contentSwitch,
  setClass,
  removeFromArrayById,
  humanFileSize,
  truncate,
  loadImage,
};
