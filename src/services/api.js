export const baseUrl = 'http://127.0.0.1:3001/api';

export const userApiEndpoint = {
    register: { path: '/user/register', method: 'post', public: true },
    login: { path: '/user/login', method: 'post', public: true },
    getInfo: { path: '/user/me', method: 'get' },
    updateInfo: { path: '/user/me', method: 'put' },
    updateRole: { path: '/user/me/role', method: 'put' },
    getUserContents: {
        path: '/user/:userId/contents',
        method: 'get',
        public: true,
    }, // 不用认证
    getUserSubscriberContents: {
        path: '/user/:userId/subscriber-contents',
        method: 'get',
        public: true,
    }, // 不用认证
    getUserFavorites: { path: '/user/favorites', method: 'get' },
    setUserFavorites: { path: '/user/favorites', method: 'post' },
    deleteUserFavorites: { path: '/user/favorites', method: 'delete' },
    setUserFollows: { path: '/user/follow', method: 'post' },
    deleteUserFollows: { path: '/user/follows', method: 'delete' },
    getUserFollows: { path: '/user/follows', method: 'get' },
    getPaymentAccount: { path: '/user/payment-account', method: 'get' },
    setPaymentAccount: { path: '/user/payment-account', method: 'post' },
    deletePaymentAccount: {
        path: '/user/payment-account/:id',
        method: 'delete',
    },
    getOrders: { path: '/user/payment-orders', method: 'get' },
    getSubscribe: { path: '/user/subscriptions', method: 'get' },
    getTransactionRecord: { path: '/user/transaction-record', method: 'get' },
};

export const contentApiEndpoint = {
    setContent: { path: '/content', method: 'post' },
    getContent: { path: '/content/:contentId', method: 'get' },
    getContentPublic: {
        path: '/content/public/:contentId',
        method: 'get',
        public: true,
    }, // 不用认证
    getPublicContents: {
        path: '/public-contents',
        method: 'get',
        public: true,
    }, // 不用认证
    getSubscriberContents: {
        path: '/subscriber-contents',
        method: 'get',
        public: true,
    }, // 不用认证
    getContents: { path: '/contents', method: 'get', public: true }, // 不用认证
};

export const subscribeApiEndpoint = {
    setSubscribe: { path: '/subscribe', method: 'post' },
};

export const transactionApiEndpoint = {
    pay: { path: '/transaction/pay', method: 'post' },
};

export const getFileApiEndpoint = {
    getAvatar: { path: '/uploaded/avatar/:id', method: 'get' },
    getContentMedia: {
        path: '/uploaded/content/:contentId',
        method: 'get',
    },
    getContentMediaPublic: {
        path: '/uploaded/content/public/:contentId',
        method: 'get',
        public: true,
    }, // 不用认证
};

export const updateFileApiEndpoint = {
    uploadAvatar: { path: '/upload/avatar', method: 'post' },
    uploadContentMedia: { path: '/upload/content', method: 'post' },
};
