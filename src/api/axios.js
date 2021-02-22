/** @file:封装axios文件 */
import Qs from 'qs';
import md5 from 'js-md5';
import Vue from '../main';
import {
    MessageBox
} from 'element-ui';
import axios from 'axios';
import router from '../router/index';
const instance = axios.create({});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 获取CancelToken
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 全局添加cancelToken
    config.cancelToken = source.token;

    // 在发送请求之前做些什么
    let time = parseInt(new Date().getTime() / 1000);
    let user_id = localStorage.getItem('user_id') || '';
    let token = localStorage.getItem('token') || '';
    let sign = md5(user_id + token + time + md5('huankemao' + config.url.substr(1, config.url.length)));
    config.data.user_id = user_id;
    config.data.token = token;
    config.data.time = time;
    config.data.sign = sign;
    config.data = Qs.stringify(config.data);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code === 501) {
        source.cancel('登录过期');
        MessageBox.alert('登录信息已过期，请重新登录！', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            showClose: false,
            callback: action => {
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                router.push('/login');
                location.reload();
            }
        });
        return Promise.reject();
    } else if (response.data.code === 505) {
        source.cancel('未安装');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        router.push('/install');
        location.reload();
        return Promise.reject();
    } else {
        return Promise.resolve(response.data);
    }
}, function (error) {
    if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
        return new Promise(() => {});
    } else {
        return Promise.reject(error);
    }
});

export default instance;