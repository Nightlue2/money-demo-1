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
    defaultTags:["餐饮","交通","购物","电影","外卖","健身","水费","电费","旅游","日用品","数码","医疗","转账"]
  } as RootState,
  mutations: {
    // setCurrentTag(state, id: string) {
    //   state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    // },
    createTag(state, name: string) {
      console.log(name);
      if (state.tagList.indexOf(name) >= 0) {
        return window.alert("标签名重复");
      }
      if(name.split('').indexOf(' ')>=0){
        return window.alert('标签名不能含有空格');
      }
      if(state.tagList.length>33){
        return window.alert('最多添加20个标签');
      }
    //   const id = createId().toString();
      state.tagList.push(name);
      store.commit("saveTags");
      alert("添加成功");
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList')||'["餐饮","交通","购物","电影","外卖","健身","水费","电费","旅游","日用品","数码","医疗","转账"]');
    },
    updateShowTagList(state, arr) {
      const temp: { [x: string]: any } = {}; //ts对象包含属性的声明方法
      state.showTagList.forEach((x) => (temp[x] = x));
      arr.forEach((x: string) => (temp[x] = x));
      state.showTagList = Object.keys(temp);
    },
    // updateTag(state, payload: { id: string; name: string }) {
    //   const { id, name } = payload;
    //   const idList = state.tagList.map((item) => item.id);
    //   if (idList.indexOf(id) >= 0) {
    //     const names = state.tagList.map((item) => item.name);
    //     if (names.indexOf(name) >= 0) {
    //       alert("标签名重复");
    //     } else {
    //       const tag = state.tagList.filter((item) => item.id === id)[0];
    //       tag.name = name;
    //       store.commit("saveTags");
    //     }
    //   }
    // },
    // removeTag(state, id: string) {
    //   let index = -1;
    //   for (let i = 0; i < state.tagList.length; i++) {
    //     if (state.tagList[i].id === id) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   if (index >= 0) {
    //     state.tagList.splice(index, 1);
    //     store.commit("saveTags");
    //     router.back();
    //   } else {
    //     alert("删除失败");
    //   }
    // },
    saveTags(state) {
      localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
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
