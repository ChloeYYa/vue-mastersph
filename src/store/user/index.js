import {
  reqGetCode,
  reqGetUserInfo,
  reqUserRegister,
  reqLogin,
  reqLogout,
} from "@/api";
import { setToken,getToken, removeToken } from "@/utils/token";

const state = {
  code: "",
  token: getToken(),
  userinfo:{}

}
const mutations = {
  // 验证码
  GETCODE(state, code) {
    state.code = code;
  },
  // 登录
  USERLOGIN(state, token) {
    state.token = token;
  },
  // 用户信息
  GETUSERINFO(state, userinfo) {
    state.userinfo = userinfo;
  },
  // 退出登录，清除本地保存的信息
  CLEAR() {
    state.token = '',
    state.userinfo = {},
    removeToken()
  }
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let res = await reqGetCode(phone)
    console.log(res);
    if(res.code == 200){
      commit("GETCODE", res.data)
      return "OK"
    } else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({commit},user) {
    let res = await reqUserRegister(user)
    if (res.code == 200) {
      return "OK"
    }
    else {
      return Promise.reject(new Error("faile"))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let res = await reqLogin(data)
    if (res.code == 200) {
      // 用户成功登录，并且获取到token
      commit("USERLOGIN", res.data.token)
      // 持久化存储token(调用utils下的token.js文件中的存储token的函数)
      setToken(res.data.token)
      return "ok"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息，信息中携带token
  async getUserInfo({commit}) {
    let res = await reqGetUserInfo();
    // console.log(res)
    if (res.code == 200) {
      commit("GETUSERINFO",res.data)
      return "OK"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    let res = await reqLogout()
    if (res.code == 200) {
      commit("CLEAR")
      return "OK"
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}