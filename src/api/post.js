import axios from './setup';

const postTodo = async (id, name, checked) => {
  const response = await axios.post('', {
    id,
    name,
    checked,
  });

  return response;
};

export default postTodo;
