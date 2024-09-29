<template>
    <div>
        <div class="form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                        v-model="enterData.username"
                        name="username"
                        label="用户名"
                        placeholder="用户名"
                    />
                    <van-field
                        v-model="enterData.email"
                        name="email"
                        label="邮箱"
                        placeholder="邮箱"
                    />
                    <van-field
                        v-model="enterData.password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="enterData.passwordRules"
                    />
                </van-cell-group>
                <div style="margin: 16px">
                    <van-button round block type="primary" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { userApiEndpoint } from '../services/api';
import apiService from '../services/apiService.js';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore.js';

const router = useRouter();
const userStore = useUserStore();

const enterData = ref({
    username: '',
    email: '',
    password: '',
    passwordRules: [
        { required: true, message: '密码不能为空', trigger: 'onSubmit' },
        {
            pattern: /^[a-zA-Z][a-zA-Z0-9]{5,7}$/,
            message: '密码格式错误',
            trigger: 'onSubmit',
        },
    ],
});

const onSubmit = async (value) => {
    console.log(value);
    const resResult = await apiService(userApiEndpoint.register, value);
    console.log(resResult);
    router.replace('/user/login');
};
</script>

<style lang="less" scoped>
</style>
