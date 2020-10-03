type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
};
type RecordItem = {
  tags: Tag[]; //不止一个标签
  notes: string; //用户的备忘录
  type: string; //当前提交的账单类型
  amount: number; //多少金额
  createdAt?: string; //提交时间
};
type Tag = {
  id: string; //标识tag的唯一性
  name: string; //标签的名字
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //联合类型
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};
