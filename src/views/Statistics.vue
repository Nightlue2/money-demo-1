<template>
  <div>
    <Layout><Types class-prefix="zzz" :value.sync="data" /></Layout>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .zzz-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>
<script lang="ts">
import Types from "@/components/Types.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Types },
})
export default class Statistics extends Vue {
  data = "-";
}
</script>

