<template>
  <div>
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
          border-radius: 50%;
        "
      >
        <img src="../img/toTop.png" style="height: 100%" />
      </div>
    </el-backtop>
    <div class="tags-wrapper">
      <div style="width: 33.33%" class="tags">
        <el-button text>区块链技术</el-button>
      </div>
      <div style="width: 33.33%" class="tags2">
        <el-button text>大数据</el-button>
      </div>
      <div style="width: 33.33%" class="tags3">
        <el-button text>人工智能</el-button>
      </div>
    </div>
    <div style="width: 33.33%; float: left" v-for="i in obj" :key="i">
      <el-card
        v-for="(item,index) in i"
        :key="item.id"
        style="width: 90%; margin-bottom: 10%"
        @click="detail(index)"
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
export default {
  setup() {
    const obj = reactive({
      dataBC: [],
      dataBD: [],
      dataAI: [],
    });
    const detail = (index) => {
      console.log(index)
    }
    const first = async function () {
      await axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.dataBC.push(...res.data));
      await axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.dataBD.push(...res.data));
      await axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.dataAI.push(...res.data));
    };
    first();
    return {
      obj,
      detail
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