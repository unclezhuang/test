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
</template>

<script lang="ts">
import nav from ".//nav.vue"
export default {
  components: {
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
  display: flex;
  margin: auto;
  height: 100%;
}

.el-container{
  height: 100%;
}
.el-header {
  height: 20%;
}
.el-main {
  display: flex;
  flex-wrap: wrap;
  height: 80%;
}
</style>