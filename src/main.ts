import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue"; //引入Nav导航栏
Vue.config.productionTip = false;

Vue.component("Nav", Nav); //全局引入组件，这样其他视图就不需要一个个引入
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
