import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入ElementPlus的中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

// 引入路由守卫
import './routercheck'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)

// 遍历Element Plus所有图标组件并注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册中文语言包
app.use(ElementPlus, {
    // 本地化配置：设置为中文
    locale: zhCn,
})

app.mount('#app')
