<template>
  <div class="Loading">
    <div class="status-icon">
      <IconLogo :fillClass="fillClass || 'dark'" :size="size" />
    </div>
    <div class="status-message">
      {{ message }}
    </div>
  </div>
</template>

<style>
.Loading {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.Loading .status-icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 13px;
  min-width: 20px;
}
.Loading .status-icon svg {
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
