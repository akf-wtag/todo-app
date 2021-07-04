import axios from './setup';

const get = (path) => axios.get(path);

export default get;

// {
//     proxy: {
//       protocol: 'https',
//       host: '127.0.0.1',
//       port: 3001,
//     }
//   }
