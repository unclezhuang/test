<template>
  <div>
    <div class="profile">
      <img
        :src="avatarUrl"
        style="border-radius: 50%; width: 25%"
        alt="avatar"
      />
      <h3>{{ nickname }}</h3>
      <div class="wrapper">
        <div class="column1">
          <p>Age: {{ age }}</p>
          <p>Gender: {{ gender }}</p>
        </div>
        <div class="column2">
          <p>Email: {{ email }}</p>
          <p>Score: {{ score }}</p>
        </div>
        <div class="column3" style="width: 100%">
          <p>Posts: {{ posts }}</p>
          <p>Notes: {{ notes }}</p>
        </div>
      </div>
      <div style="width:20% float: left;">
        <button @click="editProfile">Edit Profile</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { v4 as uuidv4 } from "uuid";
export default {
  props: {
    avatar: {
      type: [String, Object],
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 100,
    },
    posts: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  computed: {
    async avatarUrl() {
      if (typeof this.avatar === "string") {
        return this.avatar;
      } else if (this.avatar instanceof Blob || this.avatar instanceof File) {
        console.log(this.avatar)
        const url = uuidv4() + '.' + this.avatar.name.split('.').pop();
        console.log("这是测试的url：：：", url);
        if (!this.avatar) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.avatar, url);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });
        console.log('Upload successful', response);
      } catch (error) {
        console.error('Upload failed', error);
      }
        return url;
      } else {
        return "https://picsum.photos/200";
      }
    },
  },
  methods: {
    editProfile() {
      this.$emit("edit-profile");
    },
  },
};
</script>
  
  <style scoped>
.profile {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.column > p {
  width: 50%;
  float: left;
}
.element1 {
  margin-right: 5%;
}
</style>
  