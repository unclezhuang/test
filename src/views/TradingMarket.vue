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
import { getSigner, SkinMarketcontract, } from '../help/contract.ts';
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
          data.push(0)
      } else if (index === 1) {
        console.log("点击事件", index);
        data.splice(0, data.length);
        // document.body.style.backgroundImage = "url(" + "../../src/img/少女熊猫.jpg" + ")";
        service
          .get("api/v1/market/skins/1")
          .then((res) => data.push(...res.data.data));
          // document.body.style.backgroundImage = "url('../../src/img/test.jpg')"
          data.push(0)
      } else if (index === 2) {
        if (getCookie(await ethereum.request({ method: "eth_accounts" }))) {
          console.log("点击事件", index);
          const address = await ethereum.request({ method: "eth_accounts" });
          data.splice(0, data.length);
          service
            .get("api/v1/user/" + address + "/skinList")
            .then((res) => data.push(...res.data.data));
          data.push(1)
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
      { type: "", text: "网页背景图" },
      { type: "", text: "头像" },
      { type: "", text: "我的" },
    ] as const;
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