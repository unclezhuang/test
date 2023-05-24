import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: {name:"homepage"}
    },
    {
        path: '/:defo',
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
            {
                path: 'write',
                name: 'write',
                component: () => import('../views/write.vue')
            },
            {
                path: 'detail?serch=":serch"$index=":index"',
                name: 'detail',
                component: () => import('../views/detail.vue')
            },
            {
                path: 'posts',
                name: 'posts',
                component: () => import('../views/posts.vue')
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