import axios from 'axios';
const BASE_URL = 'http://localhost:3500/api/v1';

export default axios.create({
    baseURL: BASE_URL
});
