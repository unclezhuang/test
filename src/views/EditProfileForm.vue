<template>
  <div>
    <h2>Edit Profile</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="avatar">头像: </label>
        <input type="text" id="avatar" v-model="formData.avatar" />
      </div>
      <div>
        <label for="nickname">名称: </label>
        <input type="text" id="nickname" v-model="formData.nickname" />
      </div>
      <div>
        <label for="age">年龄: </label>
        <input type="number" id="age" v-model="formData.age" />
      </div>
      <div>
        <label for="options">性别: </label>
        <input
          type="radio"
          id="Male"
          name="options"
          value="0"
          v-model="formData.gender"
        />
        <label for="Male">男 </label>
        <input
          type="radio"
          id="female"
          name="options"
          value="1"
          v-model="formData.gender"
        />
        <label for="female">女</label>
      </div>
      <div>
        <label for="email">邮箱: </label>
        <input type="email" id="email" v-model="formData.email" />
      </div>
      <div>
        <label for="notes">签名: </label>
        <textarea
          id="notes"
          style="resize: none"
          v-model="formData.notes"
        ></textarea>
      </div>
      <button class="button" type="submit" @click="changeinfo">保存</button>
      <button class="button" @click="cancel">取消</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { service } from "../request/index";
export default {
  props: {
    formData: reactive({
      avatar: null,
      nickname: "",
      age: null,
      gender: "",
      email: "",
      notes: "",
    }),
  },
  data() {
    return {
      userInfo: reactive({
        user_address: "",
        user_name: "",
        email: "",
        age: "",
        gender: "",
        signature: "",
        head_picture: "",
      }),
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.formData.avatar = file;
    },
    submitForm() {
      this.$emit("save-profile", this.formData);
    },
    cancel() {
      this.$emit("cancel-edit-profile");
    },
    async changeinfo() {
      const address = await ethereum.request({ method: "eth_accounts" });
      this.userInfo.user_address = address;
      this.userInfo.user_name = this.formData.user_name;
      this.userInfo.email = this.formData.email;
      this.userInfo.age = this.formData.age;
      this.userInfo.gender = this.formData.gender;
      this.userInfo.signature = this.formData.signature;
      this.userInfo.head_picture = this.formData.head_picture;
      console.log(JSON.stringify(this.userInfo));
      service.post(
        "api/v1/user/" + address + "/changeUserInformation",
        JSON.stringify(this.userInfo)
      );
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 10px;
}
input[type="file"],
select,
textarea {
  margin-bottom: 10px;
}
.button {
  display: inline-block;
}
</style>
