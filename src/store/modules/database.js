import axios from '../../services/api'

export default {
    actions: {
        GET_DATABASES: function({commit}) {
            axios.get('/databases/list').then(function(res) {
                if (res.data.success) {
                    commit('UPDATE_DATABASES', res.data.databases);
                }
            })
        }
    },
    mutations: {
        UPDATE_DATABASES(state, databases) {
            state.databases = databases;
        }
    },
    state: {
        databases: []
    },
    getters: {
        ALL_DATABASES(state) {
            return state.databases;
        }
    },
}