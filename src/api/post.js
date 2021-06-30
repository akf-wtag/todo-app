import axios from './setup';

const post = async (path, data) => {
  return await axios.post(path, data, {
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 3001,
    },
  });
};

export default post;
