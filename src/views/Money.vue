<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />

    <!-- :value和@update:value可以合并成.sync -->
    <div class="notes">
      <FormItem placeholder="在这里输入备注" @update:value="onUpdateNotes" />
    </div>
    <Tags class="overflow" />
    <Tabs
      :value.sync="type"
      :data-source="recordTypeList"
      :distance.sync="distance"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/FormItem.vue";
import Tags from "@/components/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  //ts语法
  components: { Tags, NumberPad, FormItem, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    //从store里获取recordList
    return this.$store.state.recordList;
  }
  distance = 0;
  h = document.body.clientHeight / 2;
  type = "-";
  record: RecordItem = {
    tags: [],
    notes: "",
    type: this.type,
    amount: 0,
  };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
  @Watch("type")
  onTypeChange(newVal: string, oldVal: string) {
    let newIndex = 0,
      oldIndex = 0;
    for (let i = 0; i < recordTypeList.length; i++) {
      if (recordTypeList[i].value === newVal) {
        newIndex = recordTypeList[i].index;
        continue;
      }
      if (recordTypeList[i].value === oldVal) {
        oldIndex = recordTypeList[i].index;
        continue;
      }
    }
    this.distance = this.distance + 100 * (newIndex - oldIndex);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
  background-color: #f5f5f5;
}
::v-deep .overflow {
  overflow: scroll-y;
}
</style>
