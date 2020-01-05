<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <MenuBar></MenuBar>
    <!-- 头部区域 -->
    <HeadBar></HeadBar>
    <!-- 主内容区域 -->
    <Main></Main>
  </div>
</template>

<script>
import HeadBar from '@/views/main/HeadBar'
import MenuBar from '@/views/main/MenuBar'
import Main from '@/views/main/Main'
export default {
  components: {
    HeadBar,
    MenuBar,
    Main
  }
}
</script>

<style>
  .container {
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    position:absolute;
  }
</style>
