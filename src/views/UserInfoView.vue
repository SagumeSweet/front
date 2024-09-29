<template>
    <div class="user-info-view">
        <ProfileTabs />
    </div>
</template>

<script>
import ProfileTabs from '@/components/ProfileTabs.vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

export default {
    components: {
        ProfileTabs,
    },
    setup() {
        const userStore = useUserStore();
        const router = useRouter();

        onMounted(() => {
            if (!userStore.token) {
                router.push('/user/login');
            }
        });
    },
};
</script>

<style scoped>
.user-info-view {
    padding: 20px;
}
</style>
