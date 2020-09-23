<template>
  <div class="heroImages">
    <div class="heroItem">
      <img
        class="heroImage shadow"
        src="https://lh3.googleusercontent.com/7rKQCauq7MRfG5Hnq3UrU9gfG_XRdADT5rTuyN5WTMqdcF2-vvINFJri4OjwNxt05jWF_Zs_LChSihNM4kY2sXJ7"
      />
    </div>
    <div class="heroItem">
      <img
        class="heroImage shadow"
        src="https://lh3.googleusercontent.com/BjvcnOk_v4jyQv7edQNmvlUGo7BBGOLnonqgWh5p6JgaMrLt21MXHZxwwHsPFIaFjkgZVx-OwcbAjKQRPTJDSUA"
      />
    </div>
    <div class="heroItem">
      <img
        class="heroImage shadow"
        src="https://lh3.googleusercontent.com/zBez_YBVPzPDFhC3V8LiVFE2zShXRSWaXir8UghU3Q-EPZc_U7FBZoSfgyfS5JOa57Jkkm9ZadRs0kaM5W4IHns5"
      />
    </div>
    <div class="heroItem">
      <img
        class="heroImage shadow"
        src="https://lh3.googleusercontent.com/5jSNZDksFPls1POnHSdMURW7zHpbCRnWp0ZeQLmcDgKwOjH1EVF6s62zUrubStn6__h4Vqtozld5StxsRJtxh-H0HA"
      />
    </div>
  </div>
</template>

<style>
.heroImages {
  margin-top: 0.5fr;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(8rem, 100%), 47%));
  grid-template-rows: repeat(auto-fit, minmax(min(5rem, 10rem), 0.75fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}
.heroItem {
  align-items: center;
  justify-content: center;
  display: flex;
}
.heroImage {
  width: 100%;
  height: auto;
  position: relative;
  display: inline-block;
  border: 1px solid var(--ui-color, #111);
}
.heroImages .heroItem:nth-child(1) .heroImage {
  left: 0rem;
}
.heroImages .heroItem:nth-child(2) .heroImage {
  left: -2rem;
  top: 2rem;
}
.heroImages .heroItem:nth-child(3) {
  align-items: flex-start;
  justify-content: flex-start;
}
.heroImages .heroItem:nth-child(3) .heroImage {
  left: -2rem;
  top: -2rem;
}
.heroImages .heroItem:nth-child(4) .heroImage {
  left: -4rem;
  top: -0rem;
}
.heroImages .heroItem:nth-child(4) {
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
