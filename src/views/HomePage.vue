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
        ">
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
        ><el-button type="success" style="margin-left: 20%;" @click="serchbystring" round>搜索</el-button>
      </el-row>
    </div>
    <div style="width: 33.33%" class="tags">
      <button>区块链技术</button>
      <!-- 更多标签省略 -->
    </div>
    <div style="width: 33.33%">
      <div>
        <el-card
          v-for="item in data"
          :key="item.id"
          style="margin-bottom: 20px"
        >
          <el-image
            style="width: 100%; height: 150px"
            src="https://picsum.photos/300/150"
          ></el-image>
          <div style="padding: 14px">
            <h3 style="font-size: 18px">{{ item.title }}</h3>
            <p>作者：{{ item.author }}</p>
          </div>
        </el-card>
      </div>
    </div>
    <div style="width: 33.33%"></div>
    <div style="width: 33.33%"></div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from "vue";
export default {
  setup() {
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
      serchbystring
    };
  },
  data() {
    return {
      data: [
        {
          id: 1,
          title: "Vue3新特性",
          author: "张三",
        },
        {
          id: 2,
          title: "React常用Hook使用详解",
          author: "李四",
        },
        {
          id: 3,
          title: "Webpack常用配置",
          author: "王五",
        },
        {
          id: 4,
          title: "Node.js的基本使用",
          author: "赵六",
        },
        {
          id: 5,
          title: "JavaScript异步编程",
          author: "钱七",
        },
      ],
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