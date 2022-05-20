<template>
  <div class="index">
    <DirectoryTree v-model="key" @tree-click="treeClick"> </DirectoryTree>
    <MdEditor
      v-model="content"
      class="MdEditor"
      @save="save"
      disabled
    ></MdEditor>
  </div>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import DirectoryTree from './components/DirectoryTree.vue';
import { ref } from 'vue';
import md from '@/api/md';
import { message } from 'ant-design-vue';

const content = ref<string>('');
const key = ref<number>(0);

// get file's detail
const getDetail = (id) => {
  md.getDetail(id).then((resp) => {
    const { code, data } = resp;
    if (code === 200000) {
      content.value = data.content;
    } else {
      message.error('查询失败');
    }
  });
};

// update markdown content
const update = (id, params) => {
  md.update(id, params).then((resp) => {
    const { code, data } = resp;
    if (code === 200000) {
      message.success('保存成功');
    } else {
      message.error('保存失败');
    }
  });
};

// handle click file or folder
const treeClick = (node) => {
  if (node.isLeaf) {
    getDetail(key.value);
  } else {
  }
};

// handle editor's save event
const save = (saveContent: string) => {
  const params = {
    content: saveContent,
  };
  update(key.value, params);
};
</script>

<style lang="less" scoped>
.index {
  display: flex;
  height: 100%;
  padding: 16px;
}

:deep(.MdEditor) {
  height: 100%;
}
</style>
