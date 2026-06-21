// 导入pinia的创建函数： pinia做状态管理
import { createPinia } from 'pinia'

/*
 * 创建一个全局的pinia状态管理仓库
 * 作用：整个应用共享的状态管理中心，就像公司的“总档案库”，所有部门都可以在这里存储共享数据
 * Pinia是vue3.x的官方推荐状态管理工具
 */
const store = createPinia()

// 导出仓库实例
export default store