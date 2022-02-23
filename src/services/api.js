import axios from 'axios'

export default {
    get(resource, params) {
        return axios.get(resource, {params: params})
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },
}