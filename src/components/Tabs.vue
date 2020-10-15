<template>
  <div>
    <ul class="tabs">
      <li
        :class="{selected:item.value === type}"
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
import { Component, Prop, Watch } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  // @Prop(String) value!: string;
  // @Prop(String) classPrefix?: string;
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  // @Prop({ type: String, default: "64px" }) height!: string;
  distance = 0;
  type = "-";
  recordTypeList = recordTypeList;
  // liClass(item: DataSourceItem) {
  //   return {
  //     // [this.classPrefix + "-tabs-item"]: this.classPrefix,
  //     'selected'? item.value === this.value,
  //   };
  // }
  select(item: DataSourceItem) {
    this.type = item.value;
    this.$emit("update:type", item.value);
  }
  @Watch("type")
  onTypeChange(newVal: string, oldVal: string) {
    let newIndex = 0,
      oldIndex = 0;
    for (let i = 0; i < recordTypeList.length; i++) {
      if (recordTypeList[i].value === newVal) {
        newIndex = recordTypeList[i].index;
        continue;
      }
      if (recordTypeList[i].value === oldVal) {
        oldIndex = recordTypeList[i].index;
        continue;
      }
    }
    this.distance = this.distance + 100 * (newIndex - oldIndex);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@media (min-width: 500px){
  .tabs{
    &-item{
      height:73px;
      font-size: 30px;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
@media (max-width:500px){
  .tabs{
    &-item{
      height:50px;
      font-size: 22px;
    }
  }
}
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
