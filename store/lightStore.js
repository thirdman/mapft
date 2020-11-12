import { getField, updateField } from "vuex-map-fields";

export const state = () => ({
  hasLights: false,
  hasRotation: false,
  lights: [
    {
      name: "Ambient",
      value: {
        type: "AmbientLight",
        color: 0xffffff,
        intensity: 0.4,
      },
      isActive: true,
    },
    {
      name: "hemisphere light",
      value: {
        type: "HemisphereLight",
        position: { x: 0, y: 20, z: 10 },
        // skyColor: 0xffffff,
        // groundColor: 0x000000,
        // intensity: 0.75,
        skyColor: 0xffeeb1,
        groundColor: 0x080820,
        intensity: 1,
      },
      isActive: true,
    },

    {
      name: "Direction Light 1",
      value: {
        type: "DirectionalLight",
        position: { x: -1000, y: 1000, z: 2000 },
        color: 0xffffff,
        intensity: 0.2,
      },
      isActive: true,
    },
    {
      name: "Direction Light 2",
      value: {
        type: "DirectionalLight",
        position: { x: 1000, y: 1000, z: -2000 },
        color: 0xffffff,
        intensity: 0.15,
      },
      isActive: true,
    },
  ],
  allLights: [
    {
      type: "HemisphereLight",
      position: { x: 0, y: 200, z: 0 },
      skyColor: 0xffffff,
      groundColor: 0x666666,
      intensity: 0.5,
    },
    {
      type: "DirectionalLight",
      position: { x: -1000, y: 1000, z: 2000 },
      color: 0xffffff,
      intensity: 0.6,
    },
    {
      type: "DirectionalLight",
      position: { x: 1000, y: 1000, z: -2000 },
      color: 0xffffff,
      intensity: 0.6,
    },
  ],
  isRotating: false,
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
});
export const getters = {
  getField,
  allLights: (state) => {
    const compiledLights = state.lights.map((light) => {
      return light.isActive ? light.value : {};
    });
    console.log("compiledLights", compiledLights);
    return state.hasLights ? compiledLights : undefined;
  },
  lights: (state) => state.lights,
  rotation: (state) => state.rotation,
  isRotating: (state) => state.isRotating,
  hasLights: (state) => state.hasLights,
  hasRotation: (state) => state.hasRotation,
};

export const mutations = {
  setLights(state, newValue) {
    console.log("stateLights", state.lights);
  },
  setRotation(state, newValue) {
    state.rotation = newValue;
  },
  setAllLights(state, newArray) {
    state.allLights = newArray;
  },
  setDirection1(state, newArray) {
    console.log("setDirection1", newArray);
    console.log("hemisphereLight", state.hemisphereLight);
    const currentLights = state.allLights;
    const newLights = currentLights.filter((light, index) => index !== 1);
    console.log("newLights", newLights);
    state.allLights = newLights;
  },
  toggleRotation(state, newValue) {
    const currentValue = state.hasRotation;
    state.hasRotation = !currentValue;
  },
  toggleLights(state, newValue) {
    console.log("togglelights");
    const currentValue = state.hasLights;
    state.hasLights = !currentValue;
  },
  toggleLight(state, index) {
    console.log("togglelight", index);
    let tempLights = state.lights.slice();
    let thisLight = tempLights[index];
    thisLight.isActive = !thisLight.isActive;
    tempLights[index] = thisLight;
    state.lights = tempLights;
  },
};
