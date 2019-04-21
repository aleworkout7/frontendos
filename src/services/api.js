import axios from 'axios';

const api = axios.create({
	baseURL: 'https://backendos.herokuapp.com',
});

export default api;