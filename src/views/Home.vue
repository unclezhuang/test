<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <my-nav></my-nav>
      </el-header>
      <el-main>
        <div  style="width:100%;"><my-search></my-search></div>
        <div class="tags-wrapper">
        <div style="width:33.33%;" class="tags"><button>区块链技术</button></div>
        <div style="width:33.33%;" class="tags2"><button>二次元</button></div>
        <div style="width:33.33%;" class="tags3"><button>区块链技术</button></div>
        </div>
     
        <div style="width: 33.33%;">
          <my-component></my-component>
        </div> 
        <div style="width: 33.33%;">
          <my-component></my-component>
        </div>
        <div style="width: 33.33%;">
          <my-component></my-component>
        </div>
      
      </el-main>
      <el-footer><div>{
                        id:""
                        图片:""
                        标题:""
                        内容:""
                        标签:""
                        时间:""
                        用户id:""
                        }</div></el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import MyComponent from "./PreviewCard.vue"
import Search from "./search.vue"
import nav from ".//nav.vue"
export default {
  components: {
      'my-component': MyComponent,
      'my-search': Search,
      'my-nav': nav
    },
  setup() {

    return {

    };  
  }
};
</script>

<style lang="scss" scoped>
.common-layout {
  width: 80%;
  margin: auto;
}
.tags-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
   /* 距离上一行的距离，可自行调整 */
}
.tags {
  display: flex;
  justify-content: center;
}
.tags2 {
  display: flex;
  justify-content: center;
}
.tags3 {
  display: flex;
  justify-content: center;
}
.el-main{
  display: flex;
  flex-wrap: wrap;
  
}

.tags button {
  width: 50%;
  border: none; /* 去掉边框 */
  background-color: #e7f1fb; /* 淡蓝色背景 */
  padding: 8px 16px; /* 按钮内边距 */
  font-weight: bold; /* 加粗字体 */
  
}
.el-header {
  height: 20%;
}
.el-main {
  height: 70%;
}
.el-footer {
  height: 10%;
}
</style>