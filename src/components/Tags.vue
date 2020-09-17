<template>
    <div class="tags">
      <div class="new">
        <button>新增标签</button>
      </div>
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
</template>

<script lang="ts">
export default {
    name:'Tags'
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      $height: 24px;
      height: $height;
      line-height: $height; //用于居中，但之后可能不止一行标签
      border-radius: $height/2;
      padding: 0 16px;
      margin-right: 12px; //分离li标签
      margin-top:4px;
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none; //去除默认样式
      border-bottom: 1px solid; //不给颜色就默认为字体的颜色
      color: #999;
      padding: 0 4px;
    }
  }
}
</style>