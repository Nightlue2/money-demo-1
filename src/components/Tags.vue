<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in showTagList"
        :key="tag.tagName"
        @click="toggle(tag.tagName)"
        :class="{ selected: selectedTags.indexOf(tag.tagName) >= 0 }"
      >
        <Icon :name="tag.iconName" class="icon"><span class="note">{{ tag.tagName }}</span></Icon>
      </li>
      <li>
        <router-link to="/labels" active-class="selected"><Icon name="设置" class="setting" ><span class="note">设置标签</span></Icon>
        </router-link>
      </li>      
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import Icon from '@/components/Icon.vue';
@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];
  get showTagList() {
    return this.$store.state.showTagList;
  }
  get tagList(){
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchShowTags");
    this.$store.commit('fetchTags');
  }
  mounted(){
    if (this.showTagList.length===0){
      this.$store.commit("fillInShowTags");
      this.$store.commit("saveTags");
      this.$store.commit("saveShowTags");
    }
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
@import "~@/assets/style/helper.scss";
@media(min-width:500px){
  .tags{
    > .current{

      > li{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color:$color-icon-bg;

        font-size:42px;
        padding:10px 20px;
        padding-top:25%;
      }
    }
    
  }
}
@media(max-width: 500px){
  
}
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  // display: flex;
  // flex-direction: row;
  background-color: white;
  > .current {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content:space-between;
    .setting{
      width:20px;
      height:20px;
    }
    > li {
      // $bg-c: #d9d9d9;
      // background: $bg-c;
      // $height: 24px;
      // height: $height;
      // line-height: $height; //用于居中，但之后可能不止一行标签
      // border-radius: $height/2;
      width:25%;
      // padding: 16px;
      &.selected {
        background-color: $color-theme;
        color: lighten(#333, 90);
      }
    }
  }
}
</style>
