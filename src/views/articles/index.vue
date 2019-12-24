<template>
  <!-- 页面卡片 -->
  <el-card class="articles">
    <!-- 面包屑 -->
    <my-bread slot="header">
      <template slot="title">内容列表</template>
    </my-bread>
    <!-- el-row -->
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <!-- 单选框组 -->
        <el-radio-group  @change="changeCondition" v-model="formData.status">
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，，不传为全部 -->
          <!-- 全部这个5是默认的,在传参的时候判断一下 是不是5 如果是5 就传个null -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <!-- 下拉框 -->
      <el-col :span="18">
        <el-select v-model="formData.channel_id"  @change="changeCondition">
          <!-- 循环生成多个el-option
              label 指的是 el-option显示值
              value指的是 el-option的存储值
          -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
         @change="changeCondition"
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 下面主体 -->
    <el-row class="total">
      <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row
      v-for="item in Wzlist"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左侧 -->
      <el-col :span="10">
        <el-row type="flex" justify>
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <div class="info">
              <!-- style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis" -->
            <span >{{ item.title }}</span>
            <!-- 过滤器不但可以在插值表达中使用 还可以在v-bind表达式中使用 -->
            <el-tag :type="item.status | filterType" class="tag">{{ item.status | filterStatus }}</el-tag>
            <span class="data">{{ item.pubdate }}</span>
          </div>
        </el-row>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 默认为显示全部
        channel_id: null, // 默认为空
        dateRange: [] // 默认为一个空数组
      },
      channels: [], // 定义一个数组接收频道列表的数据
      Wzlist: [], // 定义一个数组接收文章列表的数据
      defaultImg: require('../../assets/img/404.png')
    }
  },
  filters: {
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    //   总事件
    changeCondition () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
        channel_id: this.formData.channel_id // 频道id
      }
      // 文章列表
      this.getArticles(params)
    },
    //   获取频道列表数据
    Channellist () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params // 传就有，不传就为undefined
      }).then(result => {
        this.Wzlist = result.data.results
      })
    }
  },
  created () {
    //   默认显示数据
    this.Channellist()
    // 文章列表
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
  .total {
    margin: 60px 0;
    height: 30px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid #f2f3f5;
    img {
      width: 200px;
      height: 130px;
      margin-right: 18px;
      border-radius: 8px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tag {
        max-width: 80px;
      }
      .data {
        color: #999;
        font-size: 14px;
      }
    }
    .right {
      span {
        margin-left: 8px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
