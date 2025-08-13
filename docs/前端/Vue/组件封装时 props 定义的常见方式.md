# 组件封装时 props 定义的常见方式


在 Vue 3 中，组件封装 props 有以下几种常见方式：

## 1. 基本类型数组形式（Basic Type Array）

最简单的形式，只指定 prop 的名称和类型：

```ts
props: ['title', 'likes', 'isPublished']
```

或者带类型检查：

```ts
props: {
  title: String,
  likes: Number,
  isPublished: Boolean
}
```

## 2. 对象形式（Object with Validation）

这是你代码中使用的方式，可以进行详细配置：

```ts
export const taIndicatorCollectDefineFormProps = {
  formDisabled: { type: Boolean, default: false },
  formData: { type: Object, default: () => ({}) },
  formBpm: { type: Boolean, default: true },
};
```

这种方式支持：
- 类型检查（type）
- 默认值（default）
- 必填验证（required）
- 自定义验证（validator）

## 3. 使用 TypeScript 接口定义

在 TypeScript 项目中，可以使用接口来定义 props：

```ts
interface Props {
  formDisabled?: boolean;
  formData?: Record<string, any>;
  formBpm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  formDisabled: false,
  formData: () => ({}),
  formBpm: true
});
```

## 4. 使用 defineProps 宏（Composition API）

在 `<script setup>` 中使用：

```ts
const props = defineProps({
  formDisabled: { type: Boolean, default: false },
  formData: { type: Object, default: () => ({}) },
  formBpm: { type: Boolean, default: true },
});
```

或者使用运行时声明：

```ts
const props = defineProps(['formDisabled', 'formData', 'formBpm']);
```

## 5. 混合类型定义

支持多种类型：

```ts
props: {
  dynamicValue: [String, Number, Boolean],
  complexData: {
    type: [Object, Array],
    default: () => ({})
  }
}
```

## 6. 自定义验证器

```ts
props: {
  status: {
    type: String,
    validator(value) {
      return ['pending', 'approved', 'rejected'].includes(value);
    }
  }
}
```

## 在你的代码中的应用

你代码中使用的是一种常见的模式 - 将 props 定义提取为一个常量对象，然后在 `defineComponent` 中引用：

```ts
export const taIndicatorCollectDefineFormProps = {
  formDisabled: { type: Boolean, default: false },
  formData: { type: Object, default: () => {} },
  formBpm: { type: Boolean, default: true },
};

export default defineComponent({
  props: taIndicatorCollectDefineFormProps,
  // ...
});
```

这种方式的优点是：
1. 可复用性强 - 可以在多个组件中共享 props 定义
2. 可测试性好 - 可以单独测试 props 定义
3. 清晰明确 - 将 props 定义与组件实现分离
4. 类型友好 - 便于 TypeScript 类型推断和 IDE 支持