<template>
  <div class="form" ref="formRef">
    <el-form-item label="帖子标题">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="帖子内容">
      <textarea v-model="form.desc" style="resize:none"></textarea>
    </el-form-item>
    <el-form-item label="给你的帖子选个封面吧">
      <el-input v-model="form.url" />
    </el-form-item>

    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="handleCancel">关闭</el-button>
  </div>
</template>
  <script>
import { state } from "./shared.js";
import { ref } from "vue";
import { reactive } from "vue";

export default {
  setup() {
    const myValue = state.myValue;
    const formRef = ref(null);
    const inputValue = ref("");

    const handleSubmit = () => {
      console.log("提交成功，用户地址为 ", myValue);
      console.log("表单数据为：", JSON.stringify(form));
      handleCancel()
      // 处理表单提交操作
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
      desc: "",
      name: "",
      url: "https://picsum.photos/300/150",
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
}
.form.show {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}
</style>