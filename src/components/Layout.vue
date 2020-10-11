<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component,Prop } from 'vue-property-decorator';
@Component
export default class Layout extends Vue{
  @Prop(String) classPrefix?: string;
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  overflow: hidden;
}
</style>