<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
*::-webkit-scrollbar {
  display: none;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
body {
  background-color:#EBEDF0;
  background-size: cover;
  background-position: center;
}
body::-webkit-scrollbar {
  display: none;
}
</style>