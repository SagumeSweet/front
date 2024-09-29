<template>
    <div>
        <h2>更改角色</h2>
        <van-form @submit="changeRole">
            <van-cell-group>
                <!-- 角色选择 -->
                <van-field label="选择角色">
                    <template #input>
                        <select v-model="selectedRole" class="role-select">
                            <option
                                v-for="role in roles"
                                :key="role"
                                :value="role"
                            >
                                {{ role }}
                            </option>
                        </select>
                    </template>
                </van-field>

                <!-- 价格输入 -->
                <van-field
                    v-model="price"
                    label="订阅价格"
                    placeholder="请输入订阅价格"
                    type="number"
                    :rules="priceRules"
                />

                <!-- 提交按钮 -->
                <div style="margin: 16px">
                    <van-button type="primary" native-type="submit"
                        >提交更改</van-button
                    >
                </div>
            </van-cell-group>
        </van-form>

        <p>当前角色: {{ currentRole }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { userApiEndpoint } from '../services/api';
import apiService from '../services/apiService.js';
import { showToast } from 'vant';

const userStore = useUserStore();
const currentRole = ref(userStore.userInfo.role); // 获取当前角色
const roles = ref(['creator', 'normal']); // 角色列表
const selectedRole = ref(currentRole.value); // 默认选择当前角色
const price = ref(''); // 订阅价格

// 价格验证规则
const priceRules = [
    {
        required: true,
        message: '订阅价格不能为空',
        trigger: 'onSubmit',
    },
    {
        pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
        message: '请输入有效的价格',
        trigger: 'onSubmit',
    },
];

// 提交角色更改
const changeRole = async () => {
    try {
        const data = { role: selectedRole.value, price: price.value };

        await apiService(userApiEndpoint.updateRole, data);

        currentRole.value = selectedRole.value; // 更新当前角色
        userStore.userInfo.role = selectedRole.value; // 更新用户 store
        userStore.userInfo.price = price.value; // 更新用户的订阅价格
        showToast('角色和价格更改成功！');
    } catch (error) {
        console.error('角色更改失败:', error);
        showToast('角色更改失败，请重试。');
    }
};
</script>

<style scoped>
/* 让 select 和 Vant 的 field 对齐 */
.role-select {
    width: 100%;
    border: none;
    padding: 8px;
    background: transparent;
    font-size: 16px;
}
</style>
