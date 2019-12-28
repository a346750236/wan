<template>
   <el-card>
       <!-- 面包屑 -->
       <my-bread slot="header">
          <template slot="title">账户信息</template>
       </my-bread>
       <!-- 放置上传文件 -->
       <el-unload :http-request="uploadImg" class="head-upload" action="" :show-file-list="false">
          <img src="../../assets/img/02.jpg" alt="">
       </el-unload>
       <!-- 放置组件 -->
       <el-form :model="formData" style="margin-left:80px" label-width="100px">
         <el-form-item label="用户名">
           <el-input v-model="formData.name" style="width:30%"></el-input>
         </el-form-item>
         <el-form-item label="简介">
           <el-input v-model="formData.intro" style="width:30%"></el-input>
         </el-form-item>
         <el-form-item label="邮箱">
           <el-input v-model="formData.email" style="width:30%"></el-input>
         </el-form-item>
         <el-form-item label="手机号">
           <el-input style="width:30%"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary">保存信息</el-button>
         </el-form-item>
       </el-form>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      }
    }
  },
  methods: {

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
