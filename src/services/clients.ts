import axios from "axios";

export const apiUrl = 'http://localhost:5165';

export const apiInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})