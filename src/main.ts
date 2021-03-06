import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "@/store/index";
import Nav from "@/components/Nav.vue"; //引入Nav导航栏
import Layout from "@/components/Layout.vue"; //把导航栏的共同部分抽离
import Icon from "@/components/Icon.vue"; //把svg部分抽离
Vue.config.productionTip = false;

Vue.component("Nav", Nav); //全局引入组件，这样其他视图就不需要一个个引入
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
// document.documentElement.scrollTop = document.documentElement.scrollHeight;
// window.alert(document.documentElement.scrollTop);
// document.documentElement.scrollTo(0,document.documentElement.scrollHeight)