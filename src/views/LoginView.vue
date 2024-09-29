<template>
    <div>
        <div class="form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
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
                        登录
                    </van-button>
                </div>
                <div style="margin: 16px">
                    <van-button round block type="primary" to="/user/register">
                        注册
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
//导入依赖
import { userApiEndpoint } from '../services/api';
import apiService from '../services/apiService.js';
//路由相关的，允许你用js控制路由，跳转组件一点就得走，，但是此时不是直接点了就跳转，需要js控制允许控制转向其他路由
//        控制路由   访问路由
//import { useRoute, useRouter } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();
//token
import { useUserStore } from '../stores/userStore.js';
//初始化
const userStore = useUserStore();

/**-------------------------------------------------------------- */
//接收用户输入的内容
const enterData = ref({
    email: '',
    password: '',

    // 密码的正则
    passwordRules: [
        { required: true, message: '密码不能为空', trigger: 'onSubmit' },
        {
            pattern: /^[a-zA-Z][a-zA-Z0-9]{5,7}$/,
            message: '密码号格式错误',
            trigger: 'onSubmit',
        },
    ],
});

const onSubmit = async (value) => {
    const resResult = await apiService(userApiEndpoint.login, value);
    userStore.setLogin(resResult.data.token, resResult.data.user);
    router.replace('/home');
};
</script>

<style lang="less" scoped></style>
