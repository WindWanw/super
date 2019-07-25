import Vue from 'vue'
import axios from 'axios';
import router from '../router'

Vue.prototype.axios = axios;
axios.defaults.timeout = 10000; //响应时间
import { Message } from 'element-ui';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if (location.hostname == "super.zhengyi100.cn") {
    axios.defaults.baseURL = 'https://admin.api.zhengyi100.cn'; //配置接口地址,正式
} else {
    axios.defaults.baseURL = 'http://dev.admin.api.zhengyi100.cn'; //配置接口地址

}


// 请求拦截器（在发送请求之前做些什么）
axios.interceptors.request.use(function(config) {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    Message.error('请求错误，请重试');
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    let token = response.config.headers.Authorization;
    if (token) {
        localStorage.setItem('token', token)
    }
    // 对响应数据做点什么
    return response.data;
}, function(error) {
    if (error.message.includes('timeout')) {
        Message.error('网络超时，请刷新页面重试');
    } else {
        Message.error('服务器响应错误，请重试');
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});


//post
export function fetchPost(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(res => {
                if (res.code == 114 || localStorage.getItem('token') == '') {
                    Message.error('您的登录已失效，请重新登录')
                    router.push("/login")
                    localStorage.clear('token');
                    localStorage.clear('userinfo');
                } else {
                    resolve(res)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

//get
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}