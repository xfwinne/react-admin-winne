const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // 按需打包antd引入组件及其相关css样式
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 自定义主题，覆盖antd源码中的less变量
  addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }),
);