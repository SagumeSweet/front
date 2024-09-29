<template>
    <div class="tab-content">
        <h2>{{ currentTab.title }}</h2>
        <p>{{ currentTab.content }}</p>
    </div>
</template>

<script>
export default {
    props: {
        currentTab: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.tab-content {
    flex: 1; /* 使内容区域自适应 */
    padding: 16px;
}
</style>
