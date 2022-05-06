<template>
  <div class="container">
    <a-form :model="formState" :label-col="{ span: 6 }">
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username"></a-input>
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password"></a-input-password>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24, offset: 8 }">
        <a-button type="primary" html-type="submit" @click="submit">submit</a-button>
        <!-- <a-button style="margin-left: 10px">Cancel</a-button> -->
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from '@/api/auth'
import * as storage from 'store';

const router = useRouter();
const formState = reactive({
  username: '',
  password: '',
});
const submit = () => {
  auth.login(formState).then(resp => {
    const { code, data } = resp;
    if (code === 200000) {
      storage.set("token", data);
      router.push({
        path: '/',
      });
    }
  })
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ant-form {
  padding: 16px;
  border: 1px solid rgb(32, 31, 31);
}
</style>
