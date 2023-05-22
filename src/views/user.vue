<template>
  <div>
    <profile-card :avatar="avatar" :nickname="nickname" :age="age" :gender="gender" :email="email" :score="score" :posts="posts" :notes="notes" @edit-profile="showEditForm"></profile-card>
    <edit-profile-form v-if="isEditing" @save-profile="saveProfile" @cancel-edit-profile="hideEditForm"></edit-profile-form>
  </div>
</template>

<script>
import ProfileCard from './ProfileCard.vue'
import EditProfileForm from './EditProfileForm.vue'

export default {
  components: {
    'profile-card': ProfileCard,
    'edit-profile-form': EditProfileForm
  },
  data() {
    return {
      avatar: 'https://picsum.photos/200',
      nickname: 'John',
      age: 25,
      gender: 'male',
      email: 'john@example.com',
      score: 100,
      posts: 0,
      notes: '',
      isEditing: false
    }
  },
  methods: {
    showEditForm() {
      this.isEditing = true
    },
    hideEditForm() {
      this.isEditing = false
    },
    saveProfile(formData) {
      this.avatar = formData.avatar ? formData.avatar : this.avatar
      this.nickname = formData.nickname ? formData.nickname : this.nickname
      this.age = formData.age ? formData.age : this.age
      this.gender = formData.gender ? formData.gender : this.gender
      this.email = formData.email ? formData.email : this.email
      this.notes = formData.notes ? formData.notes : this.notes
      this.hideEditForm()
    }
  }
}
</script>
