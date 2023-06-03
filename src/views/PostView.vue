<template>
  <div>
    {{ posts }}
    <!-- 渲染主贴 -->
    <div class="postimg">
      <post :post="posts[0]" :postId="postId" />
    </div>
    <!-- 渲染回复贴 -->
    <post
      v-for="(reply, index) in postReply()"
      :key="index"
      :post="reply"
      :postId="postId + index"
    />
    <div class="reply">
      <textarea class="textreply" v-model="reply"></textarea
      ><el-button type="info" round @click="replyPostByPostId">Info</el-button>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { ref, reactive } from 'vue'
import { service } from "../request/index.ts";
import post from "./Post.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    post,
  },
  data() {
    const reply = ref('')
    const route = useRoute();
    console.log("数据测试：", route.params.serch);
    console.log("haihao");
    const index = JSON.parse(route.params.serch);
    console.log(index);
    const toBack = reactive({
      content:'',
      author_address:''
    })
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
      console.log(this.reply)
      this.toBack.content = this.reply;
      console.log(await ethereum.request({ method: "eth_accounts" }))
      const address = await ethereum.request({ method: "eth_accounts" })
      this.toBack.author_address = address.toString()
      this.reply = ''
      console.log(this.toBack.author_address)
      await service.post('api/v1/post/'+this.posts[0].post_id+'/response/', JSON.stringify(this.toBack)).then(console.log(111111111))

      service
        .get("api/v1/post/getpost/" + this.index.post_id)
        .then((res) => (this.posts = res.data.data));
    },
    postReply(){
    return this.posts.filter((num,index) => index > 0)
    }
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
</style>