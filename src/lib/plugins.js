// 导入Vue
import Vue from 'vue';
// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
// use一下
Vue.use(VueLazyload, {
  // 失败图片
  error: require('../assets/img/error.gif'),
  // 成功图片 没有正常加载 vue模块化开发中 图片也是资源 需要 引入
  loading: require('../assets/img/loadbaby.gif'),
  // 
  // attempt: 1
})

// 二维码生成插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

// axios
// 全局导入 axios vue-axios
// vue-resource时 this.$http.xxx
// axios axios.xxx
import axios from "axios";
// 把axios 放到构造函数中 所有的vue实例都可以使用
// Vue组件也是一个Vue实例
Vue.prototype.$axios = axios;
// 设置基础地址 一般来说一个项目不会访问多个服务器的接口 可以抽取基础地址
// Vue.prototype.$baseUrl = 'http://111.230.232.110:8899';
// 直接使用axios来设置基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';
// 设置axios跨域请求携带cookie
// 跨域是否携带凭证
axios.defaults.withCredentials = true;

// 把axios暴露出去
// 为了在外部 可以不通过Vue.prototype访问
export default axios;


// jq
// 把jq导入到main.js中 挂载到原型里面
import $ from 'jquery';
Vue.prototype.$$ = $;

// 图片放大镜功能
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)