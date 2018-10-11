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
                                <h1>华为（HUAWEI）荣耀6Plus 16G双4G版</h1>
                                <p class="subtitle">双800万摄像头，八核，安卓智能手机）荣耀6plus</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">SD9102356032</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥2499</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥2195</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">60</em>件
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
                                        <a href="javascript:;" class="selected">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;">
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
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
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
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/90" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200154277661.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">佳能（Canon） EOS 700D 单反套机</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/91" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200214471783.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/91" class="">尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/92" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200225107390.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/92" class="">联想（Lenovo） G510AM 15.6英寸笔记本电脑</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/93" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/201504200341260763.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/93" class="">Apple iMac MF883CH/A 21.5英寸一体机电脑</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/94" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200239192345.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/94" class="">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/97" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200258403759.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/97" class="">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/102" class="">
                                                <img src="http://39.108.135.214:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/102" class="">Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣</a>
                                            <span>2017-09-13</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/103" class="">
                                                <img src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/103" class="">骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫衣</a>
                                            <span>2017-09-26</span>
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
      goodId: ""
    };
  },
  // created中获取id 因为一会就要去调用接口
  created() {
    // console.log(this.$route.params);
    this.goodId = this.$route.params.goodId;
    // 调用接口获取数据
  }
};
</script>
<style>
</style>


