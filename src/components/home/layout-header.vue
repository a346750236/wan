<template>
  <!-- 头部组件 -->
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col class="left" :span="6">
      <!-- 左侧图标 -->
      <i class="el-icon-s-fold"></i>
      <span class="title">河南省淅川县厚坡镇乔磊开发</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="4" class="right">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ?  userInfo.photo : defauitImg" alt />
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">Git信息</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defauitImg: require('../../assets/img/02.jpg')
    }
  },
  created () {
    // 获取token令牌
    let token = window.localStorage.getItem('user-token')
    // 调接口,显示数据
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then(result => {
      // console.log(result.data.data)
      this.userInfo = result.data.data
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/a346750236/toutiao.git'
      }
    }

  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 68px;
  .left {
    font-size: 20px;
    .title {
      margin-left: 5px;
      color: #2c3e50;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
      margin-right: 30px;
    }
    .el-icon-arrow-down {
      font-size: 16px;
    }
  }
}
</style>
