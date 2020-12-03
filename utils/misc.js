import { setTheme } from "./theme";

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
 * Get local storage
 * Loads the contract and the theme variables
 */

const handleLoadStorage = () => {
  // First test is not a server:
  const isServer = process.env.VUE_ENV === "server";
  if (!isServer && window && window.localStorage) {
    const storedTheme = localStorage.getItem("infinftTheme");
    if (storedTheme) {
      setTheme("body", storedTheme);
    }
    const userContractAddress = localStorage.getItem(
      "infinftUserContractAddress"
    );
    // const userContractAddressElement = document.getElementById(
    //   'userContractAddress'
    // )
    // const footerContractAddressElement = document.getElementById(
    //   'footerContractElement'
    // )

    if (localStorage.getItem("infinftUserContractAddress") === null) {
      return null;
    }
    // if (userContractAddressElement) {
    //   // userContractAddressElement.innerHTML = userContractAddress
    //   // footerContractAddressElement.innerHTML = userContractAddress
    //   //   setContract(userContractAddress)
    // }
    console.log(
      "LOAD: localstorage user contract address",
      userContractAddress
    );
    toggleClass("fieldsetContractView", "hidden");
    toggleClass("fieldsetContract", "hidden");
    toggleClass("fieldsetImage", "hidden");
    toggleClass("fieldsetMeta", "hidden");
    toggleClass("fieldsetAction", "hidden");
  }
};

/**
 * Toggle a class - allows to define a classname
 * TODO: unify with the togglevisibility
 *
 */

function toggleClass(targetId, classToToggle) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    return null;
  }
  const hasClass = targetElement.classList.contains(classToToggle);
  if (!targetElement) {
    return;
  }
  if (hasClass) {
    targetElement.classList.remove(classToToggle);
  } else {
    targetElement.classList.add(classToToggle);
  }
}

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
  handleLoadStorage,
  setClass,
  toggleClass,
  removeFromArrayById,
  humanFileSize,
  truncate,
};
