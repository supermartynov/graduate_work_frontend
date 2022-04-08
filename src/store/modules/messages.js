import axios from '../../services/api'

export default {
    actions: {
        GET_MESSAGES_FROM_DB: function({commit}, {params}) {
            axios.get('/message/' + params.id).then(function(res) {
                if (res.data) {
                    commit('UPDATE_MESSAGES', res.data);
                }
            }).catch(err => {
                console.log(err.message)
            })

        }
    },
    mutations: {
        SOCKET_NEW_MESSAGE(state, data) {
            if (typeof data === 'string') {
                return
            }
            if (!state.messages[data.room]) {
                state.messages[data.room] = []
            }
            state.messages[data.room].push({
                    message_body: data.message_body,
                    parent_message_id: data.parent_message_id,
                    message_id: data.message_id,
                    create_time: data.create_time,
                    hierarchy_level: data.hierarchy_level,
            })
        },
        UPDATE_MESSAGES(state, data) {
            state.messages = data;
        },
        UPDATE_MESSAGE_TO_REPLY(state, data) {
            state.reply_message = data
        }
    },
    state: {
        messages: [],
        reply_message: ''
    },
    getters: {
        GET_MESSAGES(state) {
            return state.messages;
        },
        GET_REPLY_MESSAGE(state) {
            return state.reply_message
        }
    },
}