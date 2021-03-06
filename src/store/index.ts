import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import router from "@/router";
import createId from "@/lib/createId";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    showTagList: [],
    defaultTags:[{"iconName":"餐饮","tagName":"餐饮"},{"iconName":"交通","tagName":"交通"},{"iconName":"购物","tagName":"购物"},{"iconName":"电影","tagName":"电影"},{"iconName":"外卖","tagName":"外卖"},{"iconName":"健身","tagName":"健身"},{"iconName":"水费","tagName":"水费"},{"iconName":"电费","tagName":"电费"},{"iconName":"旅游","tagName":"旅游"},{"iconName":"日用品","tagName":"日用品"},{"iconName":"数码","tagName":"数码"},{"iconName":"医疗","tagName":"医疗"},{"iconName":"转账","tagName":"转账"},{"iconName":"休闲","tagName":"休闲"},{"iconName":"话费","tagName":"话费"},{"iconName":"公益","tagName":"公益"},{"iconName":"投资","tagName":"投资"},{"iconName":"红包","tagName":"红包"},{"iconName":"工资","tagName":"工资"}]
  } as RootState,
  mutations: {
    createTag(state: RootState, tagObj: {tagName: string;tagId: string}) {
      if ((state.tagList.map(x=>x.tagName).indexOf(tagObj.tagName) !==-1) || (state.showTagList.map(x=>x.tagName).indexOf(tagObj.tagName) !==-1)) {
        return window.alert("标签名重复");
      }
      if(tagObj.tagName.split('').indexOf(' ')>=0){
        return window.alert('标签名不能含有空格');
      }
      if(state.tagList.length>33){
        return window.alert('最多添加20个标签');
      }
      if(tagObj.tagName.length>6){
        return window.alert("长度不能超过6个字");
      }
      state.tagList.push({"iconName":tagObj.tagId,"tagName":tagObj.tagName});
      store.commit("saveTags");
      alert("添加成功");
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList')||JSON.stringify(state.defaultTags));
    },
    fetchShowTags(state){
      state.showTagList = JSON.parse(localStorage.getItem('showTagList') || '[]');
    },
    fillInShowTags(state){
      for(let i=0;i<8;i++){
        state.showTagList.push(state.tagList.shift()!)
      }
    },
    updateShowTagList(state, arr: string[]) {
      //const temp: { [x: string]: any } = {}; ts对象包含属性的声明方法
      const temp = state.tagList.filter(x=>arr.indexOf(x.tagName)!==-1);
      temp.forEach(x=>state.tagList.splice(state.tagList.indexOf(x),1) && state.showTagList.push(x))
      store.commit('saveTags');
      store.commit('saveShowTags');
    },
    saveTags(state) {
      localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    saveShowTags(state){
      localStorage.setItem('showTagList',JSON.stringify(state.showTagList));
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);//传过来的是一个对象
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    saveRecords(state) {
      localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
  },
});
export default store;
