<template>
    <el-tabs v-model="activeName" >
    <el-tab-pane label="素材库" name="material">
     <div class="select-img-list">
        <!-- 循环生成选择列表 -->
         <el-card class="img-card" v-for="item in list" :key="item.id">
            <!-- 点击图片时 调用方法 将图片地址传出去 -->
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
       <!-- 放置一个分页组件 -->
      <el-row type="flex" justify="center">
        <el-pagination background layout="prev, pager, next"
         :total="page.total"
         :current-page="page.currentPage"
         :page-size="page.pageSize"
         @current-change="changePage"
         ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传那图片" name="upload"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 定义一个数组接数据
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    //   传值
    clickImg (url) {
      this.$emit('SelectImg', url)
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      //  重新获取数据
      this.getAllImg()
    },
    //   获取素材图片信息
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // false是获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then((result) => {
        this.list = result.data.results // 获取数据
        this.page.total = result.data.total_count // 赋值总页数
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 120px;
    height: 120px;
    margin: 10px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
