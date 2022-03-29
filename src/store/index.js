import Vue from 'vue'
import Vuex from 'vuex'
import topic from './modules/topic'
import database from './modules/database'
import task from './modules/task'
import difficulty from "./modules/difficulty";
import user from "./modules/user"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        topic,
        database,
        task,
        difficulty,
        user
    }
})