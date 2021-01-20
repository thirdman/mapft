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

/** GENRATE CUSTOM THEMER
 * generates css variables based on a color
 
 */

const generateTheme = (config) => {
  const { color, hue } = config;
  let hslObject;
  let hslColor;
  if (hue) {
    hslObject = { h: hue, s: 50, l: 50 };
    hslColor = `hsl(${hue}, 50%, 50%)`; // true makes it retirn an object
  }
  if (color && !hue) {
    hslObject = hexToHSL(color, true);
    hslColor = hexToHSL(color, false); // true makes it retirn an object
  }
  console.log("hsl", hslObject);
  console.log("hsl", hslColor);
  if (!hslObject) {
    return;
  }
  let tempHue = hue || hslObject.h;
  console.log("tempHue", tempHue);
  const themeObj = {
    hue: tempHue,
    color: hslColor,
    uiColor: `hsl(${tempHue - 180},  30%, 13%)`,
    // uiColor: `hsl(${tempHue},  13%, 26%)`,
    // uiColor: `hsl(${tempHue},  4%, 7%))`,
    fillColor: `hsl(${tempHue}, 26%, 87%)`,
    darkColor: `hsl(${tempHue}, 15%, 8%)`,
    lightColor: `hsl(${tempHue}, 43%, 92%)`,
    textColor: `hsl(${tempHue}, 4%, 7%)`,
    backgroundColor: `hsl(${tempHue}, 34%, 91%)`,
    lineColor: `hsla(${tempHue}, 50%, 10%, 0.3)`,
  };
  console.log("themeObj", themeObj);
  return themeObj;
  // --charcoal-color: hsl(330, 5%, 14%);
  // --charcoal-dark-color: hsl(330, 15%, 8%);
  // --charcoal-light-color: hsl(330, 2%, 30%);
  // --charcoal-fill-color: hsl(330, 0%, 24%);
  // --charcoal-ui-color: hsl(330, 4%, 7%);
  // --charcoal-text-color: #c0c0c0;
  // --charcoal-background-color: hsl(320, 6%, 90%);
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

/**
 * GET RANDOM INTEGER
 *
 */

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * HEX to HSL
 *
 */

function hexToHSL(H, asObject = false) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  const hslObject = {
    h,
    s,
    l,
  };
  return asObject ? hslObject : "hsl(" + h + "," + s + "%," + l + "%)";
}

export {
  contentSwitch,
  setClass,
  removeFromArrayById,
  humanFileSize,
  truncate,
  loadImage,
  generateTheme,
  hexToHSL,
  getRandomInt,
};
