/* eslint-disable */
/* 上面是取消git commit时eslint报错的方法之一 */
const path = require("path");
module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        const dir = path.resolve(__dirname, "src/assets/icon-svg");
        config.module
            .rule("svg-sprite")
            .test(/\.svg$/)
            .include.add(dir)
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({ extract: false })
            .end()
            .use("svgo-loader")
            .loader("svgo-loader")
            .tap(options => ({
                ...options,
                plugins: [{ removeAttrs: { attrs: "fill" } }] //删除svg中的fill属性
            }));
        config
            .plugin("svg-sprite")
            .use(require("svg-sprite-loader/plugin.js"), [
                { plainSprite: true }
            ]);
        config.module.rule("svg").exclude.add(dir);
    }
};
