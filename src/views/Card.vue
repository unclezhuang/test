<template>
  {{ data }}
  <el-row v-show="data[0] == 0">
    <el-col
      v-for="(item, index) in data.slice(1)"
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
  <el-row v-show="data[0] == 1">
    <el-col
      v-for="(item, index) in data.slice(1)"
      :key="item.id"
      :span="6"
      :offset="index % 3 > 0 ? 2 : 0"
    >
      <el-card style="margin: 5%" :body-style="{ padding: '10%' }">
        <img :src="item.skin_Url" class="image" />
        <div style="padding: 14px">
          <span>{{ item.price }} CX</span>
          <el-row class="mb-4">
            <el-button plain type="primary" @click="use">use</el-button>
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
import { FTcontract, getSigner } from "../help/contract.ts";
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
        const signer = await getSigner();
        console.log("签名：：：：", signer);
 
      } else {
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
  