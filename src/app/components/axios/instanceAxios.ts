const axios = require("axios");
const instanceAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export default instanceAxios;