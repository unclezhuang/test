<template>
  {{ posts.params.serch }}
  <div
    v-for="item in pagein()"
    :key="item.id"
    style="margin: 1%"
    @click="topostbyindex(item)"
  >
    <div>标题：{{ item.title }}</div>
    <div>内容：{{ item.body }}</div>
    <div>测试内容：{{ serch }}</div>
  </div>
  <div class="page">
    <el-pagination
      :page-size="15"
      :pager-count="11"
      layout="prev, pager, next"
      :total="obj.posts.length"
      default-current-page="1"
      :current-page="currentPage"
      @update:current-page="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { service } from "../request/index.ts";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const obj = reactive({
  posts: [],
});
const currentPage = ref(1);
const posts = useRoute();
const router = useRouter();
const serch = posts.params.serch;
const first = async function () {
    service
        .get("api/v1/post/like-content/"+serch)
        .then((res) => obj.posts.push(...res.data.data));
};
first();
const handleChange = (page: number) => {
  currentPage.value = page;
  pagein();
};
const pagein = () => {
  return obj.posts.slice((currentPage.value - 1) * 15, currentPage.value * 15);
};
const topostbyindex = (item) => {
  router.push({ name: "post", params: { serch: item } });
};
</script>

<style scoped>
.el-pagination {
  margin-left: 40%;
}
</style>