<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <img src="../assets/img/pay.jpg" alt=""> -->
                                    <!-- 这里是直接扫码跳转到支付页面 需要设置一个完整的地址  -->
                                    <qriously :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderId" :size="200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "payOrder",
  data: function() {
    return {
      orderId: 0,
      // 订单数据
      orderInfo: {},
      // 定时器id
      interId: 0
    };
  },
  // 方法
  methods: {
    // 获取订单数据
    getOrderInfo() {
      this.$axios
        .get("site/validate/order/getorder/" + this.orderId)
        .then(response => {
          console.log(response);
          // 获取订单信息
          this.orderInfo = response.data.message[0];
        });
    }
    //
  },
  // 生命周期函数
  created() {
    // 通过路由获取数据
    // console.log(this.$route);
    this.orderId = this.$route.params.orderId;
    // 调用接口获取数据
    this.getOrderInfo();
    // 开启定时器 间隔获取订单信息
    this.interId = setInterval(() => {
      // 调用接口
      this.$axios
        .get("site/validate/order/getorder/" + this.orderId)
        .then(response => {
          //   console.log(response);
          // 获取订单信息
          this.orderInfo = response.data.message[0];
          // 判断订单的状态
          if (this.orderInfo.status == 2) {
            // 订单支付成功
            this.$message.success("支付成功 ^_^");
            // 跳转页面
            this.$router.push('/paySuccess');
          }
        });
    }, 1500);
  },
  // 被销毁的时候触发
  destroyed(){
    //   console.log('我被干掉了');
    clearInterval(this.interId);
  }
};
</script>
<style>
</style>

