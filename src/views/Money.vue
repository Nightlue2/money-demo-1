<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />

    <!-- :value和@update:value可以合并成.sync -->
    <div class="notes">
      <FormItem placeholder="在这里输入备注" @update:value="onUpdateNotes" :date.sync="record.createdAt"/>
    </div>
    <Tags class="overflow" @update:tags="onUpdateTags" />
    <Tabs
      @update:type="onUpdateTypes"
      :data-source="recordTypeList"
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
import dayjs from 'dayjs';
@Component({
  //ts语法
  components: { Tags, NumberPad, FormItem, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    //从store里获取recordList
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt:dayjs().format("YYYY-MM-DD")
  };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTags(tags: string[]) {
    this.record.tags = [...this.record.tags, ...tags];
  }
  onUpdateTypes(type: string){
    this.record.type = type;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
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
  overflow:auto;
}
</style>
