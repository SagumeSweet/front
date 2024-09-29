<template>
    <div class="create-content-container">
        <!-- 创建内容按钮 -->
        <van-button type="primary" @click="showCreateContentModal = true">
            创建内容
        </van-button>

        <!-- 创建内容的弹窗 -->
        <van-popup
            v-model:show="showCreateContentModal"
            position="bottom"
            round
        >
            <div class="create-content-form">
                <van-field
                    v-model="title"
                    label="标题"
                    placeholder="请输入标题"
                    required
                />
                <van-field
                    v-model="body"
                    label="正文"
                    placeholder="请输入正文"
                    type="textarea"
                    required
                />

                <!-- 文件上传 -->
                <van-uploader
                    v-model="fileList"
                    :after-read="uploadFile"
                    accept="image/*, video/*"
                    max-size="20 * 1024 * 1024"
                />

                <!-- 显示文件上传成功的路径 -->
                <p v-if="uploadedFilePath">文件路径: {{ uploadedFilePath }}</p>

                <!-- 公开或订阅选项 -->
                <van-radio-group v-model="visibility" direction="horizontal">
                    <van-radio name="public">公开</van-radio>
                    <van-radio name="subscriber">仅限订阅者</van-radio>
                </van-radio-group>

                <van-button
                    type="primary"
                    block
                    @click="submitContent"
                    :disabled="!isFormValid"
                >
                    提交
                </van-button>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import apiService from '../services/apiService';
import { updateFileApiEndpoint, contentApiEndpoint } from '../services/api';
import { showToast } from 'vant';

const showCreateContentModal = ref(false); // 控制悬浮窗的显示
const title = ref(''); // 内容标题
const body = ref(''); // 内容正文
const fileList = ref([]); // 存储上传文件
const uploadedFilePath = ref(''); // 上传成功后的文件路径
const visibility = ref('public'); // 公开或订阅者可见选项
let mediaType = null; // 媒体类型

// 文件上传逻辑
const uploadFile = async (file) => {
    try {
        const response = await apiService(
            updateFileApiEndpoint.uploadContentMedia,
            {
                contentFile: file.file,
            }
        );

        uploadedFilePath.value = response.data.filePath; // 获取并存储上传后的文件路径
        mediaType = response.data.fileType; // 确定文件类型
        showToast('文件上传成功！');
    } catch (error) {
        console.error('文件上传失败:', error);
        showToast('文件上传失败，请重试。');
    }
};

// 检查表单是否有效
const isFormValid = computed(() => title.value && body.value);

// 表单提交逻辑
const submitContent = async () => {
    try {
        const contentData = {
            title: title.value,
            body: body.value,
            contentType: visibility.value, // 可见性选项
        };

        // 如果有上传文件，才附加 mediaUrl 和 mediaType
        if (uploadedFilePath.value && mediaType) {
            contentData.mediaUrl = uploadedFilePath.value;
            contentData.mediaType = mediaType;
        }

        await apiService(contentApiEndpoint.setContent, contentData); // 提交表单

        showToast('内容创建成功！');
        resetForm(); // 提交后重置表单
        showCreateContentModal.value = false; // 关闭弹窗
    } catch (error) {
        console.error('内容创建失败:', error);
        showToast('内容创建失败，请重试。');
    }
};

// 重置表单
const resetForm = () => {
    title.value = '';
    body.value = '';
    fileList.value = [];
    uploadedFilePath.value = '';
    visibility.value = 'public'; // 重置为默认值
    mediaType = null; // 重置媒体类型
};
</script>

<style scoped>
.create-content-form {
    padding: 16px;
}
</style>
