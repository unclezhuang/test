<template>
  <el-container v-if="posts[0] && postAutor">
    <el-aside width="20%"
      ><img
        :src="postAutor.head_picture"
        style="border-radius: 50%; width: 100%"
      />
      <div>
        姓名： {{ postAutor.user_name }} <br />
        年龄：{{ postAutor.age }} <br />
        邮箱：{{ postAutor.eamil }} <br />
        性别：{{ postAutor.gender ? "男" : "女" }}<br />
        签名：{{ postAutor.signature }} <br />
        等级：{{ postAutor.level }} <br />
        <div class="demo-progress">
          经验：{{ postAutor.experience }}
          <el-progress
            :percentage="(postAutor.experience / (500 * postAutor.level)) * 100"
            :text-inside="true"
            :stroke-width="26"
            :duration="6"
            color="#b1b3b8"
            :striped="true"
            :striped-flow="true"
            style="width: 100%"
          />
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-main>
        <div>标题：{{ posts[0].title.String }}</div>
        <div>
          <div class="post one">
            内容：
            <span class="one-line">第 {{ 1 }} 楼: </span>
            <el-text>{{ posts[0].content }}</el-text>
          </div>
          <div
            class="post two"
            v-for="(reply, index) in postReply()"
            :key="index"
          >
            第 {{ index + 2 }} 楼:
            {{ reply.content }}
            <span class="auter">{{ reply.author_name }}</span>
          </div>
        </div></el-main
      >
      <el-footer
        ><div class="reply">
          <el-input
            v-model="reply"
            autosize
            type="textarea"
            placeholder="评论.(Ctrl + Enter 换行)"
            @keydown="replyPostByPostIdAndkeydown"
            resize="none"
          /><el-button type="info" round @click="replyPostByPostId"
            >评论</el-button
          >
        </div></el-footer
      >
    </el-container>
  </el-container>
</template>
  
  <script lang="ts">
import { ref, reactive, h } from "vue";
import { service } from "../request/index.ts";
import { useRoute } from "vue-router";
import { getCookie } from "../help/cookie.ts";
import { ElNotification } from "element-plus";
import { SaveFilecontract, getSigner } from "../help/contract";
export default {
  data() {
    const reply = ref("");
    const route = useRoute();
    console.log("这是刷新的测试", route.params.serch);
    const index = JSON.parse(route.params.serch);
    console.log(index);
    const toBack = reactive({
      content: "",
      author_address: "",
    });
    return {
      postAutor: ref(),
      toBack,
      index,
      reply,
      post: {},
      posts: reactive([]),
      postId: Date.now(),
    };
  },
  methods: {
    async serchbyid() {
      await service
        .get("api/v1/post/getpost/" + this.index.post_id)
        .then((res) => (this.posts = res.data.data));
      await service
        .get(
          "api/v1/user/" + this.posts[0].author_address + "/getuserInformation"
        )
        .then((res) => (this.postAutor = res.data.data));
      const signer = await getSigner();
      const SaveFilecontractt = SaveFilecontract(signer);
      await SaveFilecontractt.getUserInfo(
        "" + this.posts[0].author_address
      ).then((res) => {
        this.postAutor.level = res[0].toString();
        this.postAutor.experience = res[1].toString();
        console.log(res[0]);
        console.log(res[1]);
      });
    },
    async replyPostByPostIdAndkeydown(event) {
      if (this.reply != "") {
        if (event.ctrlKey && event.keyCode === 13) {
          event.preventDefault(); // 阻止文本框默认的换行行为
          this.reply = this.reply + "\n"; // 插入换行符 // 将光标移动到换行符后面
        } else if (event.keyCode === 13) {
          event.preventDefault(); // 阻止文本框默认的换行行为
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
              message: h(
                "i",
                { style: "color: red" },
                "回复前请先登陆！！！！"
              ),
            });
          }
        }
      }
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
  margin-top: 15px;
  text-align: center;
  display: flex;
}

.textreply {
  resize: none;
  width: 100%;
}

.post {
  flex-grow: 1;
  min-height: calc(100% / 10);
  height: auto;
  padding: 10px;
  margin-bottom: 0%;
  border: 0;
  border-style: none;
  border-color: transparent;
  background-color: #ffffff;
}
.one {
  min-height: calc(100% / 4) !important;
  margin-bottom: 15px;
}

.two {
  border-bottom: 1px solid #ccc;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

el-aside {
  position: absolute;
  top: 20%;
}

.introduce ul {
  margin-top: 5%;
  list-style: none;
}

.introduce li {
  margin-top: 5%;
}

.one-line {
  color: #a8abb2;
}

.two-line {
  margin-top: 15px;
}
.auter {
  float: right;
}
</style>
