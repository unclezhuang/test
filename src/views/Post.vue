<template>
  <div>
    {{ post.title }}
    {{ post.content }}
    {{ post.id }}
  </div>
</template>

<script  lang="ts">
export default{

  props: {
      post: {
        type: Object,
        required: true,
      },
      postId: {
        type: [String, Number],
        required: true,
      },
    },

setup(){
    return {

    }
  }
}
</script>

<style scoped>
</style>