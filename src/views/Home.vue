<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <my-nav></my-nav>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
  <el-backtop :bottom="100" target=".common-layout" :visibility-height="0">
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
      "
    >
      <img src="../img/toTop.png" style="height: 100%" />
    </div>
  </el-backtop>
</template>

<script lang="ts">
import nav from ".//nav.vue";
import {FTcontract} from '../help/ether.ts'
export default {
  components: {
    "my-nav": nav,
  },
  setup() { 
    // console.log(FTcontract)
    return {};
  },
};
</script>

<style lang="scss" scoped>
.common-layout {
  width:80%;
  display: flex;
  margin: auto;
  height: 100%;
  min-height: 100vh;
}

.el-container {
  height: 100%;
}
.el-header {
  height: 15%;
}
.el-main {
  height: 85%;
  margin: 0;
  width: 100%;
}
</style>