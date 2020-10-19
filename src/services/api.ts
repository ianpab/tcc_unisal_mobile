import axios from 'axios';

const api = axios.create({
    baseURL: 'https://doapp-tcc.herokuapp.com/'
});



export default api;

