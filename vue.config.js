/* eslint-disable */
/* 上面是取消git commit时eslint报错的方法之一 */
const path = require("path");
module.exports = {
  publicPath:process.env.NODE_ENV === 'production' ? '/XCMoney/' : '/',
  lintOnSave: false,
  chainWebpack: (config) => {
    const icon1 = path.resolve(__dirname, "src/assets/icon-svg");
    const label = path.resolve(__dirname, "src/assets/label-svg");
    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(icon1)
      .add(label)
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ extract: false })
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .tap((options) => ({
        ...options,
        plugins: [{ removeAttrs: { attrs: "fill" } }], //删除svg中的fill属性
      }));
    config
      .plugin("svg-sprite")
      .use(require("svg-sprite-loader/plugin.js"), [{ plainSprite: true }]);
    config.module
      .rule("svg")
      .exclude.add(label)
      .add(icon1);
  },
};
