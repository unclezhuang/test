<template>
    <div v-for="item in pagedItems" :key="item.id" style="margin:1%">
        <div>标题：{{ item.title }}</div>
        <div>内容：{{ item.body }}</div>
    </div>
    <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage == 1">上一页</button>
        <span v-for="page in pageCount" :key="page" :class="{ active: currentPage == page }" @click="currentPage = page">{{ page }}</span>
        <button @click="currentPage++" :disabled="currentPage == pageCount">下一页</button>
      </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive, ref, computed} from 'vue';

const obj = ref([])
const currentPage = ref(1)
const pageSize = 10

const first = async function () {
  const res = await axios.get("http://jsonplaceholder.typicode.com/posts")
  obj.value = res.data
};

first();

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = currentPage.value * pageSize
  return obj.value.slice(start, end)
})

const pageCount = computed(() => {
  return Math.ceil(obj.value.length / pageSize)
})
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    margin-right: 10px;
  }
  
  .pagination .active {
    color: red;
  }
</style>
