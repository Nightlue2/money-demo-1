<template>
  <div>
    <label class="formItem">
      <Icon class="name" name="备注" />
      <input
        type="text"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </label>
  </div>
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
.formItem {
  display: flex;
  font-size: 14px;
  padding-left: 16px;
  align-items: center;
  .name {
    width: 22px;
    height: 22px;
    vertical-align: bottom;
    margin-right: 8px;
  }
  input {
    height: 22px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>