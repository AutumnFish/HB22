<template>
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <ul>
                <li class="selected">
                    <a href="/user/order-list.html">交易订单</a>
                </li>
            </ul>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                <tbody>
                    <tr>
                        <th width="16%" align="left">订单号</th>
                        <th width="10%">姓名</th>
                        <th width="12%">订单金额</th>
                        <th width="11%">下单时间</th>
                        <th width="10%">状态</th>
                        <th width="12%">操作</th>
                    </tr>
                    <tr v-for="(item, index) in orderList" :key="item.id">
                        <td>{{item.order_no}}</td>
                        <td align="left">{{item.accept_name}}</td>
                        <td align="left">
                            <strong style="color: red;">￥{{item.order_amount}}</strong>
                            <br> 在线支付
                        </td>
                        <td align="left">{{item.add_time |beautifyTimePro('YYYY年MM月DD日 HH时mm分ss秒') }}</td>
                        <td align="left">
                            {{item.statusName}}
                        </td>
                        <td align="left">
                            <!-- <a href="#/site/member/orderinfo/12" class=""> -->
                            <router-link :to="'/userInfo/orderInfo/'+item.id">
                                查看订单
                            </router-link>
                            <!-- </a> -->
                            <br>
                            <!-- <a href="#/site/goods/payment/12" class=""> -->
                            <router-link v-show="item.status==1" :to="'/payOrder/'+item.id">
                                |去付款
                            </router-link>
                            <!-- </a> -->
                            <!-- <br> -->
                            <!-- <a href="javascript:void(0)">|取消</a> -->
                            <!-- <br> -->
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="page-foot">
                <!-- element-ui的分页组件 -->
                <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageIndex" :page-sizes="[2, 4, 6, 8,10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      // 页码
      pageIndex: 1,
      //   页容量
      pageSize: 10,
      // 当前页的数据
      orderList: [],
      // 总条数
      total: 0
    };
  },
  methods: {
    sizeChange(newSize) {
      console.log(newSize);
      // 赋值
      this.pageSize = newSize;
      this.getOrderData();
    },
    currentChange(newCurrent) {
      //   console.log(newCurrent);
      // 赋值
      this.pageIndex = newCurrent;
      this.getOrderData();
    },
    // 获取订单数据
    getOrderData() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          console.log(response);
          // 赋值
          this.orderList = response.data.message;
          // 总条数
          this.total = response.data.totalcount;
        });
    }
  },
  //  生命周期函数
  created() {
    // 调用抽取的方法
    this.getOrderData();
  }
};
</script>
<style>
</style>


