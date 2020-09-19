const localStorageKeyName = "tagList";
type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string) => "success" | "duplicated"; //联合类型
  save: () => void;
};
const tagListModel: TagListModel = {
  data: [],
  create(name: string) {
    if (this.data.indexOf(name) >= 0) {
      return "duplicated";
    }
    this.data.push(name);
    this.save();
    return "success";
  },
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export default tagListModel;
