import axios from 'axios';

const token =  localStorage.getItem('token');

export const API = axios.create({
    baseURL: "https://catcoinserver-3m2wyzclmq-uc.a.run.app/",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});