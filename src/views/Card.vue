<template>
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
            <el-button plain type="primary" @click="buy(item)">buy</el-button>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <div style="margin-bottom: 10%" v-show="data[0] == 1">
    网页背景图：
    <el-row>
      <el-col
        v-for="(item, index) in data.slice(1).filter((rem) => rem.status == 0)"
        :key="item.id"
        :span="6"
        :offset="index % 3 > 0 ? 2 : 0"
      >
        <el-card style="margin: 5%" :body-style="{ padding: '10%' }">
          <img :src="item.skin_Url" class="image" />
          <div style="padding: 14px">
            <span>{{ item.price }} CX</span>
            <el-row class="mb-4">
              <el-button plain type="primary" @click="use(item)">use</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col></el-row
    >
  </div>
  <div v-show="data[0] == 1">
    头像：
    <el-row>
      <el-col
        v-for="(item, index) in data.slice(1).filter((rem) => rem.status == 1)"
        :key="item.id"
        :span="6"
        :offset="index % 3 > 0 ? 2 : 0"
      >
        <el-card style="margin: 5%" :body-style="{ padding: '10%' }">
          <img :src="item.skin_Url" class="image" />
          <div style="padding: 14px">
            <span>{{ item.price }} CX</span>
            <el-row class="mb-4">
              <el-button plain type="primary" @click="use(item)">use</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
  

  <script lang="ts">
import { h, reactive } from "vue";
import { ElNotification } from "element-plus";
import { getCookie } from "../help/cookie";
import { SkinMarketcontract, FTcontract, getSigner } from "../help/contract.ts";
import { service } from "../request";
import { add } from "lodash";
import { sk } from "element-plus/es/locale/index.js";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    userInfo: reactive({
        user_address: "",
        user_name: "",
        email: "",
        age: "",
        gender: "",
        signature: "",
        head_picture: "",
      }),
  },
  setup() {
    const buy = async (item) => {
      console.log(item);
      if (getCookie(await ethereum.request({ method: "eth_accounts" }))) {
        const signer = await getSigner();
        console.log(item);
        const buyInfo = reactive({
          user_address: "",
          skin_id: "",
          skin_Url: "",
          createTime: "",
          status: "",
          price: "",
          skin_address: "",
        });
        buyInfo.user_address = signer.address;
        buyInfo.skin_Url = item.skin_Url;
        buyInfo.skin_id = item.skin_id;
        buyInfo.createTime = item.createTime;
        buyInfo.status = item.status;
        buyInfo.price = item.price;
        buyInfo.skin_address = item.skin_address;
        const SkinMarketcontractt = SkinMarketcontract(signer);
        // const Skincontractt = Skincontract(signer);
        const FTcontractt = FTcontract(signer)
        const balance:string = await FTcontractt.balanceOf(signer.address)
        console.log(balance)
        const count = await SkinMarketcontractt.getOwnedSkin(signer.address)
        console.log("shuliang",count)
        // const SkinMarketcontractaddress = await SkinMarketcontractt.getAddress()
        // console.log("签名：：：：", signer);
        await SkinMarketcontractt.buy(
          signer.address,
          item.skin_address,
          item.skin_id
        );
        console.log(JSON.stringify(buyInfo));
        service.post("api/v1/market/skins/shop", JSON.stringify(buyInfo));
        // const SkinMarketcontract = await SkinMarketcontract(signer);
        // const SkinMarketcontractaddress = await SkinMarketcontract.mint(signer.address, 10);
      } else {
        ElNotification({
          title: "请登录",
          message: h("i", { style: "color: red" }, "购买前请先登陆！！！！"),
        });
      }
    };
    const use = async (item) => {
      console.log(item);
      const address = await ethereum.request({ method: "eth_accounts" });
      if (getCookie(address)) {
        if (item.status == 0) {
          console.log(item);
          document.body.style.backgroundImage = "url(" + item.skin_Url + ")";
          const chengeinfo = reactive({
            address: "" + address,
            url: item.skin_Url,
          });
          console.log(JSON.stringify(chengeinfo));
          service.post(
            "api/v1/user/" + address + "/changeBCG",
            JSON.stringify(chengeinfo)
          );
        } else {
          console.log(item);
          const chengeinfo = reactive({
            address: "" + address,
            url: item.skin_Url,
          });
          console.log(JSON.stringify(chengeinfo));
          await service.post(
            "api/v1/user/" + address + "/changeHP",
            JSON.stringify(chengeinfo)
          );
          //
          console.log("测试刷新页面")
              location.reload();
        }
      }
    };
    return {
      buy,
      use,
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
  