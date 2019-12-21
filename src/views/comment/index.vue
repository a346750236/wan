<template>
   <!--卡片  -->
  <el-card>
    <my-bread slot="header">
       <!-- 具名插槽 -->
       <template slot="title">评论列表</template>
    </my-bread>
    <!-- 表格 -->
    <el-table>
       <!-- 表格内容 -->
       <el-table-column label="标题" width="700">标题</el-table-column>
       <el-table-column label="评论状态"></el-table-column>
       <el-table-column label="总评论数"></el-table-column>
       <el-table-column label="粉丝评论数"></el-table-column>
       <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
