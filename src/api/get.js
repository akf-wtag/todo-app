import axios from './setup';

const get = async (path) => {
  let response = await axios.get(path);
  return response;
};

export default get;
