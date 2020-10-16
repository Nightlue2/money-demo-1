<template>
  <Layout class="content">
    <Tabs class="tab-wrapper"
      :data-source="recordTypeList"
      @update:type="onUpdateTypes"
    />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <div class="list-wrapper">
      <ol v-if="groupedList.length>0" >
        <li v-for="(group, index) in groupedList" :key="index" >
          <h3 class="title">
            {{ beautify(group.title) }} 
            <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span class="label">{{ tagString(item.tags) }}</span>
              <span class="notes">
                {{ item.notes }}
              </span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div class='no-content' v-else>当前类型无记录</div>
    </div>
    
    
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component,Watch} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import Chart from "@/components/Chart.vue";
import clone from "@/lib/clone";
import _ from "lodash";
@Component({
  components: { Tabs,Chart},
})
export default class Statistics extends Vue {
  type = "-";
  recordTypeList = recordTypeList;
  onUpdateTypes(type: string){
    this.type = type;
  }
  mounted(){
    const chart = this.$refs.chartWrapper as HTMLDivElement;
    chart.scrollLeft = chart.scrollWidth;
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.join("，");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get keyValueList() {
      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = dayjs(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r: RecordItem) => r.type === this.type)
    if(newList.length===0){
      return [];
    }
    newList.sort((a: RecordItem, b: RecordItem) =>
        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.forEach((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    result.forEach(item=>item["items"].reverse())
    return result;
  }
  get chartOptions(){
    const keys = this.keyValueList.map(item => item.key);
    const values = this.keyValueList.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#fdd087'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          },
          fontSize:12
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: '#ffb01f', borderColor: '#ffb01f'},
        data: values,
        type: 'line'
      }],
      tooltip: {
        show: true, triggerOn: 'click',
        backgroundColor:'#ffb01f',
        position: 'top',
        formatter: '{c}'
      }
    };
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .tab-wrapper{
    width:100%;
  }
  .chart-wrapper{
    width:100%;
  }
  .list-wrapper{
    flex-shrink: 1;
    width:100%;
  }
  @media(min-width:500px){
    .tab-wrapper{
      height: 84px;
    }
    .list-wrapper{
      height:calc(100vh - 84px - 280px - 71px - 5px);
    }
    .note{
      line-height: 24px;
    }
  }
  @media( max-width:500px){
    .tab-wrapper{
      height: 61px;
    }
    .list-wrapper{
      height:calc(100vh - 61px - 280px - 54px);
    }
    .note{
      line-height:25px;
    }
  }
  .content{
    display:flex;
    flex-flow:row wrap;
    justify-content: flex-start;
    align-content: flex-start;
    overflow:hidden;
  }
}
.no-content{
  text-align:center;
  margin:0 auto;
  flex-grow: 1;
}
.list-wrapper{
  overflow-y:auto;
  &::-webkit-scrollbar{
    display: none;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  display:inline-block;
  margin-right: auto;
  margin-left: 16px;
  color: rgb(78, 78, 78);
  white-space: nowrap;
}
.chart {
  width: 430%;
  display:inline-block;
  white-space: nowrap;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
