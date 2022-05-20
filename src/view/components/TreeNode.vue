<template>
  <div>
    <a-tree-node
      v-for="item in tree"
      :key="item.key"
      :title="item.title"
      :is-leaf="item?.isLeaf"
    >
      <template v-if="item.children">
        <tree-node :tree="item.children" />
      </template>
    </a-tree-node>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tree-node',
  isTreeNode: true,
};
</script>

<script setup lang="ts">
import { TreeDataItem } from 'ant-design-vue/lib/tree/Tree';

interface Props {
  tree: TreeDataItem;
}
const { tree } = defineProps<Props>();
</script>

<style lang="less" scoped></style>
