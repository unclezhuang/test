<template>
  <div>
    {{ post.userId }}
    {{ post.id }}
  </div>
</template>

<script  lang="ts">
import { useRoute } from 'vue-router'
import axios from 'axios';
import { reactive,toRefs } from 'vue';
export default{

setup(){
    const route = useRoute()
    const userId = route.params.index
    const title = route.params.serch
    const obj = reactive({
        post:""
    })
    axios
        .get("http://jsonplaceholder.typicode.com/posts/55")
        .then((res) => obj.post=res.data);
    return {
    ...toRefs(obj)
    }
  }
}
</script>

<style scoped>
</style>