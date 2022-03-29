import axios from "axios";

const customAxios = axios.create({
    baseURL: 'http://localhost:2000',
    headers: {
        crossDomain: true,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:2000/',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    }
})

customAxios.defaults.withCredentials = true

export default customAxios