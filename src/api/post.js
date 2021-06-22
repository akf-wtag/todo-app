import axios from './setup';

const postTodo = async (title, id, name, checked) => {
  const response = await axios.post('', {
    [title]: [
      {
        id,
        name,
        checked,
      },
    ],
  });

  return response;
};

export default postTodo;
