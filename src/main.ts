import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue"; //引入Nav导航栏
import Layout from "@/components/Layout.vue"; //把导航栏的共同部分抽离

Vue.config.productionTip = false;

Vue.component("Nav", Nav); //全局引入组件，这样其他视图就不需要一个个引入
Vue.component("Layout", Layout);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
