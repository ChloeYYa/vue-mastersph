module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭驼峰命名法
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': [
      'error',
      {varsIgnorePattern:'.*',args:'none'}
    ]
  }
}
