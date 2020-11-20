<template>
  <div class="viewControls">
    <div class="instructions  threeD" v-if="(fileType === 'glb' || fileType === 'gltf ')">
      <label>3D INTERACTION</label>
      <ul class="help">
        <li>Click & Drag to rotate</li>
        <li>Scroll (Pinch) to zoom.</li>
        <li>Arrow buttons (Two finger drag) to move.</li>
      </ul>
    </div>
    <div
      class="threeDControls"
      v-if="displaySettings && (fileType === 'glb' || fileType === 'gltf ')"
    >
      <div class="row itemRow between">
        <span>Allow Rotation:</span>
        <span>
        <button
          @click="setAllowRotation(true)"
          class="btn small hollow"
          :class="allowRotation ? 'active' : 'inactive'"
          style="margin-right: 0.125rem;"
        >
          yes
        </button>
        <button
          @click="setAllowRotation(false)"
          class="btn small hollow"
          :class="allowRotation ? 'inactive' : 'active'"
        >
          no
        </button>
        </span>
      </div>
      <div class="row itemRow between">
        <span>Lights:</span>
        <span>
        <button
          @click="toggleLights"
          class="btn small hollow"
          :class="hasLights ? 'active' : 'inactive'"
          style="margin-right: 0.125rem;"
        >
          yes
        </button>
        <button
          @click="toggleLights"
          class="btn small hollow"
          :class="hasLights ? 'inactive' : 'active'"
        >
          no
        </button>
        </span>
      </div>

      <!-- <button @click="rotate" class="btn">rotate</button>
      <button @click="noRotate" class="btn">no rotate</button> -->
      <div v-if="hasLights">
      <div v-for="(light, index) in lights" :key="index" >
        <div class="row between itemRow">
          <span>{{ light.name }}</span>
          <button
            @click="toggleLight(index)"
            class="btn"
            :class="light.isActive ? 'active' : 'inactive'"
          >
            {{ light.isActive ? 'on' : 'off' }}
          </button>
        </div>
      </div>
      </div>
      
      
    </div>
    
    <div class="triggerPosition" v-if="contentType(fileType) === 'threed'">
      <button class="btn iconButton" @click="toggleDisplay">
        <IconSettings :strokeClass="contrastMode" />
      </button>
      <div class="rotationControl2" v-if="allowRotation && remoteStart">
        <Button @click="remoteStart" class="transparent"  v-if="!hasRotation" >
          <IconPlay :strokeClass="contrastMode" size="medium" />
        </Button>
        <Button @click="remoteStop" class="transparent" v-if="hasRotation" secondary>
          <IconPause :strokeClass="contrastMode" size="medium" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.viewControls {
  position: sticky;
  left: 1rem;
  // bottom: 3rem;
  top: 0;
  z-index: 1000;
  font-size: 0.875rem;
  padding-top: .5rem;
}
#body.none .viewControls {
  position: fixed;
  /* top: 50vh;
  left: 1rem; */
  top: 4.5rem;
  left: 0.5rem;
}
.threeDControls {
  background: var(--fill-color, #ccc);
  padding: 0.5rem;
  // border-radius: 0.25rem;
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  box-shadow: 2px 1px var(--ui-color, #111);
  min-width: 13rem;
  border: 1px solid var(--ui-color, #111);
}
#body.none .threeDControls {
  position: absolute;
  left: 3rem;
  width: 12rem;
}
.triggerPosition {
  margin-top: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.instructions{
      border: 1px solid var(--line-color, #eee);
    padding: .25rem;
  ul{
    padding: .25rem 0;
    margin: 0;
    list-style-type: none;
    font-size: .75rem;
    li{
      padding: 0;
      padding-left: .75rem;
      &:before{
        padding: .1rem;
        content: '\2192';
        position: absolute;
        left: 0;
      }
    }
  }
}
</style>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: ['fileType'],
  mounted(){
    this.$root.$on('handle-rotation', (item, response) => {
        // console.log('LOADED: item, response, ', item, response)
        this.remoteStart = item.startRotate;
        this.remoteStop = item.stopRotate;
    })
  },
  destroyed(){
    if(this.remoteStop){
      this.remoteStop()
      this.remoteStart = undefined;
      this.remoteStop = undefined;
    }
  },
  data() {
    return {
      displaySettings: false,
      remoteStart: undefined,
      remoteStop: undefined
    }
  },
  computed: {
    ...mapGetters({
      allowRotation: 'ui/allowRotation',
      contrastMode: 'ui/contrastMode',
      lights: 'lightStore/lights',
      hasLights: 'lightStore/hasLights',
      hasRotation: 'lightStore/hasRotation',
    }),
  },
  methods: {
    ...mapMutations({
      setAllowRotation: 'ui/setAllowRotation',
      toggleRotation: 'lightStore/toggleRotation',
      toggleLights: 'lightStore/toggleLights',
      toggleLight: 'lightStore/toggleLight',
      setDirection1: 'lightStore/setDirection1',
    }),
    
    toggleDisplay() {
      console.log('this.displaySettings', this.displaySettings)
      this.displaySettings = !this.displaySettings
    },
    onLoadModel() {
      console.log('loaded model', this)
      this.rotate()
    },
  //  startRotate() {
  //     console.log('startRotate. ROtation: ', this.rotation)
  //     if(this.allowRotation){
  //       this.$store.commit("lightStore/toggleRotation");
  //       this.storeRotate()
  //     }
  //   },
  //   stopRotate() {
  //     console.log('stopRotate')
  //     // const currentRotation = this.rotation;
  //     this.$store.commit("lightStore/toggleRotation");
  //     // this.noRotate()
  //   },
    
    contentType: (fileType) => {
      switch (fileType) {
        case 'glb':
        case 'obj':
        case 'usdz':
        case 'gltf':
          return 'threed'
          break
        case 'mp4':
        case 'mov':
          return 'video'
          break
        case 'mp3':
          return 'audio'
          break
        case 'pdf':
          return 'pdf'
          break
        default:
          return 'image'
      }
    },
  },
}
</script>
