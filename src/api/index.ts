import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: `${api_url}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
