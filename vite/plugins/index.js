/**
 * 这是整个前端工程的插件工厂
 * 用于统一管理项目的所有vite插件
 */

// 导入vue的vite插件
import vue from '@vitejs/plugin-vue'

export default function createVitePlugins(viteEnv, isBuild = false) {
    // 1、创建插件数组，初始化包含vue插件
    // vue() 是vite的vue3插件，支持vue3的单文件组件
    const vitePlugins = [vue()]

    // 2、添加自动导入插件
    vitePlugins.push()

    // 3、返回插件数组
    return vitePlugins;
}