const axios = require('axios').create({
  baseURL: 'http://localhost:3000/todos',
});

export default axios;
