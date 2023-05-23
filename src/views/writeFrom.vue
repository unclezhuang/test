<template>
    <div class="form" ref="formRef">
      <div class="tittle"><input type="text" v-model="inputValue" /></div>
      <button @click="handleSubmit">提交</button>
      <button @click="handleCancel">关闭</button>
    </div>
  </template>
  <script>
  import { ref } from "vue";
  export default {
    setup() {
      const formRef = ref(null);
      const inputValue = ref("");
      const handleSubmit = () => {
        console.log("提交成功")
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
      return {
        formRef,
        inputValue,
        handleSubmit,
        handleCancel,
        showForm,
        hideForm,
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