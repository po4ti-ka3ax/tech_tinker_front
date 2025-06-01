const axios = require("axios");
const Cookies = require('js-cookie')
const instanceAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instanceAxios.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instanceAxios;