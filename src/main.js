// 全部的东西 丢到这里
import Vue from 'vue'
// 根组件
import App from './App.vue'

// 引入 第三方插件
// import axios from './lib/plugins'
import './lib/plugins'

// 导入 自己抽取的路由
import router from './lib/router';

// 导入 自己抽取的仓库
import store from './lib/store'

// 导入 自己抽取的过滤器
import './lib/filters';

// 导入 UI框架
import './lib/ui';

// 导入样式
import './assets/statics/site/css/style.css';

Vue.config.productionTip = false

new Vue({
  // 用代码的方式告诉vue渲染什么东西 把App.vue 渲染出来
  render: h => h(App),
  // 挂在到Vue实例
  router,
  // 挂载到 Vue示例上 方便 所有子组件访问
  store,
  // 生命周期函数
  created() {
    // console.log('顶级Vue示例的生命周期函数');
    this.$axios.get('site/account/islogin').then(response => {
      // console.log(response);
      if (response.data.code === 'logined') {
        // 登录了 Vuex中的数据
        store.commit('changeLoginState', true);
      } else {
        // 没有登录
        store.commit('changeLoginState', false);
      }
    })
  },
}).$mount('#app')

// 浏览器关闭事件
window.onbeforeunload = function () {
  // 保存
  window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData))
}