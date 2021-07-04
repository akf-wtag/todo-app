import axios from './setup';

const post = (path, data) => {
  return axios.post(path, data);
};

export default post;
