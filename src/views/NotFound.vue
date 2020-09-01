<template>
  <div>
    <div>当前页面不存在，请检查网址是否正确</div>
    <div>
      <router-link to="/">返回首页</router-link>
      <!-- 两种返回首页的方式 -->
      <!-- <a href="#/">返回首页</a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss" scoped>
</style>