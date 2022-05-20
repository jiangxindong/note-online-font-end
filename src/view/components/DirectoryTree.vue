<template>
  <div class="sidebar">
    <a-directory-tree
      v-if="treeData.length"
      :tree-data="treeData"
      :replace-fields="replaceFields"
      default-expand-all
      @select="selectTree"
    >
      <template #title="{ id: treeKey, title, isLeaf }">
        <a-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>
          <template #overlay>
            <a-menu
              @click="
                ({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)
              "
            >
              <template v-if="!isLeaf">
                <a-menu-item key="newFolder">新建文件夹</a-menu-item>
                <a-menu-item key="newFile">新建文档</a-menu-item>
              </template>
              <a-menu-item key="delete" :style="{ color: 'red' }"
                >删除</a-menu-item
              >
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-directory-tree>
  </div>
  <a-modal v-model:visible="visible" title="请输入文件名" @ok="confirmName">
    <a-input v-model:value="title"></a-input>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import md from '@/api/md';
import { message } from 'ant-design-vue';

defineProps<{ modelValue: number }>();
const emits = defineEmits(['update:modelValue', 'treeClick']);
const replaceFields = { children: 'children', title: 'title', key: 'id' };
const treeData = ref<[]>([]);
const visible = ref<boolean>(false);
const title = ref<string>('');

const selectTree = (selectedKeys, treeObject) => {
  if (selectedKeys?.length) {
    emits('update:modelValue', selectedKeys[0]);
    emits('treeClick', treeObject.node);
    console.log(selectedKeys, treeObject.node);
  }
};

// get tree list
const getTree = () => {
  md.getTree().then((resp) => {
    const { code, data } = resp;
    if (code === 200000) {
      treeData.value = data;
    }
  });
};

// mounted tree list
getTree();

// delete the folder or file
const deleteEntity = (id: number) => {
  md.delete(id).then((resp) => {
    const { code } = resp;
    if (code === 200000) {
      message.success('删除成功');
      getTree();
    } else {
      message.error('删除失败');
    }
  });
};

// create a folder or file
const newEntity = async (params: object) => {
  await md.new(params).then((resp) => {
    const { code } = resp;
    if (code === 200000) {
      message.success('新建成功');
      getTree();
    } else {
      message.error('新建失败');
    }
  });
};

// record parentId
let newEntityParams: object = {};

// handle menu click event
const onContextMenuClick = (treeKey: number, menuKey: string) => {
  switch (menuKey) {
    case 'newFolder':
      newEntityParams = {
        parentId: treeKey,
        content: '',
        isLeaf: false,
      };
      visible.value = true;
      break;
    case 'newFile':
      newEntityParams = {
        parentId: treeKey,
        content: '',
        isLeaf: true,
      };
      visible.value = true;
      break;
    case 'delete':
      deleteEntity(treeKey);
      break;
    default:
      return;
  }
};
const confirmName = async () => {
  newEntityParams['title'] = title.value;
  await newEntity(newEntityParams);
  visible.value = false;
  newEntityParams = {};
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 400px;
  height: 100%;
}
</style>
