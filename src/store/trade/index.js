import { reqUserAddress, reqTradeList } from "@/api";
const state = {
  addressList: [],
  tradeInfo:{}
};
const mutations = {
  GETUSERADDRESS(state, addressList) {
    state.addressList = addressList;
  },
  // 商品清单
  GETTRADEINFO(state, tradeInfo) {
    state.tradeInfo=tradeInfo 
  },
  // 
};
const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let res = await reqUserAddress();
    if (res.code == 200) {
      commit("GETUSERADDRESS", res.data);
    }
  },
  //获取商品清单
  async getTradeInfo({ commit }) {
    let res = await reqTradeList();
    console.log(res)
    if (res.code == 200) commit("GETTRADEINFO", res.data);
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}
