<template>
  <div class="persion">
    <profile-card
      :avatar="avatar"
      :nickname="nickname"
      :age="age"
      :gender="gender"
      :email="email"
      :score="score"
      :posts="posts"
      :notes="notes"
      @edit-profile="this.isEditing = !this.isEditing"
    ></profile-card>
    <div class="button1">
      <edit-profile-form
        v-if="isEditing"
        :formData="null"
        @save-profile="saveProfile"
        @cancel-edit-profile="this.isEditing = false"
      ></edit-profile-form>
    </div>
  </div>
  <div class="post-list">
    <div class="new-post">
      <my-form ref="myFormRef"></my-form>
      <el-button class="write" type="success" @click="showForm"
        >写帖子</el-button
      >
      <h2>历史发布的帖子</h2>
    </div>
    <!-- 历史发布的帖子 -->
    <div class="history-post">
      <!-- 如果用户没有发布过帖子则显示提示信息 -->
      <div class="no-post" v-if="!hasPost">还没有发过帖子</div>

      <!-- 如果用户已经发布过帖子则显示帖子列表 -->
      <ul v-else>
        <!-- 根据 v-for 循环遍历每个帖子并渲染 -->
        <li
          v-for="post in postList"
          :key="post.id"
          @click="
            router.push({
              name: 'post',
              params: { serch: JSON.stringify(post) },
            })
          "
        >
          {{ post.title }} {{ post.post_id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ProfileCard from "./ProfileCard.vue";
import EditProfileForm from "./EditProfileForm.vue";
import MyForm from "./writeFrom.vue";
import { state } from "./shared.js";
import { useRouter } from "vue-router";
import { service } from "../request/index";
export default {
  components: {
    "profile-card": ProfileCard,
    "edit-profile-form": EditProfileForm,
    "my-from":MyForm,
  },
  data() {
    const router = useRouter();
    return {
      avatar: "https://picsum.photos/200",
      nickname: "myValue",
      age: 25,
      gender: "male",
      email: "john@example.com",
      score: 100,
      posts: 0,
      notes: "",
      isEditing: false,
      hasPost: true, // 根据用户的历史发布是否存在来判断
      postList: [],
      router,
    };
  },
  created() {
    // 在创建组件实例时调用 loadPosts() 方法获取所有历史发布的帖子
    this.loadPosts();
  },
  methods: {
    saveProfile(formData) {
      this.avatar = formData.avatar ? formData.avatar : this.avatar;
      this.nickname = formData.nickname ? formData.nickname : this.nickname;
      this.age = formData.age ? formData.age : this.age;
      this.gender = formData.gender ? formData.gender : this.gender;
      this.email = formData.email ? formData.email : this.email;
      this.notes = formData.notes ? formData.notes : this.notes;
      this.isEditing = false
    },
    async loadPosts() {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      service
        .get(
          "api/v1/user/0xD5b631d1F9189E7393a0e155E02C0d3513f6AFA8/getuserInformation"
        )
        .then((res) => {
          this.avatar = res.data.data.head_picture;
          this.nickname = res.data.data.user_name;
          this.age = res.data.data.age;
          this.gender = res.data.data.gender;
          this.email = res.data.data.eamil;
          this.score = res.data.data.balance;
          this.notes = res.data.data.signature;
        });
      service.get("api/v1/user/" + accounts + "/PostFromUser").then((res) => {
        this.postList.push(res.data.data);
        this.posts = this.postList.length
      });
    },
  },
  setup() {
    const myFormRef = ref(null); // 引用子组件
    const showForm = () => {
      myFormRef.value && myFormRef.value.showForm(); // 调用子组件的方法
    };
    return {
      myFormRef,
      showForm,
    };
  },
};
</script>

<style>
.persion {
  width: 33.33%;
  float: left;
}
.post-list {
  display: flex;
  flex-direction: column;
}

.new-post {
  height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

.new-post a {
  font-size: 20px;
  color: #333;
  text-decoration: none;
  margin-right: 10px;
}

.history-post {
  flex: 1;
  margin-top: 10px;
  padding: 10px;
  background-color: #f4f4f4;
}

.no-post {
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
</style>
