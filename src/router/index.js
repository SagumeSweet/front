import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/user',
        name: 'User',
        children: [
            {
                path: 'userinfo',
                name: 'userInfo',
                component: () => import('@/views/UserInfoView.vue'),
            },
            {
                path: 'login',
                name: 'userLogin',
                component: () => import('@/views/LoginView.vue'),
            },
            {
                path: 'register',
                name: 'userRegister',
                component: () => import('@/views/RegisterView.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
