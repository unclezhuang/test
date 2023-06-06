<template>
  {{ index }}
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
            :percentage="(postAutor.experience/500*postAutor.level)*100"
            :format="format"
            :text-inside="true"
            :stroke-width="26"
            :duration="6"
            color="#b1b3b8"
            :striped="true"
            :striped-flow="true"
          />
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-main>
        <div>
          <div class="post">
            <span>第 {{ 1 }} 楼: </span>
            <el-text>{{ posts[0].content  }}</el-text>
            

            {{ posts[0].author_name }}
          </div>
          <div class="post" v-for="(reply, index) in postReply()" :key="index">
            第 {{ index + 2 }} 楼
            {{ reply.content }}
            {{ reply.author_name }}
          </div>
        </div></el-main
      >
      <el-footer
        ><div class="reply">
          <textarea class="textreply" v-model="reply"></textarea
          ><el-button type="info" round @click="replyPostByPostId"
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
import { SaveFilecontract,getSigner} from "../help/contract"
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
    const format = (percentage) =>
      percentage === 100 ? "Full" : `${percentage}%`;
    return {
      format,
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
        const signer = await getSigner()
      const SaveFilecontractt = SaveFilecontract(signer)
        await SaveFilecontractt.getUserInfo(""+this.posts[0].author_address).then((res) => {
        this.postAutor.level = res[0].toString()
        this.postAutor.experience = res[1].toString()
        console.log(res[0])
        console.log(res[1])
      })
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
  height: calc(100% / 20);
  padding: 10px;
  margin-bottom: 0%;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
el-aside {
  position: absolute;
  top: 20%;
}
el-aside {
  position: absolute;
}
</style>