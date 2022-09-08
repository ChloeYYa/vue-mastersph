import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'


Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  // 第一个形参：路由跳转的配置对象（query|params）
  // 第二个参数：undefined|箭头函数（成功的回调）
  // 第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    // push方法传递第二个参数|第三个参数（箭头函数）
    // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    // push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
  
}

let router= new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y:0};
  },
});

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userinfo.name
  next()
  用户登录了
  if (token) {
    //已经登录而且还想去登录------不行
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      if (name) {
        next();
      } else {
        try {
          await store.dispatch("getUserinfo");
          next();
        } catch (error) {
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  }
  else {
    let toPath = to.path
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1) { next("/login?redirect=" + toPath) }
    else {
      next()
    }  
  } 
})

export default router;

