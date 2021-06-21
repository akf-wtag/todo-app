import axios from './setup';

const getTodos = async () => {
  const response = await axios.get();
  return response;
};

export default getTodos;
