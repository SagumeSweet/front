<template>
    <div>
        <h2>上传头像</h2>
        <!-- 头像预览 -->
        <div v-if="avatarUrl" class="avatar-preview">
            <AvatarFormat :src="avatarUrl" size="300px" />
        </div>

        <div>
            <!-- 上传控件 -->
            <van-uploader
                v-model="fileList"
                accept="image/*"
                max-size="500 * 1024"
                max-count="1"
                :after-read="onFileRead"
            >
                <van-button type="primary" size="small">选择头像</van-button>
            </van-uploader>

            <!-- 提交按钮 -->
            <van-button
                type="success"
                class="submit-button"
                size="small"
                @click="submitAvatar"
                :disabled="!fileList.length"
            >
                上传头像
            </van-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { updateFileApiEndpoint } from '../services/api';
import apiService from '../services/apiService.js';
import { showToast } from 'vant';
import AvatarFormat from './AvatarFormat.vue';

// 用户数据存储
const userStore = useUserStore();

// 用于存储头像图片的 URL
const avatarUrl = ref(userStore.userInfo.avatarUrl || '');

// 文件列表（头像上传）
const fileList = ref([]);

// 读取文件后触发
const onFileRead = async (file) => {
    const { file: uploadedFile } = file;
    const reader = new FileReader();

    // 读取文件并生成预览
    reader.onload = (e) => {
        avatarUrl.value = e.target.result; // 设置头像预览
    };

    reader.readAsDataURL(uploadedFile); // 开始读取文件
};

// 提交上传的头像
const submitAvatar = async () => {
    try {
        const response = await apiService(updateFileApiEndpoint.uploadAvatar, {
            avatar: fileList.value[0].file,
        });
        userStore.userInfo.avatarUrl = response.data.avatarUrl;
        showToast('头像上传成功！');
    } catch (error) {
        console.error('头像上传失败:', error);
        showToast('头像上传失败，请重试。');
    }
};
</script>

<style scoped>
.submit-button {
    margin-top: 20px;
}
</style>
