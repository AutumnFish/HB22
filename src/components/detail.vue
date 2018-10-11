<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- element-ui的计数器组件 -->
                                                <el-input-number v-model="buyNum" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <!-- 逻辑比较简单 直接写在标签内 点击之后切换 selectIndex的值
                                            是否有selected这个类名取决于 selectIndex的值
                                         -->
                                        <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- v-html 直接解析为html标签 -->
                            <div class="tab-content entry" v-show="selectIndex==0" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | beautifyTime('年','月','日')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用iView的分页插件 -->
                                        <Page @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' :page-size=6 show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                                <!-- </a> -->
                                            </router-link>
                                            <span>{{item.add_time | beautifyTime('🐣','🈷','🌤')}}</span>
                                        </div>
                                    </li>
                                </ul>
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
  name: "Detail",
  data: function() {
    return {
      goodId: "",
      // 商品信息
      goodsinfo: {},
      // 热卖列表
      hotgoodslist: [],
      // 图片列表
      imglist: [],
      // 选择数量
      buyNum: 1,
      // 标记tab栏显示哪个 0 :1
      selectIndex: 0,
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 6,
      // 总条数
      totalcount: 0,
      // 评论内容
      comments:[]
    };
  },
  //   事件
  methods: {
    //   购买数量改变触发
    numChange() {
      console.log("改变啦");
    },
    // 根据id获取 商品数据的方法
    getGoodInfo() {
      this.$axios
        .get("/site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          // console.log(response);
          // 商品信息
          this.goodsinfo = response.data.message.goodsinfo;
          // 热卖列表
          this.hotgoodslist = response.data.message.hotgoodslist;
          // 图片列表
          this.imglist = response.data.message.imglist;
        });
    },
    // 获取评论信息
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          console.log(response);
          //   保存数据
          this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.comments = response.data.message;
        });
    },
    // 页码改变
    pageChange(pageNum){
        // console.log('页码改变');
        // console.log(pageNum);
        // 修改页码
        this.pageIndex = pageNum;
        // 重新发请求
        this.getComments();
    }
  },
  // created中获取id 因为一会就要去调用接口
  created() {
    // console.log(this.$route.params);
    this.goodId = this.$route.params.goodId;
    // 调用接口获取数据
    // console.log(this.$axios);
    // 基地址已抽取main.js中
    this.getGoodInfo();
    // 获取 评论数据
    this.getComments();
  },
  // 观察路由数据改变
  // watch 观察 对应的数据 改变时触发
  watch: {
    // 观察了 $route 这个数据
    // 会把新的数据设置给 to  老的数据 设置给 from
    $route(to, from) {
      // 对路由变化作出响应...
      console.log(to);
      //   console.log(from);
      // 获取 新的id
      // 根据id 获取数据
      // 渲染页面
      this.goodId = to.params.goodId;
      // 重新获取数据
      this.getGoodInfo();
      // 重新获取评论
      this.getComments();
      // 把购买数量修改为1即可
      this.buyNum = 1;
    }
  }
};
</script>
<style>
/* 取消图片底部的 间隙 */
.tab-content img {
  /* 变块 */
  display: block;
}
</style>


