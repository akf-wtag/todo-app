import axios from './setup';

const post = (path, data) => axios.post(path, data);

export default post;
