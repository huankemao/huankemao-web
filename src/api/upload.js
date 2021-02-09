/** @file:封装axios文件 */
import Qs from 'qs';
import axios from 'axios';
import md5 from 'js-md5';

import {
    MessageBox
} from 'element-ui';
import router from '../router/index';

const instance = axios.create({});

instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let time = parseInt(new Date().getTime() / 1000);
    let user_id = localStorage.getItem('user_id') || '';
    let token = localStorage.getItem('token') || '';
    let sign = md5(user_id + token + time + md5('huankemao' + config.url.substr(1, config.url.length)));
    config.data.append('time', time);
    config.data.append('user_id', user_id);
    config.data.append('token', token);
    config.data.append('sign', sign);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code === 501) {
        MessageBox.alert('登录信息已过期，请重新登录！', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            showClose: false,
            callback: action => {
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                router.push('/login');
            }
        });
    }
    return Promise.resolve(response.data);
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;