<template>
  <div class="login">
    <el-card class="login-card">
       <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
       </div>
       <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件
       ，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker -->
       <!-- !-- 表单 => el-form包裹 -->
       <el-form>
         <!-- 里面要写el-from-item -->
         <!-- 每一个表单域由一个 Form-Item 组件构成 -->
         <el-from-item>
           <!-- 手机号 -->
           <el-input  style="margin-top:20px"></el-input>
         </el-from-item>
         <el-from-item>
           <!-- 验证码 -->
           <el-input style="width:70%;margin-top:20px"></el-input>
           <!-- 发送验证码 -->
           <el-button style="float:right;margin-top:20px" >发送验证码</el-button>
         </el-from-item>
         <!-- 同意选项 -->
         <el-from-item>
           <el-checkbox style="margin-top:20px;font-size:30px">我已阅读并同意用户协议和隐私条款</el-checkbox>
         </el-from-item>
         <!-- 登录按钮 -->
         <el-from-item>
           <!-- 注册登录按钮 -->
            <el-button type="primary" style="width:100%;margin-top:30px">登录</el-button>
         </el-from-item>
       </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .login{
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
      width: 480px;
      height: 360px;
      .title{
        text-align: center;
        img{
          height: 45px;
        }
      }
    }
  }
</style>>
