import axios from './setup';

const post = async (path, data) => {
  const response = await axios.post(path, data);
  return response;
};

export default post;
