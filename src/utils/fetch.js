
import Vue from 'vue'
import axios from 'axios';
Vue.prototype.axios = axios;
axios.defaults.timeout = 5000;//响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://47.110.67.134:9005';//配置接口地址


// http://192.168.101.17:666/


// 请求拦截器（在发送请求之前做些什么）
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token');
    // console.log(token)
    if (token) {
        config.headers.Authorization = token;
    }
    // config.url = store.getters.baseUrl + config.url
    // console.log(config)
    // config.data=JSON.stringify(config.data);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    let token = response.config.headers.Authorization;
    if (token) {
        localStorage.setItem('token', token)
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    console.log(error)
    if(error.message.includes('timeout')){
        this.$message.error('网络超时，请刷新页面重试');
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});


//post
export function fetchPost(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(res => {
                resolve(res)
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