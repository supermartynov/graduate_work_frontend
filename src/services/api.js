import axios from './custom_axios'

export default {
    get(resource, params) {
        return axios.get(resource, {params: params})
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data, {withCredentials:true, headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'}})
    },

    delete(resource) {
        return axios.delete(resource, {withCredentials:true, headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080/',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'}})
    },
}