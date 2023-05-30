<template>
  <div class="top">
    <div class="tags-wrapper">
      <div style="width: 33.33%" class="tags">
        <router-link :to="{ name: 'posts', params: { serch: '区块链技术' } }">
          <el-button text>区块链技术</el-button></router-link
        >
      </div>
      <div style="width: 33.33%" class="tags2">
        <router-link :to="{ name: 'posts', params: { serch: '大数据' } }">
          <el-button text>大数据</el-button></router-link
        >
      </div>
      <div style="width: 33.33%" class="tags3">
        <router-link :to="{ name: 'posts', params: { serch: '人工智能' } }">
          <el-button text>人工智能</el-button></router-link
        >
      </div>
    </div>
    <div style="width: 33.33%; float: left" v-for="i in obj" :key="i">
      <el-card
        v-for="item in i"
        :key="item.id"
        style="width: 90%; margin-bottom: 10%"
        @click="detail(item)"
      >
        <el-image
          style="width: 100%; height: 150px"
          :src="item.url"
        ></el-image>
        <div style="padding: 14px">
          <h3 style="font-size: 18px">标题：{{ item.title.String }}</h3>
          <p>作者：{{ item.author_name }}</p>
          <p>{{ item.time }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { service } from "../request/index.ts";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const obj = reactive({
      dataBC: [],
      dataBD: [],
      dataAI: [],
    });
    const detail = (item) => {
      router.push({ name: "post", params: { serch: item.title } });
    };
    const first = async function () {
      service
        .get("api/v1/post/like-content/区块链技术")
        .then((res) => obj.dataBC.push(...res.data.data));
      service
        .get("api/v1/post/like-content/大数据")
        .then((res) => obj.dataBD.push(...res.data.data));
      service
        .get("api/v1/post/like-content/人工智能")
        .then((res) => obj.dataAI.push(...res.data.data));
    };
    first();
    return {
      obj,
      detail,
    };
  },
};
</script>
<style scoped>
.tags-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* 距离上一行的距离，可自行调整 */
}
.tags,
.tags2,
.tags3 {
  display: flex;
  justify-content: center;
}
</style>