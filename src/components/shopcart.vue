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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 没买东西 显示的内容 -->
                                <tr v-show="goodList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 买了东西 显示的内容 -->
                                <tr v-show="goodList.length!=0" v-for="(item, index) in goodList" :key="item.id">
                                    <td>
                                        <!-- 使用elememt-ui的 switch进行替换 -->
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width: 65px;"></td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- $event 目的是获取原始的参数 -->
                                        <el-input-number v-model="item.buycount" @change="countChange(item.id,$event)" :min="1" label="描述文字"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td><button type="button" @click="delOne(item.id)" class="el-button el-button--danger is-circle">
                                            <!----><i class="el-icon-delete"></i>
                                            <!----></button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>
                            <router-link :to="'/checkOrder/'+checkIds">
                                <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "shopcart",
  data() {
    return {
      // 商品的详细数据 数组 需要通过接口获取
      goodList: []
    };
  },
  // 生命周期函数
  created() {
    // 通过Vuex获取 id数据 进行拼接
    let ids = "";
    for (const key in this.$store.state.shopCartData) {
      // console.log(key);
      ids += key;
      ids += ",";
    }
    // 去除最后一个,
    // 从 0开始 到 倒数第二位 进行截取
    ids = ids.slice(0, -1);
    // console.log(ids);

    // 调用接口${} ES6的模板字符串 占位(挖坑的语法) 类似于 模板引擎的 {{}}
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      // 修改数据中的 购买个数
      console.log(response);
      // 方法1 先循环 在设置给data
      /**
       * 先循环把数据准备好了 尤其是内部的字段
       * 再设置给vue之后 vue会自动为所有的字段 增加get 和 set 才能检查到 数据的更改
       *
       */
      // 先循环 赋值
      //   response.data.message.forEach(v => {
      //     // 当前这个商品的购买数量  = Vuex中的购买数量
      //     v.buycount = this.$store.state.shopCartData[v.id];
      //     // 修改选中的状态
      //     v.selected = true;
      //   });
      //   // 数据处理完毕之后 赋值到 data中即可
      //   this.goodList = response.data.message;

      // 方法2 先赋值给data 再循环增加字段
      /**
       * 先赋值给 vue 再动态增加 字段 vue不会 自动增加 get和 set
       * 可以使用Vue.set 告诉Vue这个字段是新增的 帮我增加 get 和 set
       * */
      this.goodList = response.data.message;
      response.data.message.forEach(v => {
        // 当前这个商品的购买数量  = Vuex中的购买数量
        v.buycount = this.$store.state.shopCartData[v.id];
        // 修改选中的状态
        //   v.selected = true;
        // 参数1 对象 参数2 新属性名 参数3 属性值
        // 组件中 使用 $set 访问 Vue.set即可
        this.$set(v, "selected", true);
      });

      // 打印字段 查看是否有 get 跟 set
      console.log(this.goodList);
    });
  },
  // 事件
  methods: {
    countChange(id, newCount) {
      // 个数改变
      //   console.log(id, count);
      // 修改vuex中的数据
      this.$store.commit("updateCart", {
        id, // id:id
        newCount // newCount:newCount
      });
    },
    // 删除数据 弹框提示
    delOne(id) {
      //   消息框
      this.$confirm("库存不多啦,不买没有啦!!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 确定
        .then(() => {
          // 删除Vuex中的数据 调用 main.js中 仓库内部的代码
          this.$store.commit("delById", id);
          // 以及当前这个组件中的数据
          this.goodList.forEach((v, index) => {
            if (v.id == id) {
              this.goodList.splice(index, 1);
            }
          });
          // 提示用户
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        // 取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  // 计算属性
  computed: {
    // 选中个数
    selectedNum() {
      // 循环 累加 被选中的个数
      let totalNum = 0;
      this.goodList.forEach(v => {
        if (v.selected == true) {
          totalNum += v.buycount;
        }
      });
      return totalNum;
    },
    //   选中总价
    selectedPrice() {
      // 循环 累加 被选中的个数
      let totalPrice = 0;
      this.goodList.forEach(v => {
        if (v.selected == true) {
          totalPrice += v.buycount * v.sell_price;
        }
      });
      return totalPrice;
    },
    // 被选中的id们 id1,id2,id3
    checkIds(){
        // 遍历
        let ids = '';
        // 累加被选中的id
        this.goodList.forEach(v=>{
            // 如果被选中了
            if(v.selected==true){
                ids+=v.id;
                ids+=','
            }
        })
        // 去掉末尾的,
        ids = ids.slice(0,-1);
        // 返回即可
        return ids;
    }
  }
};
</script>
<style lang="less">
// div {
//   img {
//     display: block;
//   }
//   a {
//   }
// //   background-color: hotpink;
// }
</style>


