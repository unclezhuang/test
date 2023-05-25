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
import { reactive } from "vue";
import Card from "./Card.vue";
import axios from 'axios';
export default {
  components: {
    "my-card": Card,
  },
  setup() {
    const data = reactive([])
    const buyback = (index) => {
      if (index === 0) {
        console.log("点击事件",index)
        axios.get("http://jsonplaceholder.typicode.com/todos").then((res) => data.push(...res.data))
    }else if(index === 1){
      console.log("点击事件",index)
      axios.get("http://jsonplaceholder.typicode.com/todos").then((res) => data.push(...res.data))
    }else if(index === 2){
      console.log("点击事件",index)
      axios.get("http://jsonplaceholder.typicode.com/todos").then((res) => data.push(...res.data))
    }
  }
  buyback(0)
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