<template>
  <div class="total">
    <div class="left-part">
      <img
        class="photo"
        src="../img/少女熊猫.jpg"
        style="width: 150px; height: 150px"
      />
      <div class="author">
        <p4>昵称</p4>
        <p4>账号</p4>
        <p4>粉丝数</p4>
        <button>关注</button>
      </div>
    </div>

    <div class="middle-part">
      fdafadfaf
      <!-- 渲染主贴 -->
      <div class="postimg post-border">
        <post :post="posts[0]" :postId="postId" />
        <div class="comment">
          <span><button>点赞</button></span>
          <span><button>评论</button></span>
          <span><button>分享</button></span>
        </div>
      </div>
      <!-- 渲染回复贴 -->
      <post
        class="reply-border"
        v-for="(reply, index) in posts.slice(1)"
        :key="index"
        :post="reply"
        :postId="postId + index"
      />
      {{ index }}
      <div class="reply">
      <textarea></textarea><el-button type="info" round>Info</el-button>
      </div>
    </div>

    <div class="right-part"></div>
  </div>
</template>
  
  <script lang="ts">
import axios from "axios";
import post from "./post.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    post,
  },
  data() {
    const route = useRoute();
    const index = route.params.index;
    return {
      index,
      route,
      post: {},
      posts: [
        {
          title: "这是主贴",
          content: `主贴的内容la。`,
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
    serchbyid() {
      console.log("nihoa");
      axios
        .get("http://jsonplaceholder.typicode.com/posts")
        .then((res) => this.posts.push(...res.data));
    },
  },
  created() {
    this.serchbyid();
  },
};
</script>

<style>
.total{
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.left-part {
  position: fixed;
  left: 50px;
  top: 30px;
  width: 200px;
  height: 300px;
  margin-top: 100px;
}
.photo {
  display: block;
  margin: auto;
  border-radius: 50%;
}
.author {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
}

.middle-part{
  position: fixed;
  right:50px;
  height: 100%;
  overflow: auto; 
}
.postimg {
  background-color: white;
  position: relative;
}
.post-border {
  border: solid black 1px;
  padding: 10px;
  width: 650px;
  height: 300px;
}
.middle-partreply{
  height:20px;
}
.reply-border {
  border: solid black 1px;
  padding: 10px;
  background-color: white;
  width: 650px;
  margin-top: 10px;
}
.comment {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  width: 550px;
  height: 20px;
  border: 1;
  position: absolute;
  bottom: 0;
}
.comment button {
  width: 80px;
  height: 40px;
  background-color: rgb(50, 162, 237);
}

button {
  width: 150px;
  height: 50px;
}
</style>