<template>
  <el-container>
    <el-aside width="20%"
      ><div class="flex justify-space-between mb-4 flex-wrap gap-4">
        <el-button
          v-for="(button, index) in buttons"
          :key="button.text"
          :type="button.type"
          text
          style="display: block; width: 100%; margin: 0"
          @click="buyback(index)"
          >{{ button.text }}</el-button
        >
      </div></el-aside
    >
    <el-main><my-card :data="data"></my-card></el-main>
  </el-container>
</template>
  

<script lang="ts">
import { reactive, h } from "vue";
import Card from "./Card.vue";
import { service } from "../request/index.ts";
import { ElNotification } from "element-plus";
import { getCookie } from "../help/cookie";
import { FTcontract } from '../help/contract.ts'
import { ethers } from 'ethers'
import func from 'vue-editor-bridge';
export default {
  components: {
    "my-card": Card,
  },
  setup() {
    const data = reactive([]);
    const buyback = async (index) => {
      if (index === 0) {
        console.log("点击事件", index);
        data.splice(0, data.length);
        service
          .get("api/v1/market/skins/0")
          .then((res) => data.push(...res.data.data));
      } else if (index === 1) {
        console.log("点击事件", index);
        data.splice(0, data.length);
        service
          .get("api/v1/market/skins/1")
          .then((res) => data.push(...res.data.data));
      } else if (index === 2) {
        if (getCookie(await ethereum.request({ method: "eth_accounts" }))) {
          const address = await ethereum.request({ method: "eth_accounts" });
          data.splice(0, data.length);
          service
            .get("api/v1/user/" + address + "/skinList")
            .then((res) => data.push(...res.data.data));
        } else {
          console.log("请先登录！");
          ElNotification({
            title: "请登录",
            message: h("i", { style: "color: red" }, "购买前请先登陆！！！！"),
          });
        }
      }
    };
    buyback(0);
    const buttons = [
      { type: "", text: "帖子侧栏背景" },
      { type: "", text: "帖子正文" },
      { type: "", text: "我的" },
    ] as const;
    const icconnectmatemask = async () =>{
      let provider :any;
      if (typeof window.ethereum !== "undefined") {
      try {
        // 创建 Web3Provider 对象
        provider = new ethers.BrowserProvider(window.ethereum);
        provider.pollingInterval = 1000000; // 设置以太坊节点轮询间隔
        provider._getENSAddress = function () {}; // 禁用ENS
        console.log("Web3Provider successfully created:", provider);
        // 执行您的应用程序逻辑...
      } catch (err) {
        console.error("Failed to create Web3Provider:", err);
      }
    } else {
      console.error("Metamask not detected!");
    }
    const signer = await provider.getSigner();
    console.log("签名：：：：",signer)
    const FTcontarct = await FTcontract(signer)
    const FTaddress = await FTcontarct.mint(signer.address,10)
    const balance = await FTcontarct.balanceOf(signer.address)
    console.log("FT的地址：：：",FTaddress)
    console.log("余额：：：",balance)
    }
    return {
      data,
      buttons,
      buyback,
    };
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
main::-webkit-scrollbar {
  display: none;
}
</style>