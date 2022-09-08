const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //处理map文件，打包上线时不保存map文件，文件体积变小很多
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn/",
      },
    },
  },
});
