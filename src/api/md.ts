import request from '@/utils/request';
const md = {
  getTree: () => {
    return request.get('/md/getTree');
  },
  delete: (id) => {
    return request.delete(`/md/${id}`);
  },
  new: (params) => {
    return request.post('/md', params);
  },
  update: (id, params) => {
    return request.put(`/md/${id}`, params);
  },
  getDetail: (id) => {
    return request.get(`/md/${id}`);
  },
};
export default md;
