<template>
    <div>
        <el-card v-for="item in data" :key="item.id" style="margin-bottom: 20px">
            <el-image style="width: 100%; height: 150px;" src="https://picsum.photos/300/150" ></el-image>
            <div style="padding: 14px;">
              <h3 style="font-size: 18px">{{ item.title }}</h3>
              <p>作者：{{ item.author }}</p>
            </div>
          </el-card>
    </div>
</template>

<script lang="ts">
    export default {
        data() {
    return {
      data: [
        {
          id: 1,
          title: "Vue3新特性",
          author: "张三"
        },
        {
          id: 2,
          title: "React常用Hook使用详解",
          author: "李四"
        },
        {
          id: 3,
          title: "Webpack常用配置",
          author: "王五"
        },
        {
          id: 4,
          title: "Node.js的基本使用",
          author: "赵六"
        },
        {
          id: 5,
          title: "JavaScript异步编程",
          author: "钱七"
        }
      ]
    };
  }
    }
</script>

