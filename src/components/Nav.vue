<template>
  <nav class="nav">
    <!-- <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />标签
    </router-link> -->
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" /><span class="note">记账</span>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="chart" /><span class="note">统计</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@media(min-width:500px){
  .nav{
    .icon{
      width:42px;
      height:42px;
    }
    .note{
      font-size: 16px;
    }
  }
}
@media(max-width:500px){
  .nav{
    .icon{
      width:32px;
      height:32px;
    }
    
  }
}
.nav {
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
::v-deep {
  .item.selected {
    color: $color-theme;
    > svg {
      fill: currentColor;
    }
  }
}
</style>
