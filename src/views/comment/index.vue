<template>
  <!--卡片  -->
  <el-card>
    <my-bread slot="header">
      <!-- 具名插槽 -->
      <template slot="title">评论列表</template>
    </my-bread>
    <!-- 表格 -->
    <el-table :data="list">
      <!-- 表格内容 -->
      <el-table-column prop="title" label="标题" width="700">标题</el-table-column>
      <el-table-column :formatter="Formatters" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 放组件   作用域插槽  row column $index-->
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="openOrClose(obj.row)"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 请求评论列表数据
    getComment () {
      // axios 是默认是get类型
      // query 参数 / 路由参数 地址参数 get参数  axios  params
      // body参数 给 data
      // 身份信息 headers
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.list = result.data.results
      })
    },
    // 定义一个方法来解决状态
    Formatters (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '正常' : '关闭'
    },
    // 切换状态开关
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // $confirm 确定时  进入then 取消时进入catch
      this.$confirm(`您是否确认要${mess}评论吗？`).then(() => {
        // 用户提示需要接口
        // 地址参数/query参数/url参数/路由参数 => 可以在params中写 也可以直接拼接到url地址上
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 重新请求列表
        })
      })
    }
  },
  created () {
    // 调用请求数据方法
    this.getComment()
  }
}
</script>

<style>
</style>
