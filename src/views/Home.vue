<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <my-nav></my-nav>
      </el-header>
      <el-main>
        <my-search></my-search>
        
        <div style="width:33.33%;" class="tags">
            <button>区块链技术</button>
            
            <!-- 更多标签省略 -->
          </div>

        <div style="width: 33.33%;">
          <my-component></my-component>
        </div>
        <div style="width: 33.33%;">
        </div>
        <div style="width: 33.33%;">
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
.tags {
  display: flex;
  justify-content: center;
}

.tags button {
  width: 50%;
  border: none; /* 去掉边框 */
  background-color: #e7f1fb; /* 淡蓝色背景 */
  padding: 8px 16px; /* 按钮内边距 */
  font-weight: bold; /* 加粗字体 */
  
}

</style>