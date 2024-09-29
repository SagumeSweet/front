<template>
    <van-nav-bar
        :title="title"
        left-text="返回"
        :right-text="isLoggedIn ? '退出' : '登录'"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
</template>

<script>
import { NavBar } from 'vant';
import { useUserStore } from '@/stores/userStore';

export default {
    components: {
        'van-nav-bar': NavBar,
    },
    props: {
        title: {
            type: String,
            default: '标题', // 默认标题
        },
    },
    data() {
        return {
            userStore: useUserStore(),
        };
    },
    computed: {
        isLoggedIn() {
            return !!this.userStore.token; // 根据 token 判断是否登录
        },
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1); // 返回上一个路由
        },
        async onClickRight() {
            if (this.isLoggedIn) {
                await this.userStore.setLogout(); // 调用登出方法
                this.$router.push('/user/login'); // 跳转到登录页
            } else {
                this.$router.push('/user/login'); // 跳转到登录页
            }
        },
    },
};
</script>

<style scoped>
/* 样式可以在这里添加 */
</style>
