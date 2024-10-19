// src/api.js
import axios from 'axios';
import { useState } from 'react';

let errorHandler = null;

export const setGlobalErrorHandler = (handler) => {
    errorHandler = handler;
};

const api = axios.create({
    baseURL: 'http://localhost:8090/formatter/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let message = 'Unexpected exception occured!';
        if (error.response) {
            if (errorHandler != null) {
                errorHandler(error.response ? error.response : message);
            }
            return Promise.reject(error.response);
        }  else if (error.request) {
            message = 'No response received from server. Please check your network connection.';
        }  else {
            message = 'Request setup error: ' + error.message;
        }

        if (errorHandler != null) {
            errorHandler(message);
        }

        return Promise.reject(error);
    }
);

export const getData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('GET error: %s', error);
        throw error;
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST error: %s', error);
        throw error;
    }
};

export const putData = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PUT error: %s', error);
        throw error;
    }
};

export const patchData = async (endpoint, data) => {
    try {
        const response = await api.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PATCH error: %s', error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('DELETE error: %s', error);
        throw error;
    }
};


