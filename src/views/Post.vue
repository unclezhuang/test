<template>
  <div class="post">
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
.post {
  flex-grow: 1;
height: calc(100% / 3);
padding: 10px;
margin-bottom: 10px;
}
</style>