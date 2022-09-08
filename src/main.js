import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入三级联动组件，将其注册为全局组件，之后在其他组件不用再次引入。
import TypeNav from './components/TypeNav/Index.vue'
// 引入Carsousel组件，再将其注册为全局组件
import Carsousel from "./components/Carousel";
// 
import Pagination from './components/Pagination'
//引入插件
import VueLazyload from 'vue-lazyload';

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api';

// 引入mockServe.js文件
import '@/mock/mockServer'
//引入swiper样式
import "swiper/css/swiper.css"

// 引入ElementUI
import { Button, MessageBox } from "element-ui";
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;


// import atm from "@/assets/1.gif";
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:"@/assets/logo.png"
});

// 引入表单校验插件
import "@/plugins/validate";



import { reqSearchInfo } from "@/api";
console.log(reqSearchInfo({}));

// 注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 将Carsousel注册为全局组件
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),

  //全局事件总线$bus配置（seacrh 与 header兄弟组件通信）
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
}).$mount("#app");
