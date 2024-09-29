<template>
    <div class="follow-list">
        <div class="follow-card" v-for="follow in follows" :key="follow.id">
            <div class="follow-card">
                <div class="follow-info">
                    <p>name:{{ follow.followName }}</p>
                    <p>info:{{ follow.followInfo }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiService from '../services/apiService';
import { userApiEndpoint } from '../services/api';
import { transactionApiEndpoint } from '../services/api';

const followResult = (await apiService(userApiEndpoint.getfollows)).data;

const follows = ref(followResult ? followResult : []);
const pay = async (id) => {
    await apiService(transactionApiEndpoint.payfollow, { id });
    const followResult = (await apiService(userApiEndpoint.getfollows)).data;

    const follows = ref(followResult ? followResult : []);
};
</script>
<script>
export default {
    name: 'followList',
};
</script>

<style scoped>
.follow-card {
    display: flex;
    justify-content: space-between; /* 在同一行排列 follow-info 和删除按钮 */
    align-items: center; /* 垂直方向居中对齐 */
    padding: 20px;
    bfollow: 1px solid #ddd; /* 边框 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    bfollow-radius: 8px; /* 圆角效果，可选 */
    margin-bottom: 20px; /* 卡片之间的间距 */
    background-color: #fff; /* 卡片背景色 */
}

.follow-info {
    flex-grow: 1; /* 让 follow-info 填充剩余空间 */
}

.pay-follow-button {
    background-color: red;
    color: white;
    bfollow: none;
    padding: 8px 12px;
    cursor: pointer;
    bfollow-radius: 4px; /* 按钮的圆角效果 */
}

.pay-follow-button:hover {
    background-color: darkred; /* 鼠标悬停时按钮颜色 */
}
</style>
