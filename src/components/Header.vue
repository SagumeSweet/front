<template>
    <van-nav-bar
        :title="currentTitle"
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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        'van-nav-bar': NavBar,
    },
    setup() {
        const userStore = useUserStore();
        const route = useRoute();
        const router = useRouter();

        // 动态获取当前路由的 meta 中的 title
        const currentTitle = computed(() => route.meta.title || '默认标题');

        // 计算登录状态
        const isLoggedIn = computed(() => !!userStore.token);

        // 左侧返回按钮的点击事件
        const onClickLeft = () => {
            router.go(-1); // 返回上一个路由
        };

        // 右侧登录/登出按钮的点击事件
        const onClickRight = async () => {
            if (isLoggedIn.value) {
                await userStore.setLogout(); // 调用登出方法
                router.push('/user/login'); // 跳转到登录页
            } else {
                router.push('/user/login'); // 跳转到登录页
            }
        };

        return {
            currentTitle,
            isLoggedIn,
            onClickLeft,
            onClickRight,
        };
    },
};
</script>

<style scoped>
/* 样式可以在这里添加 */
</style>
