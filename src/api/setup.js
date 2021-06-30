const axios = require('axios').create({
  baseURL: 'http://localhost:3001',
  headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }, //bypasses CORS error
});

export default axios;
