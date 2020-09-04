<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@~/assets/style/reset.scss";
@import "@~/assets/style/helper.scss";

#app {
  color: #333;
  font-family: $font-hei;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
