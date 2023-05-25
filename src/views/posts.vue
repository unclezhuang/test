<template>
    <div v-for="item in obj" :key="item.id" style="margin:1%">
        <div>标题：{{ item.title }}</div>
        <div>内容：{{ item.body }}</div>
        <div>测试内容：{{ serch }}</div>
    </div>
    
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive, ref } from 'vue';
import { useRoute } from "vue-router";
const obj = reactive([])
const posts = useRoute()
const serch = posts.params.serch
const first = async function () {
      axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => obj.push(...res.data));
    };
    first();
    console.log(obj)
</script>

<style scoped>

</style>