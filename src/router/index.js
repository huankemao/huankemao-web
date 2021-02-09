/**@file: 路由文件 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const _import_ = file => () =>
    import('../views/' + file + '.vue');
const routes = [{
        path: '/',
        name: 'Home',
        component: _import_('Home'),
        redirect: '/index',
        children: [{
                path: 'index',
                name: 'Index',
                meta: {
                    title: '首页',
                    auth: true,
                },
                component: _import_('Index/Index'),
            },
            // 客户CRM
            {
                path: 'custom_crm/manage',
                name: 'customManage',
                meta: {
                    title: '客户',
                    auth: true,
                },
                component: _import_('CustomCrm/CustomManage'),
            },
            {
                path: 'custom_crm/label',
                name: 'customLabel',
                meta: {
                    title: '客户标签',
                    auth: true,
                },
                component: _import_('CustomCrm/CustomLabel'),
            },
            // 企业通讯录
            {
                path: 'address_book/member_list',
                name: 'member',
                meta: {
                    title: '员工管理',
                    auth: true,
                },
                component: _import_('AddressBook/Member'),
            },
            {
                path: 'address_book/label_list',
                name: 'label',
                meta: {
                    title: '企业标签',
                    auth: true,
                },
                component: _import_('AddressBook/Label'),
            },
            //内容引擎
            {
                path: 'content/manage',
                name: 'ContentManage',
                meta: {
                    title: '内容管理',
                    auth: true,
                    keepAlive: true // 需要被缓存
                },
                component: _import_('Content/ContentManage')
            },
            {
                path: 'content/total',
                name: 'ContentTotal',
                meta: {
                    title: '内容统计',
                    auth: true,
                },
                component: _import_('Content/ContentTotal'),
            },
            {
                path: 'content/texttotal',
                name: 'TextTotal',
                meta: {
                    title: '文本素材',
                    auth: true,
                },
                component: _import_('Content/TextTotal'),
            },
            {
                path: 'content/addgraphic',
                name: 'AddGraphic',
                meta: {
                    title: '添加图文',
                    auth: true,
                },
                component: _import_('Content/AddGraphic'),
            },
            // // 企业微信管理
            // {
            //     path: 'wechat_manage',
            //     name: 'wechat',
            //     meta: {
            //         title: '企业微信管理',
            //         auth: true,
            //     },
            //     component: _import_('Wechat/WechatManage'),
            // },
            // 渠道活码
            {
                path: 'live_code/manage',
                name: 'CodeManage',
                meta: {
                    title: '活码管理',
                    auth: true,
                },
                component: _import_('LiveCode/CodeManage'),
            },
            {
                path: 'live_code/statistic_all',
                name: 'Statistic',
                meta: {
                    title: '活码统计',
                    auth: true,
                },
                component: _import_('LiveCode/CodeStatistic'),
            },
            {
                path: 'live_code/statistic',
                name: 'Baidu',
                meta: {
                    auth: true,
                },
                component: _import_('LiveCode/StatisticDetail'),
            },
            {
                path: 'live_code/add',
                name: 'AddCode',
                meta: {
                    title: '新建渠道活码',
                    auth: true,
                },
                component: _import_('LiveCode/AddCode'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: _import_('Login'),
    },
    {
        path: '/install',
        name: 'Install',
        component: _import_('Install/Install'),
    },
    {
        path: '*',
        component: _import_('Index/Index'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
};

export default router;