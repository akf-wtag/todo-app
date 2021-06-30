import axios from './setup';

const update = async (path, data) => {
  return await axios.patch(path, data, {
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 3001,
    },
  });
};

export default update;
