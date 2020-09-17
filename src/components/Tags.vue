<template>
    <div class="tags">
      <div class="new">
        <button @click="create">新增标签</button>
      </div>
      <ul class="current">  
        <li v-for="tag in dataSource" :key="tag" @click="toggle(tag)" :class="{selected:selectedTags.indexOf(tag)>=0}">{{tag}}</li>
      </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
@Component
export default class Tags extends Vue{
  @Prop() readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string){
    const index = this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
  }
  create(){
    const tagName = prompt('新标签的名称是？');
    if(tagName === ''){
      alert('标签名不能为空');
    }else if(this.dataSource){
      this.$emit('update:dataSource',[...this.dataSource,tagName]);
    }
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
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg-c:#d9d9d9;
      background: $bg-c;
      $height: 24px;
      height: $height;
      line-height: $height; //用于居中，但之后可能不止一行标签
      border-radius: $height/2;
      padding: 0 16px;
      margin-right: 12px; //分离li标签
      margin-top:4px;
      &.selected{
        background-color: darken($bg-c,28);
        color:lighten(#333,90);
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none; //去除默认样式
      border-bottom: 1px solid; //不给颜色就默认为字体的颜色
      color: #999;
      padding: 0 4px;
    }
  }
}
</style>