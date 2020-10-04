<template>
  <div class="labelWrapper">
    <div class="navBar">
      <Icon name="back" class="leftIcon" @click.native="goBack"></Icon>
      <span class="title">{{ tip }}</span>
      <button class="default" :class="{ rightIcon: finish !== '' }">
        {{ finish }}
      </button>
    </div>
    <div class="labelList">
      <button
        class="label"
        v-for="tagName in tags"
        :key="tagName.index"
        :class="{ selected: selectedTags.indexOf(tagName) >= 0 }"
        @click="toggle(tagName)"
      >
        <Icon :name="tagName" class="littleLabel" id="selected" /><span
          class="labelNote"
          >{{ tagName }}</span
        >
      </button>
      <button class="label" @click="createTag">
        <Icon name="添加" class="littleLabel" />
        <span class="labelNote">添加</span>
      </button>
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
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: { Button, Tabs },
})
export default class Labels extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tags() {
    //computed写法
    return this.$store.state.tagList;
  }
  get tip() {
    if (this.selectedTags.length) {
      return "提交以展示";
    } else {
      return "选择至少一项";
    }
  }
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
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
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
.labelWrapper {
  height: 100vh;
}
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  width: 100%;
  flex: 1;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
.labelList {
  display: flex;
  flex-grow: 1;
  width: 100%;
  flex-flow: row wrap;
  padding: 25px 14px 0px;
  > .label {
    &:visited {
      background-color: transparent;
      outline: none;
      border: none;
    }

    width: 25%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
    cursor: pointer;
    > .labelNote {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.selected {
  > #selected {
    background-color: $color-theme;
  }
}
.navBar {
  text-align: center;
  font-size: 22px;
  padding: 14px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffae12;
  color: #000;
  > .leftIcon {
    width: 40px;
    height: 24px;
  }
  > .default {
    width: 40px;
    height: 24px;
  }
  > .rightIcon {
    color: red;
    font-size: 14px;
  }
}
::v-deep {
  .navBar > .leftIcon {
    fill: #000;
  }
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
</style>
