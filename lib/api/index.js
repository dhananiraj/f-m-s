import Axios from 'axios';

import { getTokens } from '../auth';

let headers = {}

if (typeof window !== 'undefined') {
    headers = {
        'Authorization': `Bearer ${getTokens()?.accessToken}`
    }
}

export const client = Axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers
})