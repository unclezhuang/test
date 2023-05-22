<template>
    <div>
      <div style="width:20%">
      <button @click="editProfile">Edit Profile</button>
      </div>
      <div class="profile">
        <img :src="avatarUrl" alt="avatar">
        <h3>{{nickname}}</h3>
        <p>Age: {{age}}</p>
        <p>Gender: {{gender}}</p>
        <p>Email: {{email}}</p>
        <p>Score: {{score}}</p>
        <p>Posts: {{posts}}</p>
        <p>Notes: {{notes}}</p>
      </div>
    </div>
  </template>
  
  <script>
export default {
  props: {
    avatar: {
      type: [String, Object],
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 100
    },
    posts: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      required: false
    }
  },
  computed: {
    avatarUrl() {
      if (typeof this.avatar === 'string') {
        return this.avatar;
      } else if (this.avatar instanceof Blob || this.avatar instanceof File) {
        return URL.createObjectURL(this.avatar);
      } else {
        return 'https://picsum.photos/200';
      }
    }
  },
  methods: {
    editProfile() {
      this.$emit('edit-profile')
    }
  }
}
</script>
  
  <style scoped>
  .profile {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  </style>
  