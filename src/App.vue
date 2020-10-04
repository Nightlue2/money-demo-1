<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-font;
  font-family: $font-hei;
  line-height: 1.5;
  font-size: 16px;
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
}
</style>
