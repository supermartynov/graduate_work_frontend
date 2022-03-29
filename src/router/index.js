import Vue from 'vue'
import Router from 'vue-router'
import Registration from "@/components/Registration";
import Authorization from "@/components/Authorization";

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
      redirect: '/topics',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'topics',
          name: 'Topics',
          component: Topic
        },
        {
          path: 'tasks',
          name: 'Tasks',
          component: Task
        },
        {
          path: 'tasks/:id',
          name: 'Tasks / 1',
          component: TaskShow
        }
      ]
    },
    {
      path: '/registration',
      name: 'Register',
      component: Registration
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: Authorization
    }
  ]
})
