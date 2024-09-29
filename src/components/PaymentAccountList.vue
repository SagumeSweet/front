<template>
    <div class="payment-account-list">
        <!-- 交易账户列表 -->
        <div class="account-list" v-for="account in accounts" :key="account.id">
            <div class="account-card">
                <div class="account-info">
                    <p>name:{{ account.accountName }}</p>
                    <p>info:{{ account.accountInfo }}</p>
                    <p v-if="account.isDefault">默认账户</p>
                </div>
                <span>
                    <van-button
                        type="primary"
                        size="small"
                        class="pay-account-button"
                        @click="deleteAccount(account.id)"
                    >
                        删除
                    </van-button>
                    <van-button
                        type="primary"
                        size="small"
                        class="pay-account-button"
                        @click="setAsDefault(account.id)"
                        >设为默认</van-button
                    >
                </span>
            </div>
        </div>

        <!-- 创建账户按钮 -->
        <div class="create-button-container">
            <van-button type="primary" block @click="showCreateAccountModal"
                >创建交易账户</van-button
            >
        </div>

        <!-- 创建账户弹窗 -->
        <van-dialog
            v-model:show="showCreateAccountDialog"
            title="创建交易账户"
            show-cancel-button
            @confirm="createAccount"
        >
            <div class="form">
                <van-field
                    v-model="newAccount.accountName"
                    label="账户名称"
                    placeholder="请输入账户名称"
                />
                <van-field
                    v-model="newAccount.accountInfo"
                    label="账户信息"
                    placeholder="请输入账户信息"
                />
            </div>
        </van-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import apiService from '../services/apiService';
import { userApiEndpoint } from '../services/api';

const accountResult = (await apiService(userApiEndpoint.getPaymentAccount))
    .data;

// 模拟交易账户数据
const accounts = ref(accountResult ? accountResult : []);

// 控制创建账户弹窗的显示
const showCreateAccountDialog = ref(false);

// 存储新创建的账户信息
const newAccount = ref({
    accountName: '',
    accountInfo: '',
});

// 删除账户方法
const deleteAccount = async (id) => {
    await apiService(userApiEndpoint.deletePaymentAccount, null, { id: id });
    let newAccountResult = (await apiService(userApiEndpoint.getPaymentAccount))
        .data;
    accounts.value = newAccountResult ? newAccountResult : [];
};

// 显示创建账户弹窗
const showCreateAccountModal = () => {
    showCreateAccountDialog.value = true;
};

// 创建账户方法
const createAccount = async () => {
    if (newAccount.value.accountName && newAccount.value.accountInfo) {
        const accountData = (
            await apiService(userApiEndpoint.setPaymentAccount, {
                accountName: newAccount.value.accountName,
                accountInfo: newAccount.value.accountInfo,
            })
        ).data;
        let newAccountResult = (
            await apiService(userApiEndpoint.getPaymentAccount)
        ).data;
        accounts.value = newAccountResult ? newAccountResult : [];

        newAccount.value.accountName = '';
        newAccount.value.accountInfo = '';
    }
    showCreateAccountDialog.value = false;
};

const setAsDefault = async (id) => {
    await apiService(userApiEndpoint.updateDefaultPaymentAccount, null, {
        id: id,
    });
    let newAccountResult = (await apiService(userApiEndpoint.getPaymentAccount))
        .data;
    accounts.value = newAccountResult ? newAccountResult : [];
};
</script>
<script>
export default {
    name: 'PaymentAccountList',
};
</script>

<style scoped>
.account-card {
    display: flex;
    justify-content: space-between; /* 在同一行排列 account-info 和删除按钮 */
    align-items: center; /* 垂直方向居中对齐 */
    padding: 20px;
    border: 1px solid #ddd; /* 边框 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    border-radius: 8px; /* 圆角效果，可选 */
    margin-bottom: 20px; /* 卡片之间的间距 */
    background-color: #fff; /* 卡片背景色 */
}

.account-info {
    flex-grow: 1; /* 让 account-info 填充剩余空间 */
}

.pay-account-button {
    background-color: red;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px; /* 按钮的圆角效果 */
}

.pay-account-button:hover {
    background-color: darkred; /* 鼠标悬停时按钮颜色 */
}
</style>
