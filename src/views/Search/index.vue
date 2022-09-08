<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 品牌目录 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字信息导航 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌信息 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!--平台的售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props" :key="index"> {{ attrValue.split(":")[1]}}<i  @click="removeAttrValue(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a href="#">综合<span v-show="isOne"><i v-if="isAsc">↑</i><i v-else="isDown">↓</i></span></a>
                </li >
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo"><i v-if="isAsc">↑</i><i v-else="isDown">↓</i></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转，需要带上参数，to前面要加冒号-->
                  <router-link :to="`/detail/${good.id}`">
                    <img :src="good.defaultImg"/>
                  </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中1111111111】"
                      >{{ good.title}}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>


          <!-- 分页 -->
          <Pagination  :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"  @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from '../../components/Pagination/index.vue'
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 3,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
    Pagination
  },
  beforeMount() {
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    // ES6 新语法：Object.assign 合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne(){
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo(){
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc(){
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDown(){
      return this.searchParams.order.indexOf("desc") != -1;
    },
    // 
   ...mapState({
    total:state => state.search.searchList.total
   })
    
  },

  // 监听组件实例身上的属性的属性值变化
  watch:{
    $route(newValue,oldValue){
      // 每一次发请求完毕，应该把相应的1、2、3级分类id置空，让他接受下一次相应的1、2、3级分类id。
      // 再次发起请求之前整理带给服务器的参数
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      // 再次发起Ajax请求
      this.getData()
      // 分类名字与关键字不用清理，因为每一次路由发生变化的时候，都会给他赋新值
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    }
  },
  //
  methods: {
    // 把请求封装为一个函数，使用的时候直接用。
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 搜索页面删除categoryNam面包屑导航
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "Search", params: this.$route.params });
      }
    },
    removeKeyword() {
      // 清空带给服务器的参数（搜索框出现的参数）
      this.searchParams.keyword = undefined;
      // 重新发起请求获取数据
      this.getData();
      //
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      // name 是路由路径中定义的name，注意大小写要与路由路径中保持一致。
      if (this.$route.query) {
        this.$router.push({ name: "Search", query: this.$route.query });
      }
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      //1:整理品牌字段的参数  "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getData();
    },
    //删除品牌的信息
    removeTrademark(){
      this.searchParams.trademark=undefined
      this.getData()
    },
     //收集平台属性地方回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      // console.log(attr, attrValue);
      //参数格式整理好
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      //if语句里面只有一行代码：可以省略大花括号
      if (this.searchParams.props.indexOf(props) == -1)this.searchParams.props.push(props);
      //再次发请求
      this.getData();
    },
    //删除平台售卖属性的属性值
    removeAttrValue(index){
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    // 
    changeOrder(flag){
      // 获取是综合还是价格
      let originOrder = this.searchParams.order
      // 获取初始的值
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1]

       //新的排序方式 
      let newOrder=""
     //判断的是多次点击的是不是同一个按钮
      if(flag == originFlag){
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      }
      else {
        //点击不是同一个按钮
        newOrder = `${flag}:${"desc"}`
      }
      //需要给order重新赋值
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    // 获取当前页的页码
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  //
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
