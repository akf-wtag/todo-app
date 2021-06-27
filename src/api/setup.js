const axios = require('axios').create({
  baseURL:
    `${process.env.BASE_URL}:${process.env.PORT}` || 'http://localhost:3001',
  headers: { 'Access-Control-Allow-Origin': '*' }, //bypasses CORS error
});

export default axios;
