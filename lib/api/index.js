import Axios from 'axios';

import { getTokens } from '../auth';

const base = process.env.NEXT_PUBLIC_BASE_URL;

export function createClient() {
    let headers = {}

    if (typeof window !== 'undefined') {
        headers = {
            'Authorization': `Bearer ${getTokens()?.accessToken}`
        }
    }

    return Axios.create({
        baseURL: `${base}/api/v1`,
        headers
    })
}