// src/api.js
import axios from 'axios';

// Axios için bir instance oluşturuyoruz. Bu instance tüm API çağrılarında kullanılabilir.
const api = axios.create({
    baseURL: 'http://localhost:8090/formatter/v1', // Temel URL, her istekte kullanılacak
    headers: {
        'Content-Type': 'application/json',
    },
});

// GET isteği için örnek bir fonksiyon
export const getData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('GET error:', error);
        throw error;
    }
};

// POST isteği için örnek bir fonksiyon
export const postData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST error:', error);
        throw error;
    }
};

// PUT isteği için örnek bir fonksiyon
export const putData = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PUT error:', error);
        throw error;
    }
};

// PUT isteği için örnek bir fonksiyon
export const patchData = async (endpoint, data) => {
    try {
        const response = await api.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PATCH error:', error);
        throw error;
    }
};

// DELETE isteği için örnek bir fonksiyon
export const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('DELETE error:', error);
        throw error;
    }
};


