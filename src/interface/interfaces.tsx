/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-10-08 10:46:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-08 16:16:10
 * @FilePath: /meeting_room_booking_system_frontend/src/interface/interfaces.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios, { AxiosRequestConfig } from 'axios'
import { RegisterUser } from '../pages/register/Register'
import { UpdatePassword } from '../pages/update_password/UpdatePassword'
import { UserInfo } from '../pages/update_info/UpdateInfo'
import { message } from 'antd'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 3000
})


axiosInstance.interceptors.request.use(function(config) {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.authorization = 'Bearer ' + accessToken
    }
    return config
})

interface PendingTask {
    config: AxiosRequestConfig,
    resolve: Function
}
let refreshing: boolean = false
const queue: PendingTask[] = []
/**
 * 每次发请求之前，在 header 里加上 authorization，带上 access_token。

当响应码是 401 的时候，就刷新 token，刷新失败提示错误信息，然后跳到登录页。

并且通过 refreshing 的标记和 task 队列实现了并发请求只刷新一次
 */
axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
        // 请求可能没有发送成功的情况
        if (!error.response) {
            return Promise.reject(error)
        }
        let {data, config} = error.response

        if (refreshing) {
            return new Promise((resolve) => {
                queue.push({config, resolve})
            })
        }

        if (data.code === 401 && !config.url.includes('/user/refresh')) {
            refreshing = true

            const res = await refreshToken()

            refreshing = false

            if (res.status === 200 || res.status === 201) {
                queue.forEach(({config, resolve}) => {
                    resolve(axiosInstance(config))
                })
                return axiosInstance(config)
            } else {
                message.error(res.data)

                setTimeout(() => {
                    window.location.href = '/login'
                }, 1000)
            }
        }
        

      return error.response
    }
  )

async function refreshToken() {
    const res = await axiosInstance.post('/user/refresh', {
        params: {
            refresh_token: localStorage.getItem('refresh_token')
        }
    })
    localStorage.setItem('acess_token', res.data.data.acess_token)
    localStorage.setItem('refresh_token', res.data.data.refresh_token)
    return res
}

export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', {username, password})
}

export async function registerCaptcha(email: string) {
  return await axiosInstance.get('/user/register-captcha', {
    params: {
      address: email
    }
  })
}

export async function register(registerUser: RegisterUser) {
    return await axiosInstance.post('/user/register', registerUser)
}

export async function updatePasswordCaptcha(email: string) {
    return await axiosInstance.get('/user/update_password/captcha', {
        params: {
            address: email
        }
    });
}

export async function updatePassword(data: UpdatePassword) {
    return await axiosInstance.post('/user/update_password', data);
}

export async function getUserInfo() {
    return await axiosInstance.get('/user/info');
}

export async function updateInfo(data: UserInfo) {
    return await axiosInstance.post('/user/update', data);
}

export async function updateUserInfoCaptcha() {
    return await axiosInstance.get('/user/update/captcha');
}


export {}