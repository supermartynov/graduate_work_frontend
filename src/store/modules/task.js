import axios from '../../services/api'

export default {
    actions: {
        GET_TASKS: function({commit}) {
            axios.get('/tasks/list').then(function(res) {
                if (res.data.success) {
                    commit('UPDATE_TASKS', res.data.tasks);
                }
            })
        },
        GET_TASK: function({commit}, {params}) {
            axios.get('/tasks/' + params.id).then(function(res) {
                if (res.data.success) {
                    commit('UPDATE_TASK', res.data);
                }
            })
        },
        ADD_TASK: function(ctx, element) {
            return new Promise(function(resolve, reject) {
                axios.post('/tasks/add', element).then(function(res) {
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    },
    mutations: {
        UPDATE_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        UPDATE_TASK(state, task) {
            state.task = task;
        }
    },
    state: {
        tasks: [],
        task: {
            difficulty: {},
            database: {},
            topic: {}
        }
    },
    getters: {
        ALL_TASKS(state) {
            return state.tasks;
        },
        ONE_TASK(state) {
            return state.task;
        }
    },
}