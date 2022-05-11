import axios from 'axios';
import { message } from 'ant-design-vue';
import * as storage from 'store';

const apiPrefix = '/api';

const service = axios.create({
  baseURL: '/',
  timeout: 6000,
});
service.interceptors.request.use(config => {
  const token = storage.get('token');
  if (token && config.headers) {
    config.headers.authorization = token;
  }
  return config;
});
service.interceptors.response.use(response => {
  const { message: msg, code } = response.data;
  if (code !== 200000) {
    if (code === 400004 || code === 400005) {
      message.info('登陆状态过期');
      const { origin } = window.location;
      // locate to login page
      window.location.replace(`${origin}/login`);
    } else {
      message.error(msg || '系统繁忙');
    }
  }
  return response.data;
});
const request = {
  post(url: string, data: object, prefix: string = apiPrefix) {
    return service({
      method: 'post',
      url: prefix + url,
      data,
    });
  },
  get(url: string, data: object, prefix: string = apiPrefix) {
    return service({
      method: 'get',
      url: prefix + url,
      params: data,
    });
  },
};
export default request;
