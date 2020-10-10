import Vue from "vue";
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue{
  createTag() {
    const tagName = prompt("新标签的名称是？");
    if (!tagName) {
      return;
    }
    this.$store.commit("createTag", tagName);
  }
}
export default TagHelper;