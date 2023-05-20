import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'


const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/',
        redirect: {name: 'home'}
    },
    {
        path: '/:panmenglong',
        redirect: {name: 'home'}
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/user.vue')
    },
    {
        path: '/deal',
        name: 'deal',
        component: () => import('../views/TradingMarket.vue')
    },
]

const router = createRouter({
    //   history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router