<template>
    <div>
      <label class="notes">
        {{value}}
        <span class="name">备注</span>
        <input type="text" v-model="value" placeholder="在这里输入备注" />
      </label>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component,Watch} from "vue-property-decorator";
@Component
export default class Notes extends Vue{
  value='';

  @Watch('value')
  onValueChanged(value: string,oldValue: string){
    this.$emit('update:value',value);
  }
}
</script>
<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  display: flex;
  font-size: 14px;
  padding-left: 16px;
  align-items: center;
  .name {
    vertical-align: bottom;
    padding-right: 16px;
  }
  input {
    height: 73px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>