import axios from 'axios';
import { baseUrl } from './api';
import { useUserStore } from '@/stores/userStore'; // 导入用户存储
import qs from 'qs';
import { showToast, showDialog } from 'vant'; // 导入 Vant 的提示组件

const apiService = async (
    endpoint,
    data = null,
    params = null,
    queryParams = null
) => {
    const { path, method, public: isPublic } = endpoint;

    // 替换路径中的动态参数
    let url = `${baseUrl}${path.replace(/:(\w+)/g, (_, key) =>
        params ? params[key] : _
    )}`;

    // 添加查询参数
    if (queryParams) {
        const queryString = qs.stringify(queryParams);
        url += `?${queryString}`;
    }

    const config = {
        method,
        url,
        headers: {},
    };

    // 处理上传文件的情况
    if (data && data.file) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        config.data = formData;
        config.headers['Content-Type'] = 'multipart/form-data'; // 设置 Content-Type
    } else {
        config.data = data; // 普通请求
    }

    // 如果不是公共 API，添加 Authorization 头
    if (!isPublic) {
        const userStore = useUserStore();
        config.headers.Authorization = `Bearer ${userStore.token}`; // 从状态管理中获取 token
    }

    try {
        const response = await axios(config);
        if (response.status === 200 || response.status === 201) {
            return response.data; // 返回数据
        } else {
            showToast('请求失败');
            throw new Error(`请求失败，状态码：${response.status}`);
        }
    } catch (error) {
        showToast('请求失败'); // 提示用户请求失败
        showDialog({
            title: '错误',
            message: error.response
                ? error.response.data.message
                : error.message,
        });
        throw error; // 重新抛出错误
    }
};

export default apiService;
