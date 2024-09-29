<template>
    <div class="user-detail-view">
        <div v-if="user">
            <div class="profile">
                <AvatarFormat :src="avatar" size="100px" />
                <p><strong>用户名：</strong>{{ user.username }}</p>
                <p><strong>邮箱：</strong>{{ user.email }}</p>
                <p><strong>角色：</strong>{{ user.role }}</p>
            </div>
        </div>
        <div v-if="isAuth">
            <!-- 关注按钮 -->
            <van-button
                type="primary"
                @click="handleFollow"
                :disabled="loading"
                class="follow-button"
            >
                {{ isFollowing ? '取消关注' : '关注' }}
            </van-button>
            <!-- 订阅按钮或订阅信息 -->
            <div v-if="isSubscribed">
                <p>
                    <strong>订阅信息：</strong>已订阅，剩余{{
                        subscription.months
                    }}个月
                </p>
                <van-button
                    type="danger"
                    @click="handleUnsubscribe"
                    class="unsubscribe-button"
                >
                    取消订阅
                </van-button>
            </div>
            <div v-else>
                <van-button
                    type="success"
                    @click="showSubscribeModal"
                    class="subscribe-button"
                >
                    订阅
                </van-button>
            </div>
        </div>

        <!-- 订阅弹窗 -->
        <van-dialog v-model:show="showSubscribeDialog" title="选择订阅方式">
            <van-field
                v-model="selectedAccount"
                label="支付账户"
                placeholder="选择支付账户"
                :options="paymentAccounts"
                type="select"
            />
            <van-field
                v-model="months"
                label="订阅月数"
                type="number"
                placeholder="输入订阅月数"
                min="1"
            />
            <div class="dialog-buttons">
                <van-button type="primary" @click="subscribe">确认</van-button>
                <van-button @click="showSubscribeDialog = false"
                    >取消</van-button
                >
            </div>
        </van-dialog>
    </div>
</template>

<script setup>
import apiService from '../services/apiService';
import { getFullApiUrl } from '../services/apiService';
import {
    userApiEndpoint,
    getFileApiEndpoint,
    subscribeApiEndpoint,
} from '../services/api';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import AvatarFormat from '@/components/AvatarFormat.vue';
import { useUserStore } from '../stores/userStore';
import { showToast, Dialog } from 'vant';

const userStore = useUserStore();
const isAuth = ref(!!'');
// 获取路由
const route = useRoute();
const user = ref(null);
const avatar = ref(
    getFullApiUrl(getFileApiEndpoint.getAvatar, { id: route.params.id })
);
const isFollowing = ref(false); // 是否已关注
const isSubscribed = ref(false); // 是否已订阅
const subscription = ref({ months: 0 }); // 订阅信息
const loading = ref(false);
const showSubscribeDialog = ref(false); // 控制订阅弹窗显示
const paymentAccounts = ref(['账户1', '账户2']); // 模拟支付账户
const selectedAccount = ref('');
const months = ref(1);

// 获取用户详情的方法
const fetchUserDetail = async (id) => {
    try {
        const userData = await apiService(
            userApiEndpoint.getUserByIdFromPublic,
            null,
            { id }
        );
        user.value = userData.data;
    } catch (error) {
        console.error('获取用户详情失败:', error);
    }
};

// 检查是否已关注
const checkFollowStatus = async () => {
    try {
        const response = await apiService(userApiEndpoint.getUserFollows, null);
        isFollowing.value = response.data.includes(user.value.id);
    } catch (error) {
        console.error('获取关注状态失败:', error);
    }
};

// 检查订阅状态
const checkSubscriptionStatus = async () => {
    try {
        const response = await apiService(
            subscribeApiEndpoint.getSubscribe,
            null
        );
        const userSubscription = response.data.find(
            (sub) => sub.userId === user.value.id
        );
        if (userSubscription) {
            isSubscribed.value = true;
            subscription.value.months = userSubscription.months;
        }
    } catch (error) {
        console.error('获取订阅状态失败:', error);
    }
};

// 处理关注或取消关注
const handleFollow = async () => {
    loading.value = true;
    try {
        if (isFollowing.value) {
            await apiService(userApiEndpoint.deleteUserFollows, {
                creatorId: user.value.id,
                userId: userStore.userInfo.id,
            });
            isFollowing.value = false;
            showToast('已取消关注');
        } else {
            await apiService(userApiEndpoint.setUserFollows, {
                creatorId: user.value.id,
                userId: userStore.userInfo.id,
            });
            isFollowing.value = true;
            showToast('已关注');
        }
    } catch (error) {
        console.error('操作失败:', error);
    } finally {
        loading.value = false;
    }
};

// 显示订阅弹窗
const showSubscribeModal = () => {
    showSubscribeDialog.value = true;
};

// 订阅操作
const subscribe = async () => {
    try {
        await apiService(subscribeApiEndpoint.setSubscribe, {
            userId: user.value.id,
            account: selectedAccount.value,
            months: months.value,
        });
        isSubscribed.value = true;
        subscription.value.months = months.value;
        showToast('订阅成功');
        showSubscribeDialog.value = false;
    } catch (error) {
        console.error('订阅失败:', error);
        showToast('订阅失败');
    }
};

// 取消订阅
const handleUnsubscribe = async () => {
    try {
        await apiService(subscribeApiEndpoint.cancelSubscribe, {
            userId: user.value.id,
        });
        isSubscribed.value = false;
        showToast('订阅已取消');
    } catch (error) {
        console.error('取消订阅失败:', error);
        showToast('取消订阅失败');
    }
};

// 页面挂载时执行的逻辑
onMounted(() => {
    const userId = route.params.id;
    const userStore = useUserStore();
    fetchUserDetail(userId);
    if (userStore.token) {
        isAuth.value = true;
        checkFollowStatus();
        checkSubscriptionStatus();
    }
});
</script>

<style scoped>
.user-detail-view {
    padding: 20px;
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.follow-button,
.subscribe-button,
.unsubscribe-button {
    margin-top: 10px;
}

.dialog-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
</style>
