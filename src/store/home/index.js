import { reqBannerList, reqCategoryList, reqFloorList } from '@/api'

// home模块的小仓库
const state = {
  // 三级联动数据
  categoryList: [],
  //轮播图
  bannerList: [],
  // floor
  floorList:[]
  // 

};

const mutations = {
  // 三级联动数据
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  //轮播图
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  //floor
  GETFLOORLIST(state, floorList) {
    state.floorList=floorList
  },
  //

  // 

  
};
const actions = {
  // 三级联动数据
  async getCategoryList({ commit }) {
    // 通过api中的接口函数调用，向服务器发送请求获取数据
    const res = await reqCategoryList();
    if (res.status === 200) {
      commit("GETCATEGORYLIST", res.data);
    }
  },
  // 轮播图
  async getBannerList({ commit }) {
    const res = await reqBannerList();
    if (res.status === 200) {
      commit("GETBANNERLIST", res.data);
    }
  },
  //floor
  async getFloorList({ commit }) {
    const res = await reqFloorList()
    if (res.status === 200) {
      commit('GETFLOORLIST',res.data);
    }
  }
  // 

  

};
// 
const getters = {};


export default {
  state,
  mutations,
  actions,
  getters
}
