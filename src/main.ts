import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue"; //引入Nav导航栏
import Layout from "@/components/Layout.vue"; //把导航栏的共同部分抽离
import Icon from "@/components/Icon.vue"; //把svg部分抽离
import tagListModel from "@/models/tagListModel";
Vue.config.productionTip = false;

Vue.component("Nav", Nav); //全局引入组件，这样其他视图就不需要一个个引入
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);

window.tagList = tagListModel.fetch();
window.createTag = (name) => {
  const message = tagListModel.create(name);
  if (message === "duplicated") {
    alert("标签名重复");
  } else if (message === "success") {
    alert("添加成功");
  }
};
window.findTag = (id: string) => {
  return window.tagList.filter((t) => t.id === id)[0];
};
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
