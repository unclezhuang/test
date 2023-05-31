<template>
  <div class="total">
    <div class="left-part">
      <img
        class="photo"
        src="../img/少女熊猫.jpg"
        style="width: 100%"
      />
      <div class="author">
        <p4>昵称</p4>
        <p4>账号</p4>
        <p4>粉丝数</p4>
        <button>关注</button>
      </div>
    </div>

    <div class="middle-part">
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
  /* display: flex; */
  position: relative;
  justify-content: space-between;
  width: 100%;
  /* 距离上一行的距离，可自行调整 */
}
.left-part,.middle-part,.right-part{
display: inline-block;
}
.middle-part{
margin-left: 20%;
}
.left-part {
  width: 10%;
  position: fixed;
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
  min-height: 500px;
  width: 80%;
}
.postimg {
  background-color: white;
  position: relative;
}
.post-border {
  border: solid black 1px;
  padding: 10px;
}
.reply-border {
  border: solid black 1px;
  background-color: white;
  margin-top: 10px;
  height: 20%;
}
.comment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /*垂直居中*/
  align-items: center;
}
.comment button {

  background-color: rgb(50, 162, 237);
}

button {
  width: 10rem;
  height: 4rem;
}
</style>