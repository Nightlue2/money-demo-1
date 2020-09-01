
<template>
  <div class="nav-wrapper">
    <div class="content">Money</div>
    <Nav />
  </div>
</template>

<script>
export default {
  name: "Money"
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  border: 1px solid red;
  height: 100vh;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  overflow: auto;
  border: 1px solid blue;
}
</style>