// 导入Vue
import Vue from 'vue'
// 路由相关
import VueRouter from 'vue-router';
// 正常加载
// // 导入index组件---
// import index from '../components/index.vue';
// // 导入detal组件
// import detail from '../components/detail.vue';
// // 导入购物车组件
// import shopcart from '../components/shopcart.vue';
// // 导入 订单确认页组件
// import checkOrder from '../components/checkOrder.vue'
// // 导入 登录组件
// import login from '../components/login.vue'
// // 导入 订单中心组件
// import payOrder from '../components/payOrder.vue'
// // 支付成功页
// import paySuccess from '../components/paySuccess.vue'
// // 个人中心页
// import userInfo from '../components/userInfo.vue'
// // 个人中心页嵌套路由
// import info from '../components/userInfoChildren/info.vue'
// // 个人中心页嵌套路由
// import orderList from '../components/userInfoChildren/orderList.vue'
// // 个人中心页嵌套路由
// import orderInfo from '../components/userInfoChildren/orderInfo.vue'

// 按需加载
// 导入index组件---
const index =()=>import('../components/index.vue');
// 导入detal组件
const detail =()=>import('../components/detail.vue');
// 导入购物车组件
const shopcart =()=>import('../components/shopcart.vue');
// 导入 订单确认页组件
const checkOrder =()=>import('../components/checkOrder.vue');
// 导入 登录组件
const login =()=>import('../components/login.vue');
// 导入 订单中心组件
const payOrder =()=>import('../components/payOrder.vue');
// 支付成功页
const paySuccess =()=>import('../components/paySuccess.vue');
// 个人中心页
const userInfo =()=>import('../components/userInfo.vue');
// 个人中心页嵌套路由
const info =()=>import('../components/userInfoChildren/info.vue');
// 个人中心页嵌套路由
const orderList =()=>import('../components/userInfoChildren/orderList.vue');
// 个人中心页嵌套路由
const orderInfo =()=>import('../components/userInfoChildren/orderInfo.vue');

// use一下
Vue.use(VueRouter);

// 写规则
const routes = [
  // /根目录也对应到 index组件即可
  {
    path: '/',
    component: index,
    meta: {
      zhName: '首页'
    }
  },
  // 首页
  {
    path: '/index',
    component: index,
    meta: {
      zhName: '首页'
    }
  },
  // 详情页
  {
    path: '/detail/:goodId',
    component: detail,
    meta: {
      zhName: '详情页'
    }
  },
  // 购物车
  {
    path: '/shopcart',
    component: shopcart,
    meta: {
      zhName: '购物车'
    }
  },
  // 订单确认页 
  {
    path: "/checkOrder/:ids",
    component: checkOrder,
    meta: {
      zhName: '订单确认页',
      // 增加的标示字段 有这个字段 就需要 登录判断
      checkLogin: true
    }
  },
  // 登陆
  {
    path: '/login',
    component: login,
    meta: {
      zhName: '登陆'
    }
  },
  // 订单中心
  {
    path: '/payOrder/:orderId',
    component: payOrder,
    meta: {
      // 增加字段 用来显示 title
      zhName: '订单支付',
      // 增加的标示字段 有这个字段 就需要 登录判断
      checkLogin: true
    }
  },
  // 支付成功
  {
    path: '/paySuccess',
    component: paySuccess,
    meta: {
      // 增加字段 用来显示 title
      zhName: '成功啦!',
      // 增加的标示字段 有这个字段 就需要 登录判断
      checkLogin: true
    }
  },
  // 会员中心
  {
    path: '/userInfo',
    component: userInfo,
    meta: {
      // 增加字段 用来显示 title
      zhName: '会员中心!',
      // 增加的标示字段 有这个字段 就需要 登录判断
      checkLogin: true
    },
    // 嵌套路由
    children: [{
        path: '',
        component: info,
        meta: {
          // 增加字段 用来显示 title
          zhName: '个人中心',
          // 增加的标示字段 有这个字段 就需要 登录判断
          checkLogin: true
        }
      },
      {
        path: 'orderList',
        component: orderList,
        meta: {
          // 增加字段 用来显示 title
          zhName: '订单中心',
          // 增加的标示字段 有这个字段 就需要 登录判断
          checkLogin: true
        }
      },
      {
        path: 'orderInfo/:orderId',
        component: orderInfo,
        meta: {
          // 增加字段 用来显示 title
          zhName: '订单详情',
          // 增加的标示字段 有这个字段 就需要 登录判断
          checkLogin: true
        }
      },
    ]
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})

// 注册导航守卫(回调函数,或者是钩子函数)
router.beforeEach((to, from, next) => {
  console.log('跳转啦');
  // console.log(to);
  window.document.title = to.meta.zhName;

  // console.log(from);
  // 如果是去 订单确认页 登陆判断
  // if (to.path == '/checkOrder/:ids') {
  // 如果有标记字段 就需要验证登录
  if (to.meta.checkLogin == true) {
    // 登陆了 继续执行
    Vue.prototype.$axios.get("site/account/islogin").then(response => {
      console.log(response);
      if (response.data.code === 'nologin') {
        // 打回登录页
        // this.$router.push('/index');
        // this.$message
        Vue.prototype.$message.warning('还没登录呢,先登录哦');
        // Vue.prototype.$Notice.warning({
        //   title: 'Notification title',
        //   desc: 'Here is the notification description. Here is the notification description. '
        // });
        router.push('/login');
      } else {
        // 不用干事情 登录了 继续访问
        next();
      }
    });
  } else {
    next();
  }
})

// 注册 后置钩子
// 跳转完毕之后执行
router.afterEach((to, from) => {
  // console.log('跳转完毕');
  // 滚动顶部
  window.scroll(0, 0)
})

// 暴露 router对象出去
export default router;