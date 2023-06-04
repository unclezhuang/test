<template>
  {{ posts.params.serch }}
  <div class="serchposts"
    v-for="item in pagein()"
    :key="item.id"
    style="margin: 1%"
    @click="topostbyindex(item)"
  >
    <el-image style="width: 10%; height: 5%" :src="item.picture_url"></el-image>
    <div>标题：{{ item.title.String }}</div>
    <div>内容：{{ item.content }}......</div>
    <div>作者：{{ item.author_name }}</div>
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
.serchposts {
  min-height:calc(100% / 4) !important; 
  
}
</style>