<template>
    <div class="tab-options">
        <van-tabs v-model="activeTab" @change="onTabChange">
            <van-tab
                v-for="(tab, index) in tabs"
                :key="tab.name"
                :title="tab.title"
            />
        </van-tabs>
    </div>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            activeTab: 0,
        };
    },
    methods: {
        onTabChange(index) {
            this.$emit('tab-change', index);
        },
    },
};
</script>

<style scoped>
.tab-options {
    width: 200px; /* 设定选项卡宽度 */
}
</style>
