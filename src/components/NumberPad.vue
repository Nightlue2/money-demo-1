<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttonList">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">
        <Icon name="backspace" id="icon-backspace" />
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;

  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep {
  #icon-backspace {
    width: 34px;
    height: 34px;
    vertical-align: middle;
  }
}
@media(min-width:500px){
  .numberPad{
    .output{
          font-size: 34px;
      min-height: 48px;
    }
    .buttonList{
      > button{
        font-size: 22px;
        height: 85px;
        &.ok{
          height:85*2px;
        }
      }
    }
  }
}
@media(max-width:500px){
  .numberPad{
    .output{
      font-size:30px;
      min-height:40px;
    }
    .buttonList{
      > button{
        height: 60px;
        &.ok{
          height:60*2px;
        }
      }
    }
  }
}
.numberPad {
  .output {
    @extend %clearFix;

    font-family: Consolas, monospace;
    padding: 2px 16px;
    text-align: right;
    background-color: #fff;
  }
  .buttonList {
    @extend %clearFix; //相当于将该选择器复制到%x中
    > button {
      width: 25%;
      float: left;
      background: transparent;
      border: none;
      border-radius: 0;
      color: $color-number;
      &.ok {
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f8f3e7;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4%+4%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4%+9%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4%+13%);
      }
      &:nth-child(14) {
        background: darken($bg, 4%+17%);
      }
      &:nth-child(12) {
        // background: darken($bg, 4 * 6%);
        background-color: #ffb01f;
        filter: grayscale(40%);
      }
    }
  }
}
</style>