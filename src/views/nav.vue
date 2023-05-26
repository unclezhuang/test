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
          <p class="mousehover" @click="logout">退出登陆</p>
        </div><router-link to="/defo/user" class="mousehover">
        <img
          class="userhead"
          src="../img/少女熊猫.jpg"
          style="width: 10%; border-radius: 50%"
        /></router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { state } from "./shared.js";
import { dterm } from "./determine.js";
export default {
  setup() {
  
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
          obj.isShow = false;
          return false;
        }
        
        
        console.log("用户已登陆！");
        obj.isShow = true;
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    islogin();
    window.ethereum.on("accountsChanged", function (accounts: any) {
      // Time to reload your interface with accounts[0]!
      islogin();
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
          .then(async function (accounts) {
            // 获取用户地址
            await ethereum
              .request({
                method: "wallet_requestPermissions",
                params: [
                  {
                    eth_accounts: {},
                  },
                ],
              })
              .then((permissions) => {
                // 在这里处理授权结果 permissions 对象
                console.log("permissions:", permissions.address);
              });
            const address = accounts[0];
            console.log("用户地址：", address);
            const exampleMessage = Date.now();
            console.log("时间", exampleMessage);
            try {
              const from = accounts[0];
              // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
              // This uses a Node.js-style buffer shim in the browser.
              const msg = `0x${exampleMessage.toString()}`;
              const sign = await ethereum.request({
                method: "personal_sign",
                params: [msg, from, "Example password"],
              });
              console.log("nihaohfaidfa", sign);
            } catch (err) {
              console.error(err);
            }
            dterm.myValue = address;
            state.myValue = address;
            console.log("state的值更新",state.myValue);
            obj.isShow = !obj.isShow;
            console.log(obj.isShow);
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
    const logout = () => {
      obj.isShow = !obj.isShow;
      dterm.myValue = "";
      console.log("值的状态",dterm.myValue);
    };
    return {
      ...toRefs(obj),
      change,
      login,
      logout,
     
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
  cursor: pointer;
}
.router-link {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
}
</style>