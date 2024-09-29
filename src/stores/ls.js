import vueLS from 'vue-ls';

// vue-ls 的配置
const storageOptions = {
    namespace: 'vue_', // key 键的前缀（随便起）
    name: 'ls', // 变量名称（随便起） 使用方式：Vue.变量名称 或 this.$变量名称
    storage: 'local', // 作用范围：local、session、memory
};

const { ls } = vueLS.useStorage(storageOptions);

export default ls;
