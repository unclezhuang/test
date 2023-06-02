<template>
  {{ data }}
  <el-row>
    <el-col
      v-for="(item, index) in data"
      :key="item.id"
      :span="6"
      :offset="index % 3 > 0 ? 2 : 0"
    >
      <el-card style="margin: 5%" :body-style="{ padding: '10%' }">
        <img :src="item.skin_Url" class="image" />
        <div style="padding: 14px">
          <span>{{ item.price }} CX</span>
          <el-row class="mb-4">
            <el-button plain type="primary" @click="buy">buy</el-button>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
  

  <script lang="ts">
import { h } from "vue";
import { ElNotification } from "element-plus";
import { getCookie } from "../help/cookie";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const buy = async () => {
      if (getCookie(await ethereum.request({ method: "eth_accounts" }))) {
        console.log("这波the shy来全买了");
      } else {
        console.log("这波物资来全登录了。");
        ElNotification({
          title: "请登录",
          message: h("i", { style: "color: red" }, "购买前请先登陆！！！！"),
        });
      }
    };
    return {
      buy,
    };
  },
};
</script>
  
  <style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 100%;
}
</style>
  