<template>
    <div>
        <h2>用户信息</h2>
        <div class="user-info">
            <div>
                <span>用户名: </span>
                <input v-if="isUserNameEditing" v-model="username" />
                <span v-else>{{ username }}</span>
                <button @click="toggleEdit">
                    {{ isUserNameEditing ? '提交' : '更改' }}
                </button>
            </div>
            <div>
                <span>邮箱: {{ email }}</span>
            </div>
            <div>
                <span>角色: {{ role }}</span>
                <span v-if="role === 'creator'">
                    <span>订阅价格: </span>
                    <input v-if="isPriceEditing" v-model="subscriptionPrice" />
                    <span v-else>{{ subscriptionPrice }}</span>
                    <button @click="togglePriceEdit">
                        {{ isPriceEditing ? '提交' : '更改' }}
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';
const userStore = useUserStore();
import { userApiEndpoint } from '../services/api';
import apiService from '../services/apiService.js';

export default {
    data() {
        return {
            isUserNameEditing: false,
            isPriceEditing: false,
            username: userStore.userInfo.username, // 替换为实际的用户名
            email: userStore.userInfo.email, // 替换为实际的邮箱
            role: userStore.userInfo.role, // 替换为实际的角色
            subscriptionPrice: userStore.userInfo.price, // 替换为实际的订阅价格
        };
    },
    methods: {
        async toggleEdit() {
            if (this.isUserNameEditing) {
                // 提交新用户名的逻辑
                // 例如，调用 API 更新用户名
                await apiService(userApiEndpoint.updateInfo, {
                    username: this.username,
                });
            }
            this.isUserNameEditing = !this.isUserNameEditing; // 切换编辑状态
        },
        async togglePriceEdit() {
            if (this.isPriceEditing) {
                await apiService(userApiEndpoint.updatePrice, {
                    price: this.subscriptionPrice,
                });
            }
            this.isPriceEditing = !this.isPriceEditing;
        },
    },
};
</script>

<style scoped>
.user-info {
    margin: 16px 0;
}
.user-info div {
    margin: 8px 0;
}
</style>
