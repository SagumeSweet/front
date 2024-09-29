import { createApp } from 'vue';
//引入路由文件
import Router from './router/index.js';
import App from './App.vue';
//引入vant UI组件
import Vant from 'vant';
//vant 组件样式
import 'vant/lib/index.css';
import './assets/styles/vant-reset.less';
//引入状态管理方法
import './style.css';
//雪碧图
import './assets/styles/sprite-icon.css';
//其他css修改的组件样式，其他样式都放这里..
//从pinia（大菠萝）里引入创建大菠萝的方法
import { createPinia } from 'pinia';



const app = createApp(App);
app.use(Router);
app.use(createPinia());
app.mount('#app');