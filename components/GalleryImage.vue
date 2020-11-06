<template>
  <div class="galleryImageWrapInner">
    <transition name="fade" appear>
    <img
      :src="src"
      @error="imageLoadError()"
      @load="imageLoad()"
      class="galleryItemImage"
      v-if="!notFound"
    />
    </transition>
    <transition name="fade" appear>
    <DefaultImage v-if="notFound"/>
    </transition>
  </div>
</template>

<style>
.galleryImageWrapInner {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%; 
  flex-basis: 80%;
  flex-shrink: 0;
  flex-grow: 1;
  overflow: hidden;
}
/* 
.galleryImageWrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left top;
}
 */
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
</style>

<script>
// import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: ['src', 'thumbnail'],
  data() {
    return {
      // nothing to see here
      notFound: false,
      isLoaded: false,

    }
  },

  computed: {
   
  },

  methods: {
    
    imageLoadError (index) {
      // console.group('error')
      // console.log(`GalleryImage failed to load, ${index}`);
      // console.log('this.thumbnail', this.thumbnail)
      // console.log('this.src', this.src)
      console.log('image load error')
      this.notFound = true
      this.isLoaded = false
    },
    imageLoad () {
      console.log('load')
      this.notFound = false
      this.isLoaded = true
    },
    
    
  },
}
</script>
