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
    <div class="user">
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
import { SaveFilecontract, FTcontract } from "../help/contract.ts";
import { reactive, toRefs, ref } from "vue";
import { service } from "../request/index.ts";
import router from "../router/index.js";
import { ethers } from "ethers";
//  import  {getsigner,addWhiteList,getcontract}  from "../help/testcontract";
import { setCookie, getCookie, deleteCookie } from "../help/cookie";
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
    const temp = ref("../../src/img/少女熊猫.jpg");
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
        }
        console.log("获取的Cookie：", getCookie(accounts));
        if (getCookie(accounts)) {
          console.log("用户已登陆！");
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
            // const addWhiteList = getcontract();

            // const { contract,SkincontractAddress  } = getContract();
            //   const result = await contract.getAddress;

            //   console.log("合约调用测试",result,SkincontractAddress);
            const exampleMessage = Date.now();
            console.log("时间戳", exampleMessage);
            try {
              // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
              // This uses a Node.js-style buffer shim in the browser.
              // 创建 Web3Provider 对象
              provider = new ethers.BrowserProvider(window.ethereum);
              provider.pollingInterval = 1000000; // 设置以太坊节点轮询间隔
              provider._getENSAddress = function () {}; // 禁用ENS
              console.log("Web3Provider successfully created:", provider);
              // 执行您的应用程序逻辑...
              const msg = `0x${exampleMessage.toString()}`;
              const sign = await ethereum.request({
                method: "personal_sign",
                params: [msg, address, "Example password"],
              });
              console.log("签名:", sign);
              service.post(`/api/v1/login`).then((res) => console.log(res));
              console.log("haihao");
              const signer = await provider.getSigner();
              const SaveFilecontrac = await SaveFilecontract(signer);
              console.log("hiahao",SaveFilecontrac)
              await SaveFilecontrac.initUser(signer.address);
              const SaveFile = await SaveFilecontrac.getUserInfo(
                signer.address
              );
              const FTcontarct1 = await FTcontract(signer);
              const balance = await FTcontarct1.balanceOf(signer.address);
              console.log("合约啊！！", SaveFile);
              console.log("余额：：：", balance);
            } catch (err) {
              console.error(err);
            }
            setCookie(address, address, 30);
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
          deleteCookie(accounts);
        });
      obj.isShow = false;
      router.push({ name: "homepage" });
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
</style>