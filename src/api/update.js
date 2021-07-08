import axios from './setup';

const update = (path, data) => axios.patch(path, data);

export default update;
