<template>
  <div class="persion">
    <profile-card
      :avatar="this.formData.avatar"
      :nickname="this.formData.nickname"
      :age="this.formData.age"
      :gender="this.formData.gender"
      :email="this.formData.email"
      :score="score"
      :posts="posts"
      :notes="this.formData.notes"
      @edit-profile="this.isEditing = !this.isEditing"
    ></profile-card>
    <div class="button1">
      <edit-profile-form
        v-if="isEditing"
        :formData="this.formData"
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
      <div class="demo-progress">
      <el-progress :percentage="50" />
      </div>
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
import { ref, reactive } from "vue";
import ProfileCard from "./ProfileCard.vue";
import EditProfileForm from "./EditProfileForm.vue";
import MyForm from "./writeFrom.vue";
import { state } from "./shared.js";
import { useRouter } from "vue-router";
import { service } from "../request/index";
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
export default {
  components: {
    "profile-card": ProfileCard,
    "edit-profile-form": EditProfileForm,
    MyForm,
  },
  data() {
    const router = useRouter();
    return {
      formData: reactive({
        avatar: null,
        nickname: "",
        age: null,
        gender: "",
        email: "",
        notes: "",
      }),
      score: 100,
      posts: 0,
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
      this.formData.avatar = formData.avatar ? formData.avatar : this.avatar;
      this.formData.nickname = formData.nickname
        ? formData.nickname
        : this.nickname;
      this.formData.age = formData.age ? formData.age : this.age;
      this.formData.gender = formData.gender ? formData.gender : this.gender;
      this.formData.email = formData.email ? formData.email : this.email;
      this.formData.notes = formData.notes ? formData.notes : this.notes;
      this.isEditing = false;
    },
    async loadPosts() {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      service
        .get("api/v1/user/" + accounts + "/getuserInformation")
        .then((res) => {
          console.log(res.data.data);
          this.formData.avatar = res.data.data.head_picture;
          this.formData.nickname = res.data.data.user_name;
          this.formData.age = res.data.data.age;
          this.formData.gender = res.data.data.gender;
          this.formData.email = res.data.data.eamil;
          this.formData.score = res.data.data.balance;
          this.formData.notes = res.data.data.signature;
        });
      await service
        .get("api/v1/user/" + accounts + "/PostFromUser")
        .then((res) => {
          this.postList.push(...res.data.data);
          this.posts = this.postList.length;
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
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
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
