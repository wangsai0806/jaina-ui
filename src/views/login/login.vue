<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title"> {{$t("login.login-html-title")}} </h3>
    <el-form-item prop="account" style="width:100%;">
      <em class="svg-container" style="width:20%;float:left;">{{$t("login.account")}}:</em>
      <el-input type="text" style="width:80%;float:right;" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <em class="svg-container" style="width:20%;float:left;">{{$t("login.password")}}:</em>
      <el-input type="password" style="width:80%;float:right;" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">{{$t("login.remember-password")}}</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="logining">{{$t("login.login")}}</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">{{$t("login.reset")}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import '@/mock/user.js'
export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      loginForm: {
        account: 'admin',
        password: '930806'
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      this.$axios({
        url: 'jaina-security/oauth/token',
        data: {
          grant_type: 'password',
          scope: 'app',
          client_id: 'webApp',
          client_secret: '930204',
          username: this.loginForm.account,
          password: this.loginForm.password
        },
        method: 'post'
      }).then((res) => {
        debugger
        alert(JSON.stringify(res))
        sessionStorage.setItem('token', res.token) // 放置token到Cookie
        sessionStorage.setItem('user', this.loginForm.account) // 保存用户到本地会话
        this.$router.push('/') // 登录成功，跳转到主页
      }).catch(function (res) {
        alert(res.message)
      })
    },
    reset () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
