<template>
    
    <div class="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
  </template>
  
  <script>
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