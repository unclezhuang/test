<template>
  <div class="form" ref="formRef">
    <el-form-item label="帖子标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="帖子内容">
      <textarea v-model="form.content" style="resize: none"></textarea>
    </el-form-item>
    <el-form-item label="给你的帖子选个封面吧">
      <el-input v-model="form.picture_url" />
    </el-form-item>

    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="handleCancel">关闭</el-button>
  </div>
</template>
  <script>
import { state } from "./shared.js";
import { ref } from "vue";
import { reactive } from "vue";
import { service } from "../request/index.ts";
import { SaveFilecontract, getSigner, FTcontract } from "../help/contract";
import { ethers } from "ethers";
export default {
  setup() {
    const myValue = state.myValue;
    const formRef = ref(null);
    const inputValue = ref("");
    const handleSubmit = async () => {
      handleCancel();
      const address = await ethereum.request({ method: "eth_accounts" });
      const signer = await getSigner();
      // const SaveFilecontractt = SaveFilecontract(signer);
      // const SaveFilecontractAddress = await SaveFilecontractt.getAddress();
      // const FTcontractt = FTcontract(signer);
      // await FTcontractt.approve(SaveFilecontractAddress,'10000000000000000000000000')
      // const balance = await FTcontractt.allowance(
      //   signer.address,
      //   SaveFilecontractAddress
      // );
      // FTcontractt.balanceOf(signer.address).then(res => console.log(res))
      // console.log(balance);
      const SaveFilecontractt = SaveFilecontract(signer)
      form.author_address = "" + address;
      const postInfo = reactive({
        post_key: "",
      });
      console.log(JSON.stringify(form));
      await service
        .post("api/v1/post/create", JSON.stringify(form))
        .then((res) => (postInfo.post_key = res.data.data.post_key));
      const test = await SaveFilecontractt.storeFileHash(
        postInfo.post_key,
        "" + address,
        postInfo.post_key
      );
      try {
        await SaveFilecontractt.checkDailyactivity("" + address);
      } catch (err) {
        console.log("错了错了");
      }
      console.log("提交成功，用户地址为 ", address);
    };
    const handleCancel = () => {
      formRef.value?.classList.remove("show");
    };
    const showForm = () => {
      formRef.value?.classList.add("show");
    };
    const hideForm = () => {
      formRef.value?.classList.remove("show");
    };
    const form = reactive({
      content: "",
      title: "",
      picture_url: "",
      author_address: "",
    });
    return {
      formRef,
      inputValue,
      handleSubmit,
      handleCancel,
      showForm,
      hideForm,
      form,
      myValue,
    };
  },
};
</script>
<style>
.form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;
  z-index: 9999;
}
.form.show {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}
</style>