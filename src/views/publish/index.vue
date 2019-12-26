<template>
    <el-card>
        <!-- 面包屑 -->
        <my-bread slot="header">
            <template slot="title">发布文章</template>
        </my-bread>
        <!-- 表单元素 -->
        <el-form :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
            <el-form-item prop="title" label="标题">
                <el-input v-model="formData.title" style="width:65%"></el-input>
            </el-form-item>
            <el-form-item prop="content"  label="内容">
                <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="封面">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="channel_id" label="频道">
                <el-select v-model="formData.channel_id">
                    <!-- 循环生成文章列表数据 -->
                    <el-option  v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">发布</el-button>
                <el-button >存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels 接收频道数据
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] //  存储图片的地址
        },
        channel_id: null // 频道id
      },
      publishRules: {
        title: [{
          required: true, message: '标题内容不能为空'
        }, {
          min: 5, max: 30, message: '标题长度需要在5到30字符之间'
        }],
        content: [{
          required: true, message: '文章内容不能为空'
        }],
        channel_id: [{
          required: true, message: '频道分类不能为空'
        }]
      }
    }
  },
  methods: {
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels // 获取文章列表
      })
    }
  },
  created () {
    this.getChannels() // 获取文章列表
  }
}
</script>

<style>

</style>
