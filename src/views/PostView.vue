<template>
  <div>
    <!-- {{ posts }} -->
    <el-container>
      <!-- 固定在屏幕位置 -->
      <el-aside width="20%"><img :src="posts[0].picture_url" style="border-radius: 50%;width:100%"> </el-aside>
      <el-container>
        <el-main
          ><div class="post">
            第 {{ 1 }} 楼
            {{ posts[0].content }}
            {{ posts[0].author_name }}
          </div>
          <div class="post" v-for="(reply, index) in postReply()" :key="index">
            第 {{ index + 2 }} 楼
            {{ reply.content }}
            {{ reply.author_name }}
          </div></el-main
        >
        <el-footer
          ><div class="reply">
            <textarea class="textreply" v-model="reply"></textarea
            ><el-button type="info" round @click="replyPostByPostId"
              >Info</el-button
            >
          </div></el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>
  
  <script lang="ts">
import { ref, reactive, h } from "vue";
import { service } from "../request/index.ts";
import { useRoute } from "vue-router";
import { getCookie } from "../help/cookie.ts";
import { ElNotification } from "element-plus";
export default {
  data() {
    const reply = ref("");
    const route = useRoute();
    console.log("数据测试：", route.params.serch);
    console.log("haihao");
    const index = JSON.parse(route.params.serch);
    console.log(index);
    const toBack = reactive({
      content: "",
      author_address: "",
    });
    return {
      toBack,
      index,
      reply,
      post: {},
      posts: reactive([]),
      postId: Date.now(),
    };
  },
  methods: {
    serchbyid() {
      service
        .get("api/v1/post/getpost/" + this.index.post_id)
        .then((res) => (this.posts = res.data.data));
    },
    async replyPostByPostId() {
      if (getCookie(await ethereum.request({ method: "eth_accounts" }))) {
        console.log(this.reply);
        this.toBack.content = this.reply;
        console.log(await ethereum.request({ method: "eth_accounts" }));
        const address = await ethereum.request({ method: "eth_accounts" });
        this.toBack.author_address = address.toString();
        this.reply = "";
        console.log(this.toBack.author_address);
        await service.post(
          "api/v1/post/" + this.posts[0].post_id + "/response/",
          JSON.stringify(this.toBack)
        );
        service
          .get("api/v1/post/getpost/" + this.index.post_id)
          .then((res) => (this.posts = res.data.data));
      } else {
        console.log("请先登录！");
        ElNotification({
          title: "请登录",
          message: h("i", { style: "color: red" }, "回复前请先登陆！！！！"),
        });
      }
    },
    postReply() {
      return this.posts.filter((num, index) => index > 0);
    },
  },
  created() {
    this.serchbyid();
  },
};
</script>
<style>
.reply {
  text-align: center;
  justify-content: center;
  display: flex;
}
.textreply {
  resize: none;
  width: 90%;
}
.post {
  flex-grow: 1;
  height: calc(100% / 5);
  padding: 10px;
  margin-bottom: 10px;
}
el-aside {
  position: absolute;
}
</style>