<template>
    <div>
        <div class="content-list">
            <!-- 显示内容列表 -->
            <div
                v-for="content in contents"
                :key="content.id"
                class="content-item"
            >
                <h3 @click="goToContent(content.id)">{{ content.title }}</h3>
                <p>{{ content.description }}</p>
            </div>

            <!-- 分页控件 -->
            <van-pagination
                v-model:current-page="currentPage"
                :total-items="totalItems"
                :items-per-page="itemsPerPage"
                @change="fetchContents"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '../services/apiService'; 
import { contentApiEndpoint } from '../services/api'; 
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

const contents = ref([]); // 内容列表
const totalItems = ref(0); // 总内容数
const itemsPerPage = ref(10); // 每页显示多少内容
const currentPage = ref(1); // 当前页

const router = useRouter();

// 获取分页内容的方法
const fetchContents = async () => {
    try {
        const response = await apiService(
            contentApiEndpoint.getContents,
            null,
            null,
            {
                page: currentPage.value,
                pageSize: itemsPerPage.value,
            }
        );
        contents.value = response.data.contents;
        totalItems.value = response.data.total;
    } catch (error) {
        console.error('获取内容失败:', error);
    }
};

// 页面加载时，初始化获取内容
onMounted(() => {
    fetchContents();
});

// 点击内容跳转到详情页
const goToContent = (id) => {
    router.push(`/content/${id}`);
};
</script>

<style scoped>
.content-list {
    padding: 20px;
}

.content-item {
    margin-bottom: 20px;
    cursor: pointer;
}

.content-item h3 {
    color: blue;
    cursor: pointer;
}

.content-item h3:hover {
    text-decoration: underline;
}
</style>
