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
        UPDATE_USER(state, user) {
            state.user = user;
        },
        UPDATE_EMAIL(state, email) {
            state.email = email;
        }
    },
    state: {
        user: {},
        email: '',
    },
    getters: {
        GET_USER(state) {
            return state.user;
        },
        GET_EMAIL(state) {
            return state.email;
        }
    },
}