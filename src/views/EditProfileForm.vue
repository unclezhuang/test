<template>
  <div>
    <h2>Edit Profile</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="avatar">Avatar:</label>
        <input type="file" id="avatar" @change="handleFileChange">
      </div>
      <div>
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="formData.nickname">
      </div>
      <div>
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="formData.age">
      </div>
      <div>
        <label for="gender">性别:</label>
        <select id="gender" v-model="formData.gender">
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email">
      </div>
      <div>
        <label for="notes">Notes:</label>
        <textarea id="notes" v-model="formData.notes"></textarea>
      </div>
      <button type="submit">Save</button>
      <button @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        avatar: null,
        nickname: '',
        age: null,
        gender: '',
        email: '',
        notes: ''
      }
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.formData.avatar = file;
    },
    submitForm() {
      this.$emit('save-profile', this.formData)
    },
    cancel() {
      this.$emit('cancel-edit-profile')
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-right: 10px;
}
input[type='file'],
select,
textarea {
  margin-bottom: 10px;
}
</style>
