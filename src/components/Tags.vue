<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background-color: white;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg-c: #d9d9d9;
      background: $bg-c;
      $height: 24px;
      height: $height;
      line-height: $height; //用于居中，但之后可能不止一行标签
      border-radius: $height/2;
      padding: 0 16px;
      margin-right: 12px; //分离li标签
      margin-top: 4px;
      &.selected {
        background-color: darken($bg-c, 28);
        color: lighten(#333, 90);
      }
    }
  }
}
</style>
