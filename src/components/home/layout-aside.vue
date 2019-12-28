<template>
  <!-- 左侧导航 -->
  <div class='layout-aside'>
      <div class='title'>
          <img :src="collaspse ? smallImg:bigImg" alt="">
      </div>
   <!-- 导航组件 -->
   <el-menu :collapse="collaspse" :style="{width: collaspse ?  '60px' : '230px'}" router  background-color="#353b4e" text-color="#adafb5"  active-text-color="#ffd04b">
     <!-- 导航组件 index作为跳转的地址  类似于 router-link  to -->
    <el-menu-item index="/home">
      <i class='el-icon-s-home'></i>
         <span>首页</span>
    </el-menu-item>
    <el-submenu index='1'>
       <!-- 具名插槽 -->
       <template slot='title'>
            <i class='el-icon-s-order'></i>
            <span >内容管理</span>
      </template>
       <!-- 放置el-menu-item -->
       <el-menu-item index="/home/publish">发布文章</el-menu-item>
       <el-menu-item index="/home/articles">内容列表</el-menu-item>
       <el-menu-item index="/home/comment">评论列表</el-menu-item>
       <el-menu-item index="/home/material">素材管理</el-menu-item>
    </el-submenu>
      <el-submenu index='2'>
       <!-- 具名插槽 -->
        <template slot='title'>
             <i class='el-icon-s-flag'></i>
             <span >粉丝管理</span>
          </template>
       <!-- 放置el-menu-item -->
       <el-menu-item index="/home/picture">发布文章</el-menu-item>
       <el-menu-item index="/home/fansinfo">内容列表</el-menu-item>
       <el-menu-item index="/home/fanslife">评论列表</el-menu-item>
       <el-menu-item index="/home/fanslist">素材管理</el-menu-item>
    </el-submenu>
      <el-menu-item index="/home/account">
      <i class='el-icon-s-custom'></i>
        <span>账户信息</span>
    </el-menu-item>
   </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collaspse'], // 接收传递过来的值
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')

    }
  }
}
</script>

<style lang="less" scoped>
.layout-aside{
  // width: 230px;
  overflow: hidden;
   .el-menu {
        border-right: none;
    }
  .title{
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img{
      height: 35px;
    }
  }
}
</style>
