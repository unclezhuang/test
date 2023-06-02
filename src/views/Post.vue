<template>
  <div class="post">
    {{ typeof post }}
    {{ post.content }}
    {{ post.author_name }}
  </div>
</template>

<script  lang="ts">
export default {
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

  setup() {
    return {};
  },
};
</script>

<style scoped>
.post {
  flex-grow: 1;
  height: calc(100% / 3);
  padding: 10px;
  margin-bottom: 10px;
}
</style>