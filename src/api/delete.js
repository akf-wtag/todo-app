import axios from './setup';

const del = async (path) => {
  const response = await axios.delete(path);
  return response;
};

export default del;
