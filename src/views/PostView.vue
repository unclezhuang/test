<template>
  
    <!-- 渲染主贴 -->
    <div class="main"><post :post="posts[0]" :postId="postId" /></div>
    <!-- 渲染回复贴 -->
      <div class="reply" v-for="(reply, index) in posts.slice(1)" :key="index">
     <post :post="reply" :postId="postId + index"/>
    </div>
  
</template>
  
  <script lang="ts">
import axios from "axios";
import post from "./post.vue"
export default {
  components: {
    post
  },
  data() {
    return {
      posts: [
        {
          title: "这是主贴",
          content: `主贴的内容la。
             这是第一行新的文字。
             这是第二行新的文字。
              这是第三行新的文字。`,
        },
        {
          title: "这是回复贴1",
          content: "回复贴1的内容",
        },
        {
          title: "这是回复贴2",
          content: "回复贴2的内容",
        },
      ],
      postId: Date.now(),
    };
  },
  methods: {
  },
};
</script>
<style>
.main{
  width: 100%;
  height: 25%;
  border: 1px solid rgb(24, 24, 24);
  padding: 0;
  margin: 0;
}
.reply{
  width: 100%;
  height: 25%;
  border: 1px solid rgb(5, 5, 5);
  padding: 0;
  margin: 0;
}
</style>