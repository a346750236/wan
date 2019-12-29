<template>
  <!--卡片  -->
  <el-card v-loading="loading">
    <my-bread slot="header">
      <!-- 具名插槽 -->
      <template slot="title">评论列表</template>
    </my-bread>
    <!-- 表格 -->
    <el-table :data="list">
      <!-- 表格内容 -->
      <el-table-column prop="title" label="标题" width="700"></el-table-column>
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
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination background layout="prev, pager, next"
       :total="page.totle"
       :page-size="page.pageSize"
       :currentPage="page.currentPage"
       @current-change="changePage"
       >
       </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 加载的状态默认是关闭的
      loading: false,
      list: [],
      page: {
        // 分页数据
        totle: 0, // 数据总条数
        pageSize: 10, // 默认每页10条
        currentPage: 1 //  当前页码 默认显示第一页
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      // 调用事件
      this.getComment()
    },
    // 请求评论列表数据
    async getComment () {
      this.loading = true // 打开状态

      // axios 是默认是get类型
      // query 参数 / 路由参数 地址参数 get参数  axios  params
      // body参数 给 data
      // 身份信息 headers
      let result = await this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      this.page.totle = result.data.total_count
      // 设置一个定时器,每次加载需要0.3S
      setTimeout(() => { this.loading = false }, 300)
      // this.loading = false
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
    async openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      // $confirm 确定时  进入then 取消时进入catch
      await this.$confirm(`您是否确认要${mess}评论吗？`)
      // 用户提示需要接口
      // 地址参数/query参数/url参数/路由参数 => 可以在params中写 也可以直接拼接到url地址上
      await this.$axios({
        method: 'put',
        url: '/comments/status',
        params: {
          article_id: row.id.toString()
        },
        data: {
          allow_comment: !row.comment_status
        }
      })
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getComment() // 重新请求列表
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
