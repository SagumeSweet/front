<template>
    <div class="content-detail-container" v-if="content">
        <h1>{{ content.title }}</h1>
        <p>{{ content.body }}</p>

        <!-- 判断文件类型并展示 -->
        <img
            v-if="isImage(content.mediaUrl)"
            :src="content.mediaUrl"
            alt="Content Image"
            class="content-image"
        />
        <video
            v-else-if="isVideo(content.mediaUrl)"
            controls
            class="content-video"
        >
            <source :src="content.mediaUrl" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <p v-else-if="!content.mediaUrl">该作品没有上传媒体文件。</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '../services/apiService'; // 假设已经封装的 API 服务
import { contentApiEndpoint } from '../services/api';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

// 获取路由参数中的 id
const route = useRoute();
const contentId = route.params.id; // 从路由获取作品ID

// 定义存储内容的变量
const content = ref(null);

// 判断是否为图片
const isImage = (filePath) => {
    return /\.(jpeg|jpg|png|gif)$/.test(filePath);
};

// 判断是否为视频
const isVideo = (filePath) => {
    return /\.(mp4|mov|avi)$/.test(filePath);
};

// 获取内容的方法
const fetchContentById = async (id) => {
    try {
        if (userStore.token) {
            api = contentApiEndpoint.getContent;
            const response = await apiService(
                contentApiEndpoint.getContent,
                null,
                {
                    contentId: id,
                }
            );
            content.value = response.data; // 获取作品数据
        } else {
            const response = await apiService(
                contentApiEndpoint.getContentPublic,
                null,
                {
                    contentId: id,
                }
            );
            content.value = response.data; // 获取作品数据
        }
    } catch (error) {
        console.error('获取作品内容失败:', error);
    }
};

// 当组件挂载时，获取内容
onMounted(() => {
    if (contentId) {
        fetchContentById(contentId);
    }
});
</script>

<style scoped>
.content-detail-container {
    padding: 20px;
}

h1 {
    margin-bottom: 20px;
}

p {
    margin-bottom: 20px;
}

.content-image,
.content-video {
    max-width: 100%;
    height: auto;
    display: block;
    margin-bottom: 20px;
}
</style>
