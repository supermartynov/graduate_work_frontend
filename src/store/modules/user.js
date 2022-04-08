import axios from '../../services/api'
import {email} from "vuelidate/lib/validators";

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
        SOCKET_NEW_CONNECTION(state, data) {
            state.socket_id = data.socket_id;
        },
        UPDATE_SOCKET_ID(state, socket_id) {
            state.socket_id = socket_id;
        },
        UPDATE_EMAIL(state, email) {
            state.email = email;
            //state.login = email.substr(0, email.indexOf('@'));
        }
    },
    state: {
        user: {},
        email: '',
        socket_id: '',
        login: 'lalala'
    },
    getters: {
        GET_LOGIN(state) {
            return state.login;
        },
        GET_EMAIL(state) {
            return state.email;
        }
    },
}