<template>
    <div class="order-list">
        <div class="order-card" v-for="order in orders" :key="order.id">
            <div class="order-card">
                <div class="order-info">
                    <p>订单id:{{ order.id }}</p>
                    <p>用户id: {{ order.userId }}</p>
                    <p>作者id: {{ order.creatorId }}</p>
                    <p>支付账号id: {{ order.paymentAccountId }}</p>
                    <p>市场（月）:{{ order.month }}</p>
                    <p>状态: {{ order.status }}</p>
                    <p>价格: {{ order.amount }}</p>
                    <p>创建时间: {{ order.createdAt }}</p>
                </div>
                <span v-if="order.status === 'pending'">
                    <van-button
                        type="primary"
                        size="small"
                        class="pay-order-button"
                        @click="pay(order.id)"
                        >支付</van-button
                    >
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiService from '../services/apiService';
import { userApiEndpoint } from '../services/api';
import { transactionApiEndpoint } from '../services/api';

const orderResult = (await apiService(userApiEndpoint.getOrders)).data;

const orders = ref(orderResult ? orderResult : []);
const pay = async (id) => {
    await apiService(transactionApiEndpoint.payOrder, { id });
    const orderResult = (await apiService(userApiEndpoint.getOrders)).data;

    orders.value = orderResult ? orderResult : [];
};
</script>
<script>
export default {
    name: 'OrderList',
};
</script>

<style scoped>
.order-card {
    display: flex;
    justify-content: space-between; /* 在同一行排列 order-info 和删除按钮 */
    align-items: center; /* 垂直方向居中对齐 */
    padding: 20px;
    border: 1px solid #ddd; /* 边框 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    border-radius: 8px; /* 圆角效果，可选 */
    margin-bottom: 20px; /* 卡片之间的间距 */
    background-color: #fff; /* 卡片背景色 */
}

.order-info {
    flex-grow: 1; /* 让 order-info 填充剩余空间 */
}

.pay-order-button {
    background-color: red;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px; /* 按钮的圆角效果 */
}

.pay-order-button:hover {
    background-color: darkred; /* 鼠标悬停时按钮颜色 */
}
</style>
