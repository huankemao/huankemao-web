/** @file:接口文件 */
import Vue from 'vue'
import axios from './axios';
import system from './system';
import uploads from './upload';
import router from '../router/index';

let str = '/admin.php';
let baseURL = '/';
let imgUrl = window.location.protocol + '//' + window.location.host;
 Vue.prototype.baseURL = imgUrl;

axios.defaults.baseURL = baseURL;
system.defaults.baseURL = baseURL;
uploads.defaults.baseURL = baseURL;

/**@type:安装 */
// 检测是否安装
export const reqInstallCheck = (option) => system.post(str + '/install_check', option);

// 检查环境
export const reqEnvironment = (option) => system.post(str + '/check_environment', option);

// 安装
export const reqInstall = (option) => system.post(str + '/install', option);

// 项目初始化同步
export const reqSyncConfig = (option) => system.post(str + '/config_synchro', option);

// 初始化失败删除配置
export const reqDelConfig = (option) => system.post(str + '/del_config', option);

// 获取安装配置
export const reqGetConfigRandom = (option) => system.post(str + '/get_config_random_string', option);

/**@type:系统相关 */
// 登录
export const reqLogin = (option) => system.post(str + '/login', option);

// 重设密码
export const reqForgetPwd = (option) => system.post(str + '/forget_pas', option);

// 发送短信
export const reqSendMag = (option) => system.post(str + '/send_msg', option);

// 注册
export const reqRegister = (option) => system.post(str + '/register', option);

// 验证短信
export const reqVerifyCode = (option) => system.post(str + '/verify_code', option);

// 企业微信登录
export const reqWxLogin = (option) => system.post(str + '/wx_login', option);

export const reqGetWxLogin = (code) => system.get(str + `/wx_login?code=${code}`);

// 退出登录
export const reqLogout = (option) => system.post(str + '/logout', option);

/**@type:首页 */
// 客户统计
export const reqCustomTotal = (option) => axios.post(str + '/index_customer_total', option);

// 客户增长趋势
export const reqCustomTrend = (option) => axios.post(str + '/index_customer_trend', option);

// 客户明细
export const reqCustomDetail = (option) => axios.post(str + '/index_customer_detailed', option);

// 获取首页用户信息
export const reqUserInfo = (option) => axios.post(str + '/index_user_info', option);

// 成员Top10
export const reqStaffTop = (option) => axios.post(str + '/index_staff_top', option);

// 引流数据统计
export const reqDrainage = (option) => axios.post(str + '/index_drainage_data', option);

/**@type:企业通讯录 */
// 同步企业微信成员列表
export const reqSynchroStaff = (option) => axios.post(str + '/synchro_staff', option);

// 获取企业成员最后一次同步时间
export const reqSynchroDate = (option) => axios.post(str + '/get_synchro_staff_date', option);

// 获取成员列表
export const reqGetUserList = (option) => axios.post(str + '/get_user_simple_list', option);

// 成员标签同步
export const reqSyncStaffTag = (option) => axios.post(str + '/sync_staff_tag', option);

// 获取成员标签组
export const reqStaffTagGroup = (option) => axios.post(str + '/get_staff_tag_group', option);

// 新增编辑成员标签组
export const reqAddStaffTagGroup = (option) => axios.post(str + '/add_staff_tag_group', option);

// 删除成员标签组
export const reqDeleteStaffTagGroup = (option) => axios.post(str + '/del_staff_tag_group', option);

// 新增编辑成员标签
export const reqAddStaffTag = (option) => axios.post(str + '/add_staff_tag', option);

// 删除成员标签
export const reqDeleteStaffTag = (option) => axios.post(str + '/del_staff_tag', option);

// 获取成员标签列表
export const reqGetStaffTagList = (option) => axios.post(str + '/get_staff_tag_list', option);

// 成员打标签/移除标签
export const reqStaffToggle = (option) => axios.post(str + '/staff_tagging', option);

// 成员标签列表
export const reqShowStaffTag = (option) => axios.post(str + '/show_staff_tag', option);

// 获取成员标签树结构
export const reqGetStaffTagTree = (option) => axios.post(str + '/get_staff_tag_tree', option);

// 获取筛选列表
export const reqShowGetStaffScreen = (option) => axios.post(str + '/show_get_staff_screen', option);

// 根据部门code获取成员列表
export const reqDepartmentStaff = (option) => axios.post(str + '/get_department_staff', option);

/**@type:企业微信管理 */
// 企业微信列表
export const reqGetWechatList = (option) => axios.post(str + '/wxk_config_list', option);

// 新增编辑企业微信
export const reqAddWechat = (option) => axios.post(str + '/add_wxk_config', option);

// 获取回调URL
export const reqGetCallbackUrl = (option) => axios.post(str + '/get_callback_url', option);

// 上传域名验证文件
export const reqUploadFile = `${imgUrl}${str}/upload_domain_verification_file`;

/**@type:客户CRM */
// 同步企业微信客户
export const reqSynchroCustom = (option) => axios.post(str + '/synchro_customer', option);

// 获取客户列表
export const reqGetCustomList = (option) => axios.post(str + '/get_list_customer', option);

//  查看重复客户
export const reqRepeatList = (option) => axios.post(str + '/repeat_list_customer', option);
//打标签
export const customerTag = (option) => axios.post(str + '/customer_tagging', option);
//回显标签
export const showCustomerTag = (option) => axios.post(str + '/show_customer_tag', option);

// 同步企业微信客户标签
export const reqSynchroTag = (option) => axios.post(str + '/synchro_customer_tag', option);

// 获取客户标签组
export const reqGetCustomTagGroup = (option) => axios.post(str + '/get_customer_tag_group', option);

// 获取客户标签列表
export const reqGetCustomTag = (option) => axios.post(str + '/get_customer_tag', option);

// 新增客户标签
export const reqAddCustomLabel = (option) => axios.post(str + '/add_customer_tag', option);
//修改删除客户组
export const reqEditCustomLabel = (option) => axios.post(str + '/edit_customer_tag_group', option);
//修改删除客户标签
export const reqEditCustomTag = (option) => axios.post(str + '/edit_customer_tag', option);

// 客户管理筛选条件
export const reqShowList = (option) => axios.post(str + '/show_list_customer', option);

/** @type:活码管理 */
// 获取活码分组列表
export const reqGetLiveCodeGroupList = (option) => axios.post(str + '/live_code_group', option);

// 新增编辑删除活码分组
export const reqAddLiveCodeGroup = (option) => axios.post(str + '/add_code_group', option);

// 获取部门列表
export const reqGetDepartmentList = (option) => axios.post(str + '/get_department_list', option);

// 获取客户标签树结构
export const reqGetCustomTree = (option) => axios.post(str + '/get_customer_tag_tree', option);

// 获取活码列表
export const reqGetLiveCodeList = (option) => axios.post(str + '/get_live_qr_list', option);

// 活码列表客户信息
export const reqGetCustomer = (option) => axios.post(str + '/get_live_qr_customer', option);

// 同步配置外部联系权限的联系人
export const reqSynchroFollow = (option) => axios.post(str + '/synchro_follow_user', option);

// 新增活码获取单人成员
export const reqGetSoloStaff = (option) => axios.post(str + '/get_add_live_staff', option);

// 新增活码获取多人成员
export const reqGetManyStaff = (option) => axios.post(str + '/get_section_tree_staff', option);

// 新增编辑活码
export const reqAddLiveQr = (option) => axios.post(str + '/add_live_qr', option);

// 编辑活码回显信息
export const reqShowLive = (option) => axios.post(str + '/show_live_qr', option);

// 活码移动分组
export const reqMoveLiveQr = (option) => axios.post(str + '/live_qr_group_move', option);

// 删除活码
export const reqDeleteLiveQr = (option) => axios.post(str + '/delete_live_qr', option);

// 批量获取活码
export const reqBatchLiveQr = (option) => axios.post(str + '/batch_live_qr_list', option);

// 获取素材分组列表
export const reqGetContentGroupList = (option) => axios.post(str + '/content_group_list', option);

// 活码管理预览成员
export const reqGetLiveQrStaff = (option) => axios.post(str + '/get_live_qr_staff', option);

// 批量编辑活码成员
export const reqBatchLiveStaff = (option) => axios.post(str + '/edit_batch_live_qr_staff', option);

// 根据media_id查询
export const reqGetMediaId = (option) => axios.post(str + '/get_media_id_content', option);

// 批量编辑成员上限回显
export const reqShowBatchLimit = (option) => axios.post(str + '/show_batch_add_limit', option);

// 批量编辑活码成员上限
export const reqEditBatchLimit = (option) => axios.post(str + '/edit_batch_add_limit', option);

// 图片上传
export const uploadUrl = `${imgUrl}${str}/photo`;

/**@type:活码统计 */
// 单个活码统计头部信息
export const reqLiveQrStart = (option) => axios.post(str + '/get_live_qr_stat', option);

// 单人活码统计底部信息
export const reqLiveQrEnd = (option) => axios.post(str + '/get_live_qr_stat_screen', option);

// 活码统计头部信息
export const reqGetStatistics = (option) => axios.post(str + '/get_live_qr_statistics', option);

// 活码统计TOP10
export const reqGetTop = (option) => axios.post(str + '/get_live_qr_stat_top', option);

// 活码统计客户增长
export const reqGetAdd = (option) => axios.post(str + '/get_live_qr_add_stat', option);

// 活码统计客户属性
export const reqGetAttribute = (option) => axios.post(str + '/get_live_qr_stat_attribute', option);

/**@type:聊天工具栏 */
// 内容引擎-内容管理-列表
export const ContentList = (option) => axios.post(str + '/content_list', option);

// 内容引擎-内容管理-添加
export const ContentAdd = (option) => axios.post(str + '/content_add', option);
// 内容引擎-内容管理-修改
export const ContentEdit = (option) => axios.post(str + '/content_edit', option);
// 内容引擎-内容管理-统计
export const ContentDetails = (option) => axios.post(str + '/content_details', option);

// 内容引擎-内容管理-刪除
export const ContentDel = (option) => axios.post(str + '/content_del', option);

// 内容引擎-内容管理-上传
export const Upload = (option) => uploads.post(str + '/photo', option);

// 内容引擎-内容管理-小组
export const ContentGroupList = (option) => axios.post(str + '/content_group_list', option);

// 内容引擎-内容管理-小组-新增
export const ContentGroupAdd = (option) => axios.post(str + '/content_group_add', option);
// 内容引擎-内容管理-小组-修改
export const ContentGroupEdit = (option) => axios.post(str + '/content_group_edit', option);
// 内容引擎-内容管理-小组-数据回填
export const ContentInfo = (option) => axios.post(str + '/get_temporary_preview', option);

// 内容引擎-内容管理-小组-删除
export const ContentGroupDel = (option) => axios.post(str + '/content_group_del', option);

// 内容引擎-内容统计-次数
export const ContentNum = (option) => axios.post(str + '/content_num', option);

// 素材库-内容统计-内容TOP10
export const ContentTop = (option) => axios.post(str + '/content_top', option);

// 素材库-内容统计-员工TOP10
export const StaffTop = (option) => axios.post(str + '/staff_top', option);

// 素材库-内容统计-搜索词TOP10
export const SearchTop = (option) => axios.post(str + '/search_top', option);

// 素材库-内容统计-3种次数
export const ContentSearch = (option) => axios.post(str + '/content_search', option);

//正式发布-文章添加临时文件
export const ContentPriview = (option) => axios.post(str + '/set_content_preview', option);

// 素材库-内容统计-次数
export const ContentdataTotal = (option) => axios.post(str + '/content_data_total', option);

// 素材库-内容统计-详细信息
export const ContentdataDetails = (option) => axios.post(str + '/content_data_details', option);

// 企业管理-员工管理-同步成员行为数据
export const syncStaffBehavior = (option) => axios.post(str + '/sync_staff_behavior', option);