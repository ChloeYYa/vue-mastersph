import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Login from "@/views/Login"
import Register from "@/views/Register"
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
import PaySuccess from "@/views/PaySuccess"
import Center from "@/views/Center"
import MyOrder from "@/views/Center/MyOrder"
import GroupOrder from "@/views/Center/GroupOrder"

// 路由懒加载：等需要用到该组件时，才开始加载，解决性能优化问题
export default [
  { path: "/", redirect: "/home" },
  { path: "/home", component: () => import("@/views/Home") },
  {
    path: "/search/:keyword?",
    component: () => import("@/views/Search"),
    name: "Search",
  },
  {
    path: "/detail/:skuid",
    component: () => import("@/views/Detail"),
    name: "Detail",
    meta: { isShow: true },
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    name: "addcartsuccess",
    beforeEnter(to, from, next) {
      // 得到当前路由信息对象
      // const route = router.currentRoute  // route就是from

      // 得到要跳转到目路由的query参数
      const skuNum = to.query.skuNum;
      // 读取保存的数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem("SKU_INFO_KEY"));
      console.log("---", skuNum, skuInfo);
      // 只有都存在, 才放行
      if (skuNum && skuInfo) {
        next();
      } else {
        // 在组件对象创建前强制跳转到首页
        next("/");
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { isShow: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { isShow: true },
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcar") {
        next();
      } else {
        next("/shopcar");
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    // 路由独享导航守卫
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { isShow: true },
  },
  {
    path: "/center",
    component: Center,
    children: [
      { path: "myorder", component: MyOrder },
      { path: "grouporder", component: GroupOrder },
      { path: "/center", redirect: "myorder" },
    ],
  },
];

 
 
 
 

  









