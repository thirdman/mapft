<template>
  <div class="viewControls">
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
      <hr />
      <div class="instructions">
        <label>INTERACTION</label>

        <ul class="help">
          <li>Click & drag to rotate model.</li>
          <li>Scroll (pinch) while hovering to zoom.</li>
          <li>Arrow buttons to move.</li>
        </ul>
      </div>
    </div>
    <div class="triggerPosition">
      <button class="btn iconButton" @click="toggleDisplay">
        <IconSettings :strokeClass="contrastMode" />
      </button>
    </div>
  </div>
</template>

<style>
.viewControls {
  position: sticky;
  left: 1rem;
  bottom: 3rem;
  z-index: 1000;
  font-size: 0.875rem;
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
  },
}
</script>
