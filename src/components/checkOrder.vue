<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <!-- element-ui的表单
                            :model 数据
                            :rules 规则

                         -->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名:" prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属区域:" prop="area">
                                        <!-- 省市联动 -->
                                        <v-distpicker @selected="areaChange" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址:" prop="address">
                                        <el-input v-model="ruleForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码:" prop="mobile">
                                        <el-input v-model="ruleForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱:" prop="email">
                                        <el-input v-model="ruleForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码:" prop="post_code">
                                        <el-input v-model="ruleForm.post_code" style="width:100px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <span class="info"> 手续费: 0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="changeExpress(20)" v-model="ruleForm.express_id" label="1">顺丰</el-radio>
                                        <span class="info"> 费用: 20.00元</span>
                                        <el-radio @change="changeExpress(0)" v-model="ruleForm.express_id" label="2">圆通</el-radio>
                                        <span class="info"> 费用: 0.00元</span>
                                        <el-radio @change="changeExpress(-2)" v-model="ruleForm.express_id" label="3">韵达</el-radio>
                                        <span class="info"> 费用: -2.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <!-- 循环生成列表 -->
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">
                                                <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                                <router-link :to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                                <!-- </a> -->
                                            </td>
                                            <td>
                                                <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                                <router-link :to="'/detail/'+item.id">
                                                    {{item.title}}
                                                </router-link>
                                                <!-- </a> -->
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{ruleForm.goodsAmount+ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <!-- <a class="btn button" href="/cart.html"> -->
                                            <router-link class="btn button" to="/shopcart">
                                                返回购物车
                                            </router-link>
                                            <a id="btnSubmit" @click="submitOrder" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from "v-distpicker";

export default {
  // 组件名 在Vue开发中工具中可以看到这个名字
  name: "checkOrder",
  //   注册 省市联动组件
  components: { VDistpicker },
  data: function() {
    //   自定义的手机号验证
    // rule 是规则的名字
    // value 数据的值
    // callback 类似于 next()
    var validateMobile = (rule, value, callback) => {
      // 正则判断
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 非空判断
      setTimeout(() => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (reg.test(value) == false) {
          callback(new Error("请输入正确的手机号"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    // 邮箱
    var validateEmail = (rule, value, callback) => {
      // 正则判断
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      // 非空判断
      setTimeout(() => {
        if (reg.test(value) == false) {
          callback(new Error("请输入正确的邮箱地址"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    // 邮编
    var validatePostCode = (rule, value, callback) => {
      // 正则判断
      let reg = /^[1-9]\d{5}(?!\d)$/;
      // 非空判断
      setTimeout(() => {
        if (reg.test(value) == false) {
          callback(new Error("请输入邮政编码"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    return {
      // 表单数据
      ruleForm: {
        // 收货人
        accept_name: "雷霆",
        // 详细地址
        address: "留仙2路 中粮商务公园隔壁桥洞4号洞口",
        // 手机号
        mobile: "18888488888",
        // 电子邮箱
        email: "aDeepHole@qq.com",
        // 邮编
        post_code: "510000",
        // 省市区
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        // 支付方式
        payment_id: "6",
        // 快递
        express_id: "1",
        // 商品id
        goodsids: "",
        // 购买商品对象
        cargoodsobj: {},
        // 运费
        expressMoment: 20,
        // 订单备注
        message: "这么便宜,敢不敢在贵一点!",
        // 商品总金额
        goodsAmount: 0
      },
      // 商品列表数据
      goodsList: [],
      // 验证规则
      rules: {
        //   对应到 上面的name字段
        accept_name: [
          // 规则1: required 必填,message 提示信息,trigger 触发时机 blur 失去焦点
          { required: true, message: "请输入名字", trigger: "blur" },
          // 规则2: min 最小长度 max 最大长度 trigger 触发时机 change 数据改变
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        address: [
          // 规则1: required 必填,message 提示信息,trigger 触发时机 blur 失去焦点
          { required: true, message: "请输入详细地址", trigger: "blur" },
          // 规则2: min 最小长度  trigger 触发时机 change 数据改变
          {
            min: 3,
            message: "最少3个字符",
            trigger: "change"
          }
        ],
        // 手机号
        mobile: [
          // validator 自定义的验证规则 trigger 触发的时机
          { validator: validateMobile, trigger: "change" }
        ],
        // 邮箱
        email: [
          // validator 自定义的验证规则 trigger 触发的时机
          { validator: validateEmail, trigger: "change" }
        ],
        // 邮编
        post_code: [
          // validator 自定义的验证规则 trigger 触发的时机
          { validator: validatePostCode, trigger: "change" }
        ]
      }
    };
  },
  //   事件
  methods: {
    areaChange(data) {
      //   console.log(data);
      // 直接赋值即可 因为就是那种格式
      this.ruleForm.area = data;
    },
    // 改变运费
    changeExpress(newPrice) {
      console.log(newPrice);
      // 修改运费
      this.ruleForm.expressMoment = newPrice;
    },
    // 提交订单
    submitOrder() {
      // 提交订单
      this.$axios
        .post("site/validate/order/setorder", this.ruleForm)
        .then(response => {
          // 提交成功之后
          console.log(response);
          if (response.data.status == 0) {
            this.$message.success("订单创建成功");
            // 删除购物车中 当前选中的数据
            // Vuex中的数据
            for (const key in this.ruleForm.cargoodsobj) {
              // 调用vuex中的根据id删除 数据的方法
              this.$store.commit("delById", key);
            }
            // 跳转到订单支付页
            this.$router.push("/payOrder/" + response.data.message.orderid);
          } else {
            this.$message.error("订单创建失败");
          }
        });
    }
  },
  // 计算属性
  computed: {
    //   总数
    totalCount() {
      // 遍历数组 累加 返回
      let num = 0;
      this.goodsList.forEach(v => {
        num += v.buycount;
      });
      return num;
    }
    // 总价格 总价格 页面一打开 就知道了 所以迁移到 属性中
    // totalPrice(){
    //     let price = 0;
    //     this.goodsList.forEach(v=>{
    //         price+=(v.buycount*v.sell_price)
    //     })
    //     return price;
    // }
  },
  // 生命周期函数
  created() {
    // 通过路由对象获取id
    //   console.log(this.$route);
    // 保存起来
    this.ruleForm.goodsids = this.$route.params.ids;
    // 调用接口
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ruleForm.goodsids}`)
      .then(response => {
        // console.log(response);
        // 处理数据 并保存
        // 准备一会要提交给服务器的数据
        let temData = {};
        response.data.message.forEach(v => {
          // 修改 buycount 通过vuex获取 购买数据
          v.buycount = this.$store.state.shopCartData[v.id];
          // 增加 属性名 跟 对应的数量
          temData[v.id] = v.buycount;
          // 累加 总金额即可
          this.ruleForm.goodsAmount += v.buycount * v.sell_price;
        });
        // 数据处理完毕 复制到data中即可
        this.goodsList = response.data.message;
        // 设置到 ruleForm中即可
        this.ruleForm.cargoodsobj = temData;
      });
  },
  // 判断用户是否登陆 放在这里 页面还是会一闪而过 所以 迁移到main.js中
  beforeCreate() {}
};
</script>
<style>
.info {
  color: #ccc;
}
</style>


