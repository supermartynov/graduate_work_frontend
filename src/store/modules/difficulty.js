import axios from '../../services/api'

export default {
    actions: {
        GET_DIFFICULTIES: function({commit}) {
            axios.get('/difficulties/list').then(function(res) {
                if (res.data.success) {
                    commit('UPDATE_DIFFICULTIES', res.data.difficulties);
                }
            })
        }
    },
    mutations: {
        UPDATE_DIFFICULTIES(state, difficulties) {
            state.difficulties = difficulties;
        }
    },
    state: {
        difficulties: []
    },
    getters: {
        ALL_DIFFICULTIES(state) {
            return state.difficulties;
        }
    },
}