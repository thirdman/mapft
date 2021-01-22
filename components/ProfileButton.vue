<template>
  <div class="ProfileButton">
    <div :class="`minimalButton ${contrastMode} ${profileObject && profileObject.profileImageHash ? 'hasAvatar' : ''}`" v-if="walletAddress">
        <button @click="handleNav('/user')" class="btn iconButton " v-tooltip="'View your profile'">
          <img class="userAvatarImage"
            :src="getProfileImage(profileObject.profileImageHash)"
            v-if="profileObject && profileObject.profileImageHash"
          />
          <IconUser
            v-if="!profileObject || profileObject.profileImageHash"
            :strokeClass="contrastMode === 'light' ? 'dark' : 'light'"
            />
        </button>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";


export default {
  name: "ProfileButton",
  data() {
    return {
      hasVerticalGrid: false,
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      hasWallet: "ui/hasWallet",
      walletAddress: "ui/walletAddress",
      walletName: "ui/walletName",
      uiMode: "ui/uiMode",
      contrastMode: "ui/contrastMode",
      uiTheme: "ui/uiTheme",
      profileObject: "ui/profileObject",
    }),
  },
  methods: {
    // ...mapMutations({
    // }),
    handleNav(route){
      this.$router.push(route);
    },
    handleModal() {
      this.$modal.show("account-modal");
    },
    getProfileImage(hash = "QmawLNCbgvpqYvLSF9nvzbJacSuxF5taSdidfGVST8rG1F"){
      // use defualt hash if non provided
      return `https://ipfs.io/ipfs/${hash}`
    }
  }
};
</script>

<style lang="scss">
.ProfileButton{
  .avatarButtonImage{
    
    
  }
}
.profile{
  .minimalButton{
    position: relative;
    border-radius: 2rem;
    background: var(--ui-color, #111);
    border: 0px solid var(--ui-color, #111);
    margin-right: .5rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 0 0 1px var(--ui-color, #111);
    transition: box-shadow .3s ease-out;
    
    // STUPID OVERRIDES FOR HEADER BUTTONS
    &.light{
      // background: var(--ui-color, #111);
      background: transparent;
      box-shadow: 0 0 0 1px var(--background-color, #111);
      &:hover{
      box-shadow: 0 0 0 3px var(--background-color, #111);
      }
    }
    &.dark{
      background: var(--background-color, #111);
      box-shadow: 0 0 0 1px var(--ui-color, #111);
    }
    &:hover{
      // background: var(--fill-color, #111);
      box-shadow: 0 0 0 3px var(--ui-color, #111);
      svg{
        // transform: scale(.9);
      }
    }
    &.hasAvatar{
      overflow: hidden;
      button{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
