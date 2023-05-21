<template>
  <div>
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
          border-radius: 50%;
        "
      >
        <img src="../img/toTop.png" style="height: 100%" />
      </div>
    </el-backtop>
    <div class="serch">
      <img src="../img/search.png" class="serachimg" />
      <input
        style="width: 30rem"
        @keyup="search"
        ref="serchtext"
        class="serachInput"
      />
      <el-row class="mb-4"
        ><el-button
          type="success"
          style="margin-left: 20%"
          @click="serchbystring"
          round
          >搜索</el-button
        >
      </el-row>
    </div>
    <div style="width: 100%"><my-search></my-search></div>
    <div class="tags-wrapper">
      <div style="width: 33.33%" class="tags"><button>区块链技术</button></div>
      <div style="width: 33.33%" class="tags2"><button>二次元</button></div>
      <div style="width: 33.33%" class="tags3"><button>区块链技术</button></div>
    </div>
    <div style="width: 33.33%;float:left">
          <my-component></my-component>
        </div> 
        <div style="width: 33.33%;float:left">
          <my-component></my-component>
        </div>
        <div style="width: 33.33%;float:left">
          <my-component></my-component>
        </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from "vue";
import MyComponent from "./PreviewCard.vue"
export default {
    components: {
      'my-component': MyComponent,
    },setup() {
    const obj = reactive({
      serchtext: ref(),
    });

    const search = (event) => {
      if (event.keyCode === 13) {
        console.log(obj.serchtext.value);
        obj.serchtext.value = "";
      }
    };
    const serchbystring = (event) => {
      console.log(obj.serchtext.value);
      obj.serchtext.value = "";
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
.tags-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* 距离上一行的距离，可自行调整 */
}
.tags,
.tags2,
.tags3 {
  display: flex;
  justify-content: center;
}
</style>