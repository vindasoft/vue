import {createApp} from 'vue'
import {createPinia} from 'pinia'

// npm install element-plus --save
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// npm install @element-plus/icons-vue
// 注册图标：如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入ElementPlus的中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

// 引入路由守卫
import './routercheck'
import store from "@/stores/index.js";

const app = createApp(App)

// 注册状态管理
app.use(createPinia())
app.use(router)

// 注册ElementPlus
app.use(ElementPlus)

// 注册store仓库
app.use(store)

// 遍历Element Plus所有图标组件并且全部注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册中文语言包
app.use(ElementPlus, {
    // 本地化配置：设置为中文
    locale: zhCn,
})

app.mount('#app')
