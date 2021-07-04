import axios from './setup';

const update = (path, data) => {
  return axios.patch(path, data);
};

export default update;
