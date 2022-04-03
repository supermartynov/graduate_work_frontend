import axios from '../../services/api'

export default {
    actions: {
        AUTH_USER: function({commit}, payload) {
            axios.post('http://localhost:2000/login',
                {login: payload.email, password: payload.password})
                .then(function(res) {
                    commit("UPDATE_EMAIL", res.data.user.login)
                })
                .catch(err => console.log(err))
        },
        LOGOUT: function ({commit}) {
            axios.get("/logout")
                .then(commit("UPDATE_EMAIL", ""))
                .catch(err => console.log(err))
        }
    },
    mutations: {
        UPDATE_SOCKET_ID(state, socket_id) {
            state.socket_id = socket_id;
        },
        UPDATE_EMAIL(state, email) {
            state.email = email;
        }
    },
    state: {
        user: {},
        email: '',
        socket_id: ''
    },
    getters: {
        GET_SOCKET_ID(state) {
            return state.socket_id;
        },
        GET_EMAIL(state) {
            return state.email;
        }
    },
}