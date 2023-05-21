import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: {name:"homepage"}
    },
    {
        path: '/:panmenglong',
        redirect: {name:"homepage"}
    },
    {
        path: '/defo',
        name: 'defo',
        component: () => import('../views/Home.vue'),
        redirect:{name:"homepage"},
        children: [
            {
                path: 'deal',
                name: 'deal',
                component: () => import('../views/TradingMarket.vue')
            },
            {
                path: 'homepage',
                name: 'homepage',
                component: () => import('../views/HomePage.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../views/user.vue')
            },
        ]
    },
]

const router = createRouter({
    //   history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router