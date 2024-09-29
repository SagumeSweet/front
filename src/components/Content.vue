<template>
    <div class="content">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Content',
};
</script>

<style scoped>
.content {
    flex: 1; /* 让内容区域占满剩余空间 */
    padding: 16px; /* 添加一些内边距 */
}
</style>
