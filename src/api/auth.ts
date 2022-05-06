import request from '@/utils/request';
const auth = {
  login: (params: object) => {
    return request.post('/auth/login', params);
  },
};
export default auth;
