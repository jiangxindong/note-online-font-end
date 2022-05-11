import request from '@/utils/request';
const md = {
  getTree: () => {
    return request.get('/md/getTree');
  },
  delete: id => {
    return request.delete(`/md/${id}`);
  },
  new: params => {
    return request.post('/md', params);
  },
};
export default md;
