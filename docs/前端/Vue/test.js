const obj = { a: "aaaaaaaaa" };
const defineProperty = () => {
  const dep = [];
  const key = "a";
  let value = obj.a; // 使用闭包存储初始值
  Object.defineProperty(obj, key, {
    get() {
      // if (Dep.target) {
      //   dep.addSub(Dep.target);
      // }
      dep.push(value);
      console.log("get", value);
      return value;
    },
    set(newVal) {
      value = newVal; // 更新闭包存储的值
      console.log("newVal", newVal);
    },
  });
  return { obj, dep };
};
const res = defineProperty();
console.log("obj.a ===>", obj.a);
obj.a;
res.dep
