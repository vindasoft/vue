// 导入路由实例
import router from './router'

// 白名单：定义不需要登录即可访问的页面
const whiteList = ['/login', '/register']

// 判断路由是否在白名单中
const isWhiteList = (path) => {
    return whiteList.includes(path)
}

// 全局路由守卫： 每次路由跳转前都会执行这个函数
router.beforeEach((to, from, next) => {
    // 如果在白名单中，就直接放行
    if(isWhiteList(to.path)) {
        next()
    }
    // 否则，不在白名单中，就跳转到登录页面
    else {
        next('/login')
    }
})
