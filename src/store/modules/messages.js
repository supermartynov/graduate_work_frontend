import axios from '../../services/api'

export default {
    actions: {
        GET_MESSAGES_FROM_DB: function({commit}) {

        }
    },
    mutations: {
        SOCKET_new_message(state, data) {
            console.log("Добавление нового комментария в комнату " + data.room)
            if (!state.messages[data.room]) {
                state.messages[data.room] = []
            }
            state.messages[data.room].push({email: data.email, comment: data.content})
        },
        SOCKET_newHello(state, data) {
            state.helloMessages.push(data.string)
        },
        DELETE_MESSAGES(state) {
            state.messages.length = 0;
        }
    },
    state: {
        messages: {},
        helloMessages: []
    },
    getters: {
        GET_MESSAGES(state) {
            return state.messages;
        }
    },
}