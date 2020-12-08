import { setTheme } from "./theme";

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
};
