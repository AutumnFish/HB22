<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model.trim="username" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model.trim="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      // 用户名
      username: "",
      // 密码
      password: ""
    };
  },
  methods: {
    login() {
      // 调用接口
      this.$axios
        .post("site/account/login", {
          user_name: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response);
          // 判断是否成功还是失败
          if (response.data.status == 1) {
            // 根据返回内容 提示用户
            this.$Notice.warning({
              title: "友情提示",
              desc: response.data.message
              // 不关闭
              // duration: 0
            });
          } else {
            //  根据返回内容 提示用户
            this.$Notice.success({
              title: "欢迎你",
              desc: response.data.message
            });
            // 跳转到 订单页
            // this.$router.push("/checkOrder");
            // 修改vuex中的数据
            // 登陆-3
            this.$store.commit('changeLoginState',true); 
            // 从哪来 回哪去 route(数据) router(路由) 
            // 小米  正宗小米
            this.$router.back();
          }
        });
    }
  }
};
</script>
<style>
</style>

