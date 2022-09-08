import Mock from 'mockjs'
// webpack默认对外暴露的：图片、JSON数据格式
import categoryList from './categoryList.json'
import banner from './banner.json'
import floor from './floor.json'
import list from './searchInfo.json'
import detail from './detail.json'

// mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock('/mock/categoryList', { status: 200, data: categoryList })
Mock.mock("/mock/banner", { status: 200, data: banner });
Mock.mock('/mock/floor', { status: 200, data: floor });
Mock.mock('/mock/list', { status: 200, data: list })
Mock.mock('/mock/detail', { status: 200,data: detail });
