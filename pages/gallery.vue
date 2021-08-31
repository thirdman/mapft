<template>
  <div class="pageContainer appPage">
    <Header />
      <section id="appSection" class="">
        
      
        <div class="sectionRow row ma-0 pa-0" >
          <div class="col col-3 svgColumn">
            <div class="list" v-if="siteData && siteData.images && siteData.images.length">
            <div v-for="(item, index) in siteData.images" :key="index" class="listItem" >
              <div>
                {{item.image && item.image.label || item.id || "no id"}}
              </div>
              <v-btn 
              small
              @click="loadGallery(item.id)">load</v-btn>
              <v-btn small @click="removeGallerySet(item.id)">delete</v-btn>
            </div>
          </div>
            <!-- <div class=" galleryColumn" v-if="previewMode === 'gallery'">
              <div class="newElement panel " >
                <v-card >
                  <v-card-title>
                    <label>Gallery Preview</label>
                    <v-btn x-small depressed @click="() => {this.setPreviewMode('edit')}">
                      <v-icon small>
                        mdi-close
                      </v-icon>
                      </v-btn>
                  </v-card-title>
                  <v-card-text class="grid">
                    <div v-for="index in 14" :key="index" class="gridItem">
                    <client-only>
                        <PreviewSvg :code="svgCode" :previewData="previewData"  />
                    </client-only>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div> -->
          </div>
          <div class="col col-9 ">
            <div class=" galleryColumn" v-if="imageData">
              <div class="row">
                <div class="col">
                  <label>Gallery: {{imageData.image.label}}</label><br />
                </div>
                <div class="col">
                  <v-btn x-small depressed @click="() => {this.loadGallery()}">
                    <v-icon small>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="row">
                <!-- <div class="col">
                  <label>Gallery: {{imageData.image.label}}</label><br />
                  <p class="text-body pa-0 ma-0">{{imageData.id}}</p>
                </div> -->
                <div class="col">
                  <label>Creator: </label><br />
                  <p class="text-body">{{imageData.image.creator}}</p>
                </div> 
                <div class="col">
                  <label>Description </label><br />
                  <p class="text-body pa-0 ma-0">{{imageData.image.description}}</p>
                </div>
              </div>
              <div class="galleryGrid grid panel " >
                <div v-for="index in 14" :key="index" class="galleryItem gridItem">
                  <client-only>
                      <PreviewSvg  :previewData="imageData.image" :show-grid="false"  />
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      
      
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "GalleryPage",
  head: {
    title: 'SVG tokens Gallery',
    meta: [
      { hid: 'description', name: 'description', content: 'Mint That SVG.' },
    ],
  },
  data() {
    return{
      loading: true,
      imageData: null,
    }
  },
  asyncData() {
      return {
        loading: false
      }
    },
  mounted(){
    console.log('mounted');
    
  },
  computed: {
    ...mapGetters({
      siteData: "ui/siteData",
    }),
  },
  methods: {
    ...mapMutations({
      // setPreviewMode: "svgFormStore/setPreviewMode",
    }),
    ...mapActions({
      removeGallerySet: "ui/removeGallerySet",
    }),
    loadGallery(id){
      const {siteData: {images}} = this
      this.imageData = null;
      if(!id){return}
      const thisImage = images.filter( img => img.id === id);
      console.log('thisImage.image', thisImage[0].image)
      this.imageData = thisImage && thisImage[0]
    }
    
  }
}
</script>

<style lang="scss">
  .list{
    .listItem{
      margin: .25rem 0;
      border-radius: 4px;
    } 
  }
  .galleryColumn{
    overflow: scroll;
    position: relative;
    height: 85vh;
    // padding-top: 4rem;
    // padding-bottom: 4rem;
    display: block;
    .galleryItem{
      position: relative;
      display: block;
    }
  }
</style>
