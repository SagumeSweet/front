<template>
    <div>
        <div class="avatar-img" :style="{ width: size, height: size }">
            <img :src="src" :alt="src" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        default: '',
        required: true,
    },
    size: {
        type: String,
        default: '20px',
    },
});
</script>

<script>
export default {
    name: 'AvatarFormat',
};
</script>

<style lang="less" scoped>
.avatar-img {
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 3px 3px 3px #919191;
    overflow: hidden;

    img {
        display: block;
        width: 100%;
        min-height: 100%;
    }
}
</style>
