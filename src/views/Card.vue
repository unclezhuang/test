<template>
  <el-row>
    <el-col
      v-for="(item, index) in data"
      :key="item.id"
      :span="6"
      :offset="index % 3 > 0 ? 2 : 0"
    >
      <el-card style="margin: 5%" :body-style="{ padding: '10%' }">
        <img :src="item.url" class="image" />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <el-row class="mb-4">
            <el-button type="primary">Primary</el-button>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  
</template>
  
  <script lang="ts" setup>
import { ref, reactive } from "vue";
import axios from 'axios'
const data = reactive([]);
const text = function () {
    axios.get("http://jsonplaceholder.typicode.com/photos").then((res) => data.push(...res.data))
};
text();
console.log(data);
</script>
  
  <style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 100%;
}
</style>
  