// 创建一个用户的全局状态管理仓库
import {defineStore} from 'pinia'
import {getToken, setToken, removeToken} from '@/utils/auth.js'
import {login, getUserInfo, logout} from '@/api/login.js'
import defaultAvatar from '@/assets/images/profile.png'

const useUserStore = defineStore(
    'user', // 仓库名称: 这里必须全局唯一
    {
        // 第一步：状态定义（存储的数据）
        state: () => ({
            token: getToken(), // 用户登录后的token
            userId: '', // 用户ID
            userName: '', // 用户名
            avatar: '' // 用户头像
        }),

        // 第二步：操作方法（处理数据的函数）
        actions: {
            /**
             * 登录方法
             * 作用：发送登录请求，保存登录凭证
             * @param userInfo
             * @returns {Promise<unknown>}
             */
            login(userInfo) {
                // 创建一个Promise对象，返回给调用者（表示一个异步操作） ：
                // 一个进程中的所有函数执行完毕之后，才会执行then方法返回，如果失败，会执行catch方法
                return new Promise((resolve, reject) => {
                    // 调用login.js中的登录方法：发送登录请求
                    login(userInfo).then(res => {
                        // 登录成功
                        // 1、保存token
                        setToken(res.token)

                        // 2、更新store中的token
                        this.token = res.token

                        // 3、告诉调用者成功了
                        resolve()
                    }).catch(error => {
                        // 登录失败
                        reject(error)
                    })
                })
            },

            /**
             * 获取当前用户信息
             * @returns {Promise<unknown>}
             */
            getUserInfo() {
                return new Promise((resolve, reject) => {
                    // 调用login.js中的获取当前用户信息方法：发送获取用户信息请求
                    getUserInfo().then(res => {
                        // 获取用户信息成功
                        // 1、保存用户信息
                        const user = res.data
                        let avatar = user.remark || ""

                        // 判断头像地址是否完整（是否包含http://或者https://）
                        if (avatar.indexOf('http://') === -1 && avatar.indexOf('https://') === -1) {
                            //如果头像地址是不完整
                            if (avatar) {
                                avatar = import.meta.env.VITE_APP_BASE_API + avatar
                            } else {
                                // 如果没有头像，就使用默认头像
                                avatar = defaultAvatar
                            }
                        }
                        // 更新用户信息
                        this.userId = user.userId
                        this.userName = user.userName
                        this.avatar = avatar

                        // 2、告诉调用者成功了：同时返回完整响应
                        resolve(res)
                    }).catch(error => {
                        // 获取用户信息失败
                        reject(error)
                    })
                })
            },

            // 用户退出登录
            logout() {
                return new Promise((resolve, reject) => {
                    // 调用login.js中的退出登录方法：发送退出登录请求
                    logout().then(res => {
                        // 退出登录成功
                        // 1、清空store中的token
                        this.token = ''

                        // 2、剔除本地存储的token
                        removeToken()

                        // 3、告诉调用者成功
                        resolve()
                    }).catch(error => {
                        // 获取用户信息失败
                        reject(error)
                    })
                })
            }
        }
    }
)

export default useUserStore