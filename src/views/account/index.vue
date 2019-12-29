<template>
   <el-card>
       <!-- 面包屑 -->
       <my-bread slot="header">
          <template slot="title">账户信息</template>
       </my-bread>
       <!-- 放置上传文件 -->
       <el-upload v-loading="loading" :http-request="uploadImg"  class="head-upload" action="" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
       </el-upload>
       <!-- 放置组件 -->
       <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:80px" label-width="100px">
         <el-form-item prop="name" label="用户名">
           <el-input v-model="formData.name" style="width:30%"></el-input>
         </el-form-item>
         <el-form-item prop="intro" label="简介">
           <el-input v-model="formData.intro" style="width:30%"></el-input>
         </el-form-item>
         <el-form-item prop="email" label="邮箱">
           <el-input v-model="formData.email" style="width:30%"></el-input>
         </el-form-item>
         <el-form-item prop="mobile" label="手机号">
           <el-input v-model="formData.mobile"  disabled style="width:30%"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
         </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      loading: false, // 默认关
      rules: {
        name: [{
          required: true, message: '用户名内容不能为空'
        }, {
          min: 1, max: 7, message: '用户名的长度限制为1到7个字符'
        }],
        email: [{
          required: true, message: '邮箱不能为空'
        }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      },
      defaultImg: require('../../assets/img/02.jpg')
    }
  },
  methods: {
    // 上传图片
    async uploadImg (params) {
      this.loading = true // 打开
      var data = new FormData() // 实例化一个
      data.append('photo', params.file)
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      this.formData.photo = result.data.photo // 修改头像
      eventBus.$emit('updateUserInfoSuccess') // 触发一个自定义事件
      this.loading = false // 关闭
    },
    // 提交校验
    saveUserInfo () {
      this.$refs.myForm.validate((isok) => {
        if (isok) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            //   认为保存成功
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
            eventBus.$emit('updateUserInfoSuccess') // 触发一个自定义事件
          })
        }
      })
    },
    // 获取用户信息
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
 .head-upload{
   position: absolute;
   right: 300px;
   img{
     width: 200px;
     height: 200px;
     border-radius: 50%;
   }
 }

</style>
