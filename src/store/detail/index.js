import { reqGoodsInfo, reqSkuNum } from "@/api"
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodsInfo: {},
  //游客临时身份
   uuid_token:getUUID()
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
};
const actions = {
  async getGoodsInfo({commit},skuId) {
    let res = await reqGoodsInfo(skuId); //一定要传参，否则仓库中没有数据
    // console.log(res.data);
    if (res.code == 200) {
      commit('GETGOODSINFO',res.data)
    }
  },
  //加入购物车的||修改某一个产品的个数
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqSkuNum(skuId, skuNum)
    if (result.code == 200) {
      return "OK";
    }
    //返回的是失败的标记
    else {
      return Promise.reject(new Error("faile"));
    }
  }

 }
const getters = {
  categoryView(state) {
    // goodsInfo:{} 一开始是空对象，返回的categoryView的属性值是undefined，所以应该在后面加一个{}
    return state.goodsInfo.categoryView || {};
  },
  // goodsInfo 下的 skuInfo
  skuInfo(state) {
    return state.goodsInfo.skuInfo;
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
