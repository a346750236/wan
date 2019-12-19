<template>
  <div class="login">
    <el-card class="login-card">
       <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
       </div>
       <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件
       ，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker -->
       <!-- !-- 表单 => el-form包裹 -->
       <el-form ref="myFrom" :model="loginFrom" :rules="loginRules">
         <!-- 里面要写el-from-item -->
         <!-- 每一个表单域由一个 Form-Item 组件构成 -->
         <el-form-item  prop="mobile">
           <!-- 手机号 -->
           <el-input v-model="loginFrom.mobile" placeholder="请输入手机号" style="margin-top:10px"></el-input>
         </el-form-item>
         <el-form-item prop="code">
           <!-- 验证码 -->
           <el-input  v-model="loginFrom.code"  placeholder="请输入验证码" style="width:70%;margin-top:20px"></el-input>
           <!-- 发送验证码 -->
           <el-button style="float:right;margin-top:20px">发送验证码</el-button>
         </el-form-item>
         <!-- 同意选项 -->
         <el-form-item prop="check">
           <el-checkbox  v-model="loginFrom.check" style="margin-top:10px;font-size:20px">我已阅读并同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <!-- 登录按钮 -->
         <el-form-item>
           <!-- 注册登录按钮 -->
            <el-button type="primary" @click="submitLogin" style="width:100%">登录</el-button>
         </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否同意协议
      },
      loginRules: {
        //   决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        mobile: [
          { required: true, message: '请你您的手机号' }, {
            pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号'
          }
        ],
        // 验证码校验
        code: [{ required: true, message: '请输入您的验证码' }, {
          // 验证码六位数校验
          // patteren正则表达式
          pattern: /^\d{6}$/, message: '验证码为6位数'
        }],
        check: [
          // validator 自定义校验函数
          { validator: function (rule, value, callback) {
            if (value) {
              // 正确 勾选了协议
              // 成功执行回调函数
              callback()
            } else {
              // 失败也执行回调函数，报错误
              callback(new Error('你这个选项不选就不让你进'))
            }
          } }
        ]
      }
    }
  },
  methods: {
    // 定义一个提交按钮方法校验
    submitLogin () {
      this.$refs.myFrom.validate((isok) => {
        if (isok) {
          // console.log('整体效验通过，去看吧')
          this.$axios({
            // 请求地址
            url: '/authorizations',
            method: 'post',
            data: this.loginFrom
          }).then(result => {
            //  // 前端缓存令牌
            window.localStorage.setItem('user-token', result.data.data.token)
            // 成功登录页面
            this.$router.push('/home')
          }).catch(() => {
            // elementUI的方法
            this.$message({
              message: '您的手机号或者验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .login{
    background-image: url('../../assets/img/02.jpg');
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
