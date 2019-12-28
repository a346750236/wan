<template>
  <!-- 外层容器 -->
  <!-- 当子元素中包含 <el-header> 或 <el-footer> 时，
  全部子元素会垂直上下排列，否则会水平左右排列。-->
  <el-container>
    <!-- 左右布局 -->
    <el-aside :style="{width:collaspse ? '60px' : '230px'}" style=" transition:all 0.3s;min-height:100vh;background-color:#353b4e;">
      <!-- 放置左侧组件 -->
      <layout-aside :collaspse="collaspse"></layout-aside>
    </el-aside>
    <!-- 在放置一个container -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <!-- 二级容器 -->
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collaspse: false // 是否折叠
    }
  },
  components: {

  },
  created () {
    // 开启监听
    eventBus.$on('changeCollapse', () => {
      this.collaspse = !this.collaspse
    })
  }
}
</script>

<style>
</style>
