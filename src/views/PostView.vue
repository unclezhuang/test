<template>
    <div>
      <!-- 渲染主贴 -->
      <post :post="posts[0]" :postId="postId" />
      <!-- 渲染回复贴 -->
      <post v-for="(reply, index) in posts.slice(1)" :key="index" :post="reply" :postId="postId + index" />
    </div>
  </template>
  
  <script>
  import Post from "./Post.vue";
  
  export default {
    components: {
      Post,
    },
    data() {
      return {
        posts: [
          {
            title: "这是主贴",
            content: `主贴的内容la。
             这是第一行新的文字。
             这是第二行新的文字。
              这是第三行新的文字。`
            ,
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
  };
  </script>