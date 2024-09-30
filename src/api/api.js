// src/api.js
import axios from 'axios';
// Hata yakalayıcı bir fonksiyon
let errorHandler;

// Error handler set etmek için bir fonksiyon
export const setGlobalErrorHandler = (handler) => {
    errorHandler = handler;
};

// Axios için bir instance oluşturuyoruz. Bu instance tüm API çağrılarında kullanılabilir.
const api = axios.create({
    baseURL: 'http://localhost:8090/formatter/v1', // Temel URL, her istekte kullanılacak
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        // İsteğe Authorization header gibi şeyler ekleyebilirsin
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // İstek gönderilmeden önce bir hata meydana gelirse burada işlenir
        return Promise.reject(error);
    }
);

// Response interceptor: Yanıt döndükten sonra hataları yakala
api.interceptors.response.use(
    response => {
        // Yanıt başarılı ise (örneğin 2xx bir HTTP kodu döndüyse) buraya girer
        return response;
    },
    error => {
        let message = 'Unexpected exception occured!';
        // Eğer bir hata HTTP kodu geldiyse (örneğin 4xx veya 5xx) buraya girer
        if (error.response) {
            // Sunucudan gelen hata
            const status = error.response.status;

            if (status === 400) {
                message = 'Bad Request (400)';
            } else if (status === 401) {
                message = 'Unauthorized (401). Yeniden giriş yapmanız gerekiyor.';
                // Örneğin, kullanıcıyı login sayfasına yönlendirebilirsiniz
            } else if (status === 404) {
                message = 'Not Found (404)';
            } else if (status === 500) {
                message = 'Server Error (500)';
            }

            // Diğer tüm HTTP hataları
            return Promise.reject(error.response);
        } else if (error.request) {
            // İstek gönderildi fakat yanıt alınamadı
            message = 'No response received from server.';
        } else {
            // İstek hazırlanırken bir şeyler ters gitti
            message = 'Request setup error: ' + error.message;
        }

        if (errorHandler) {
            errorHandler(message);
        }

        return Promise.reject(error);
    }
);

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


