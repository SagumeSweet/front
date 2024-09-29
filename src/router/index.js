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
        meta: { title: '主页' },
    },
    {
        path: '/user',
        name: 'User',
        children: [
            {
                path: 'userinfo',
                name: 'userInfo',
                component: () => import('@/views/UserInfoView.vue'),
                meta: { title: '我的' },
            },
            {
                path: 'login',
                name: 'userLogin',
                component: () => import('@/views/LoginView.vue'),
                meta: { title: '登录' },
            },
            {
                path: 'register',
                name: 'userRegister',
                component: () => import('@/views/RegisterView.vue'),
                meta: { title: '注册' },
            },
            {
                path: ':id',
                name: 'userDetail',
                component: () => import('@/views/UserDetailView.vue'),
                meta: { title: '用户详情' },
            },
        ],
    },
    {
        path: '/content',
        name: 'Content',
        meta: { title: '作品' },
        children: [
            {
                path:':id',
                name:'contentDetail',
                component: () => import('@/views/ContentDetailView.vue'),
                meta: { title: '作品详情'}
            }
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
