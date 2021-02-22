/**@file: App入口文件 */
import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueCookies from 'vue-cookies';
import LoginSvg from '@/components/LoginSvg'
import LogoSvg from '@/components/LogoSvg'
import SelectTree from "@/components/SelectTree";

// import VueTagTextarea from 'vue-tag-textarea'
// import 'vue-tag-textarea/lib/vue-tag-textarea.css'
// Vue.use(VueTagTextarea)

import {
	reqInstallCheck,
} from './api/index';
import '@/assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import {
	showLoaing,
	hideLoading,
} from './util/utils';
import './assets/iconfont/iconfont.css';
import {
	customMessage
} from '@/util/utils';

import * as echarts from 'echarts';

Vue.component('LoginSvg', LoginSvg);
Vue.component('LogoSvg', LogoSvg);
Vue.component('SelectTree', SelectTree);
Vue.use(ElementUI);
Vue.use(VueCookies);

Vue.prototype.$message = customMessage;
Vue.prototype.showLoaing = showLoaing;
Vue.prototype.hideLoading = hideLoading;
Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;
if (!VueCookies.get('token')) {
	router.push('/login');
}
let installFlag = false;
reqInstallCheck().then(res => {
	if (res.code == 200) {
		if (res.data.check_status === 1) {
			installFlag = true;
		} else if (res.data.check_status === 0) {
			installFlag = false;
		}
		let path = router.history.current.path;
		if (installFlag) {
			if (path === '/install') {
				router.push('/index');
			}
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('user_id');
			if (path !== '/install') {
				router.push('/install');
			}
		}
	}
});


router.beforeEach((to, from, next) => {
	let loToken = localStorage.getItem('token');
	let coToken = VueCookies.get('token');

	if (to.meta.auth) {
		if (loToken) {
			if (loToken && coToken) {

				next();
			} else {
				next('/login');
			}
		} else {
			next('/login');
		}
	} else {
		next();
	}
});



export default new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');