<template>
  <div>
    <ul class="tabs">
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
        :style="`transform: translateX(${distance}%);`"
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
  @Prop(Number) readonly distance!: number;
  // @Prop(String) classPrefix?: string;
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  // @Prop({ type: String, default: "64px" }) height!: string;

  liClass(item: DataSourceItem) {
    return {
      // [this.classPrefix + "-tabs-item"]: this.classPrefix,
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
  padding-top: 10px;
  flex-flow: row wrap;
  background-color: $color-bg;
  border-bottom: 1px solid #eee;
  &-item {
    width: 25%;
    color: #999;
    height: 50px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.selected {
      color: $color-theme;
      background-image: linear-gradient($color-bg, $color-light);
    }
  }
  &-item:nth-child(1) {
    margin-left: 25%;
  }
  &-item:nth-child(2) {
    margin-right: 25%;
  }
  > .bottomBar {
    width: 25%;
    height: 3px;
    margin-right: 25%;
    margin-top: -3px;
    background: $color-theme;
    transition: transform 0.38s ease-in-out;
  }
}
</style>
