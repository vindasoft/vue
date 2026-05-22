/*
 这个vite.config.js文件是vite项目的大脑，负责：
 1、环境管理：根据不同环境加载不同配置
 2、插件管理：集成各种功能插件
 3、路径管理：简化导入路径
 4、开发服务器：提供热更新和代理功能
 5、构建优化：配置生产环境打包策略

 关键点：
 - 使用函数式配置，支持动态参数
 - 良好的环境变量管理
 - 清晰的路径别名配置
 - 开发代理解决跨域问题
 - 可扩展的插件架构
 */

// 从vite 导入必要的函数
import { defineConfig, loadEnv } from 'vite'

// 导入Node.js 的path模块，用于处理文件路径
import path from 'path'

//导入自定义的插件工厂函数
import createVitePlugins from './vite/plugins'

// 导出 Vite 配置
// defineConfig 是 Vite 的类型提示辅助函数
export default defineConfig(({ mode, command}) => {
  // 1、加载环境变量
  // loadEnv()会根据当前 mode 加载对应的.env 文件
  // 例如：mode = 'development' -> 加载 .env.development
  const env = loadEnv(mode, process.cwd())

  // 2、返回vite配置对象
  return {
    // ============= 基础配置 ============
    base: '',//部署时的基础路径

    // =================== 插件配 =====================
    // 调用插件工厂函数创建插件数组
    // command === 'build'判断是否为构建命令
    plugins: createVitePlugins(env, command === 'build'),

    // =================== 路径解析配置 =====================
    resolve: {
      // 路径别名配置（类似于Webpack 的 alias）
      alias: {
        // '~' 指向项目根目录（vue）
        '~': path.resolve(__dirname, './'),

        // '@' 指向 src 目录（最常用）
        '@': path.resolve(__dirname, './src'),
      },

      // 自动解析的扩展名（导入时可以省略这些扩展名）
      extensions:[
          '.mjs', // ES 模块文军
          '.js', // JavaScript 文件
          '.ts', // TypeScript 文件
          '.jsx', // React JSX
          '.tsx', // TypeScript JSX
          '.json', // JSON 文件
          '.png', // PNG文件
          '.vue' // vue 单文件组件
      ]
    },

    // ========== 开发服务器配置 ============
    server: {
        // 端口号
        port: 8090,

        // 主机配置
        // true 表示监听所有地址（包括局域网），可以通过IP访问
        // 也可以指定具体 IP， 如 ’0.0.0.0' 成 '192.168.1.100’
        host: true,

        // 启动后自动打开浏览器
        open: true,

        // 代理配置（解决跨域问题）
        proxy: {
            // 将所有以 /base 开头的请求代理到后端服务器
            '/base': {
                // 目标服务器地址
                target: 'http://localhost:8080',

                // 修改请求头中的 Origin 为目标服务器地址
                changeOrigin: true,

                /**
                 * 代理配置工作原理：
                 * 前端：http://localhost:90/base/querUserInfoByUserName/{userName} ->
                 * vite代理转发 ->
                 * 后端：http://localhost:8080/queryUserInfoByUserName/{userName}
                 * 为什么需要代理
                 * - 开发时前后端分离，端口不同（90 vs 8080）
                 * - 浏览器有同源策略限制
                 * - 代理让前端看起来和后端在同一域名下
                 */
                rewrite: (p) => p.replace(/^\/base/, '')
            }
        }
    },
  }
})