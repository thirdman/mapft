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
        <span>Lights:</span>
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
  border-radius: 0.25rem;
}
#body.none .threeDControls {
  position: absolute;
  left: 3rem;
  width: 12rem;
}
.triggerPosition {
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
  data() {
    return {
      displaySettings: true,
    }
  },
  computed: {
    ...mapGetters({
      contrastMode: 'ui/contrastMode',
      lights: 'lightStore/lights',
      hasLights: 'lightStore/hasLights',
    }),
  },
  methods: {
    ...mapMutations({
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
    rotate() {
      console.log('startRotate')
      this.hasRotation = true
      this.rotation.y += 0.01
      requestAnimationFrame(this.rotate)
    },
    noRotate() {
      this.hasRotation = false
      this.rotation = {
        // x: -Math.PI / 2,
        x: 0,
        y: 0,
        z: 0,
      }
      cancelAnimationFrame(this.noRotate)
    },
    
    contentType: (fileType) => {
      switch (fileType) {
        case 'glb':
        case 'obj':
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
