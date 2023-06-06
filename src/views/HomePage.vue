<template>
  <div>
    <div class="serch">
      <img src="../img/search.png" class="serachimg" />
      <input
        style="width: 30rem"
        @keyup="search"
        ref="serchtext"
        class="serachInput"
      />
      <el-row class="mb-4">
        <el-button
          type="success"
          style="margin-left: 20%"
          @click="serchbystring"
          round
          >搜索</el-button
        >
      </el-row>
    </div>
    <my-component></my-component>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from "vue";
import MyComponent from "./PreviewCard.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    "my-component": MyComponent,
  },
  setup() {
    const obj = reactive({
      serchtext: ref(),
    });

    const router = useRouter();

    const search = (event) => {
      if (event.keyCode === 13) {
        console.log(obj.serchtext.value);
        router.push({ name: "posts", params: { serch: obj.serchtext.value } });
      }else{
      console.log(event.keyCode)
      }
    };
    const serchbystring = (event) => {
      console.log(obj.serchtext.value);
      router.push({ name: "posts", params: { serch: obj.serchtext.value } });
    };
    return {
      ...toRefs(obj),
      search,
      serchbystring,
    };
  },
};
</script>

<style lang="scss" scoped>
.serch {
  display: flex;
  flex-direction: row;
  justify-content: center; /*垂直居中*/
  align-items: center; /*水平居中*/
  height: 20vh; /*占满整个浏览器高度*/
  margin-bottom: 4%;
}
.serachInput {
  height: 2rem;
}
.serachimg {
  width: 2rem;
  margin-right: 1%;
}
.serch {
  text-align: center;
  height: 20%;
}
</style>