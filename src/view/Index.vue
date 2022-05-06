<template>
  <MdEditor v-model="text"></MdEditor>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import request from "@/utils/request"
import { ref } from 'vue';
const text = ref('');
</script>

<style lang="less" scoped>
</style>
