<template>
  <label class="formItem">
    <Icon class="name" name="备注" />
    <input
      type="text"
      :value="value"
      @input="onValueChanged($event.target.value)"
      :placeholder="this.placeholder"
    />
  </label>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop() placeholder?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>
<style lang="scss" scoped>
@media(min-width: 500px){
  .formItem{
    font-size: 20px;
    .name{
      width:33px;
      height:33px;
    }
    .input{
      height:26px;
    }
  }
  
}
@media (max-width:500px){
  .formItem{
    font-size: 14px;
    .name{
      width:22px;
      height:22px;
    }
    .input{
      height:22px;
    }
  }
}
.formItem {
  display: flex;
  padding-left: 16px;
  align-items: center;
  .name {
    vertical-align: bottom;
    margin-right: 8px;
  }
  input {
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>