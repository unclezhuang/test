<!-- <template>
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
  <el-container>
    <el-aside class="left">
      <div class="avatar">
        <img
          :src="this.formData.avatar"
          alt="头像"
          style="
            width: 135px;
            height: 135px;
            margin-left: 15%;
            margin-top: 20%;
            border-radius: 50%;
            border: 5px solid yellow;
            box-sizing: border-box;
          "
        />
        <!-- 点击绑定事件 值为true时会弹出修改信息表格 默认为false-->
        <button
          class="profile-button"
          @click="this.isEditing = !this.isEditing"
        >
          编辑个人资料
        </button>
        <div class="button1">
           <!-- vif用于判断isEditing值 ，：读取现在的formdata ，引用了 editprofile组件-->

          <edit-profile-form
            v-if="isEditing"
            :formData="this.formData"
            @save-profile="saveProfile"
            @cancel-edit-profile="this.isEditing = false"
          ></edit-profile-form>
        </div>
        <!-- 用来传值，方便在父组件中调用 -->
        <my-form ref="myFormRef"></my-form>
        <button class="post-button" @click="showForm">写帖子</button>
      </div>
      <div class="button1">
        <button class="post-button" @click="showForm"></button>
      </div>
    </el-aside>
    <el-container>
      <el-header class="top">
        <div class="info1">
          <div class="left-side">
            <span>name: {{ formData.nickname }}</span>
            <span>gender:{{ formData.gender == "1" ? "女" : "男" }}</span>
            <span>email:{{ formData.email }}</span>
            <span>age:{{ formData.age }}</span>
          </div>
          <div class="center">
            <span>总数：{{ posts }}</span>
            <span>经验：{{ formData.exp }} </span>
            <el-progress
              :percentage="(formData.exp / 500) * formData.level * 100"
              :text-inside="true"
              :stroke-width="26"
              :duration="6"
              color="#b1b3b8"
              :striped="true"
              :striped-flow="true"
            />
            <span>等級: {{ formData.level }}</span>
          </div>
          <div class="right-side">
            <span>note: {{ formData.notes }} </span>
             <!-- CX为平台币 精度为10的18次方 ETH为私链上的代币-->
            <span>CX： {{ formData.balance / 1e18 }}</span>
            <span>ETH: {{ formData.ethbalance / 1e18 }}</span>
            <span
              ><span @click="approve" class="app">授权</span>:
              <el-input-number
                v-model="approves"
                :min="0"
                :max="1000"
                size="large"
                :controls = "false"
                :value-on-clear="0"
              /> </span
            >
          </div>
        </div>
      </el-header>
      <el-main class="main" style="height: 100%"
        ><div style="height: 100%">
          <span class="bold">历史发布的帖子:</span>
          <el-carousel
            :trigger="click"
            :interval="4000"
            type="card"
            height="60%;margin-top:10%"
          >
            <el-carousel-item v-for="item in postList" :key="item">
              <div
                class="postinfo"
                @click="
                  router.push({
                    name: 'post',
                    params: { serch: JSON.stringify(item) },
                  })
                "
              >
                <img
                  class="postImage"
                  :src="item.picture_url"
                  alt="没有图片啊"
                />
                <h3 text="2xl" justify="center">{{ item.title }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- <div class="post-group">
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
        </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { ref, reactive } from "vue";
import ProfileCard from "./ProfileCard.vue";
import EditProfileForm from "./EditProfileForm.vue";
import MyForm from "./writeFrom.vue";
import { state } from "./shared.js";
import { useRouter } from "vue-router";
import { service } from "../request/index";
import { SaveFilecontract, getSigner, FTcontract, SkinMarketcontract } from "../help/contract";
export default {
  components: {
    "profile-card": ProfileCard,
    "edit-profile-form": EditProfileForm,
    MyForm,
  },
  data() {
    const router = useRouter();

    return {
      formData: reactive({   //此处定义了一个空的formdata

        ethbalance: "",
        balance: "",
        avatar: "",
        nickname: "",
        age: "",
        gender: "",
        email: "",
        notes: "",
        exp: 0,
        bcg_url: "",
        level: "",
      }),
      approves: "",
      // balance,
      score: 0,
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
    async approve() {
      const accounts = await ethereum.request({ method: "eth_accounts" }); //从小狐狸上获得钱包地址

      const signer = await getSigner();//从contract里拿到签名

      const FTcontractt = FTcontract(signer);//连接合约
      const SkinMarketcontractt = SkinMarketcontract(signer);//连接合约
      const SkinMarketcontracttAddress = await SkinMarketcontractt.getAddress();
      const balanceOfAccount = await FTcontractt.balanceOf("" + accounts);
      console.log(this.approves*10**18)//打印授权
      const appro = this.approves*10**18
      await FTcontractt.approve(SkinMarketcontracttAddress, appro.toString());
    },
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
      const signer = await getSigner();
      const SaveFilecontractt = SaveFilecontract(signer);
      const FTcontractt = FTcontract(signer);
      const ftaddress =FTcontractt.getAddress()
      await console.log("地址",ftaddress)
      const balanceOfs = await FTcontractt.balanceOf(signer.address);
      this.formData.balance = balanceOfs.toString();
      ethereum
        .request({
          method: "eth_getBalance",
          params: [signer.address, "latest"],
        })
        .then((res) => (this.formData.ethbalance = parseInt(res, 16)));
      await SaveFilecontractt.getUserInfo("" + accounts).then((res) => {
        this.formData.level = res[0].toString();
        this.formData.exp = res[1].toString();
      });
      service // 从数据库中拿信息
        .get("api/v1/user/" + accounts + "/getuserInformation")
        .then((res) => {// res导入的包
          console.log(res.data.data);//数据库.数据
          this.formData.avatar = res.data.data.head_picture;//从数据库中拿信息填充空的formdata
          this.formData.nickname = res.data.data.user_name;
          this.formData.age = res.data.data.age;
          this.formData.gender = res.data.data.gender;
          this.formData.email = res.data.data.eamil;
          this.formData.notes = res.data.data.signature;
          this.formData.bcg_url = res.data.data.bcg_url;
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
.postImage {
  height: calc(100% / 7);
  border-radius: 50%;
  display: inline-block;
}
.heit {
  margin-right: 0;
}
.top {
  border: 1px solid grey;
  height: 35%;
}
.left {
  border: 1px solid grey;
  width: 200px;
  background-color: rgb(167, 164, 164);
}
.main {
  border: 1px solid grey;
}
.info1 {
  display: flex;
  justify-content: space-between; /* 将姓名和性别信息向右对齐 */
  /* align-items: center; */
  height: 100%;
}
.left-side {
  display: flex;
  flex-direction: column;
}
.center {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  /* margin-top:3%; */
  width: 10%;
}
.right-side {
  display: flex;
  /* justify-content: flex-end; */
  margin-right: 11rem;
  flex-direction: column;
  /* justify-content: center; */
}
.info1 .left-side > span {
  margin-top: 22px;
}
.info1 .center > span {
  margin-top: 30px;
}
.info1 .right-side > span {
  margin-top: 25px;
}
.bold {
  font-weight: bold;
  font-size: large;
  margin-left: 1.5rem;
  margin-top: 1rem;
}
.profile-button {
  display: block;
  margin-top: 50px;
  padding: 10px 20px;
  border: none;
  width: 100%;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  background-color: rgb(167, 164, 164);
}
.profile-button:hover {
  background-color: rgba(210, 218, 223, 0.4);
}
.post-button {
  display: block;
  margin-top: 40px;
  padding: 10px 20px;
  border: none;
  width: 100%;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  background-color: rgb(167, 164, 164);
}
.post-button:hover {
  background-color: rgba(210, 218, 223, 0.4);
}

.main {
  background-color: rgb(241, 184, 90);
}

.post-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.left-post {
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

.middle-post {
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

.right-post {
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
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 20px; /* 下方留白 */
}
.el-carousel {
  margin-top: 10%;
}

.el-carousel__item,
.postinfo {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 2rem;
  margin-top: 25%;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #f3d19e;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #eebe77;
}

.app:hover {
  cursor: pointer; /* 更改鼠标悬停时的样式为手型 */
  transition: 3;
  background-color: #dedfe0;
}
</style>
