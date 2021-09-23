<template>
  <v-dialog
      v-model="showDialog"
      width="640"
    >
    <v-card>
      <v-card-title class="text-h5 ">
          New Game
      </v-card-title>
        <v-card-text>
        <div class="row">
          <div class="col">
            <label>Teams</label>
            
            <div>
              <div class="text-body-2">
              Use Default Teams
              </div>
              <v-switch
                disabled
                v-model="optionUseDefault"
                :label="`${optionUseDefault ? 'Yes' : 'no'}`"
                v-tooltip="`Coming Soon`"
              ></v-switch>
            </div>
          </div>
          <div class="col">
            <label>Map Tiles</label>
            <div class="text-body-2">
              Generate when game is created
              </div>
            <div>
              <v-switch
                v-model="generateMap"
                :label="`${generateMap ? 'yes' : 'no'}`"
              ></v-switch>
            </div>  
          </div>
        </div>
      <div class="row">
        <div class="col">
          <label>Rows</label>
        </div>
        <div class="col">
          <label>Columns</label>
        </div>
        <div class="col" style="flex-basis: 300px; flex-grow: 0; flex-shrink: 0;">
          <label>Preview</label>
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          <div class="row ma-0 f-flex align-center">
            <v-btn text x-small outlined @click="removeRow"> - 1</v-btn>
            <div class="feature">{{newRows}}</div>
            <v-btn text x-small outlined @click="addRow"> + 1</v-btn>
          </div>
        </div>
        <div class="col">
          <div class="row ma-0 f-flex align-center">
            <v-btn text x-small outlined @click="removeCol"> - 1</v-btn>
            <div class="feature">{{newCols}}</div>
            <v-btn text x-small outlined @click="addCol"> + 1</v-btn>
          </div>
        </div>
        <div class="col" style="flex-basis: 300px; flex-grow: 0; flex-shrink: 0;">
          <map-preview :rows="newRows" :cols="newCols" />
        </div>
      </div>
        </v-card-text>
        <v-divider class="ma-0"></v-divider>
        <v-card-actions>
          <v-btn class="primary" @click="onAction(compiledOptions)">New Game</v-btn>
          <v-spacer></v-spacer>
            <v-btn depressed text @click="onClose(null)">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>

<style lang="scss">

</style>

<script>
import { mapMutations, mapGetters } from "vuex";
import MapPreview from './MapPreview.vue';

export default {
  components: { MapPreview },
  props: ['onAction', 'onClose', 'show', 'rows', 'cols'],
  data() {
    return {
      showDialog: true,
      newRows: 3,
      newCols: 4,
      generateMap: false,
      optionUseDefault: true,
    };
  },
  created(){
    
  },
  mounted(){
    
  },
  
  computed: {
    ...mapGetters({
      walletAddress: "ui/walletAddress",
    }),
    compiledOptions(){
      const {newRows, newCols, optionUseDefault, generateMap, walletAddress} = this
      const options = {rows: newRows, cols: newCols, useDefaultTeams: optionUseDefault, generateMap, owner: walletAddress}
      return options;
    }
  },

  methods: {
    ...mapMutations({
      // setIntroRead: "ui/setIntroRead",
    }),
    addRow(){
      this.newRows = this.newRows + 1;
    },
    removeRow(){
      if(this.newRows === 1){
        alert('Cannot be less than 1');
        return
      }
      else {
        this.newRows = this.newRows - 1;
      }
    },
    addCol(){
      this.newCols = this.newCols + 1;
    },
    removeCol(){
      if(this.newCols === 1){
        alert('Cannot be less than 1');
        return
      }
      else {
        this.newCols = this.newCols - 1;
      }
    },
  },
};
</script>


