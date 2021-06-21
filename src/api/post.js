import axios from 'axios';

export const postTodo = async (url, id, name, checked) => {
  const response = await axios.post(url, {
    id,
    name,
    checked,
  });

  return response;
};

// .then((response) => {
//       setAddLoading(false);
//       setTodos((prevTodos) => [...prevTodos, response.data]);
//     })
//     .catch((error) => {
//       setAddLoading(false);
//       console.log(error);
//     });
