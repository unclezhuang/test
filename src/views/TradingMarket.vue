<template>
  <el-container>
    <el-aside width="20%"
      ><div class="flex justify-space-between mb-4 flex-wrap gap-4">
        <el-button
          v-for="button in buttons"
          :key="button.text"
          :type="button.type"
          text
          style="display: block; width: 100%; margin: 0"
          >{{ button.text }}</el-button
        >
      </div></el-aside
    >
    <el-main><my-card></my-card></el-main>
  </el-container>
</template>
  

<script lang="ts">
import { defineComponent } from "vue";
import Card from "./Card.vue";
export default defineComponent({
  components: {
    "my-card": Card,
  },
  setup() {
    const buttons = [
      { type: "", text: "帖子侧栏背景" },
      { type: "", text: "帖子正文" },
      { type: "", text: "我的" },
    ] as const;

    return {
      buttons,
    };
  },
});
</script>

<style scoped>
.el-container {
  height: 100%;
}
main::-webkit-scrollbar {
  display: none;
}
</style>