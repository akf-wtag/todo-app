const axios = require('axios').create({
  baseURL: 'http://localhost:3001',
  headers: { 'Access-Control-Allow-Origin': '*' }, //bypasses CORS error
});

export default axios;
