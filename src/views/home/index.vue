<template>
  <!-- 外层容器 -->
  <!-- 当子元素中包含 <el-header> 或 <el-footer> 时，
  全部子元素会垂直上下排列，否则会水平左右排列。-->
  <el-container>
    <!-- 左右布局 -->
    <el-aside  style="min-height:100vh;background-color:#353b4e;width:230px">
      <!-- 放置左侧组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 在放置一个container -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <el-main>主要区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
