<template>
    <van-tabbar route active-color="#ee0a24">
        <van-tabbar-item replace to="/home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/user/userinfo" icon="setting-o"
            >我的</van-tabbar-item
        >
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
    components: {
        'van-tabbar': Tabbar,
        'van-tabbar-item': TabbarItem,
    },
};
</script>

<style scoped>
/* 样式可以在这里添加 */
</style>
