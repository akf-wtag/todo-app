import axios from './setup';

const get = (path) =>
  axios.get(path, {
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 3001,
    },
  });

export default get;
