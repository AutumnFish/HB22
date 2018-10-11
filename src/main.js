// 全部的东西 丢到这里
import Vue from 'vue'
// 根组件
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 导入懒加载插件
import VueLazyload from 'vue-lazyload'
// use一下
Vue.use(VueLazyload, {
  // 失败图片
  error: require('./assets/img/error.gif'),
  // 成功图片 没有正常加载 vue模块化开发中 图片也是资源 需要 引入
  loading: require('./assets/img/loadbaby.gif'),
  // 
  // attempt: 1
})

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

// 导入样式
import './assets/statics/site/css/style.css';

// 路由相关
import VueRouter from 'vue-router';
// 导入index组件
import index from './components/index.vue';
// 导入detal组件
import detail from './components/detail.vue';



// use一下
Vue.use(VueRouter);

// 写规则
const routes = [
  // /根目录也对应到 index组件即可
  {
    path: '/',
    component: index


  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/detail/:goodId',
    component: detail
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false


// 导入 moment.js
import moment from "moment";
// 全局过滤器 在所有的组件中都可以使用
// value 就是你要过滤的值
// 参数1 是过滤的那个值，后面才是你要的参数
Vue.filter('beautifyTime', function (value, str, str2, str3) {
  //   console.log(str);
  //   console.log(str2);
  //   console.log(str3);
  // 处理value
  //   console.log(value);
  // 返回处理之后的value
  //   return '🐷🐷🐷🐷';
  // 格式化日期 使用moment.js来格式化
  return moment(value).format(`YYYY${str}MM${str2}DD${str3}`);
})


new Vue({
  // 用代码的方式告诉vue渲染什么东西 把App.vue 渲染出来
  render: h => h(App),
  // 挂在到Vue实例
  router
}).$mount('#app')