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
            console.log("Начало SOCKET_NEW_MESSAGE")
            console.log(data)
            let tmp = state.messages
            state.messages = {}

            if (typeof data === 'string') {
                return
            }

            if (!tmp[data.room]) {
                tmp[data.room] = []
            }

            var parents_id = [] //массив id родителей

            axios.get('/message/parents/' + data.message_id)
                .then(parents => {
                    var parent_id_arrray = []
                    for (parent of parents.data[0].ancestors) {
                        parent_id_arrray.push(parent.id)
                    }

                    var path = tmp[data.room]

                    for (const parent_id of parent_id_arrray) {
                        var parent = path.find(el => el.id === parent_id)
                        if (parent && parent.children) {
                            path = parent.children
                        }
                    }

                    path.push({
                        message_body: data.message_body,
                        parent_message_id: data.parent_message_id,
                        message_id: data.message_id,
                        create_time: data.create_time,
                        hierarchy_level: data.hierarchy_level,
                        user: {
                            login: data.email.substr(0, data.email.indexOf('@'))
                        }
                    })
                    console.log("я тут ")
                    console.log(tmp[data.room])
                    state.messages = tmp
                })



        },
        UPDATE_MESSAGES(state, data) {
            state.messages = [];
            for (var message of data) {
                if (!state.messages[message.room]) {
                    state.messages[message.room] = []
                }
                state.messages[message.room].push(message)
            }
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