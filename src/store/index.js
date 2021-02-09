/**@file: 状态管理文件 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        avatar: localStorage.getItem('avatar') || ''
    },
    mutations: {
        changeAvatar(state, newVal) {
            state.avatar = newVal;
        }
    },
    actions: {

    },
    modules: {

    }
});