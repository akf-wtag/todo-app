import axios from 'axios';

export const getTodos = async (url) => {
  const response = await axios.get(url);

  return response;
};

// .then((response) => {
//       setTodos(response.data);
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
