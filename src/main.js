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

// 图片放大镜功能
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 导入样式
import './assets/statics/site/css/style.css';

// 路由相关
import VueRouter from 'vue-router';
// 导入index组件
import index from './components/index.vue';
// 导入detal组件
import detail from './components/detail.vue';
// 导入购物车组件
import shopcart from './components/shopcart.vue';



// use一下
Vue.use(VueRouter);

// 写规则
const routes = [
  // /根目录也对应到 index组件即可
  {
    path: '/',
    component: index


  },
  // 首页
  {
    path: '/index',
    component: index
  },
  // 详情页
  {
    path: '/detail/:goodId',
    component: detail
  },
  // 购物车
  {
    path:'/shopcart',
    component:shopcart
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
// 过滤器2 格式化日期
Vue.filter('beautifyTimePro', function (value, formatStr) {
  // 格式化字符串
  // 格式化日期 使用moment.js来格式化
  return moment(value).format(formatStr);
})


// Vuex 数据共享
import Vuex from 'vuex'
Vue.use(Vuex)

// 实例化数据仓库
const store = new Vuex.Store({
  // 数据 设置到 state的属性中
  state: {
    // count: 0 复制出来的数据 测试用
    // 自己的购物车数据{id:购买数量}
    // 使用短路语法 
    shopCartData: JSON.parse(window.localStorage.getItem('cartData'))||{}
  },
  // 修改数据的方式 
  mutations: {
    // 方法的名字 根据需求自己编写
    // 形参是 仓库的 数据  根据属性进行数据修改即可
    // increment (state) {
    //   state.count++
    // }
    // 加入购物车 除了 state之外 额外的接收 商品id,跟 购买数量
    // 参数的个数 只能支持一个 如果要传递多个数据 传入 对象即可
    // 约定 opt的格式{id:'',buyCount:''};
    addCart(state, opt) {
      console.log(state);
      // console.log(opt);
      // 添加数据到 shopCartData中
      // 判断 shopCartData中 是否有这个key
      /**
       * 对象.属性 等同于  对象[属性]
       * 对象.属性  = 98
       * 等同于
       * 对象[属性] = 98
       * {
       *  新属性1:属性值,
       *  新属性2:属性值
       * }
       * 
       */
      if (state.shopCartData[opt.id] == undefined) {
        // 没有 增加这个key
        // state.shopCartData[opt.id] = opt.buyCount
        // 为了让Vue可以观察到这个数据的改变 我们需要使用 Vue.set进行设置
        // Vue.set(obj, 'newProp', 123)
        Vue.set(state.shopCartData,opt.id,opt.buyCount);
      } else {
        // 有 累加 对象也支持 对象[属性名]
        state.shopCartData[opt.id] += opt.buyCount;
      }
    },
    // 修改购物车商品数据
    // 参数{id:'',newCount:''}
    updateCart(state,opt){
      // 使用新的数字 覆盖原始的数字
      state.shopCartData[opt.id] = opt.newCount;
    }

  },
  // getters 类似于 Vue的计算属性
  getters: {
    cartGoodCount(state) {
      // 通过state 就可以访问到我们的数据
      // 遍历 累加
      let totalCount = 0;
      for (const key in state.shopCartData) {
        totalCount += state.shopCartData[key]
      }
      // console.log('触发了');
      return totalCount;
    }
  }
})

new Vue({
  // 用代码的方式告诉vue渲染什么东西 把App.vue 渲染出来
  render: h => h(App),
  // 挂在到Vue实例
  router,
  // 挂载到 Vue示例上 方便 所有子组件访问
  store
}).$mount('#app')

// 浏览器关闭事件
window.onbeforeunload = function(){
  // 保存
  window.localStorage.setItem('cartData',JSON.stringify(store.state.shopCartData))
}