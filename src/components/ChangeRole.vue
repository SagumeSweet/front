<template>
    <div>
        <h2>更改角色</h2>
        <div>
            <label for="role-select">选择角色:</label>
            <select id="role-select" v-model="selectedRole">
                <option v-for="role in roles" :key="role" :value="role">
                    {{ role }}
                </option>
            </select>
            <button @click="changeRole">提交更改</button>
        </div>
        <p>当前角色: {{ currentRole }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { userApiEndpoint } from '../services/api';
import apiService from '../services/apiService.js';

export default {
    setup() {
        const userStore = useUserStore();
        const currentRole = ref(userStore.userInfo.role); // 获取当前角色
        const roles = ref(['creator', 'normal']); // 角色列表
        const selectedRole = ref(currentRole.value); // 默认选择当前角色

        const changeRole = async () => {
            try {
                // 调用 API 更改角色
                await apiService(userApiEndpoint.updateRole, { role: selectedRole.value });
                currentRole.value = selectedRole.value; // 更新当前角色
                userStore.userInfo.role = selectedRole.value; // 更新用户 store
                alert('角色更改成功！');
            } catch (error) {
                console.error('角色更改失败:', error);
                alert('角色更改失败，请重试。');
            }
        };

        return {
            currentRole,
            roles,
            selectedRole,
            changeRole,
        };
    },
};
</script>

<style scoped>
/* 样式可以在这里添加 */
</style>
