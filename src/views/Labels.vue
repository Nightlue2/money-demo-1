<template>
  <div class="labelWrapper">
    <div class="navBar">
      <Icon name="back" class="leftIcon" @click.native="goBack"/>
      <span class="title">选择标签</span>
      <button
        class="default"
        :class="{ rightIcon: finish !== '' }"
      >
      </button>
    </div>
    <div class="labelList">
      <div
        class="label"
        v-for="item in tags"
        :key="item.tagName"
        :class="{ selected: selectedTags.indexOf(item.tagName) >= 0 }"
        @click="toggle(item)"
      >
        <Icon :name="item.iconName" class="littleLabel" id="selected"/><span
          class="labelNote"
          >{{ item.tagName }}</span>
      </div>
      <button class="label" @click="randomCreateTag()">
        <Icon name="添加" class="littleLabel"/>
        <span class="labelNote">添加</span>
      </button>
    </div>
    <div class="buttonList" v-show="selectedTags.length" @click="showTag">
      <button class="showTag">展示</button>
    </div>
  </div>

  <!-- <div class="tags">
       <router-link
        class="tag"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tags"
        :key="tag.id"
      >
        <span>{{ tag.name }}</span>
        <Icon name="guide" />
      </router-link> -->
  <!-- </div> -->
  <!-- <div class="createTag-wrapper">
      <Button class="createTag" >新增标签</Button>
    </div> -->
</template>

<script lang="ts">
import Vue from "vue";
import { Component,Watch } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: { Button, Tabs },
})
export default class Labels extends mixins(TagHelper) {
  get tags(){
    return this.$store.state.tagList
  }
  selectedTags: string[] = [];
  defaultTags = this.$store.state.defaultTags;//这个变量不会动态绑定
  preparedTags = ['a0','a1','a2','a3','a4','a5','a6','a7','a8']
  get finish() {
    if (this.selectedTags.length) {
      return "完成";
    } else {
      return "";
    }
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  destroyed(){
    this.$store.commit('saveTags');
  }
  goBack() {
    this.$router.back();
  }
  randomCreateTag(){
    this.createTag(this.preparedTags[Math.floor(Math.random()*9)]);
    this.$store.commit("fetchTags");
  }
  toggle(tag: Tag) {
    const index = this.selectedTags.indexOf(tag.tagName);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag.tagName);
    }
  }
  showTag() {
    this.$store.commit("updateShowTagList", this.selectedTags);
    this.selectedTags = [];
    this.$store.commit('fetchTags');
  }

  // select($event: MouseEvent) {
  //   if ($event.target) {
  //     if ($event.target.children) {
  //       console.log($event.target.children[0]);
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
// .tags {
//   background: white;
//   font-size: 16px;
//   padding-left: 16px;
//   width: 100%;
//   flex: 1;
//   > .tag {
//     min-height: 44px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 1px solid #e6e6e6;
//   }
// }
// .createTag {
//   background: #767676;
//   color: white;
//   border-radius: 4px;
//   border: none;
//   height: 40px;
//   padding: 0 16px;
//   &-wrapper {
//     text-align: center;
//     padding: 16px;
//     margin-top: 44-16px;
//   }
// }
.navBar {
  text-align: center;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:#ffbd42;
  color: #000;
  .title {
    vertical-align: baseline;
  }
  > .leftIcon {
    width: 40px;
    height: 24px;
    &:hover{
      cursor: pointer;
    }
  }
  > .default {
    width: 40px;
    height: 24px;
  }
  > .rightIcon {
    color: #fff;
    font-size: 15px;
    &:hover {
      cursor: pointer;
      background-color: rgb(156, 152, 144);
    }
  }
}
.labelList {
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  padding: 25px 14px 0px;
  align-content: flex-start;
  > .label {
    &:visited {
      background-color: transparent;
      outline: none;
      border: none;
    }
    &:hover {
      cursor: pointer;
    }
    width: 25%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
    font-size:30px;
    > .labelNote {
      font-size: 12px;
      margin-top: 5px;
      color:#767676;
    }
  }
}
.selected {
  > #selected {
    background-color: $color-theme;
  }
}
.buttonList{
    display:flex;
    justify-content: center;
    align-items: center;
    background:$color-theme;
}

@media (min-width:500px){
  .labelWrapper{
    height:100vh;
    display:flex;
    flex-flow:column nowrap;
  }
  .navBar{
    font-size: 24px;
    padding:21px 16px;
  }
  .labelList{
    height:88%;
    > .label{
      > .labelNote{
        font-size: 18px;
      }
    }
  }
  .buttonList{
    min-height:1%;
    font-size:22px;
    padding:6px 0;
    flex-grow: 1;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    &:hover{
      cursor: pointer;
    }
  }

}
@media (max-width:500px){
  .labelWrapper {
  height: 100vh;
  display:flex;
  flex-flow:column nowrap;
  }
  .navBar{
    height: 9%;
    font-size:20px;
    width:100%;
  }
  .labelList{
    height:84%;
    padding:5px 16px;
    flex-grow:0;
    overflow-y:scroll;
    
  }
  .buttonList{
    flex-grow: 1;
    border-radius:2px;
    padding:2px 0;
    font-size:18px;
  }
}
::v-deep {
  .navBar > .leftIcon {
    fill: #000;
  }
  @media(min-width:500px){
    .label > .littleLabel {
      width: 56px;
      height: 56px;
      padding: 6px;
      font-size: 36px;
      vertical-align: middle;
      border-radius: 20%;
      background-color: #ededed;
    }
}
  
  @media(max-width:500px){
    .label > .littleLabel {
      width: 48px;
      height: 48px;
      padding: 6px;
      font-size: 34px;
      vertical-align: middle;
      border-radius: 20%;
      background-color: #ededed;
    }
  }
}
  

</style>
