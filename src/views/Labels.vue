<template>
  <Layout>
    <Tabs
      :value.sync="type"
      :data-source="recordTypeList"
      :distance.sync="distance"
    />
    <div class="tags">
      <!-- <router-link
        class="tag"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tags"
        :key="tag.id"
      >
        <span>{{ tag.name }}</span>
        <Icon name="guide" />
      </router-link> -->
    </div>
    <!-- <div class="createTag-wrapper">
      <Button class="createTag" >新增标签</Button>
    </div> -->
    <div class="labelList">
      <!-- <button class="label" @click="select($event)">
        <Icon name="餐饮" class="littleLabel"></Icon
        ><span class="labelNote">餐饮</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="交通" class="littleLabel"></Icon
        ><span class="labelNote">交通</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="购物" class="littleLabel"></Icon
        ><span class="labelNote">购物</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="电影" class="littleLabel"></Icon
        ><span class="labelNote">电影</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="外卖" class="littleLabel"></Icon
        ><span class="labelNote">外卖</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="健身" class="littleLabel"></Icon
        ><span class="labelNote">健身</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="水费" class="littleLabel"></Icon
        ><span class="labelNote">水费</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="电费" class="littleLabel"></Icon
        ><span class="labelNote">电费</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="旅游" class="littleLabel"></Icon
        ><span class="labelNote">旅游</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="日用品" class="littleLabel"></Icon
        ><span class="labelNote">日用品</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="数码" class="littleLabel"></Icon
        ><span class="labelNote">数码</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="医疗" class="littleLabel"></Icon
        ><span class="labelNote">医疗</span>
      </button>
      <button class="label" @click="select($event)">
        <Icon name="转账" class="littleLabel"></Icon
        ><span class="labelNote">转账</span>
      </button> -->
      <button class="label" v-for="item in tags" :key="item.id">
        <Icon :name="item.name" class="littleLabel" /><span class="labelNote">{{
          item.name
        }}</span>
      </button>
      <button class="label" @click="createTag">
        <Icon name="添加" class="littleLabel" />
        <span class="labelNote">添加</span>
      </button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  components: { Button, Tabs },
})
export default class Labels extends mixins(TagHelper) {
  recordTypeList = recordTypeList;
  type = "-";
  record: RecordItem = {
    tags: [],
    notes: "",
    type: this.type,
    amount: 0,
  };
  distance = 0;
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  // select($event: MouseEvent) {
  //   if ($event.target) {
  //     if ($event.target.children) {
  //       console.log($event.target.children[0]);
  //     }
  //   }
  // }
  @Watch("type", { deep: true })
  onTypeChange(newVal: string, oldVal: string) {
    let newIndex = 0,
      oldIndex = 0;
    for (let i = 0; i < recordTypeList.length; i++) {
      if (recordTypeList[i].value === newVal) {
        newIndex = recordTypeList[i].index;
        console.log(newIndex);
        continue;
      }
      if (recordTypeList[i].value === oldVal) {
        oldIndex = recordTypeList[i].index;
        console.log(oldIndex);
        continue;
      }
    }
    this.distance = this.distance + 100 * (newIndex - oldIndex);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
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
  width: 100%;
  flex-flow: row wrap;
  padding: 25px 14px 0px;
  > .label {
    @extend %noButton;
    width: 25%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding-top: 15px;

    > .labelNote {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
::v-deep {
  .label > .littleLabel {
    width: 36px;
    height: 36px;
    padding: 3px;
    font-size: 34px;
    vertical-align: middle;
    border-radius: 20%;
    background-color: #ededed;
  }
}
</style>
