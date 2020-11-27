import Axios from 'axios';

export const client = Axios.create({
    baseURL: 'http://localhost:5000/api/v1'
})