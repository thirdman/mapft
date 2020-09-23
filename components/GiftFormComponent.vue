<template>
  <div id="giftForm" class="form create column shadow" style="flex-basis: 100%">
    <div class="fieldset metaContent" v-if="!walletAddress">
      No Wallet Connected.
    </div>
    <div class="fieldset metaContent" v-if="walletAddress">
      <div
        class="statusContent"
        v-if="giftStatus !== 'completed' && giftStatus !== 'ready'"
      >
        <div>STATUS: {{ giftStatus }}</div>
        <div v-if="giftStatusMessage">MESSAGE: {{ giftStatusMessage }}</div>
      </div>
      <div class="completedContent" v-if="giftStatus === 'completed'">
        <h2>Done!</h2>
        <p>Nice! Your NFT is in the hands of it's new owner.</p>
        <p>
          <nuxt-link
            :to="`/view/${this.$route.params.contract}/${this.$route.params.id}`"
            class="asButton"
            >View Token</nuxt-link
          >
          <nuxt-link
            :to="`/gallery/${this.$route.params.contract}`"
            class="asButton"
            >Back to Gallery</nuxt-link
          >
        </p>
      </div>
      <div v-if="giftStatus === 'error' || giftStatus === 'ready'">
        <ValidationProvider rules="required|min:3">
          <div
            class="formItem required"
            :class="classes"
            slot-scope="{ classes, errors }"
          >
            <label>NFT Contract Id</label>
            <div>
              <input
                name="Contract ID"
                id="giftTokenId"
                class="w3-input"
                type="string"
                max="99"
                required
                placeholder="Eg. 0xd0c402bcbcb5e701576..."
                v-model="giftContractId"
              />
              <div>
                <span class="validationMessage">{{ errors && errors[0] }}</span>
              </div>
            </div>
            <FormItemHelp
              required="true"
              message="The contract containing the token that will be gifted."
            />
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required|min:3">
          <div
            class="formItem required"
            :class="classes"
            slot-scope="{ classes, errors }"
          >
            <label>NFT Token Id</label>
            <div>
              <input
                name="Token ID"
                id="giftTokenId"
                class="w3-input small"
                type="string"
                max="99"
                required
                placeholder="Eg. 23"
                v-model="giftTokenId"
              />
              <div>
                <span class="validationMessage">{{ errors && errors[0] }}</span>
              </div>
            </div>
            <FormItemHelp required="true" message="The token to be gifted." />
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required">
          <div
            class="formItem required"
            :class="classes"
            slot-scope="{ classes, errors }"
          >
            <label>Recipient Address</label>
            <div>
              <input
                name="Recipient Address"
                id="giftWalletAddress"
                class="w3-input"
                type="string"
                required
                placeholder="Eg. 0xd0c402bcbcb5..."
                v-model="giftWalletAddress"
              />
              <div>
                <span class="validationMessage">{{ errors[0] }}</span>
              </div>
            </div>
            <FormItemHelp
              required="true"
              message="This is the wallet address id of the recipient."
            />
          </div>
        </ValidationProvider>

        <Button
          size="large"
          mode="primary"
          class="fill"
          :disabled="getIsDisabled()"
          @click="handleGift(walletAddress)"
        >
          GIFT
        </Button>
      </div>
      <Button
        @click="
          handleCheckStatus(
            '0xed48804235a7376ca978af3066269e80bf10cf015f02eaef14f10513b7bd9d68'
          )
        "
        >checkStatus</Button
      >
    </div>
  </div>
</template>

<style>
.menu {
  display: flex;
  flex-direction: row;
}
</style>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { ValidationProvider, extend } from 'vee-validate'
import { required, min, email } from 'vee-validate/dist/rules'

extend('min', {
  // (value) => {
  ...min,
  // return value.length >= 3
})
extend('required', {
  ...required,
  message: 'This field is required',
})

export default {
  components: {
    ValidationProvider,
  },

  destroyed() {
    console.log('DESTROYED')
    this.$store.commit('giftFormStore/setGiftStatus', 'ready')
    this.$store.commit('giftFormStore/setGiftContractId', '')
    this.$store.commit('giftFormStore/setGiftTokenId', '')
    this.$store.commit('giftFormStore/setGiftWalletAddress', '')
  },
  data() {
    return {
      // These are the validation arrays
      errors: [],
      classes: [],
    }
  },
  computed: {
    ...mapFields('giftFormStore', [
      'giftContractId',
      'giftTokenId',
      'giftTokenAddress',
      'giftWalletAddress',
    ]),
    ...mapGetters({
      walletAddress: 'ui/walletAddress',
      giftStatus: 'giftFormStore/giftStatus',
      giftStatusMessage: 'giftFormStore/giftStatusMessage',
    }),
  },
  methods: {
    ...mapMutations({
      handleGift: 'giftFormStore/handleGift',
      // handleGet: 'giftFormStore/handleGet',
    }),
    ...mapActions({
      handleCheckStatus: 'giftFormStore/handleCheckStatus',
    }),
    getIsDisabled() {
      const canGift =
        !!this.giftTokenId &&
        !!this.giftContractId &&
        !!this.giftWalletAddress &&
        !!this.walletAddress

      return !canGift
    },
  },
}
</script>
