import axios from './setup';

const update = async (path, data) => {
  const response = await axios.patch(path, data);
  return response;
};

export default update;
