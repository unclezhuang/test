<!-- <template>
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
    </div> -->

    <!-- 历史发布的帖子 -->
    <!-- <div class="history-post">
     
      <div class="no-post" v-if="!hasPost">还没有发过帖子</div> 

     
      <ul v-else>
       
        <li v-for="post in postList" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </div>
</template> -->

<!-- <script>
import { ref } from 'vue';
import ProfileCard from "./ProfileCard.vue";
import EditProfileForm from "./EditProfileForm.vue";
import MyForm from './writeFrom.vue';
import { state } from "./shared.js";
export default {
  components: {
    "profile-card": ProfileCard,
    "edit-profile-form": EditProfileForm,
    MyForm,
  },
  data() {
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
</script> -->

<!-- <style>
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

</style> -->


<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="left">
        <div class="avatar">
      <img src="../img/少女熊猫.jpg" alt="image description" style=" width: 135px; height: 135px; margin-left:15%; margin-top:20%; border-radius: 50%; border: 5px solid yellow; box-sizing: border-box;">
      <button class="profile-button">编辑个人资料</button>
      <button class="post-button">写帖子</button>
    </div>
        </el-aside>
      <el-container>
        <el-header class="top">
          <div class="info1">
            <div class="left-side">
        <span>name:Lihua</span>
        <span>gender:male</span>
        <span>email:Lihua</span>
        <span>age:20</span>
        </div>
        <div class="center">
        <span>博客：</span>
        <span>粉丝数：</span>
      </div>
      <div class="right-side">
        <span>note:</span>
      </div>
  </div>
        </el-header>
        <el-main class="main"><span class="bold">历史发布的帖子:</span>
          <div class="post-group">
            <div class="left-post-wrapper">
    <button class="left-post"></button>
    <div class="left-post-description">帖子一：人工智能产生的影响</div>
  </div>
  <div class="middle-post-wrapper">
    <button class="middle-post"></button>
    <div class="middle-post-description">帖子二：区块链的应用</div>
  </div>
  <div class="right-post-wrapper">
    <button class="right-post"></button>
    <div class="right-post-description">帖子三：点我看社区治理</div>
  </div>
  </div>
        
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.top{
  border: 1px solid grey;
  height:35%;
  
}
.left{
  border: 1px solid grey;
  width:200px; 
  background-color:rgb(167, 164, 164);
}
.main{
  border: 1px solid grey;
}
.info1{
  display: flex;
  justify-content:space-between;  /* 将姓名和性别信息向右对齐 */
  /* align-items: center; */
  height: 100%;
  
}
.left-side{
  display: flex;
  flex-direction: column;

}
.center{
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  /* margin-top:3%; */
}
.right-side{
  display: flex;
  justify-content: flex-end;
  margin-right:11rem;
}
.info1 .left-side > span {
  margin-top: 22px;
}
.info1 .center > span {
  margin-top:30px;
}
.info1 .right-side> span {
  margin-top:25px;
}
.bold {
  font-weight: bold;
  font-size:large;
  margin-left:1.5rem;
  margin-top:1rem;
}
.profile-button {
  display: block;
  margin-top: 50px;
  padding: 10px 20px;
  border: none;
  width:100%;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  background-color:rgb(167, 164, 164);
}
.profile-button:hover {
  background-color: rgba(210, 218, 223, 0.4);
}
.post-button{
  display: block;
  margin-top: 40px;
  padding: 10px 20px;
  border: none;
  width:100%;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  background-color:rgb(167, 164, 164);
}
.post-button:hover {
  background-color: rgba(210, 218, 223, 0.4);
}

.main{
  background-color:rgb(241, 184, 90);
}

.post-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.left-post{
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  font-size: 14px;
  margin-top: 4rem;
  background-image: url("../img/pic1.png");
  background-size: cover;
  background-position: center;
  box-shadow: 3px 3px 7px rgba(22, 22, 22, 0.5); /* 阴影 */
}

.middle-post{
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  font-size: 14px;
  margin-top: 4rem;
  background-image: url("../img/dog.png");
  background-size: cover;
  background-position: center;
  box-shadow: 3px 3px 7px rgba(22, 22, 22, 0.5);
}

.right-post{
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  font-size: 14px;
  margin-top: 4rem;
  background-image: url("../img/pudding.png");
  background-size: cover;
  background-position: center;
  box-shadow: 3px 3px 7px rgba(22, 22, 22, 0.5);
}
.left-post-wrapper,
.middle-post-wrapper,
.right-post-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.left-post-description,
.middle-post-description,
.right-post-description {
  font-family: Arial, sans-serif;
  font-size:10px;
  margin-top: 10px;
  margin-bottom: 20px; /* 下方留白 */
}
</style>