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
    cors: true
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTdHVkeVxcXFx3ZWJcXFxcUHJvamVjdFxcXFxmcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcU3R1ZHlcXFxcd2ViXFxcXFByb2plY3RcXFxcZnJvbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1N0dWR5L3dlYi9Qcm9qZWN0L2Zyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tICdAdmFudC9hdXRvLWltcG9ydC1yZXNvbHZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwODAsXG4gICAgaG9zdDogJzEyNy4wLjAuMScsXG4gICAgY29yczogdHJ1ZSxcbiAgfSxcbiAgYmFzZTogJy4vJyxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICAvL1x1NTk4Mlx1Njc5Q1x1NjcwOWxlc3NcdTUzRDhcdTkxQ0ZcdTY1ODdcdTRFRjZcdTk3MDBcdTg5ODFcdTVGMTVcdTUxNjVcdUZGMENcdTVFNzZcdTU3MjhcdTk4NzlcdTc2RUVcdTRFMkRcdTRGN0ZcdTc1MjhcdTUzRDhcdTkxQ0ZcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiJHtwYXRoLnJlc29sdmUoXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICdzcmMvYXNzZXRzL3ZhcnMubGVzcydcbiAgICAgICAgKX1cIjtgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3Njg0XHU0RjlEXHU4RDU2XG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ10sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgLy8gdmFudFx1NzY4NFx1OUVEOFx1OEJBNFx1NjgzN1x1NUYwRlx1RkYwQ1x1NTNFRlx1OEZEQlx1ODg0Q1x1NEZFRVx1NjUzOVxuICAgICAgICBWYW50UmVzb2x2ZXIoe1xuICAgICAgICAgIGltcG9ydFN0eWxlOiBmYWxzZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBRLFNBQVMsb0JBQW9CO0FBQ3ZTLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFMN0IsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQTtBQUFBLFFBRUosZ0JBQWdCLFlBQVksS0FBSztBQUFBLFVBQy9CO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBO0FBQUEsSUFFSixXQUFXO0FBQUEsTUFDVCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxJQUN4QyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUE7QUFBQSxRQUVULGFBQWE7QUFBQSxVQUNYLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
