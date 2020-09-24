<template>
  <div class="pageContainer">
    <Header />

    <section  >
      <div class="tertiary">
       <h2>Flow Assets</h2>
      </div>
      <div class="primary">
        <div v-if="moments">
          <MomentsList :moments="moments" :displayMode="galleryDisplayMode"/>
        </div>
      </div>
      <div class="secondary">
       <label>Display</label>
        <div class="buttonGroup uiMode" :class="contrastMode">
          <button
            @click="setGalleryDisplayMode('compact')"
            class="small toggleItem"
            :class="galleryDisplayMode === 'compact' ? 'active' : 'notActive'"
          >
            Compact
          </button>
          <button
            @click="setGalleryDisplayMode('expanded')"
            class="small toggleItem"
            :class="galleryDisplayMode === 'expanded' ? 'active' : 'notActive'"
          >
            Expanded
          </button>
          <button
            @click="setGalleryDisplayMode('list')"
            class="small toggleItem"
            :class="galleryDisplayMode === 'list' ? 'active' : 'notActive'"
          >
            Full
          </button>
          </div>
      </div>
    </section>
  <Footer />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "FlowAssets",
  computed: {
    ...mapGetters({
      moments: 'flowStore/moments',
      galleryDisplayMode: 'galleryStore/galleryDisplayMode',
      contrastMode: 'ui/contrastMode',
    }),
  },
  methods: {
    ...mapMutations({
      setGalleryDisplayMode: 'galleryStore/setGalleryDisplayMode',
    }),
  }
}
</script>

<style></style>
