import axios from '../../services/api'

export default {
    actions: {
        GET_TOPICS: function({commit}) {
            axios.get('/topics/list').then(function(res) {
                if (res.data.success) {
                    commit('UPDATE_TOPICS', res.data.topics);
                }
            })
        }
    },
    mutations: {
        UPDATE_TOPICS(state, topics) {
            state.topics = topics;
        }
    },
    state: {
        topics: []
    },
    getters: {
        ALL_TOPICS(state) {
            return state.topics;
        }
    },
}