<template>
  <div>
    <div style="width: 33.33%;float:left">
      <el-card v-for="item in onlyfive()" :key="item.id" style="width:90%;">
          <el-image style="width: 100%; height: 150px;" src="https://picsum.photos/300/150" ></el-image>
          <div style="padding: 14px;">
            <h3 style="font-size: 18px">帖子编号：{{ item.id }}</h3>
            <p>作者：{{ item.userId }}</p>
          </div>
      </el-card>
    </div> 
  </div>
</template>

<script lang="ts">
import HttpClient from "../ajxos/ajxos";
import { onMounted, reactive } from 'vue'
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
    const onlyfive = () => {
      return data.splice(0,5)
    }
    onlyfive()
    console.log(data)
   
    return{
      text,
      data,
      onlyfive
    }
    }
  }
</script>
