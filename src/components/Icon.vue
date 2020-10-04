<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icon-svg", true, /\.svg$/));
  importAll(require.context("../assets/label-svg", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  name: "Icon",
  props: ["name"],
};
console.log(name);
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: $color-font;
  overflow: hidden;
}
</style>
