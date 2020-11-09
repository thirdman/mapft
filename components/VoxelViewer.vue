<template>
  <div>
    sdfsdf
    <div id="viewport">
      
      
      
    </div>
  </div>
</template>

<style>
.viewport{
  width: 500px;
  height: 500px;
  border: 1px solid lime;
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
// import { ModelObj, ModelGltf } from 'vue-3d-model'
import * as THREE from 'three'

import { humanFileSize } from '../utils/misc'
// const VoxelLoader = require('three-voxel-loader');

import VoxelLoader from 'three-voxel-loader'
// const localFile = require(`~/assets/media/chicken.vox`)
export default {
  // components: { VoxelLoader },

  props: ['src', 'alt', 'autoPlay', 'loop', 'autoRotate', "data", "model"],
  data() {
    return {
      isActive: false,
      isLoading: true,
      loaded: 0,
      total: 100,
      loadingPercent: 0,
      fileSize: undefined,
      loadingMeta: '',
      cameraPosition: { x: 0, y: 0.075, z: 0.25 },
    }
  },
  mounted() {
    if (process.client) {
   
   
      console.log('this.viewData', this.viewData)
      this.init('https://gateway.pinata.cloud/ipfs/QmVDF7vFWzWfsUDL17Sif7bLLWQojBrEWPrcz4iETarrrD')
      // console.log('localFile', localFile)
    var camera, scene, renderer, model, stats, controls;
    // console.log('VoxelLoader', VoxelLoader)
      let loader = new VoxelLoader();
      // console.log('loader', loader)
      // console.log('THREE', THREE)
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xFFFFFF);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      // renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setSize(250, 200, false);

      let mainNode = document.getElementById("viewport");
      mainNode.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(20, 4, 10);

      // Camera Controls
      // controls = new THREE.OrbitControls(camera, renderer.domElement);
      // controls.enableDamping = true;
      // controls.autoRotate = true;
      // controls.update();

      // controls.addEventListener('start', function () {
      //   controls.autoRotate = false;
      // });

      // Lights
      var ambientLight = new THREE.AmbientLight(0x666666);
      scene.add(ambientLight);

      var light = new THREE.DirectionalLight(0xdfebff, 1);
      light.position.set(300, 500, 100);
      light.position.multiplyScalar(1);
      scene.add(light);
      console.log('loader', loader)
    // Load a resource from provided URL.
    console.log('this.viewData.fileIpfsUrl', this.viewData.fileIpfsUrl)
      loader.loadFile(
        // Resource URL.
        '~/assets/media/room.vox',
        // 'https://gateway.pinata.cloud/ipfs/QmYhs7gjphKvW8woWojJYWxSGZPHsLCh9G4tx2KUpHZ3XQ',
      
        // Called when resource is loaded.
        function ( voxels ) {
          // scene.add( voxels );
          console.log('voxels', voxels)
          model = voxels;
          console.log('scene', scene)
          this.renderModel()
        },
      
      
        // Called when loading is in progresses.
        function ( xhr ) {
          console.log('xhr', xhr)
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
      
        // Called when loading has errors.
        function ( error ) {
          console.log( 'An error happened', error );
        }
      );
      
    }
  },
  computed: {
    ...mapGetters({
      viewData: 'ui/viewData',
      allLights: 'lightStore/allLights',
      rotation: 'lightStore/rotation',
      isRotating: 'lightStore/isRotating',
    }),
    
  },
  methods: {
    modelData(){
      const dataToReturn = this.$props.data || this.viewData
      return dataToReturn
    },
    
    renderModel() {
      console.log('render', model)
      // _toggleLoading(false);
      model.position.x = 0.5
      model.position.z = 0.5
      scene.add(model)
      this.requestRenderIfNotRequested()
    },
    requestRenderIfNotRequested() {
      if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(render);
      }
    },

    async asyncData(context) {
    //  console.log('process.env', process.env)
    const { params } = context
    const options = {
      contractId: params.contract,
      tokenId: parseInt(params.id),
    }
    console.log('async options', options)
    // console.log('async this', this)
    // console.log('async Web3', Web3)
    // if (!Web3) {
    //   console.log('no Web3')
    //   return null
    // }
    // const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    // return { title: data.title }

    // const asyncData = await readThatShit(options, this)
    // console.log('data', asyncData)
    // .then((result) => {
    //   console.log('asyncDat result', result)
    //   // this.commit('ui/setViewData', result)
    //   // this.commit('ui/setViewStatus', 'loaded')
    // })
    // .catch((error) => console.error(error))
  },

    async init(url) {
      console.log('init', url)
      var parser = new vox.Parser();
    console.log('parser', parser)
    const result  = await axios.get(url)
    // console.log('vox result ', result.data)
    let loader = new VoxelLoader();
    loader.loadFile(
        // Resource URL.
        // '~/assets/media/room.vox',
        // 'https://gateway.pinata.cloud/ipfs/QmYhs7gjphKvW8woWojJYWxSGZPHsLCh9G4tx2KUpHZ3XQ',
        url,
      
        // Called when resource is loaded.
        function ( voxels ) {
          // scene.add( voxels );
          console.log('voxels', voxels)
          model = voxels;
          console.log('scene', scene)
          this.renderModel()
        },
    );
    // const asyncData = await readThatShit(options, this)
    // console.log('data', asyncData)
    // .then((result) => {
    //   console.log('asyncDat result', result)
    //   // this.commit('ui/setViewData', result)
    //   // this.commit('ui/setViewStatus', 'loaded')
    // })
    // .catch((error) => console.error(error))

    await parser.parse(result.data).then(function(voxelData) {
      console.log('here')
        // TODO
        console.log('voxelData', voxelData)
    }).catch(error => {
      console.log('error? ')
      console.error(error)
    });
      
   
      
    }
  }

}
</script>
