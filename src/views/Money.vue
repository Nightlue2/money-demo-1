<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :value.sync="record.type" :data-source="recordTypeList" />
    <!-- :value和@update:value可以合并成.sync -->
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/FormItem.vue";
import Tags from "@/components/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  //ts语法
  components: { Tags, NumberPad, FormItem, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
  background-color: #f5f5f5;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>
