<template>
    <div class="menu-bar-container">
      <!-- logo -->
      <div class="logo" :class="isCollapse?'menu-bar-collapse-width':'menu-bar-width'">
          <img :src="this.logo" /> <div>{{isCollapse?'':sysName}}</div>
      </div>
      <!-- 导航菜单 -->
      <!--<el-menu default-active="1-1" :class="isCollapse?'menu-bar-collapse-width':'menu-bar-width'"
               @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
      </el-menu>-->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      sysName: '',
      logo: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (a, b) {
      console.log('handleselect')
    }
  },
  mounted () {
    this.sysName = 'Jinia管理系统'
    this.logo = require('@/assets/logo.png')
  }
}
</script>

<style>
.menu-bar-container {
  position:absolute;
  top: 0px;
  bottom: 0px;
  text-align: left;
  height: 100%;
  background: #4b5f6e;
}
.menu-bar-container .logo {
  top: 0px;
  height: 60px;
  line-height: 60px;
  background: #4b5f6e;
}
.menu-bar-container .logo img {
    width: 40px;
    height: 40px;
    border-radius: 0px;
    margin: 10px 10px 10px 10px;
    float: left;
}
.menu-bar-container .logo div {
  font-size: 22px;
  color: white;
  text-align: left;
}
/*.menu-bar-container .menu-bar-width {*/
/*  width: 200px;*/
/*}*/
/*.menu-bar-container .menu-bar-collapse-width {*/
/*  width: 65px;*/
/*}*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
 width: 200px;
 min-height: 400px;
}
</style>
