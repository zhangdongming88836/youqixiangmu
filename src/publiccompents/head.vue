<template>
  <div class="pagehead">
    <div class="loge">
      <img src="../assets/images/logo-x.png">
    </div>
    <div class="login">
      <span class="username">{{username}}</span>
      <div>
        <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-setting el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-circle-check">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {removeToken} from"@/utils/auth.js"
export default {
  data () {
    return {
      username: '王小虎'
    }
  },
  methods:{
    handleCommand(){
      console.log(11111111111)
      removeToken()
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.pagehead {
display: flex;
justify-content: space-between;
}
.loge {
  height: 40px;
  width: 40px;
  padding: 5px 10px;
}
.login {
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
}
.username {
  font-size: 16px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
    font-size: 12px;
  }
</style>