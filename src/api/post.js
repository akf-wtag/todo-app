import axios from './setup';

const postTodo = async (id, name, checked) => {
  const response = await axios.post('http://localhost:3000/todos', {
    id,
    name,
    checked,
  });

  return response;
};

export default postTodo;
