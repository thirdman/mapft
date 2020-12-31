<template>
  <client-only>
    <div class="modelWrapper">
      <div class="loadingContainer" v-if="isLoading">
        <div class="loadingBar" :style="{ width: loadingPercent + '%' }">
          <span class="loadingText" v-if="loadingPercent < 100">
            {{ loadingPercent }}%
            <span>of {{fileSize}}</span>
          </span>
        </div>
        <div class="loadingMeta">{{ loadingMeta }}</div>
      </div>
      
      <model-gltf
        class="modelViewer"
        v-if="
          modelData() &&
          (modelData().fileType === 'glb' || modelData().fileType === 'gltf')
        "
        :rotation="rotation"
        backgroundColor="#ffffff"
        :backgroundAlpha="0"
        :lights="allLights"
        @on-load="onLoadModel"
        @on-progress="handleProgress"
        :src="`https://gateway.pinata.cloud/ipfs/${modelData().fileIpfsHash}`"
      ></model-gltf>
      <!-- @on-click="onClick" -->
      <model-obj
        class="modelViewer"
        v-if="modelData() && modelData().fileType === 'obj'"
        :rotation="rotation"
        :lights="allLights"
        backgroundColor="#ffffff"
        :backgroundAlpha="0"
        @on-load="onLoadModel"
        @on-progress="handleProgress"
        :src="`https://gateway.pinata.cloud/ipfs/${modelData().fileIpfsHash}`"
      ></model-obj>
      <!-- <div class="rotationControl" v-if="allowRotation">
        <Button @click="startRotate" class="inactive" v-if="!hasRotation" >
          <IconPlay strokeClass="dark" size="small" />
        </Button>
        <Button @click="stopRotate" class="active" v-if="hasRotation">
          <IconPause strokeClass="dark" size="small" />
        </Button>
      </div> -->
    </div>
  </client-only>
</template>

<style>
.modelViewer {
  border: none;
  width: 100vw;
  height: 100vh;
}
.modelWrapper {
  width: 100vw;
  height: 100vh;
}
.loadingContainer {
  position: fixed;
  top: 49%;
  left: 22%;
  right: 22%;
  height: 2rem;
  border-radius: 0.25rem;
  overflow: hidden;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid var(--line-color, #eee);
}
.loadingBar {
  width: 0%;
  background: var(--text-color, #ccc);
  color: var(--background-color, #ccc);
  font-size: 0.75rem;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: width 0.1s ease-out;
}
.loadingText {
  color: var(--ui-color, #111);
  position: absolute;
  right: 0.5rem;
  height: 100%;
  line-height: 2rem;
  font-size: 0.75rem;
  font-variation-settings: 'wght' 700;
}
.loadingMeta {
  position: absolute;
  left: 0.5rem;
  top: 0;
  line-height: 2rem;
  font-size: 0.75rem;
  text-transform: capitalize;
  color: var(--fill-color, #111);
}
.rotationControl{
  position: fixed;
  bottom: 3rem;;
  left: 0.5rem;
  z-index: 99999;
}
</style>

<script>
// <div>model viewer: {{ viewData.fileIpfsHash }}</div>
// <model-viewer
//       src="https://gateway.pinata.cloud/ipfs/QmUNq7S11NViNagUZLw7db4vWoqnptUbGHGbvNDnjxispX"
//       alt="alt"
//       class="ModelViewer"
//       auto-rotate
//       camera-controls
//       style="width: 100%; height: 800px;"
//     ></model-viewer>
import { mapFields } from 'vuex-map-fields'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { ModelObj, ModelGltf } from 'vue-3d-model'
import { humanFileSize } from '../utils/misc'

export default {
  components: { ModelObj, ModelGltf },

  props: ['src', 'alt', 'autoPlay', 'loop', 'autoRotate', "data"],
  created(){
    const item = this;
    this.$root.$emit('handle-rotation', item, _)
  },
  destroyed(){
    // this.stopRotate()
  },
  data() {
    return {
      isActive: false,
      // isRotating: false, // TODO move to store.
      isLoading: true,
      loaded: 0,
      total: 100,
      loadingPercent: 0,
      fileSize: undefined,
      loadingMeta: '',
      cameraPosition: { x: 0, y: 0.075, z: 0.25 },
    }
  },
  computed: {
    ...mapGetters({
      viewData: 'ui/viewData',
      allowRotation: 'ui/allowRotation',
      allLights: 'lightStore/allLights',
      rotation: 'lightStore/rotation',
      isRotating: 'lightStore/isRotating',
      hasRotation: 'lightStore/hasRotation',
    }),
    
  },
  methods: {
    modelData(){
      // console.log('modelData: ', this.$props.data)
      // console.log('modelData this.viewData:  ', this.viewData)
      const dataToReturn = this.$props.data || this.viewData
      return dataToReturn
    },
    onClick(data) {
      // console.log('data', data)
      if (!data) {
        return null
      }
      console.log('data.position', data.object.position)
    },
    onLoadModel() {
      console.log('loaded model')
      this.isLoading = false
      this.startRotate()
    },
    startRotate() {
      console.log('startrotate called')
      if(this.allowRotation){
        this.$store.commit("lightStore/toggleRotation");
        this.rotate()
      }
    },
    stopRotate() {
      console.log('stopRotate called')
      // const currentRotation = this.rotation;
      this.$store.commit("lightStore/toggleRotation");
      // this.noRotate()
    },
    rotate() {
        const currentRotation = this.rotation;
        const currentRotationY = currentRotation.y;
        const newRotationY = currentRotationY + 0.005;
        const newRotation = {
          ...currentRotation,
          y: newRotationY,
        }
        if(!this.hasRotation){
          return
        };
        if(this.hasRotation){
          this.$store.commit("lightStore/setRotation", newRotation);
          requestAnimationFrame(this.rotate)
      }
    },
    noRotate() {
      // this.hasRotation = false
      cancelAnimationFrame(this.rotate)
      const newRotation = {
        // x: -Math.PI / 2,
        x: 0,
        y: 0,
        z: 0,
      }
      this.$store.commit("lightStore/setRotation", newRotation);
      
    },
    handleProgress(progress) {
      // console.log('progress:', progress)
      // console.log('progress LOADED: ', progress.loaded)
      // console.log('progress TOTAL: ', progress.total)
      const loadingPercent = (progress.loaded / progress.total) * 100
      // console.log('loadingPercent: ', loadingPercent)
      const tempFileSize = humanFileSize(progress.total)

      if (progress.total > progress.loaded) {
        // console.log('still loading')
        this.fileSize = tempFileSize
        this.isLoading = true
        this.loadingPercent = loadingPercent.toFixed(1)
        this.loadingMeta = 'loading'
      } else {
        // console.log('finished')
        // this.isLoading = false
        this.loadingPercent = 100
        this.loadingMeta = 'rendering'
      }
    },
  },
}
</script>
