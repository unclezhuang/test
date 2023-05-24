<template>
  <div>

    <div class="tags-wrapper">
      <div style="width: 33.33%" class="tags">
        <router-link to="/defo/posts">
          <el-button text>区块链技术</el-button></router-link
        >
      </div>
      <div style="width: 33.33%" class="tags2">
        <router-link to="/defo/posts">
          <el-button text>大数据</el-button></router-link
        >
      </div>
      <div style="width: 33.33%" class="tags3">
        <router-link to="/defo/posts">
          <el-button text>人工智能</el-button></router-link
        >
      </div>
    </div>
    <div style="width: 33.33%; float: left" v-for="i in obj" :key="i">
      <el-card
        v-for="(item, index) in i"
        :key="item.id"
        style="width: 90%; margin-bottom: 10%"
        @click="detail(item,index)"
      >
        <el-image
          style="width: 100%; height: 150px"
          src="https://picsum.photos/300/150"
        ></el-image>
        <div style="padding: 14px">
          <h3 style="font-size: 18px">帖子编号：{{ item.id }}</h3>
          <p>作者：{{ item.userId }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
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
    const detail = (item,index) => {
      console.log(index);
      router.push({ name: "post"});
    };
    const first = async function () {
      axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.dataBC.push(...res.data));
      axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.dataBD.push(...res.data));
      axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.dataAI.push(...res.data));
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