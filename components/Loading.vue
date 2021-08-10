<template>
  <div class="Loading loadingComponent">
    <div class="status-icon inLoading">
      <IconLogo :fillClass="fillClass || 'dark'" :size="size" />
    </div>
    <div class="status-message .inLoading" >
      {{ message }}
    </div>
  </div>
</template>

<style>
.Loading.loadingComponent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.Loading.loadingComponent .status-icon.inLoading {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 13px;
  min-width: 20px;
}
.Loading.loadingComponent .status-icon.inLoading svg {
  width: 100%;
  height: 100%;
}

</style>

<script>
export default {
  props: ['message', 'fillClass', 'size'],
  data() {
    return {
      example: 'hello',
    }
  },
}
</script>
