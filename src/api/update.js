import axios from './setup';

const updateTodo = async (id, name, checked) => {
  const response = await axios.patch(`/${id}`, { name, checked });
  return response;
};

export default updateTodo;
