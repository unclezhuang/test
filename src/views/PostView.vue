<template>
  <div class="total">
    <div class="left-part">
      <img
        class="photo"
        src="../img/少女熊猫.jpg"
        style="width: 100%"
      />
      <div class="author">
        <p>昵称</p>
        <p>账号</p>
        <p>粉丝数</p>
        <button>关注</button>
      </div>
    </div>

    <div class="middle-part">
      <!-- 渲染主贴 -->
      <div class="postimg post-border">
        <post :post="posts[0]" :postId="postId" />
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

    <div class="right-part">
      <ul>
        <p><button id="one">点赞</button></p>
        <p><button id="two">收藏</button></p>
        <p><button id="three">分享</button></p>
      </ul>
    </div>
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
  margin-left: 17%;
  margin-right: 5%;
}
.left-part {
  width: 10%;
  height:100%;
  position: fixed;
}
.right-part {
  position:fixed;
}
.photo {
  display: block;
  margin: auto;
  border-radius: 50%;
}
.author {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: space-around;

}

.middle-part{
  min-height: 500px;
  width: 70%;
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
/*
.comment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
*/
.left-part p{
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
  height:25%;
}

.left-part button {
  width: 100%;
  height:60px;
  border:none;
  background-color:rgb(35, 225, 162);
  border-radius: 50%;
  margin-top:20px;
}
.right-part button{
  margin: auto;
  width:4rem;
  height:4rem;
  border-radius: 50%;
  border:none;
}
#one{
color:pink;
}

.right-part p{
margin-top:25px;
}

</style>