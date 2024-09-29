// 本地存储
import { defineStore } from 'pinia';
import VueLs from './ls';

// 状态管理的存储数据
export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            token: '',
            userInfo: {},
        };
    },
    actions: {
        // 初始化，从localStore里获取Token && 用户信息
        init() {
            this.token = VueLs.get('token') || null;
            this.userInfo = VueLs.get('userInfo') || {};
            if (!this.token) return false;
            return true;
        },
        // 登录成功，设置token && 用户信息
        setLogin(token, userInfo) {
            this.token = token;
            this.userInfo = userInfo;
            VueLs.set('token', token);
            VueLs.set('userInfo', userInfo);
        },
        // 退出登录，清除Token && 用户信息
        setLogout() {
            this.token = '';
            this.userInfo = {};
            VueLs.remove('token');
            VueLs.remove('userInfo');
        },
        // 设置用户信息
        setUserInfo(userInfo) {
            // userInfo 应该是对象格式
            this.userInfo = userInfo;
            VueLs.set('userInfo', this.userInfo);
        },
    },
});
