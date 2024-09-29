// vite.config.js
import { defineConfig } from "file:///E:/Study/web/Project/front/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Study/web/Project/front/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import Components from "file:///E:/Study/web/Project/front/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///E:/Study/web/Project/front/node_modules/unplugin-auto-import/dist/vite.js";
import { VantResolver } from "file:///E:/Study/web/Project/front/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
var __vite_injected_original_dirname = "E:\\Study\\web\\Project\\front";
var vite_config_default = defineConfig({
  server: {
    port: 8080,
    host: "127.0.0.1",
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  },
  base: "./",
  css: {
    preprocessorOptions: {
      less: {
        //如果有less变量文件需要引入，并在项目中使用变量
        additionalData: `@import "${path.resolve(
          __vite_injected_original_dirname,
          "src/assets/vars.less"
        )}";`
      }
    }
  },
  plugins: [
    vue(),
    // 自动导入的依赖
    AutoImport({
      imports: ["vue", "vue-router", "pinia"]
    }),
    Components({
      resolvers: [
        // vant的默认样式，可进行修改
        VantResolver({
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTdHVkeVxcXFx3ZWJcXFxcUHJvamVjdFxcXFxmcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcU3R1ZHlcXFxcd2ViXFxcXFByb2plY3RcXFxcZnJvbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1N0dWR5L3dlYi9Qcm9qZWN0L2Zyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tICdAdmFudC9hdXRvLWltcG9ydC1yZXNvbHZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwODAsXG4gICAgaG9zdDogJzEyNy4wLjAuMScsXG4gICAgY29yczogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBiYXNlOiAnLi8nLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIC8vXHU1OTgyXHU2NzlDXHU2NzA5bGVzc1x1NTNEOFx1OTFDRlx1NjU4N1x1NEVGNlx1OTcwMFx1ODk4MVx1NUYxNVx1NTE2NVx1RkYwQ1x1NUU3Nlx1NTcyOFx1OTg3OVx1NzZFRVx1NEUyRFx1NEY3Rlx1NzUyOFx1NTNEOFx1OTFDRlxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3BhdGgucmVzb2x2ZShcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgJ3NyYy9hc3NldHMvdmFycy5sZXNzJ1xuICAgICAgICApfVwiO2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTc2ODRcdTRGOURcdThENTZcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAvLyB2YW50XHU3Njg0XHU5RUQ4XHU4QkE0XHU2ODM3XHU1RjBGXHVGRjBDXHU1M0VGXHU4RkRCXHU4ODRDXHU0RkVFXHU2NTM5XG4gICAgICAgIFZhbnRSZXNvbHZlcih7XG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFEsU0FBUyxvQkFBb0I7QUFDdlMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUw3QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBO0FBQUEsUUFFSixnQkFBZ0IsWUFBWSxLQUFLO0FBQUEsVUFDL0I7QUFBQSxVQUNBO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUE7QUFBQSxJQUVKLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLElBQ3hDLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQTtBQUFBLFFBRVQsYUFBYTtBQUFBLFVBQ1gsYUFBYTtBQUFBLFFBQ2YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
