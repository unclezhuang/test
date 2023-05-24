<template>
  <div>
    <div class="tags-wrapper">
      <div style="width: 33.33%" class="tags"><button>区块链技术</button></div>
      <div style="width: 33.33%" class="tags2"><button>大数据</button></div>
      <div style="width: 33.33%"  class="tags3"><button>人工智能</button></div>
    </div>
    <div style="width: 33.33%;float:left;" v-for="i in 3" :key="i">
      <el-card v-for="item in data" :key="item.id" style="width:90%;margin-bottom:10%">
          <el-image style="width: 100%; height: 150px;" src="https://picsum.photos/300/150" ></el-image>
          <div style="padding: 14px;">
            <router-link to="/defo/Post"  style="font-size: 18px">帖子编号：{{ item.id }}</router-link>
            <p>作者：{{ item.userId }}</p>
          </div>
      </el-card>
    </div> 
  </div>
</template>

<script lang="ts">
import HttpClient from "../ajxos/ajxos";
import { onMounted, reactive } from 'vue';

  export default {

    setup(){
      const data = reactive([])
      const text = function () {
      const httpClient = new HttpClient("https://api.example.com");



      httpClient
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => data.push(...res.data))
        .catch((error) => console.error(error));
    };
    text()
    console.log(data)
   
    return{
      text,
      data,
    }
    }
  }

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