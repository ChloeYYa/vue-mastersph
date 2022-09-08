import { reqCartList, reqIsChecked, reqDeleteCartList } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    // console.log(result);
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //切换某一商品选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqIsChecked(skuId, isChecked);
    if (result.code === 200) {
      return "OK";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //全选按钮控制产品的全选状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    // console.log(context);
    //数组
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      // 把派发的数据重新添加到数组中
      promiseAll.push(promise);
    });
    // 最终返回结果
    return Promise.all(promiseAll);
  },
  // 删除某一件商品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartList(skuId);
    if (result.code === 200) {
      return "OK";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 删除选中的所有商品
  deleteAllCheckedCart({ dispatch, getters }) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = (item.isChecked = 1
        ? dispatch("deleteCartListBySkuId", item.skuId)
        : "");
      promiseAll.push(promise);
    })
    return Promise.all(promiseAll) 
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
