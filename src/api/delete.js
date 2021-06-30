import axios from './setup';

const del = (path) =>
  axios.delete(path, {
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 3001,
    },
  });

export default del;
