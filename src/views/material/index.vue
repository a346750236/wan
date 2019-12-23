<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">素材管理</template>
    </my-bread>
    <!-- 上传图片 -->
    <!-- 写el-row是因为比较好操控布局 -->
     <el-row type='flex' justify="end" v-loading="loading">
         <!-- http-request是一个方法，用来上传图片的  show-file-lis是取消上传图片的信息-->
        <el-upload :http-request="uploadImg" :show-file-list="false">
              <el-button  size="small" type="primary">点击上传</el-button>
        </el-upload>
    </el-row>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容 定制 -->
        <div class="list-div">
          <el-card class="card-el" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
         <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
           <div class="list-div">
          <el-card class="card-el" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
         <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 默认为关闭
      //   数据
      list: [],
      //  默认全部选中
      activeName: 'all',
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前默认显示第一页
        pageSize: 10 // 每条显示8个
      }
    }
  },
  methods: {
    //   上传图片
    uploadImg (params) {
      // 上传前打开
      this.loading = true
      let form = new FormData() // 创建一个formData
      form.append('image', params.file) // 上传append添加到formData数据中
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: form
      }).then(result => {
        //   上传完关闭加载
        this.loading = false
        this.getAllMaterial() // 调用请求数据
      })
    },
    //   切换tab事件
    changeTab () {
      this.page.currentPage = 1 // 应该把当前页码回到第一页 如果不重置第一页 就会直接去找不到对应页码
      this.getAllMaterial()
    },
    //   点击分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    //   获取所有素材/收藏
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count //
      })
    }
  },
  created () {
    //   数据创建后加载出来
    this.getAllMaterial()
  }
}
</script>

<style lang="less" scoped>
.list-div {
  display: flex;
  flex-wrap: wrap;
  .card-el {
    width: 200px;
    height: 230px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
    }
  }
}
</style>
