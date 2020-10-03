<template>
  <div class="new">
    <button @click="createTag"><Icon name="添加" /></button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class CreateTag extends Vue {}
</script>

<style lang="scss" scoped>
.new {
  padding-top: 16px;
  button {
    background: transparent;
    border: none; //去除默认样式
    border-bottom: 1px solid; //不给颜色就默认为字体的颜色
    color: #999;
    padding: 0 4px;
  }
}
</style>