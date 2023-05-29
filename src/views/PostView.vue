<template>
  <div>
    fdafadfaf
    <!-- 渲染主贴 --><div class="postimg">
    <post :post="posts[0]" :postId="postId" /></div>
    <!-- 渲染回复贴 -->
    <post
      v-for="(reply, index) in posts.slice(1)"
      :key="index"
      :post="reply"
      :postId="postId + index"
    />
    {{ index }}
    <div class="reply"><textarea></textarea><el-button type="info" round>Info</el-button></div>
  </div>
</template>
  
  <script lang="ts">
import axios from "axios";
import post from "./post.vue"
import { useRoute } from "vue-router";
export default {
  components: {
    post
  },
  data() {
    const route = useRoute()
    const index = route.params.index
    return {
      index,
      route,
      post:{},
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
    serchbyid(){
      console.log("nihoa")
      axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => this.posts.push(...res.data));
    }
  },
  created() {
      this.serchbyid()
  },

};
</script>
<style>
.postimg{
  background-image: url("../img/少女熊猫.jpg");
}
</style>