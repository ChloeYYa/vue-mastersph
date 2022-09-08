<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo', pageNo-1)">上一页</button>

    <button v-if="startNumAndEndNum.start>1"  @click="$emit('getPageNo',1)"  :class="{ active: pageNo == 1 }">1</button>

    <button v-if="startNumAndEndNum.start>2">···</button>




    <!-- 中间部分 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{ active: pageNo==page}">{{page}}</button>




    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" :class="{active:pageNo==totalPage}" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      // 计算总页数
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是5]
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      // 不正常现象【总页数没有连续页码多】
      // 已经条件: total=【10】  pageSize =【3】continues 5  math.ceil(totalPage=10/3)=4页 页码：1(start),2,3,4(end)
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      }
      // 正常现象【总页数大于连续页码】
      // 已经条件: total=【90】  pageSize =【3】 continues=7  总共有：math.ceil(totalPage=90/3)=30页，当前页pageNo:8，页码：5(start),6,7,8(pagNo),9,10,11(end)
      else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);

        //把出现不正常的现象【start数字出现0|负数】纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //把出现不正常的现象[end数字大于总页码]纠正
        // 已经条件: total=【30】  pageSize =【3】 continues=7  totalPage=math.ceil(totalPage=30/3)=10页，当前页pageNo:8，页码：4(start),5,6,7,8(pagNo),9,10(end)
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
    //
  }
};
</script>

<style lang="less" scoped>
.pagination button {
  width: 48px;
  height: 28px;
  margin-right: 20px;
  border: 0;
}
.pagination .active{
  background-color: skyblue;
}
* {
  text-align: center;
}
</style>
