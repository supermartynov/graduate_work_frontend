import Vue from 'vue'
import Router from 'vue-router'
import Registration from "@/components/Registration";
import Authorization from "@/components/Authorization";
import {i18n} from "@/plugin/i18n";

// Containers
const DefaultContainer = () => import('@/components/DefaultContainer')
const Topic = () => import('@/components/Topic')
const Task = () => import('@/components/Task')
const TaskShow = () => import('@/components/TaskShow')

Vue.use(Router)

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: `/${i18n.locale}/topics`,
            name: 'Home',
            component: DefaultContainer,
            children: [
                {
                    path: `:lang/topics`,
                    name: 'Topics',
                    component: Topic
                },
                {
                    path: `:lang/tasks`,
                    name: 'Tasks',
                    component: Task
                },
                {
                    path: `:lang/tasks/:id`,
                    name: 'Tasks / 1',
                    component: TaskShow
                }
            ]
        },
        {
            path: '/authorization',
            redirect: `${i18n.locale}/authorization`,
            name: 'Register',
            component: Registration
        },
        {
            path: '/registration',
            redirect: `${i18n.locale}/registration`,
            name: 'Register',
            component: Registration
        },
        {
            path: '/:lang/registration',
            name: 'Register-lang',
            component: Registration
        },
        {
            path: '/:lang/authorization',
            name: 'Authorization-lang',
            component: Authorization
        }
    ]
})
