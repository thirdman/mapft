<template>
  <figure class="audioItem">
    <div class="audioVisual">
      <div class="visualIcon">
        <img :src="thumbnailSrc" class="audioPreviewImg" v-if="thumbnailSrc" />
        <IconAudio strokeClass="light" v-if="!thumbnailSrc" />
      </div>
      <div class="visualTitle">
        <h6>{{ title }}</h6>
        <div class="small">{{description}}</div>
      </div>
    </div>
    <!-- <figcaption>{{ title }}</figcaption> -->
    <audio controls :src="src">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  </figure>
</template>

<style>
.audioItem {
  /* object-fit: contain; */
  width: 100%;
  border-radius: 1rem;
  margin: 0;
  padding: 2px;
  background: transparent;
}
.audioItem audio {
  width: 100%;
  border-radius: 0 0 1rem 1rem;
  background: rgba(30, 30, 30, 0.85);
  padding: 0.25rem;
}
.audioVisual {
  width: 100%;
  display: flex;

  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  border-radius: 1rem 1rem 0 0;
  /* margin-bottom: 1px; */
  border-bottom: 1px solid rgba(30, 30, 30, 0.45);
}
.visualIcon {
  position: relative;
  padding: 1rem;
  flex-basis: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  /* // margin-right: 1px; */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 30, 30, 0.85);
  min-height: 6rem;
  min-width: 6rem;
}
.audioPreviewImg{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.visualTitle {
  background: rgba(30, 30, 30, 0.85);
  padding: 1rem;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
}

.audioVisual h5 {
  margin-left: 0.5rem;
}

</style>

<script>
// import jsmediatags from 'jsmediatags'
export default {
  props: ['src', 'title', 'description', 'thumbnailSrc'],
  mounted() {
    // console.log('this', this)
    // console.log('this.src', this.src)
    // axios
    //   .get({
    //     method: 'get',
    //     url:
    //       'https://gateway.pinata.cloud/ipfs/QmRHPW4BCVedcjJypGHTSHnp95G3HZxoC3oS4QxY2h9VXr',
    //   })
    //   .then((response) => {
    //     console.log('response.data: ', response.data)
    //     // let file = response.data
    //     // console.log(file.type)
    //     // if (!file || file.type !== 'text/plain') return
    //     // this.text = 'asdf'
    //   })
    //   .catch((error) => console.error(error))
    // jsmediatags.read(
    //   'https://gateway.pinata.cloud/ipfs/QmRHPW4BCVedcjJypGHTSHnp95G3HZxoC3oS4QxY2h9VXr',
    //   {
    //     onSuccess: function (tag) {
    //       console.log(tag)
    //     },
    //     onError: function (error) {
    //       console.log(':(', error.type, error.info)
    //     },
    //   }
    // )
  },
  data() {
    return {
      // isActive: false,
    }
  },
  computed: {
    //
  },
  methods: {},
}
</script>
