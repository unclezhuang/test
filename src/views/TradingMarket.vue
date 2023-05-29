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
import { dterm } from "./determine.js";
import { reactive,h } from "vue";
import Card from "./Card.vue";
import axios from "axios";
import { ElNotification } from 'element-plus';
import { getCookie } from "../help/cookie";
export default {
  components: {
    "my-card": Card,
  },
  setup() {
    const data = reactive([]);
    const buyback = async (index) => {
      if (index === 0) {
        console.log("点击事件", index);
        axios
          .get("http://jsonplaceholder.typicode.com/todos")
          .then((res) => data.push(...res.data));
      } else if (index === 1) {
        console.log("点击事件", index);
        axios
          .get("http://jsonplaceholder.typicode.com/todos")
          .then((res) => data.push(...res.data));
      } else if (index === 2) {
        if (getCookie(await ethereum.request({ method: "eth_accounts" }))) {
          console.log(await ethereum.request({ method: "eth_accounts" }))
          axios
            .get("http://jsonplaceholder.typicode.com/todos")
            .then((res) => data.push(...res.data));
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