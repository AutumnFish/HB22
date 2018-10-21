// 暴露出去
module.exports = {
    // 如何修改webpack的配置
    configureWebpack: {
        //   plugins: [
        //     new MyAwesomeWebpackPlugin()
        //   ]
        // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
        /**
         * 配置之后 当webpack打包时检测到这些包 不会去node_modules中查找 对应的js文件合并 直接选择忽略
         *  */ 
        externals:{
            // jquery使用cdn
            // 左边的名字是 import xx from '包名'  包名
            // 右边的名字是 xx 建议使用平时使用的名字即可
            'jquery':'$',
            // axios使用cdn
            'axios':'axios',
            // element-ui
            // vue
            // vuerouter
        }
    }
}