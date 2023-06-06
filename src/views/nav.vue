<template>
  <div class="login">
    <div class="Logo">
      <img src="../img/logo.png" style="width: 10%" class="logo" />
      <p class="logo">诚信论坛</p>
    </div>
    <nav class="navPage">
      <router-link to="/" class="home mousehover">首页</router-link>
      <router-link to="/defo/deal" class="home mousehover"
        >交易市场</router-link
      >
    </nav>
    <div class="user userright">
      <span class="userhead" v-show="!isShow" @click="login">登录</span>
      <span v-show="isShow">
        <div class="userhead">
          <router-link to="/defo/user" class="mousehover">个人详情</router-link>
          <p class="mousehover" @click="logout">退出登陆</p>
        </div>
        <router-link to="/defo/user" class="mousehover">
          <img
            class="userhead"
            :src="temp"
            style="width: 10%; border-radius: 50%"
        /></router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  SaveFilecontract,
  FTcontract,
  getSigner,
  SkinMarketcontract,
} from "../help/contract.ts";
import { reactive, toRefs, ref } from "vue";
import { service } from "../request/index.ts";
import router from "../router/index.js";
import { ethers } from "ethers";
import { setCookie, getCookie, deleteCookie } from "../help/cookie";
import { defaultDocument } from "@vueuse/core";
export default {
  setup() {
    // console.log("ceshi",addWhiteList)
    // const userAddress = ref("");
    // const contractInstance = inject("contractInstance");
    // const getContractData = async () => {
    //   const data = await contractInstance.getData(userAddress.value);
    //   console.log(data);
    // };
    const obj = reactive({
      isShow: false,
      loginAddress: "",
    });
    const loginInformation = reactive({
      user_address: "",
      time: "",
      hash: "",
    });
    const temp = ref("");
    async function islogin() {
      try {
        // 检查 MetaMask 是否已安装
        const isMetaMaskInstalled =
          typeof window.ethereum !== "undefined" ||
          (typeof window.web3 !== "undefined" &&
            window.web3.currentProvider.isMetaMask);
        let provider: any;
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
        }loginInformation.user_address = "" + accounts
        console.log("获取的Cookie：", getCookie(accounts));
        if (getCookie(accounts)) {
          console.log("用户已登陆！");
          service
                .post(`/api/v1/login`, JSON.stringify(loginInformation))
                .then((res) => {
                  console.log("头像",res.data.data.head_picture)
                  if (res.data.data.head_picture) {
                    console.log(res.data.data.head_picture)
                    temp.value = res.data.data.head_picture;
                  }console.log("beij",res.data.data.bcg_url)
                  if (res.data.data.bcg_url) {
                    console.log(res.data.data.backgroundImage)
                    document.body.style.backgroundImage =
                      "url(" + res.data.data.bcg_url + ")";
                  }
                  setCookie( ""+ accounts, temp.value, 30);
                });
          temp.value = getCookie(accounts);
          console.log(getCookie(accounts));
          obj.isShow = true;
        } else {
          obj.isShow = false;
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    
    }
    islogin();
    //检测用户改变
    
            
    window.ethereum.on("accountsChanged", function (accounts: any) {
      // Time to reload your interface with accounts[0]!
      console.log("这是账户更改输出的", accounts);
      router.push({ name: "homepage" });
      islogin();
    });

    //登陆
    const login = async () => {
      let provider: any;
      if (typeof window.ethereum !== "undefined") {
        // 通过 MetaMask 访问用户地址
        window.ethereum
          .request({ method: "eth_accounts" })
          .then(async function (accounts) {
            // 获取用户地址
            await ethereum.request({
              method: "wallet_requestPermissions",
              params: [
                {
                  eth_accounts: {},
                },
              ],
            });
            const address = accounts[0];
            console.log("用户地址：", address);
            const exampleMessage = Date.now();
            try {
              // 执行您的应用程序逻辑...
              const msg = `0x${exampleMessage.toString()}`;
              console.log("签名消息:::",msg)
              const sign = await ethereum.request({
                method: "personal_sign",
                params: [msg, address, "Example password"],
              });
              console.log("签名:", sign);
              loginInformation.user_address = address;
              loginInformation.time = `0x${exampleMessage.toString()}`;
              loginInformation.hash = sign;
              const signer = await getSigner();
              const SaveFilecontractt = SaveFilecontract(signer)
              await SaveFilecontractt.checkDailyLog(signer.address)
              service
                .post(`/api/v1/login`, JSON.stringify(loginInformation))
                .then((res) => {   
                  console.log("头像",res.data.data.head_picture)
                  if (res.data.data.head_picture) {
                    temp.value = res.data.data.head_picture;
                  }console.log("beij",res.data.data.bcg_url)
                  if (res.data.data.bcg_url) {
                    document.body.style.backgroundImage =
                      "url(" + res.data.data.bcg_url + ")";
                  }
                  console.log("頭像",temp.value)
                  setCookie(address, temp.value, 30);
                });
            } catch (err) {
              console.error(err);
            }
            obj.loginAddress = address;
            obj.isShow = true;
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
    //退出登陆
    const logout = () => {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async function (accounts) {
          console.log(1111)
          deleteCookie("" + accounts);
        });
      obj.isShow = false;
      router.push({ name: "homepage" });
      document.body.style.backgroundImage =""
    };
   
    return {
      ...toRefs(obj),
      temp,
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
.Logo {
  text-align: center;
  justify-content: center;
  display: flex;
}
.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /*垂直居中*/
  align-items: center;
  /*水平居中*/
  height: 15vh;
  /*占满整个浏览器高度*/
}
.Logo,
.user,
.navPage {
  width: 33.33%;
  /*占满父容器宽度*/
  text-align: center;
  /*水平居中*/
  display: inline-block;
  justify-content: center;
  /*水平居中*/
  align-items: center;
  /*垂直居中*/
}

.Logo {
  float: left;
  text-align: center;
  justify-content: center;
  display: flex;
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
.logo {
  display: inline;
}
a {
  color: black;
  text-decoration: none;
}
</style>