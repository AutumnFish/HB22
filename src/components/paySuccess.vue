<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
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
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！<span>还有<i class='red'>{{delay}}</i>秒去首页</span></strong>
                                            <p>您可以点击这里进入
                                                <!-- <a href="/user/center/index.html"> -->
                                                <router-link to="/userInfo">
                                                    会员中心
                                                </router-link>
                                                <!-- </a> -->
                                                查看订单状态！
                                            </p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
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
  name: "paySuccess",
  data() {
    return {
      delay: 5,
      // 定时器id
      interId: 0
    };
  },
  // 生命周期函数
  created() {
    this.interId = setInterval(() => {
      // 递减
      this.delay--;
      // 倒计时结束
      if (this.delay == 0) {
        // 去首页
        this.$router.push("/index");
      }
    }, 1000);
  },
  // 清除定时器
  destroyed() {
    // 清除定时器
    clearInterval(this.interId);
  }
};
</script>
<style>
.red {
  font-size: 20px;
  font-weight: 700;
  color: red;
}
</style>


