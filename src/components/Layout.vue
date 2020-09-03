<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout"
};
</script>
<style lang="scss" scoped>
.nav-wrapper {
  display: flex;

  height: 100vh;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  overflow: auto;

  display: flex;
}
</style>