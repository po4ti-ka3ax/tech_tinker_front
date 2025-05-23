const axios = require("axios");
const Cookies = require('js-cookie')
const token = Cookies.get('access_token');
const instanceAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export default instanceAxios;