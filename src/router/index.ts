import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        redirect: { name: "homepage" }
    },
    {
        path: '/:defo',
        redirect: { name: "homepage" }
    },
    {
        path: '/defo',
        name: 'defo',
        component: () => import('../views/Home.vue'),
        redirect: { name: "homepage" },
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
                path: 'Post',
                name: 'Post',
                component: () => import('../views/PostView.vue'),
            },
            {
                path: 'posts?serch=":serch"',
                name: 'posts',
                component: () => import('../views/posts.vue')
            },
            {
                path: 'Posts',
                name: 'Posts',
                component: () => import('../views/posts.vue')
            },
            {
                path: 'post?serch=":serch"',
                name: 'post',
                component: () => import('../views/PostView.vue')
            },
        ]
    },
]

const router = createRouter({
    //   history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.query.serch) {
        to.query.serch = decodeURIComponent(to.href).substring(decodeURIComponent(to.href).indexOf('=')+1).slice(1,-1)
        to.params = to.query
    }
    next()
})
export default router