<template>
  <div>
    {{ index }}
    jfadjfoai
    <!-- 渲染主贴 --><div class="postimg">
    <post :post="posts[0]" :postId="postId" /></div>
    <!-- 渲染回复贴 -->
    <post
      v-for="(reply, index) in posts.slice(1)"
      :key="index"
      :post="reply"
      :postId="postId + index"
    />
    <div class="reply"><textarea class="textreply"></textarea><el-button type="info" round>Info</el-button></div>
  </div>
</template>
  
  <script lang="ts">
import { service } from "../request/index.ts";
import post from "./post.vue"
import { useRoute } from "vue-router";
export default {
  components: {
    post
  },
  data() {
    const route = useRoute()
    const index = JSON.parse(route.params.serch).id
    console.log(index)

    return {
      index,
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
    test() {
      console.log("haihaohfi")
      service.get("api/v1/post/getallpost/bypost_key").then((res) => console.log(res));
      
    },
    serchbyid(){
      console.log("nihoa")
      service
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => this.posts.push(...res.data));
    }
  },
  created() {
      this.serchbyid(),
      this.test()
  },

};
</script>
<style>
.postimg{
  background-image: url("../img/少女熊猫.jpg");
}
.reply{
  text-align: center;
  justify-content: center;
  display: flex;
}
.textreply{
  resize: none;
  width:90%;

}

</style>