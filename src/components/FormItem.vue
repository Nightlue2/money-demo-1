<template>
  <label class="formItem">
    <Icon class="name" name="备注" />
    <input
      type="text"
      :value="value"
      @input="onValueChanged($event.target.value)"
      :placeholder="this.placeholder"
      ref="input"
    />
    <input type="date" @input="onDateChanged($event.target.value)" :value="date" class="chooseDate"/>
  </label>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from 'dayjs';
@Component
export default class FormItem extends Vue {
  @Prop() placeholder?: string;
  @Prop(String) date!: string;
  value?: string = '';
  onValueChanged(value: string) {
    if(value.length>35){
      (this.$refs.input as HTMLInputElement).value = '';
      this.value = '';
      alert('备注不能超过35个字！');
    }else{
      this.$emit("update:value", value);
    }
  }
  onDateChanged(date: string){
    this.$emit('update:date',dayjs(date).format('YYYY-MM-DD'))
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
    .chooseDate{
      width:70px;
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