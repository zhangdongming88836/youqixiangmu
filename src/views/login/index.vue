<template>
  <div class="main">
    <div class="hse_newloginBox">
      <div class="hse_newloginBoxTitle"></div>
      <el-form
        class="login-form"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入用户名">
            <i slot="prefix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
          >
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
          <!-- <span class="show-pwd" @click="showPwd"></span> -->
        </el-form-item>
        <!-- <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
          </el-input>
          <el-button
            type="text"
            class="getCode"
            @click="getCode"
            :disabled="isDisabled"
            >{{ buttonText }}</el-button
          >
        </el-form-item> -->
      </el-form>
      <div class="hse_newloginBtn" @click="handleLogin('loginForm')">登录</div>
    </div>
  </div>
</template>
<script>
import { login } from '../../api/login'
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      loginRules: {
        account:[
          {required: true, message:"请输入用户名", trigger: "blur"},
          {mix: 3, max: 18, trigger: "blur"},
        ],
        password:[
          {required: true, message:"请输入密码", trigger: "blur"},
          {mix: 3, max: 18, trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm)
            .then(res => {
              this.loading = false
              this.$router.push({ path: 'layout' })
            })
          // .catch(() => {
          //   setTimeout(() => {
          //     window.location.reload()
          //   }, 1500)
          // })
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
      // console.log(process.env);
      // let { username,password } = this.loginRules;
      // login( this.loginForm )
      // .then(res => {
      //   // let { code } =res.data;
      //   if(res.code == 200){
      //     sessionStorage.setItem('account', name)
      //     this.$router.push("/layout/all");
      //     // console.log(process.env);
      //   }
      // })
      // localStorage.setItem("authority", "3231231dhfhfalffhfsfasas");
      // this.$router.push("/layout/all");
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#1940a4, #4b94fa);
  background-image: url("../../assets/images/bg1.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.hse_newloginBox {
  width: 450px;
  height: 420px;
  box-sizing: border-box;
  padding: 38px 30px 0;
  border-radius: 10px;
  background: #fff;
  position: relative;
  left: 65%;
  top: 20vh;
  .hse_newloginBoxTitle {
    width: 316px;
    height: 30px;
    margin: 0 auto 50px;
    background: url("../../assets/images/hse_logintitle1.png");
    background-size: 130%;
    background-position-x: center;
  }

  .hse_newloginBtn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 30px;
    text-align: center;
    background: #4962ee;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
  }
}
.icon {
  background: #1940a4;
}
</style>