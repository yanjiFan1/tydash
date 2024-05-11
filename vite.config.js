// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'), // 指定入口文件
      name: 'tydash', // 输出的 UMD 全局变量名
      formats: ['es', 'cjs', 'umd'], // 输出的格式
      fileName: (format) => `tydash.${format}.js` // 自定义输出文件名
    },
    rollupOptions: {
      // 确保外部化依赖，这样它们就不会被打包到你的库中
      external: [], // 例如：['react', 'react-dom']
      output: {
        // 导出为 ES Module 时，提供一个更友好的导出模式
        exports: 'named',
        // 当你希望生成的 UMD 文件有一个全局变量时，使用 globals
        globals: {
          // 例如：'react': 'React', 'react-dom': 'ReactDOM'
        },
        // 配置生成的 UMD 文件的输出格式
        // 默认情况下，Vite 会将 UMD 设置为 'iife'，如果你需要其他格式，可以手动指定
        // format: 'iife' 或 'amd' 等
        // ... 其他 Rollup 输出选项
      },
    },
    // 清除输出目录
    cleanBeforeBuild: true,
    // 打包输出目录
    outDir: 'dist',
    // 为生产环境构建，优化输出
    assetsDir: '', // 静态资源输出目录
    // 其他构建选项...
  },
  // ... 其他 Vite 配置选项
})