import axios from 'axios';
interface ApiConfig {
  body: Object;
  data: Object;
}
async function request(url: string, options: ApiConfig) {
  const service = axios.create({
    baseURL: '',
    timeout: 6000,
  });
  service.interceptors.request.use((request) => {
    if (options && options.body) {
      request.data = options.body;
    }
    return request;
  });
  service.interceptors.response.use((response) => {
    return response.data;
  });
}
export default request;
