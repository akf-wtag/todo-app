import axios from './setup';

const deleteTodo = async (id) => {
  const response = await axios.delete(`/${id}`);
  return response;
};

export default deleteTodo;
