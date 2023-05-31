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
      @edit-profile="showEditForm"
    ></profile-card>
   <div class="button1"> <edit-profile-form
      v-if="isEditing"
      @save-profile="saveProfile"
      @cancel-edit-profile="hideEditForm"
    ></edit-profile-form></div>
  </div>
  <div class="post-list">
    <div class="new-post">
      <my-form ref="myFormRef"></my-form>
    <el-button class="write" type="success" @click="showForm">写帖子</el-button>
      <h2>历史发布的帖子</h2>
    </div>

    <!-- 历史发布的帖子 -->
    <div class="history-post">
      <!-- 如果用户没有发布过帖子则显示提示信息 -->
      <div class="no-post" v-if="!hasPost">还没有发过帖子</div>

      <!-- 如果用户已经发布过帖子则显示帖子列表 -->
      <ul v-else>
        <!-- 根据 v-for 循环遍历每个帖子并渲染 -->
        <li v-for="post in postList" :key="post.id" @click="router.push({name:'post',params:{serch: post.id}})">{{ post.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ProfileCard from "./ProfileCard.vue";
import EditProfileForm from "./EditProfileForm.vue";
import MyForm from './writeFrom.vue';
import { state } from "./shared.js";
import { useRouter } from "vue-router";
export default {
  components: {
    "profile-card": ProfileCard,
    "edit-profile-form": EditProfileForm,
    MyForm,
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
      postList: [] ,
      router
    };
  },
  created() {
    // 在创建组件实例时调用 loadPosts() 方法获取所有历史发布的帖子
    this.loadPosts();
  },
  methods: {
    showEditForm() {
      this.isEditing = true;
    },
    hideEditForm() {
      this.isEditing = false;
    },
    saveProfile(formData) {
      this.avatar = formData.avatar ? formData.avatar : this.avatar;
      this.nickname = formData.nickname ? formData.nickname : this.nickname;
      this.age = formData.age ? formData.age : this.age;
      this.gender = formData.gender ? formData.gender : this.gender;
      this.email = formData.email ? formData.email : this.email;
      this.notes = formData.notes ? formData.notes : this.notes;
      this.hideEditForm();
    },
    loadPosts() {
      setTimeout(() => {
        this.postList = [
          { id: 1, title: "Hello World" },
          { id: 2, title: "Vue.js" },
          { id: 3, title: "React" },
          { id: 4, title: "Angular" }
        ];
        this.hasPost = this.postList.length > 0;
      }, 1000);
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
.persion{
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
