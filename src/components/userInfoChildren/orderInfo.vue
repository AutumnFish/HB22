<template>
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <a href="javascript:void(0)" @click="$router.back()" class="add">
                <i class="iconfont icon-reply"></i>返回</a>
            <ul>
                <li class="selected">
                    <a href="javascript:;">查看订单</a>
                </li>
            </ul>
        </div>
        <div class="order-progress">
            <ul>
                <li class="first active">
                    <div class="progress">下单</div>
                    <div class="info">{{orderinfo.confirm_time | beautifyTimePro('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li :class="orderinfo.status>=2?'active':''">
                    <div class="progress">已付款</div>
                    <div class="info">{{orderinfo.payment_time | beautifyTimePro('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li  :class="orderinfo.status>=3?'active':''">
                    <div class="progress">已经发货</div>
                    <div class="info">{{orderinfo.express_time | beautifyTimePro('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li class="last" :class="orderinfo.status>=4?'active':''">
                    <div class="progress">已完成</div>
                    <div class="info">{{orderinfo.complete_time | beautifyTimePro('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
            </ul>
        </div>
        <div class="form-box accept-box form-box1">
            <dl class="head form-group">
                <dd>
                    订单号：{{orderinfo.order_no}}

                    <!-- <a href="#/site/goods/payment/12" class="btn-pay"> -->
                    <router-link v-show="orderinfo.status==1" :to="'/payOrder/'+orderinfo.id" class="btn-pay">
                        去付款
                    </router-link>
                    <a v-show="orderinfo.status!=1&&orderinfo.status!=4" @click="acceptExpress" class="btn-pay">
                        签收
                    </a>
                    <!-- </a> -->
                    <!---->
                </dd>
            </dl>
            <dl class="form-group">
                <dt>订单状态：</dt>
                <dd>
                    {{orderinfo.statusName}}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>快递单号：</dt>
                <dd>
                    {{orderinfo.express_no}}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>支付方式：</dt>
                <dd>{{orderinfo.paymentTitle}}</dd>
            </dl>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                <tbody>
                    <tr>
                        <th align="left">商品信息</th>
                        <th width="60%">名称</th>
                        <th width="10%">单价
                        </th>
                        <th width="10%">数量</th>
                        <th width="10%">金额</th>
                    </tr>
                    <tr v-for="(item, index) in goodslist" :key="item.id">
                        <td width="60">
                            <img :src="item.imgurl" class="img">
                        </td>
                        <td align="left">
                            <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
                        </td>
                        <td align="center">
                            <s>￥{{item.goods_price}}</s>
                            <p>￥{{item.real_price}}</p>
                        </td>
                        <td align="center">{{item.quantity}}</td>
                        <td align="center">￥{{item.real_price*item.quantity}}</td>
                    </tr>
                    <tr>
                        <td colspan="7" align="right">
                            <p>商品金额：
                                <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                <b class="red">￥{{orderinfo.express_fee}}</b>
                            </p>
                            <p style="font-size: 22px;">应付总金额：
                                <b class="red">￥{{orderinfo.order_amount}}</b>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-box accept-box">
            <dl class="head form-group">
                <dd>收货信息</dd>
            </dl>
            <dl class="form-group">
                <dt>顾客姓名：</dt>
                <dd>{{orderinfo.accept_name}}</dd>
            </dl>
            <dl class="form-group">
                <dt>送货地址：</dt>
                <dd>{{orderinfo.area+orderinfo.address}}</dd>
            </dl>
            <dl class="form-group">
                <dt>联系电话：</dt>
                <dd>{{orderinfo.mobile}} </dd>
            </dl>
            <dl class="form-group">
                <dt>电子邮箱：</dt>
                <dd> {{orderinfo.email}}</dd>
            </dl>
            <dl class="form-group">
                <dt>备注留言：</dt>
                <dd>{{orderinfo.message}}</dd>
            </dl>
        </div>
    </div>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      // 订单id
      orderId: 0,
      // 商品列表
      goodslist: [],
      // 订单信息
      orderinfo: {}
    };
  },
  methods: {
    // 获取订单信息
    getOrderInfo() {
      this.$axios
        .get("site/validate/order/getorderdetial/" + this.orderId)
        .then(response => {
          // console.log(response);
          // 商品列表
          this.goodslist = response.data.message.goodslist;
          // 订单信息
          this.orderinfo = response.data.message.orderinfo;
        });
    },
    // 签收快递
    acceptExpress() {
      // 调用接口即可
      this.$axios
        .get("site/validate/order/complate/" + this.orderId)
        .then(response => {
          //   console.log(response);
          if (response.data.status == 0) {
            // 提示用户
            this.$message.success(response.data.message);
            // 重新获取订单数据
            this.getOrderInfo();
          }
        });
    }
  },
  //   生命周期函数
  created() {
    this.orderId = this.$route.params.orderId;
    // 调用接口
    this.getOrderInfo();
  }
};
</script>
<style>
</style>


