import request from '@/utils/request'

/**
 * 登录方法
 */
export function login(data) {
    return request({
        url: '/login',
        headers: {
            isToken: false, // 告诉拦截器，这个请求不需要token
        },
        method: 'post', // 请求方法 post请求
        data: data
    })
}

/**
 * 获取当前用户信息
 * @param data
 * @returns {*}
 */
export function getUserInfo(data) {
    return request({
        url: '/getUserInfo',
        method: 'post', // 请求方法 post请求
    })
}

/**
 * 退出登录请求
 * @param data
 * @returns {*}
 */
export function logout(data) {
    return request({
        url: '/logout',
        method: 'post', // 请求方法 post请求
    })
}