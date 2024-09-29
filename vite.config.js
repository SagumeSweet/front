import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default defineConfig({
  server: {
    port: 8080,
    host: '127.0.0.1',
    cors: true,
  },
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        //如果有less变量文件需要引入，并在项目中使用变量
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/assets/vars.less'
        )}";`,
      },
    },
  },
  plugins: [
    vue(),
    // 自动导入的依赖
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
    }),
    Components({
      resolvers: [
        VantResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
