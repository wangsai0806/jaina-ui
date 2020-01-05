<template>
  <div class="head-container">
    <!-- 导航菜单隐藏显示切换 -->
    <span class="collapse-switcher" @click.prevent="collapse">
      <i class="el-icon-menu"></i>
    </span>
    <!-- 导航菜单 -->
    <span class="nav-bar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" text-color="#fff"
          active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="1" @click="$router.push('/')">{{$t("common.home")}}</el-menu-item>
        <el-menu-item index="2">{{$t("common.doc")}}</el-menu-item>
        <el-menu-item index="3">{{$t("common.blog")}}</el-menu-item>
      </el-menu>
    </span>
    <span class="tool-bar">
      <!-- 主题切换 -->
      <!-- <ThemePicker class="theme-picker"></ThemePicker> -->
      <!-- 语言切换 -->
      <!-- <LangSelector class="lang-selector"></LangSelector>   -->
      <!-- 用户信息 -->
      <el-dropdown class="user-info-dropdown" trigger="hover">
        <span class="el-dropdown-link"><img :src="this.userAvatar" /> {{username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{$t("user.myMsg")}}</el-dropdown-item>
          <el-dropdown-item>{{$t("user.config")}}</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">{{$t("login.logout")}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
// import ThemePicker from '@/components/ThemePicker'
// import LangSelector from '@views/main/LangSelector'
export default {
  // components: {
  //   ThemePicker,
  //   LangSelector
  // },
  data () {
    return {
      isCollapse: false,
      username: 'Jaina',
      userAvatar: '',
      activeIndex: '1'
    }
  },
  methods: {
    selectNavBar (key, keyPath) {
      console.log(key, keyPath)
    },
    // 语言切换
    handleCommand (command) {
      let array = command.split(':')
      let lang = array[0] === '' ? 'zh_cn' : array[0]
      let label = array[1]
      document.getElementById('language').innerHTML = label
      this.$i18n.locale = lang
    },
    // 折叠导航栏
    collapse: function () {
      this.isCollapse = !this.isCollapse
    },
    // 退出登录
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {})
    }
  },
  mounted () {
    this.sysName = 'Jaina'
    var user = sessionStorage.getItem('user')
    if (user) {
      this.userName = user
      this.userAvatar = require('@/assets/logo.png')
    }
  }
}
</script>

<style>
.head-container {
  position: absolute;
  left: 200px;
  right: 0px;
  height: 60px;
  line-height: 60px;
  background: #504e6180;
}
.collapse-switcher {
    width: 40px;
    float: left;
    cursor: pointer;
    border-color: #504e6180;
    border-left-width: 1px;
    border-left-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    color: white;
  }
.nav-bar {
  margin-left: auto;
  float: left;
}
.el-menu {
  background: #504e6180;
}
.head-container .tool-bar {
    float: right;
}
.head-container .tool-bar .theme-picker {
  padding-right: 10px;
}
.lang-selector {
  padding-right: 10px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
}
.user-info-dropdown {
  font-size: 20px;
  padding-right: 20px;
  color: #fff;
  cursor: pointer;
}
.user-info-dropdown img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
}
</style>
