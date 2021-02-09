/** @file:封装axios文件 */
import Qs from 'qs';
import axios from 'axios';
import {
    MessageBox
} from 'element-ui';
import router from '../router/index';

const instance = axios.create({});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.data = Qs.stringify(config.data);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return Promise.resolve(response.data);
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;