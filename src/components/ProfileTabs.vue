<template>
    <div class="profile-tabs">
        <van-tabs v-model="activeTab" @change="handleTabChange" class="tabs">
            <van-tab title="用户信息" name="userInfo" />
            <van-tab title="更改角色" name="changeRole" />
            <van-tab title="上传头像" name="uploadAvatar" />
        </van-tabs>

        <div class="tab-content">
            <UserInfo v-if="activeTab === 'userInfo'" />
            <ChangeRole v-if="activeTab === 'changeRole'" />
            <UploadAvatar v-if="activeTab === 'uploadAvatar'" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import UserInfo from './UserInfo.vue';
import ChangeRole from './ChangeRole.vue';
import UploadAvatar from './UploadAvatar.vue';

export default {
    components: {
        UserInfo,
        ChangeRole,
        UploadAvatar,
    },
    setup() {
        const activeTab = ref('userInfo');

        const handleTabChange = (tab) => {
            activeTab.value = tab;
        };

        return {
            activeTab,
            handleTabChange,
        };
    },
};
</script>

<style scoped>
.profile-tabs {
    display: flex;
}
</style>
