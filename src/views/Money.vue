<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types />
    <Notes/>
    <Tags/>
  </Layout>
</template>

<script>
import NumberPad from "@/components/NumberPad.vue";
import Types from "@/components/Types.vue";
import Notes from "@/components/Notes.vue";
import Tags from "@/components/Tags.vue";
export default {
  name: "Money",
  components:{Tags,NumberPad,Notes,Types}
};
</script>

<style lang="scss">
.layout-content{
  border:1px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>
