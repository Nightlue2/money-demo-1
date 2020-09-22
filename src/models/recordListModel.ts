import clone from "@/lib/clone";
const localStorageKeyName = "recordList";

const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
    this.save();
  },
  clone() {
    this.data = JSON.parse(JSON.stringify(this.data));
    return this.data;
  },
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]");
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export default recordListModel;
