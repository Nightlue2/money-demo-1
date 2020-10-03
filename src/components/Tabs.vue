<template>
  <div>
    <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
      <li
        :class="liClass(item)"
        @click="select(item)"
        v-for="item in dataSource"
        :key="item.value"
        class="tabs-item"
      >
        {{ item.text }}
      </li>
      <div
        class="bottomBar"
        :style="`transform: translateX(${distance}*100%);`"
      ></div>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  @Prop({ type: String, default: "64px" }) height!: string;
  @Prop({ required: true, type: Number }) distance!: number;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  display: flex;
  text-align: center;
  justify-content: center;

  &-item {
    width: 25%;
    color: #999;
    height: 64px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      color: $color-theme;
    }
  }
  > .bottomBar {
    position: absolute;
    top: 64px;
    left: 25%;
    width: 25%;
    height: 4px;
    background: $color-theme;
    transition: transform 1.2s linear;
    // transform: translateX(this.$distance * 25%);
  }
  // > .move {

  // }
}
</style>