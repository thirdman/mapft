<template>
  <div class="pageContainer alpha">
    <Header />
    <div
      class="row"
      style="
        padding: 20px;
        min-height: 100px;
        justify-content: center;
        align-items: center;
      "
    >
      <div class="column" style="flex-basis: auto; padding: 0 1rem;">
        <label>links</label>
        <div>
          <nuxt-link to="/gallery">Gallery</nuxt-link>
          <nuxt-link to="/alpha" class="active">Alpha Series</nuxt-link>
        </div>
      </div>
      <div class="column" style="flex-basis: auto; padding: 0 1rem;">
        <label>Cryptovoxels</label>
        <div class="">
          <a
            href="https://www.cryptovoxels.com/play?coords=W@125E,303N"
            target="_blank"
            class="outLink"
            >InfiNFT Gallery in Cryptovoxels</a
          >
        </div>
      </div>
      <div class="column" style="flex-basis: auto; padding: 0 1rem;">
        <label>Opensea</label>
        <div class="">
          <a
            href="https://opensea.io/assets/infinft-alpha"
            target="_blank"
            class="outLink"
            >InfiNFT Alpha on Opensea</a
          >
        </div>
      </div>
    </div>

    <section id="read" class="artists marker gripBottom gridTop">
      <div class="tertiary">
        3
      </div>
      <div class="primary">
        <div id="artistGrid" class="gridWrap">
          <div id="ekaitza" class="artistItem tall">
            <h2>ekaitza</h2>
            <h5>about</h5>
            <p class="">
              Ekaitza is a digital artist living in California inspired by
              futurism, innovation and how current events will be judged by
              future generations. With a background in technology and a love for
              classical art Ekaitza tries to blend both worlds via illustration
              and 3d designs.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/ekaitza_"
                target="_blank"
                class="outLink twitter at"
                >ekaitza_</a
              ><br />
              discord: ekaitza#9269
            </p>

            <h5>alpha submission</h5>

            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/BjvcnOk_v4jyQv7edQNmvlUGo7BBGOLnonqgWh5p6JgaMrLt21MXHZxwwHsPFIaFjkgZVx-OwcbAjKQRPTJDSUA"
                style="width: 100%; max-width: 1000px;"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/1"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=1"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>
          <div id="TwistedVacancy" class="artistItem">
            <h2 class="highlight">TwistedVacancy</h2>
            <h5>about</h5>
            <p class="">
              Representing fragments of mind through visual with immersive
              colours.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/twistedvacancy"
                target="_blank"
                class="outLink twitter at"
                >twistedvacancy</a
              ><br />
              discord: TwistedVacancy#6055
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/P38eyp_Bi56_9rGXEVjanPCo7TGAs41U2TmUT0OKjksXOvWGO0MB04_B6527IjLWGjj88PfRULksvNXKIafSIT4"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <!-- <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/6"
                target="_blank"
                class="outLink"
                >Opensea</a
              > -->
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=6"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="GiantSwan" class="artistItem small">
            <h2>Giant Swan</h2>
            <h5>about</h5>
            <p class="">
              Virtual Reality artist, Sculptor, Experience and Art Director.
              Always working on the edge of my mediums, always pushing to
              elevate by creating. Recently exhibited in Melbourne, Shanghai and
              Miami
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/a_giant_swan"
                target="_blank"
                class="outLink twitter at"
              >
                <span>a_giant_swan</span></a
              >
              <br />
              discord: Giant Swan#2810
            </p>

            <h5>alpha submission</h5>
            <div class="result previewImage shadow">
                <!-- <ModelViewer
                  class="tokenImage3d preview"
                  src="https://gateway.pinata.cloud/ipfs/QmNk7UcVuLDXZ3zxs12LZmqpxn8oriQWj9QzwFTAin3nHE"
                  alt="example"
                >
                </ModelViewer> -->
              <client-only>
                <RenderItem
                :item="giantSwanData"
                :fileType="giantSwanData.fileType"
                :src="giantSwanData.fileIpfsUrl"
                mode="preview"
                :data="giantSwanData"
              />
              </client-only>
              <!-- <ModelViewer
                  class="tokenImage3d preview"
                  src="https://gateway.pinata.cloud/ipfs/QmNk7UcVuLDXZ3zxs12LZmqpxn8oriQWj9QzwFTAin3nHE"
                  alt="example"
                  :data="giantSwanData"
                >
                </ModelViewer> -->
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/2"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=2"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="KatyArrington" class="artistItem">
            <h2>Katy Arrington</h2>
            <h5>about</h5>
            <p class="">Digital artist for the freak in u ;P</p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/katyarrington"
                target="_blank"
                class="outLink twitter at"
                >katyarrington</a
              ><br />
              discord: katyillustrates#4536
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/7rKQCauq7MRfG5Hnq3UrU9gfG_XRdADT5rTuyN5WTMqdcF2-vvINFJri4OjwNxt05jWF_Zs_LChSihNM4kY2sXJ7"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/7"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=7"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="AlottaMoney" class="artistItem tall">
            <h2>AlottaMoney</h2>
            <h5>about</h5>
            <p class="">
              Alotta Money's artwork are like cyberdelic pills mixed with crypto
              currency anarcho propaganda, triple dipped in nonsense. Collages,
              Machinimas, Animations and Videos. Currently in a brand new but
              non exclusive love affair with AI.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/money_alotta"
                target="_blank"
                class="outLink twitter at"
                >money_alotta</a
              ><br />
              discord: alotta.m#6588
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/d1YChosLkMFc5W4ksCcLe9a4YpBucn7j3NYDe51qnke_OKkm6guYeBE1D7r-5q37HNrQ-m0zuV78DE0o1uYivotCow"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/3"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=3"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="Poopie" class="artistItem">
            <h2>Cris and Isaiah</h2>
            <h5>about</h5>
            <p class="">
              The artists behind CryptoKitties create cats that push the
              boundaries of cute, epic and weird. The duo uses art to enrich
              player experiences and ignite interest in newcomers.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/c_jara"
                target="_blank"
                class="outLink twitter at"
                >c_jara</a
              >
              /
              <a
                href="https://twitter.com/cryptokitties"
                target="_blank"
                class="outLink twitter at"
                >cryptokitties</a
              ><br />
              discord: Poopie#0125
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/zBez_YBVPzPDFhC3V8LiVFE2zShXRSWaXir8UghU3Q-EPZc_U7FBZoSfgyfS5JOa57Jkkm9ZadRs0kaM5W4IHns5"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/8"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=8"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="Hackatao" class="artistItem short">
            <h2>Hackatao</h2>

            <h5>about</h5>
            <p class="">
              Hackatao merges the cultured quotations from the past to bold and
              ultra-contemporary forms, standing out as an innovative exponent
              of the current artistic scenario. The artistic diptych Hackatao is
              formed by Sergio Scalet and Nadia Squarci. The duo was formed in
              Milan in 2007 working together with the creation of the Podmork,
              sculptures with soft and totemic forms, which are at the center of
              their imaginative research.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/hackatao"
                target="_blank"
                class="outLink twitter at"
                >hackatao</a
              ><br />
              discord: Hackatao#6851
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/5jSNZDksFPls1POnHSdMURW7zHpbCRnWp0ZeQLmcDgKwOjH1EVF6s62zUrubStn6__h4Vqtozld5StxsRJtxh-H0HA"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/4"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=4"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="Pranksy" class="artistItem">
            <h2>Pranksy</h2>
            <h5>about</h5>
            <p class="">
              Having spent years in the world of dapps, nfts and tokenised art,
              Pranksy offers a unique creative perspective of the technological
              revolution of the blockchain.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/pranksyNFT"
                target="_blank"
                class="outLink twitter at"
                >pranksyNFT</a
              ><br />
              discord: Pranksy#0001
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/okKmFaIysX7wgX-A33zkavGTxtozrEIQopJiPgDeq2EyIqUMnGcTi2t3h1lx17Qdm-QTCv7J9ldEHwIvnUoq7Aef"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/9"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=9"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="Micah_Johnson" class="artistItem tall">
            <h2>Micah Johnson</h2>
            <h5>about</h5>
            <p class="">
              Since first exhibiting his paintings while playing for the Los
              Angeles Dodgers, Micah's artworks have been routinely collected by
              some of sports & entertainment most renowned figures. For info
              about the paintings seen in Micah's animated artworks, as well as
              a preview of upcoming works: https://thearthlete.substack.com
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/micah_johnson3"
                target="_blank"
                class="outLink twitter at"
                >micah_johnson3</a
              ><br />
              discord: Micah_Johnson3#8058
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/pp2xETLuxypdMA0M5P8fvML6SUUMmnGtqRjQvJHZgn-4xbHlR0f3Y0IpwnTi5JmUnr5rTXeoiukHSyXF8-wZtUqA6Q"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/5"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=5"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>

          <div id="DidierRa" class="artistItem">
            <h2>Didier Ra</h2>
            <h5>about</h5>
            <p class="">
              French sculptor, tattoo, and digital artist, Didier Ra brings his
              work to life with animation and AI applied via editing tools.
            </p>

            <h5>social media</h5>
            <p class="">
              twitter:
              <a
                href="https://twitter.com/didierRA1"
                target="_blank"
                class="outLink twitter at"
                >didierRA1</a
              ><br />
              discord: DidierRa#6656
            </p>

            <h5>alpha submission</h5>
            <div class="previewImage shadow">
              <img
                src="https://lh3.googleusercontent.com/yK-xEsJbPOqupMIf0S3NbtUUzM1UWq--dnlQjL20LqRwsM2dLe74rZLRL7FWNKP1qB2Jyb3gjabilen2VWQmZW4"
              />
            </div>

            <h5>view piece in marketplace</h5>
            <p class="">
              <a
                href="https://opensea.io/assets/0xd0c402bcbcb5e70157635c41b2810b42fe592bb0/10"
                target="_blank"
                class="outLink"
                >Opensea</a
              >
            </p>

            <h5>view full size with details</h5>
            <p class="">
              <a
                href="https://www.infinft.com/view.html?token=10"
                target="_blank"
                class="outLink"
                >InfiNFT View</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="secondary">
        2
      </div>
    </section>
    <!-- 
    <Footer /> -->
  </div>
</template>

<script>
export default {
  name: 'alphaPage',
  data(){
    return {
      giantSwanData: {
        title:"Another", 
      authorName:"Giant Swan",
      description:"",
      edition:1,
      fileArweaveHash:"qj1t_-_lVlWYCBGI3KEthDHkVWdlgMa-atx3JIACNzw",
      fileIpfsHash:"QmNk7UcVuLDXZ3zxs12LZmqpxn8oriQWj9QzwFTAin3nHE",
      editions:1,exhibition:"",fileType:"glb", 
      artistAddress:"", 
      royaltyFee:10,ownerAddress:"",fileArweaveUrl:"",fileIpfsUrl:"https://gateway.pinata.cloud/ipfs/QmNk7UcVuLDXZ3zxs12LZmqpxn8oriQWj9QzwFTAin3nHE",
      thumbnailUrl:""
      }
    }
  }
}
</script>

<style></style>
