import Vue from 'vue'
import Vuex from 'vuex'
import topic from './modules/topic'
import database from './modules/database'
import task from './modules/task'
import difficulty from "./modules/difficulty";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        topic,
        database,
        task,
        difficulty
    }
})