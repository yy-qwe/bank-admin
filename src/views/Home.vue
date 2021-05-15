<template>
  <div class="home">
    <el-container>
      <el-header>首页</el-header>
      <el-container class="main-container">
        <el-aside width="100px">
          <el-avatar :size="100" :src="userInfo.avatar">
            <i class="el-icon-user-solid"></i>
          </el-avatar>
        </el-aside>
        <el-main>
          <el-row> 用户名：{{ userInfo.name }} </el-row>
          <el-row class="introduction">
            用户身份：{{ userInfo.introduction }}
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Container, Header, Aside, Main, Avatar, Row } from "element-ui";
import { getUserInfo } from "@/utils/auth";
export default {
  name: "Home",
  data() {
    return {
      userInfo: {},
      fit: "contain",
    };
  },
  created() {
    /* userInfo:
      {
        roles: ['admin'],
        introduction: '该角色为超级管理员',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name: 'admin'
      }               
     */
    this.userInfo = getUserInfo();
  },
  components: {
    "el-container": Container,
    "el-header": Header,
    "el-aside": Aside,
    "el-main": Main,
    "el-avatar": Avatar,
    "el-row": Row,
  },
};
</script>
<style scoped lang="scss">
$color-gray: #f5f7fa;
$color-white: #fff;
$distance: 10px;

.home {
  height: 100%;

  background: $color-gray;
  .el-container {
    padding: $distance;
    .el-header {
      height: 40px;
      line-height: 40px;
      background: $color-white;
      color: #97a8be;
    }
    .main-container {
      margin-top: $distance;
      background: $color-white;
    }
    .el-main {
      padding-top: 30px;
    }
    .el-avatar {
      font-size: 70px;
    }
    .introduction {
      margin-top: $distance;
    }
  }
}
</style>