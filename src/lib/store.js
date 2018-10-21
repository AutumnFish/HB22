// 导入Vue
import Vue from 'vue';
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
    shopCartData: JSON.parse(window.localStorage.getItem('cartData')) || {},
    // 是否登陆
    isLogin: false
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
        Vue.set(state.shopCartData, opt.id, opt.buyCount);
      } else {
        // 有 累加 对象也支持 对象[属性名]
        state.shopCartData[opt.id] += opt.buyCount;
      }
    },
    // 修改购物车商品数据
    // 参数{id:'',newCount:''}
    updateCart(state, opt) {
      // 使用新的数字 覆盖原始的数字
      state.shopCartData[opt.id] = opt.newCount;
    },
    // 删除id对应的数据即可
    delById(state, id) {
      // 如何删除对象中的一个属性 
      // delete state.shopCartData[id]
      // 使用Vue.delete删除才能同步
      Vue.delete(state.shopCartData, id);
    },
    // 设置登陆状态
    // 登陆-1
    changeLoginState(state, loginState) {
      // 直接赋值即可
      state.isLogin = loginState;
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

// 暴露store
// 在main.js中需要使用 这个变量 才需要暴露出去
export default store;