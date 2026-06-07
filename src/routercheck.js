// 路由校验：权限检查

// 导入路由实例
import router from './router'
import {getToken} from "@/utils/auth.js"
import useUserStore from "@/stores/modules/userStore.js"
import {isReLogin} from "@/utils/request.js"
import {ElMessage} from "element-plus"

// 白名单：定义不需要登录即可访问的页面
const whiteList = ['/login', '/register']

// 判断路由是否在白名单中
const isWhiteList = (path) => {
    return whiteList.includes(path)
}

// 全局路由守卫： 每次路由跳转前都会执行这个函数
router.beforeEach((to, from, next) => {
    // 先检查用户是否有token
    if (getToken()) {
        // 有，则表示已经登录了，如果此时再次请求的路径是登录路径
        if (to.path == '/login' || to.path == '/register') {
            // 则直接跳转到首页，防止再次跳转到登录页面
            next({path: '/'})
        }

        // 用户已登录，访问白名单页面
        else if (isWhiteList(to.path)) { // 如果访问的是白名单页面，则放过
            next()
        }
        // 用户已登录，访问需要权限的页面
        else { // 访问需要有访问权限的页面
            // 检查用户名称是否为空
            if (useUserStore().userName === '') {
                // 用户信息为空，需要先获取用户信息

                // 设置"正在重新登录“的标识
                isReLogin.show = true

                useUserStore().getUserInfo().then(res => {
                    // 设置是否重新登录标志为否
                    isReLogin.show = false

                    // 跳转到首页或者原本要去的页面
                    next({path: to.path})
                }).catch(err => {
                    // 获取用户信息失败，直接退出
                    useUserStore().logout().then(res => {
                        // 提示错误信息
                        ElMessage.error(err)

                        // 跳转到登录页面
                        next({path: '/login'})
                    })
                })
            } else { // 用户信息已存在，直接放行
                next()
            }
        }
    }
    // 如果没有token
    else {
        // 如果访问的是白名单页面，则放过
        if (isWhiteList(to.path)) {
            next()
        } else {
            // 跳转到登录页面
            next({path: '/login'})
        }
    }
})
