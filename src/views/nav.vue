<template>
  <div class="login">
    <div class="logo"><p>诚信论坛</p></div>
    <nav class="navPage">
      <router-link to="/" class="home mousehover">首页</router-link>
      <router-link to="/defo/deal" class="home mousehover"
        >交易市场</router-link
      >
    </nav>
    <div class="user">
      <span class="userhead" v-show="!isShow" @click="login">登录</span>
      <span v-show="isShow">
        <div class="userhead">
          <router-link to="/defo/user" class="mousehover">个人详情</router-link>
          <p class="mousehover" @click="text">退出登陆</p>
        </div>
        <img
          class="userhead"
          src="../img/少女熊猫.jpg"
          style="width: 10%; border-radius: 50%"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import HttpClient from "../ajxos/ajxos";

export default {
  setup() {
    const text = function () {
      const httpClient = new HttpClient("https://api.example.com");

      httpClient
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => console.log(res.data))
        .catch((error) => console.error(error));

      httpClient
        .post("/login", { username: "admin", password: "password" })
        .then((res) => console.log(res.data))
        .catch((error) => console.error(error));
    };

    async function islogin() {
      try {
        // 检查 MetaMask 是否已安装
        const isMetaMaskInstalled =
          typeof window.ethereum !== "undefined" ||
          (typeof window.web3 !== "undefined" &&
            window.web3.currentProvider.isMetaMask);

        if (!isMetaMaskInstalled) {
          console.log("请安装 MetaMask");
          return false;
        }

        // 检查用户是否已登录
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const isLoggedIn = accounts.length > 0;

        if (!isLoggedIn) {
          console.log("请先登录 MetaMask");
          return false;
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    islogin().then(() => {
      obj.isShow = !obj.isShow;
    });
    window.ethereum.on("accountsChanged", function (accounts: any) {
      // Time to reload your interface with accounts[0]!
      login();
    });
    const obj = reactive({
      isShow: false,
    });

    const change = () => {
      obj.isShow = !obj.isShow;
    };

    const login = () => {
      if (typeof window.ethereum !== "undefined") {
        // 通过 MetaMask 访问用户地址
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(function (accounts) {
            // 获取用户地址
            const address = accounts[0];
            console.log("用户地址：", address);
            obj.isShow = !obj.isShow;
          })
          .catch(function (error) {
            if (
              (error.message =
                "Already processing eth_requestAccounts. Please wait.")
            ) {
              console.log("1");
            }
          });
      } else {
        console.log("请安装 MetaMask 插件");
      }
    };
    return {
      ...toRefs(obj),
      change,
      login,
      text,
    };
  },
};
</script>

<style lang="scss" scoped>
.common-layout,
.el-container,
.login {
  display: table;
  width: 100%;
  height: 100%;
}
.login {
  display: flex;
  flex-direction: row;
  justify-content: center; /*垂直居中*/
  align-items: center; /*水平居中*/
  height: 20vh; /*占满整个浏览器高度*/
}
.logo,
.user,
.navPage {
  width: 33.33%; /*占满父容器宽度*/
  text-align: center; /*水平居中*/
  display: inline-block;
  justify-content: center; /*水平居中*/
  align-items: center; /*垂直居中*/
}

.logo {
  float: left;
}
.user,
.navPage {
  float: right;
}
.userhead {
  display: inline-block;
  float: right;
  margin-right: 1;
}
.home {
  margin: 10%;
}
.mousehover:hover {
  color: red;
}
</style>