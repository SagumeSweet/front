<template>
    <div class="profile-tabs">
        <div class="avatar-card">
            <AvatarFormat :src="avatar" size="100px"></AvatarFormat>
        </div>
        <van-tabs v-model="activeTab" @change="handleTabChange" class="tabs">
            <van-tab title="用户信息" name="userInfo" />
            <van-tab title="更改角色" name="changeRole" />
            <van-tab title="上传头像" name="uploadAvatar" />
            <van-tab title="交易账户" name="paymentAccount" />
            <van-tab title="账单" name="order"></van-tab>
            <van-tab v-if="isCreator" title="作品" name="content"></van-tab>
        </van-tabs>

        <div class="tab-content">
            <UserInfo v-if="activeTab === 'userInfo'" />
            <ChangeRole v-if="activeTab === 'changeRole'" />
            <upload-avatar v-if="activeTab === 'uploadAvatar'" />
            <!-- 包裹 PaymentAccountList 组件 -->
            <Suspense v-if="activeTab === 'paymentAccount'">
                <template #default>
                    <PaymentAccountList />
                </template>
                <template #fallback>
                    <div>加载中...</div>
                    <!-- 可以定制加载时显示的内容 -->
                </template>
            </Suspense>
            <Suspense>
                <OrderList v-if="activeTab === 'order'"></OrderList>
            </Suspense>
            <Suspense v-if="isCreator && activeTab === 'content'">
                <div class="content-profile">
                    <user-content-list
                        :id="userStore.userInfo.id"
                    ></user-content-list>
                    <create-content></create-content>
                </div>
            </Suspense>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import OrderList from './OrderList.vue';
import { useUserStore } from '../stores/userStore';
import AvatarFormat from './AvatarFormat.vue';
import { getFullApiUrl } from '../services/apiService';
import { getFileApiEndpoint } from '../services/api';
const userStore = useUserStore();

const isCreator = ref(userStore.userInfo.role === 'creator');
const price = ref(userStore.userInfo.price);
const avatar = ref(
    getFullApiUrl(getFileApiEndpoint.getAvatar, { id: userStore.userInfo.id })
);

const activeTab = ref('userInfo');
import PaymentAccountList from './PaymentAccountList.vue';
const handleTabChange = (tab) => {
    activeTab.value = tab;
};
</script>

<style scoped></style>
