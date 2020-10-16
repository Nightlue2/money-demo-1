<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in showTagList"
        :key="tag.tagName"
        @click="toggle(tag.tagName)"
        :class="{ selected: selectedTags.indexOf(tag.tagName) >= 0 }"
      >
        <Icon :name="tag.iconName" class="icon"></Icon><span class="note">{{ tag.tagName }}</span>
      </li>
      <li>
        <router-link to="/labels" active-class="selected"><Icon name="设置" class="setting"/><span class="note">设置标签</span>
        </router-link>
      </li>      
    </ul>
  </div>
</template>

<script lang="ts">
import { Component} from "vue-property-decorator";
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
    this.$emit("update:tags", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@media(min-width:500px){
  .tags{
    display: flex;
    padding: 48px 26px 20px;
    > .current{
      > li{
        width:12%;
        background-color:$color-icon-bg;
        position: relative;
        font-size:42px;
        padding-top:12%;
        margin-left:35px;
        margin-right:35px;
        margin-bottom:48px;
        border-radius:7px;
        &:hover{
          cursor: pointer;
        }
        > .icon{
          position: absolute;
          margin:auto;
          left:0;
          top:0;
          right:0;
          bottom:0;
        }
        .setting{
          font-size: 36px;
          position:absolute;
          margin:auto;
          left:0;
          top:0;
          right:0;
          bottom:0;
        }
      }
      .note{
        width:100%;
        font-size:16px;
        position:absolute;
        left:50%;
        top:103%;
        transform: translateX(-50%);
        text-align: center;
      }
    }
    
  }
}
@media(max-width: 500px){
  $li-width:calc((100vw - 32vw - 50px) / 4);
  .tags{
    display: flex;
    padding:17px 25px 0;
    > .current{
      overflow-y:auto;
      overflow-x:hidden;
      > li{
        width:$li-width;
        background-color:$color-icon-bg;
        position: relative;
        font-size:34px;
        padding-top:$li-width;
        margin-left:4vw;
        margin-right:4vw;
        margin-bottom:9vw;
        border-radius:7px;
        > .icon{
          position: absolute;
          margin:auto;
          left:0;
          top:0;
          right:0;
          bottom:0;
        }
        .setting{
          font-size: 34px;
          position:absolute;
          margin:auto;
          left:0;
          top:0;
          right:0;
          bottom:0;
        }
      }
      .note{
        width:200%;
        font-size:12px;
        position:absolute;
        left:50%;
        top:104%;
        transform: translateX(-50%);
        text-align: center;
      }
    }
  }
}
.tags {
  font-size: 14px;
  flex-grow: 1;
  background-color: white;
  > .current {
    display: flex;
    flex-grow:1;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content:flex-start;
    > li {
      &.selected {
        background-color: $color-theme;
      }
    }
  }
}
</style>
