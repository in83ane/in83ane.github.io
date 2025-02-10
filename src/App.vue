<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* กำหนดพื้นหลังที่ต้องการ */
body {
  margin: 0;
  padding: 0;
  background-color: #fcb4bc; /* สีพื้นหลัง */
  font-family: 'Roboto', sans-serif;
}
</style>
