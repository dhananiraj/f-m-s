import jwt_decode from "jwt-decode";
import Axios from "axios";
import client from '../api';

const base = process.env.NEXT_PUBLIC_BASE_URL;
const domain = process.env.NEXT_PUBLIC_DOMAIN;

export function getTokens() {
    const rawTokens = localStorage.getItem('tokens');

    if (!rawTokens || rawTokens.toString() === '') {
        return null
    }

    return JSON.parse(rawTokens);
}

export function saveTokens(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
}

export function isLoggedIn() {
    try {
        const { accessToken } = getTokens();
        const data = jwt_decode(accessToken);
        if (Date.now() > (new Date(data.exp * 1000))) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

export async function login(data = {}) {
    try {
        const { userName, password } = data;
        const res = await Axios.post(
            `${base}/api/v1/user/login`,
            {
                userName,
                password
            })
        saveTokens(res?.data?.data);
        return res
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}

export async function signup(data = {}) {
    try {
        const { userName, password } = data;
        const res = await Axios.post(
            `${base}/api/v1/user/`,
            {
                userName,
                password,
                userLevel: 2
            })
        saveTokens(res?.data?.data);
        return res
    } catch (e) {
        throw new Error(e.response.data.message)
    }
}

export function logout() {
    localStorage.clear();
}