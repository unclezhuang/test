<template>
  <div>
    {{  posts }}
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
    console.log("数据测试：",route.params.serch)
    console.log("haihao")
    const index = JSON.parse(route.params.serch)
    console.log(index)
    
    return {
      index,
      post:{},
      posts: [
      ],
      postId: Date.now(),
    };
  },
  methods: {
    serchbyid(){
      console.log("nihoa")
      service
        .get("api/v1/post/getpost/"+ this.index.post_id)
        .then((res) => this.posts = res.data.data);
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