<!--  -->
<template>
  <div id="loginPage" class="login-page">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      :rules="loginRules"
      auto-complete="on"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="icon-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          auto-complete="on"
          ref="username"
          name="username"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="icon-container">
          <i class="el-icon-s-goods"></i>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          auto-complete="on"
          ref="password"
          name="password"
          :key="passwordType"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <i
            :class="
              passwordType === 'password'
                ? 'el-icon-watermelon'
                : 'el-icon-view'
            "
          ></i>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { Button, Form, Input, FormItem } from "element-ui";
import { validUsername, validatePassword } from "@/utils/validate";
import { setToken } from "@/utils/auth";
import { login } from "./api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: this.validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: this.validatePassword },
        ],
      },
      loading: false,
      redirect: undefined,
      passwordType: "password",
    };
  },
  mounted() {
    this.$refs.username.focus();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  components: {
    "el-button": Button,
    "el-form-item": FormItem,
    "el-form": Form,
    "el-input": Input,
  },

  computed: {},

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let { username, password } = this.loginForm;
          login({ username: username.trim(), password })
            .then((response) => {
              const { data } = response;
              setToken(data.token);
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((e) => {
              this.$router.push({
                name: "Error",
                query: { message: e.message, goBackPath: this.$route.fullPath },
              });
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    validateUsername(rule, value, callback) {
      if (!validUsername(value)) {
        callback(new Error("用户名只能包含小写字母"));
      } else {
        callback();
      }
    },
    validatePassword(rule, value, callback) {
      if (!validatePassword(value)) {
        callback(new Error("密码长度不小于5位"));
      } else {
        callback();
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
/* 重置element-ui*/

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
.login-page {
  ::v-deep .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  ::v-deep .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  ::v-deep .el-button {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>

<style lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-page {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;

  ::v-deep .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .icon-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 10px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>