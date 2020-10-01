import Vue from "vue";
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue{
  createTag() {
    const tagName = prompt("新标签的名称是？");
    if (!tagName) {
      return alert("标签名不能为空");
    }
    this.$store.commit("createTag", tagName);
  }
}
export default TagHelper;