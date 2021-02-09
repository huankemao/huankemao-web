<template>
  <div
    class="code-manage"
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <el-container>
      <el-aside class="tabs" style="width: 210px; border: 1px solid #b9c5e9">
        <div class="group-main">
          <el-button
            size="small"
            class="btn-blue"
            @click="
              () => {
                operationType = 'add';
                form.groupName = '';
                form.code = '';
                addGroupFlag = true;
              }
            "
          >
            新增分组
          </el-button>
          <el-tree
            style="margin-top: 20px"
            :data="groupList"
            node-key="code"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleTreeNode"
            :highlight-current="true"
            :current-node-key="code"
          >
            <template slot-scope="{ node, data }">
              <div class="tree-wrap">
                <span :class="code === data.code ? 'active group-name' : 'group-name'">{{
                  data.name
                }}</span>
                <div class="drop-wrap">
                  <el-dropdown
                    v-if="data.name !== '所有' && data.name !== '未分组'"
                    @visible-change="handleChange($event)"
                    @command="handleCommand($event, data)"
                  >
                    <span class="el-dropdown-link span-wrap"
                      ><i class="more el-icon-more"></i
                    ></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="edit">编辑分组</el-dropdown-item>
                      <el-dropdown-item command="delete">删除分组</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </template>
          </el-tree>
        </div>
      </el-aside>

      <el-main>
        <div class="title">
          {{ $route.meta.title }}
          <i @click="showCourse = !showCourse" class="iconfont icon-question-circle"></i>
        </div>
        <div class="course" v-show="showCourse">
          <p>
            <span class="black">
              1、渠道活码：客户通过扫描系统生成的带参数二维码，添加活码成员企业微信，并根据活码设置，自动发送欢迎语与打标签，方便后期客户管理与跟进。
            </span>
          </p>
          <p>
            <span class="black">2、创建的渠道活码将自动进入【素材库】</span>
          </p>
        </div>
        <div class="btns">
          <el-select
            v-model="code_type"
            size="small"
            style="width: 80px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            size="small"
            v-model="keyword"
            placeholder="搜索活码名称"
            style="width: 200px; margin: 0 10px"
          ></el-input>
          <el-button size="small" class="btn-blue" @click="reqGetLiveCodeList"
            >查找</el-button
          >
          <el-button
            size="small"
            class="btn-white"
            @click="
              () => {
                keyword = '';
                code_type = '';
                reqGetLiveCodeList();
              }
            "
          >
            清空
          </el-button>
        </div>
        <div class="btns">
          <el-button
            :disabled="selectionData.length === 0"
            size="small"
            :class="selectionData.length === 0 ? 'btn-opacity' : 'btn-white'"
            @click="handleBatchMove"
          >
            批量移动
          </el-button>
          <el-button
            :disabled="selectionData.length === 0"
            size="small"
            :class="selectionData.length === 0 ? 'btn-opacity' : 'btn-white'"
            @click="handleBatchDownload"
          >
            批量下载
          </el-button>
          <el-button
            size="small"
            :disabled="selectionData.length === 0"
            :class="selectionData.length === 0 ? 'btn-opacity' : 'btn-white'"
            @click="handleBatchEdit"
          >
            批量编辑成员
          </el-button>
          <el-button
            :disabled="selectionData.length === 0"
            size="small"
            :class="selectionData.length === 0 ? 'btn-opacity' : 'btn-white'"
            @click="handleBatchEditLimit"
          >
            批量编辑成员上限
          </el-button>
          <!-- <el-button
            :disabled="selectionData.length === 0"
            size="small"
            :class="selectionData.length === 0 ? 'btn-opacity' : 'btn-white'"
            @click="handleBatchEditWelc"
            >批量编辑欢迎语</el-button
          > -->
          <span></span>
          <el-button size="small" class="btn-blue right" @click="handleAddCode"
            >新建活码</el-button
          >
        </div>
        <el-table
          ref="liveCodeTable"
          :data="tableData"
          :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            textAlign: 'center',
            fontWeight: 'normal',
          }"
          :cell-style="{ textAlign: 'center' }"
          style="width: 100%"
        >
          <el-table-column width="55">
            <template slot="header">
              <el-popover
                v-if="tableData.length !== 0"
                placement="right-start"
                v-model="popoverVisible"
                width="85"
                trigger="hover"
              >
                <ul class="ul">
                  <li @click="handleBatchType('page')">选择此页数据</li>
                  <li @click="handleBatchType('all')">选择全部数据</li>
                </ul>
                <span slot="reference" @click="handleCheckBox">
                  <el-checkbox
                    style="cursor: default"
                    :indeterminate="isIndeterminate"
                    :value="selectFlag"
                  >
                  </el-checkbox>
                </span>
              </el-popover>
              <el-checkbox
                v-else
                :disabled="tableData.length === 0"
                style="cursor: default"
                :indeterminate="isIndeterminate"
                :value="selectFlag"
              ></el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="二维码" width="110">
            <template slot-scope="scope">
              <div style="width: 100%; height: 100%; display: flex; align-items: center">
                <img :src="scope.row.qr_code" style="width: 100%" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="code_type"
            label="活码类型"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            show-overflow-tooltip
            min-width="80"
            max-width="100"
          >
            <!-- 单独设置靠左 -->
            <template slot="header">
              <div style="text-align: left">活码名称</div>
            </template>
            <template slot-scope="scope">
              <div style="text-align: left">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="group_name" label="分组" width="100"></el-table-column>
          <el-table-column label="客户数/成员数" width="120">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="
                    () => {
                      reqGetLiveQrStaff(scope.row.id);
                      preVisible = true;
                    }
                  ">查看</el-button> -->
              <span style="color: #6881ec" @click="lookNum(scope.row, '0')"
                >{{ scope.row.customer_num }}&nbsp;</span
              >
              /&nbsp;
              <span style="color: #6881ec" @click="lookNum(scope.row, '1')">{{
                scope.row.staff_num
              }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="自动添加好友">
              <template slot-scope="scope">
                {{ scope.row.is_add_friends === 1 ? "自动添加" : "需要验证" }}
              </template>
            </el-table-column> -->
          <el-table-column prop="group_name" label="标签" width="220">
            <template slot-scope="scope">
              <span>
                <span
                  class="label"
                  size="small"
                  v-for="(item, index) in scope.row.tag_name"
                  :key="index"
                  >{{ item }}</span
                >
              </span>
              {{ scope.row.tag_name.length === 0 ? "——" : "" }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="客户数" prop="customer_num">
              <template slot="header">
                客户数&nbsp;
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="去除流失客户"
                  placement="top-start"
                >
                  <i style="cursor: pointer" class="el-icon-question"></i>
                </el-tooltip>
              </template>
            </el-table-column> -->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="operation">
                <el-button type="text" @click="handleEditCode(scope.row.id)"
                  >编辑</el-button
                >
                <!-- <el-button type="text" @click="
                      () => {
                        
                      }
                    ">客户</el-button> -->
                <!-- <el-button type="text" @click="handleStatisticDetail(scope.row.id)">统计</el-button> -->
                <el-button
                  type="text"
                  @click="
                    () => {
                      move.id = scope.row.id;
                      move.group_id = scope.row.group_id;
                      customer.moveVisible = true;
                    }
                  "
                >
                  移动
                </el-button>
                <el-button
                  type="text"
                  @click="downloadIamge(scope.row.qr_code, scope.row.name)"
                  >下载</el-button
                >
                <el-button
                  type="text"
                  @click="
                    () => {
                      $confirm('确认删除该活码？', '提示', {
                        cancelButtonClass: 'btn-white',
                        confirmButtonClass: 'btn-blue',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        closeOnClickModal: false,
                      })
                        .then(() => {
                          remove.id = scope.row.id;
                          reqDeleteLiveQr();
                        })
                        .catch(() => {});
                    }
                  "
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination" v-show="tableData.length !== 0">
          <el-pagination
            @size-change="handleLimitChange"
            @current-change="handlePageChange"
            :current-page="page"
            :page-sizes="[10, 20, 40, 80]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>

    <!-- 查看弹窗 -->
    <el-dialog
      :title="checkTitle"
      :visible.sync="preVisible"
      width="640px"
      :close-on-click-modal="false"
      class="lookDialog"
    >
      <div class="header-tabs">
        <el-button :class="checked == '0' ? 'active' : ''" @click="handleCheckTabs('0')"
          >客户</el-button
        >
        <el-button :class="checked == '1' ? 'active' : ''" @click="handleCheckTabs('1')"
          >成员</el-button
        >
        <span class="line"></span>
      </div>
      <div
        v-if="preLoding && checked == '1'"
        v-loading="preLoding"
        style="top: 50px"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
      ></div>
      <div class="watch" v-if="!preLoding && checked == '1'">
        <p class="bgc" v-if="previewData.staff.length !== 0">企业成员</p>
        <p class="avatar-wrap" v-if="previewData.staff.length !== 0">
          <span class="avatar" v-for="(item, index) in previewData.staff" :key="index">
            <img :src="item.avatar" alt="" />
            <span>{{ item.name }}</span>
          </span>
        </p>
        <p class="bgc" v-if="previewData.department.length !== 0">企业部门</p>
        <p class="depart-wrap" v-if="previewData.department.length !== 0">
          <span
            class="depart"
            v-for="(item, index) in previewData.department"
            :key="index"
            >{{ item }}</span
          >
        </p>
      </div>

      <el-table
        v-if="checked == '0'"
        style="margin-top: 20px"
        v-loading="customer.loading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        :data="customer.customeData"
        :header-cell-style="{
          color: '#333',
          fontSize: '14px',
          backgroundColor: '#F6F7FB',
          fontWeight: 'normal',
        }"
      >
        <el-table-column property="name" label="客户名称">
          <template slot-scope="scope">
            <div class="slot-wrap">
              <el-avatar :size="32" :src="scope.row.avatar"></el-avatar>
              <div class="center">
                <span>{{ scope.row.name }}</span>
              </div>
              <div class="gender">
                <img
                  v-show="scope.row.gender == 1"
                  src="../../assets/images/boy.png"
                  width="16"
                  alt=""
                />
                <img
                  v-show="scope.row.gender == 2"
                  src="../../assets/images/girl.png"
                  width="16"
                  alt=""
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="staff_name" label="归属成员">
          <template slot-scope="scope">
            {{ scope.row.staff_name }}--{{ scope.row.section_name }}
          </template>
        </el-table-column>
        <el-table-column property="follow_createtime" label="添加时间"></el-table-column>
      </el-table>
      <div
        class="pagination"
        style="margin-bottom: 0"
        v-show="customer.customeData.length !== 0"
      >
        <el-pagination
          @size-change="
            (limit) => {
              customer.limit = limit;
              reqGetCustomer(customer.id);
            }
          "
          @current-change="
            (page) => {
              customer.page = page;
              reqGetCustomer(customer.id);
            }
          "
          :current-page="customer.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="customer.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="customer.total"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          class="btn-white"
          @click="
            () => {
              preVisible = false;
            }
          "
        >
          关 闭
        </el-button>
      </span>
    </el-dialog>

    <!-- 批量编辑成员 -->
    <el-dialog
      title="批量编辑成员"
      :visible.sync="batchEditVisible"
      width="400px"
      :close-on-click-modal="false"
      :before-close="handleBatchEditClose"
    >
      <!-- 单人结构 -->
      <el-form
        style="margin-top: 20px"
        label-position="left"
        label-width="120px"
        v-if="batchEditType === '单人'"
      >
        <el-form-item label="选择企业成员" required>
          <el-select value-key="user_id" v-model="pickSoloStaff" placeholder="请选择成员">
            <el-option
              v-for="item in soloStaffList"
              :key="item.user_id"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已选成员" required>
          <span>{{ pickSoloStaff.name }}</span>
        </el-form-item>
      </el-form>
      <!-- 多人结构 -->
      <el-form
        v-if="batchEditType === '多人'"
        style="margin-top: 20px"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="选择企业成员">
          <div style="display: flex; height: 32px; align-item: center">
            <el-button size="small" class="btn-white" @click="pickManyStaff"
              >选择企业成员</el-button
            >
            <el-tooltip
              v-show="staffCheckList.length !== 0"
              class="item"
              effect="dark"
              :content="contentName"
              placement="top-start"
            >
              <span
                style="
                  display: inline-block;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 200px;
                  line-height: 32px;
                  text-overflow: ellipsis;
                  margin-left: 20px;
                "
              >
                <span v-for="(item, index) in staffCheckList" :key="index"
                  >{{ item.name }}&nbsp;</span
                >
              </span>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select
            size="small"
            v-model="departmentValue"
            multiple
            placeholder="请选择部门"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handleBatchEditCancel"
          >取 消</el-button
        >
        <el-button
          size="small"
          v-loading="editLoding"
          element-loading-spinner="el-icon-loading"
          class="btn-blue"
          @click="handleBatchEditConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 选择多人企业成员弹窗 -->
    <el-dialog
      width="700px"
      title="选择企业成员"
      :before-close="pickManyBeforeClose"
      :close-on-click-modal="false"
      :visible.sync="staff.manyIn"
    >
      <div class="dialog-content">
        <div class="left-content">
          <el-input
            style="margin-right: 10px"
            placeholder="搜索"
            v-model="filterText"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-tree
            style="margin-top: 10px"
            :data="manyStaffList"
            :props="{
              children: 'group',
              label: 'name',
            }"
            ref="tree"
            show-checkbox
            :filter-node-method="filterNode"
            :default-expand-all="true"
            @check="handleCheckStaff"
            node-key="user_id"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
            </span>
          </el-tree>
        </div>
        <span class="line"></span>
        <div class="right-content">
          <div class="tle">已选择{{ staffCheckList.length }}名成员</div>
          <div class="check" v-for="(item, index) in staffCheckList" :key="index">
            <span>{{ item.name }}</span>
            <i
              class="el-icon-circle-close"
              @click="
                () => {
                  $refs.tree.setChecked(item.user_id, false);
                  staffCheckList.splice(index, 1);
                }
              "
            ></i>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handlePickManyCancel"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handlePickManyConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 分组操作弹窗 -->
    <el-dialog
      :title="
        operationType === 'add'
          ? '新增分组'
          : operationType === 'edit'
          ? '编辑分组'
          : operationType === 'delete'
          ? '删除分组'
          : ''
      "
      :visible.sync="addGroupFlag"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="addGroup"
    >
      <el-form
        @submit.native.prevent
        style="margin-top: 20px"
        v-show="operationType === 'add' || operationType === 'edit'"
        label-position="left"
        label-width="120px"
        :model="form"
        ref="form1"
        :rules="rules"
      >
        <el-form-item label="分组名称" prop="groupName">
          <el-input
            v-model="form.groupName"
            placeholder="请输入分组名（不得超过15个字符）"
            maxlength="15"
            @keyup.enter.native="handleConfirm"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px" v-show="operationType === 'delete'">
        【{{ form.groupName }}】
        一旦删除，归属于该分组的渠道活码都将被移至【未分组】，确定删除分组吗?
      </div>
      <template slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handleCancel">取 消</el-button>
        <el-button size="small" class="btn-blue" @click="handleConfirm">确 定</el-button>
      </template>
    </el-dialog>

    <!-- 客户弹窗 -->
    <el-dialog
      title="扫码客户"
      :visible.sync="customer.customerFlag"
      class="customer"
      :close-on-click-modal="false"
    >
    </el-dialog>

    <!-- 移动弹窗 -->
    <el-dialog
      title="分组移动"
      :visible.sync="customer.moveVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form style="margin-top: 20px" label-position="left" label-width="100px">
        <el-form-item label="选择分组">
          <el-select v-model="move.group_id" placeholder="请选择">
            <el-option
              v-for="item in moveGroupList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          class="btn-white"
          @click="
            () => {
              customer.moveVisible = false;
              move.id = '';
              move.group_id = '';
            }
          "
        >
          取 消
        </el-button>
        <el-button size="small" class="btn-blue" @click="handleMove">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 批量编辑成员上限弹窗 -->
    <el-dialog
      title="修改成员上限"
      :visible.sync="editBatchVisible"
      class="editLimit"
      :close-on-click-modal="false"
    >
      <el-table
        height="300px"
        style="margin-top: 20px"
        v-loading="editBatchLoading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        :data="editBatchLimitData"
        :header-cell-style="{
          color: '#333',
          fontSize: '14px',
          backgroundColor: '#F6F7FB',
          fontWeight: 'normal',
        }"
      >
        <el-table-column
          property="name"
          label="活码名称"
          show-overflow-tooltip
          width="120px"
        ></el-table-column>
        <el-table-column property="staff_name" label="是否开启上限" width="120px">
          <template slot-scope="scope">
            <el-switch
              active-color="#6881EC"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.is_add_limit"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column property="follow_createtime" label="成员上限">
          <template slot-scope="scope">
            <div
              style="margin: 0 0 10px"
              v-show="scope.row.is_add_limit"
              v-for="(item, index) in scope.row.add_limit_list"
              :key="index"
              :label="item.name"
            >
              <span style="display: inline-block; width: 80px">{{ item.name }}</span>
              <el-input
                style="width: 100px"
                type="number"
                size="small"
                :max="500"
                @blur="inputBlur($event, item.add_limit, scope.$index, index)"
                v-model="item.add_limit"
              ></el-input>
            </div>
            <div v-show="!scope.row.is_add_limit">--</div>
          </template>
        </el-table-column>
        <el-table-column property="follow_createtime" label="备用员工">
          <template slot-scope="scope">
            <el-select
              v-show="scope.row.is_add_limit"
              size="small"
              v-model="scope.row.spare_staff_id"
              placeholder="请选择企业成员"
            >
              <el-option
                v-for="item in soloStaffList"
                :key="item.user_id"
                :label="item.name"
                :value="item.user_id"
              >
              </el-option>
            </el-select>
            <div v-show="!scope.row.is_add_limit">--</div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="editBatchVisible = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleEditLimit"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 批量编辑欢迎语 -->
    <el-dialog
      title="编辑欢迎语"
      :visible.sync="welComeVisible"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="welComeVisible = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleEditLimit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqGetLiveCodeGroupList,
  reqAddLiveCodeGroup,
  reqGetDepartmentList,
  reqGetCustomTree,
  reqGetLiveCodeList,
  reqGetCustomer,
  reqMoveLiveQr,
  reqDeleteLiveQr,
  reqBatchLiveQr,
  reqGetLiveQrStaff,
  reqGetSoloStaff,
  reqGetManyStaff,
  reqBatchLiveStaff,
  reqShowBatchLimit,
  reqEditBatchLimit,
} from "@/api/index";
export default {
  data() {
    return {
      checked: "0",
      checkTitle: "查看客户",
      customer: {
        id: "",
        limit: 10,
        page: 1,
        total: 0,
        loading: false,
        customeData: [],
        customerFlag: false,
        moveVisible: false,
      },
      options: [
        {
          value: "",
          label: "所有",
        },
        {
          value: 1,
          label: "单人",
        },
        {
          value: 2,
          label: "多人",
        },
      ],
      batchType: "page",
      moveGroupList: [],
      code_type: "",
      keyword: "",
      showCourse: false,
      loading: false,
      checkIndex: 0,
      page: 1,
      limit: 10,
      total: 0,
      tableData: [],
      dropShow: false,
      groupList: [],
      addGroupFlag: false,
      operationType: "",
      code: "",
      defaultProps: {
        children: "group",
        label: "name",
      },
      form: {
        groupName: "",
        id: "",
        code: "",
      },
      move: {
        id: "",
        group_id: "",
      },
      remove: {
        id: "",
      },
      rules: {
        groupName: [
          {
            required: true,
            message: "请输入分组名称",
            trigger: "blur",
          },
        ],
      },
      selectionData: [],
      preVisible: false,
      previewData: {
        department: [],
        staff: [],
      },
      preLoding: false,
      soloStaffList: [],
      pickSoloStaff: "",
      manyStaffList: [],
      departmentList: [],
      batchEditType: "",
      editLoding: false,
      batchEditVisible: false,
      staffCheckList: [],
      pickStaffList: [],
      filterText: "",
      staff: {
        manyIn: false,
      },
      departmentValue: "",
      editBatchVisible: false,
      editBatchLoading: false,
      editBatchLimitData: [],
      welComeVisible: false,
      showIndex: null,
      selectFlag: false,
      isIndeterminate: false,
      popoverVisible: false,
      checkedDtat: {},
    };
  },
  watch: {
    addGroupFlag(val) {
      if (!val) {
        this.$refs.form1.resetFields();
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    showIndex(val) {
      let oIs = document.querySelectorAll(".more");
      if (val) {
        this.$nextTick(() => {
          oIs[val - 2].classList.remove("hidden");
        });
      } else {
        for (let i = 0; i < oIs.length; i++) {
          oIs[i].classList.add("hidden");
        }
      }
    },
    tableData: {
      handler(val) {
        if (val.length !== 0) {
          if (this.batchType === "page") {
            this.selectionData = [];
            val.forEach((item) => {
              if (item.checked) {
                this.selectionData.push(item);
              }
            });
          }
          let flag = false;
          for (let i = 0; i < val.length; i++) {
            if (!val[i].checked) {
              this.selectFlag = false;
              return false;
            } else {
              flag = true;
            }
          }
          this.selectFlag = true;
        } else {
          this.selectFlag = false;
          this.selectionData = [];
        }
      },
      deep: true,
    },
  },
  computed: {
    contentName() {
      if (this.staffCheckList.length !== 0) {
        let content = "";
        this.staffCheckList.forEach((item) => {
          content += item.name + " ";
        });
        return content;
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.getInitData();
    this.$bus.$on("update", () => {
      this.getInitData();
    });
  },
  methods: {
    handleCheckTabs(data) {
      this.checked = data;
      this.checkTitle = this.checked == "0" ? "查看客户" : "查看成员";
      if (this.checked == 0) {
        this.reqGetCustomer(this.checkedDtat.id);
        this.customer.id = this.checkedDtat.id;
      } else if (this.checked == 1) {
        this.reqGetLiveQrStaff(this.checkedDtat.id);
      }
    },
    lookNum(data, id) {
      this.checkedDtat = data;
      this.checked = id;
      this.preVisible = true;
      this.handleCheckTabs(id);
    },
    getInitData() {
      this.loading = true;
      let oP = [];
      oP[0] = reqGetLiveCodeGroupList({});
      oP[1] = reqGetLiveCodeList({
        page: this.page,
        limit: this.limit,
      });
      oP[2] = reqGetSoloStaff({
        page: 1,
        limit: 10000,
      });
      oP[3] = reqGetManyStaff({});
      oP[4] = reqGetDepartmentList({});
      Promise.all(oP).then((res) => {
        this.loading = false;
        this.groupList = [
          {
            name: "所有",
            id: "",
            code: "",
          },
        ];
        if (res[0].code === 200) {
          this.moveGroupList = res[0].data;
          res[0].data.forEach((item, index) => {
            this.groupList.push(item);
          });
        }
        if (res[1].code === 200) {
          if (res[1].data.length !== 0) {
            this.total = res[1].count;
            this.tableData = res[1].data;
            this.tableData.map((item, index) => {
              item.checked = false;
            });
            this.tableData = JSON.parse(JSON.stringify(this.tableData));
          } else {
            this.total = 0;
            this.tableData = [];
          }
        } else {
          this.total = 0;
          this.tableData = [];
        }
        if (res[2].code === 200) {
          if (res[2].data.length !== 0) {
            this.soloStaffList = res[2].data;
          } else {
            this.soloStaffList = [];
          }
        } else {
          this.soloStaffList = [];
        }

        if (res[3].code === 200) {
          if (res[3].data.length !== 0) {
            this.manyStaffList = res[3].data;
          } else {
            this.manyStaffList = [];
          }
        } else {
          this.manyStaffList = [];
        }

        if (res[4].code === 200) {
          if (res[4].data.length !== 0) {
            this.departmentList = res[4].data;
          } else {
            this.departmentList = [];
          }
        } else {
          this.departmentList = [];
        }
      });
    },
    //获取活码分组列表
    async reqGetLiveCodeGroupList() {
      this.groupList = [
        {
          name: "所有",
          id: "all",
          code: "",
        },
      ];
      let res = await reqGetLiveCodeGroupList({});
      if (res.code == 200) {
        this.moveGroupList = res.data;
        res.data.forEach((item, index) => {
          this.groupList.push(item);
        });
      }
    },
    // 添加、新增、删除活码分组列表
    async reqAddLiveCodeGroup(option) {
      let res = await reqAddLiveCodeGroup(option);
      if (res.code == 200) {
        this.reqGetLiveCodeGroupList();
        this.$message.success(res.msg);
        this.$refs["form1"].clearValidate();
        this.addGroupFlag = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取活码列表
    async reqGetLiveCodeList() {
      this.loading = true;
      let res = await reqGetLiveCodeList({
        code_type: this.code_type,
        keyword: this.keyword,
        group_code: this.code,
        page: this.page,
        limit: this.limit,
      });
      this.loading = false;
      if (res.code === 200) {
        if (res.data.length !== 0) {
          this.total = res.count;
          this.tableData = res.data;
          this.tableData.map((item, index) => {
            item.checked = false;
          });
          this.tableData = JSON.parse(JSON.stringify(this.tableData));
        } else {
          this.total = 0;
          this.tableData = [];
        }
      } else {
        this.total = 0;
        this.tableData = [];
      }
    },
    // 获取活码客户信息
    async reqGetCustomer(id) {
      this.customer.loading = true;
      let res = await reqGetCustomer({
        id,
        page: this.customer.page,
        limit: this.customer.limit,
      });
      this.customer.loading = false;
      if (res.code === 200) {
        if (res.data.length !== 0) {
          this.customer.total = res.count;
          this.customer.customeData = res.data;
        } else {
          this.customer.page = 1;
          this.customer.limit = 10;
          this.customer.total = 0;
          this.customer.customeData = [];
        }
      } else {
        this.customer.customeData = [];
      }
    },
    // 移动活码
    async reqMoveLiveQr() {
      let res = await reqMoveLiveQr(this.move);
      if (res.code === 200) {
        this.customer.moveVisible = false;
        this.reqGetLiveCodeList();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },

    //  删除活码
    async reqDeleteLiveQr() {
      let res = await reqDeleteLiveQr({
        id: this.remove.id,
      });
      if (res.code === 200) {
        this.reqGetLiveCodeList();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },

    // 批量获取活码
    async reqBatchLiveQr() {
      this.loading = true;
      let res = await reqBatchLiveQr({
        group_code: this.code,
      });
      this.loading = false;
      if (res.code === 200) {
        this.$message.success("选择所有活码成功!");
        this.selectionData = res.data;
      } else {
        this.$message.error("选择所有活码失败!");
        this.$refs["liveCodeTable"].clearSelection();
        this.selectionData = [];
      }
    },
    // 预览成员
    async reqGetLiveQrStaff(id) {
      this.previewData = {
        department: [],
        staff: [],
      };
      this.preLoding = true;
      let res = await reqGetLiveQrStaff({
        id,
      });
      console.log(res);
      if (res.code === 200) {
        this.previewData.staff = res.data.staff;
      } else {
        this.$message.error(res.msg);
      }
      this.preLoding = false;
    },
    // 获取单人成员列表
    async reqGetSoloStaff() {
      let res = await reqGetSoloStaff({
        page: 1,
        limit: 10000,
      });
      if (res.code === 200) {
        if (res.data.length !== 0) {
          this.soloStaffList = res.data;
        } else {
          this.soloStaffList = [];
        }
      } else {
        this.soloStaffList = [];
        this.$message.error(res.msg);
      }
    },
    // 获取多人成员列表
    async reqGetManyStaff() {
      let res = await reqGetManyStaff({});
      if (res.code === 200) {
        if (res.data.length !== 0) {
          this.manyStaffList = res.data;
        } else {
          this.manyStaffList = [];
        }
      } else {
        this.manyStaffList = [];
        this.$message.error(res.msg);
      }
    },
    // 获取部门列表
    async reqGetDepartmentList() {
      let res = await reqGetDepartmentList({});
      if (res.code === 200) {
        if (res.data.length !== 0) {
          this.departmentList = res.data;
        } else {
          this.departmentList = [];
        }
      } else {
        this.departmentList = [];
        this.$message.error(res.msg);
      }
    },

    // 批量编辑活码成员
    async reqBatchLiveStaff(params) {
      this.editLoding = true;
      let res = await reqBatchLiveStaff(params);
      this.editLoding = false;
      if (res.code === 200) {
        this.batchEditVisible = false;
        this.pickStaffList = [];
        this.staffCheckList = [];
        this.pickSoloStaff = "";
        this.departmentValue = "";
        this.$message.success(res.msg);
        this.reqGetLiveCodeList();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 批量编辑成员上限回显
    async reqShowBatchLimit(id) {
      this.editBatchLoading = true;
      let res = await reqShowBatchLimit({
        id,
      });
      this.editBatchLoading = false;
      if (res.code === 200) {
        this.editBatchLimitData = res.data;
      } else {
        this.$message.error(res.msg);
        this.editBatchLimitData = [];
      }
    },
    // 提交编辑成员上限
    async reqEditBatchLimit(data) {
      let res = await reqEditBatchLimit({
        data,
      });
      this.editBatchVisible = false;
      if (res.code === 200) {
        this.reqGetLiveCodeList();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 取消新增分组弹窗
    handleCancel() {
      this.addGroupFlag = false;
    },
    // 确定新增分组弹窗
    handleConfirm() {
      switch (this.operationType) {
        case "add":
          this.$refs["form1"].validate((valid) => {
            if (valid) {
              if (
                this.form.groupName.split(" ").join("") === "所有" ||
                this.form.groupName.split(" ").join("") === "未分组"
              ) {
                this.$message.error(
                  `分组名称不能为“${this.form.groupName.split(" ").join("")}”，请更换！`
                );
              } else {
                if (this.form.code) {
                  this.reqAddLiveCodeGroup({
                    parent_code: this.form.code,
                    name: this.form.groupName,
                  });
                } else {
                  this.reqAddLiveCodeGroup({
                    parent_code: 0,
                    name: this.form.groupName,
                  });
                }
              }
            }
          });
          break;
        case "edit":
          this.$refs["form1"].validate((valid) => {
            if (valid) {
              if (
                this.form.groupName.split(" ").join("") === "所有" ||
                this.form.groupName.split(" ").join("") === "未分组"
              ) {
                this.$message.error(
                  `分组名称不能为“${this.form.groupName.split(" ").join("")}”，请更换！`
                );
              } else {
                if (this.form.id) {
                  this.reqAddLiveCodeGroup({
                    id: this.form.id,
                    name: this.form.groupName,
                  });
                } else {
                  this.reqAddLiveCodeGroup({
                    id: this.form.id,
                    name: this.form.groupName,
                  });
                }
              }
            }
          });
          break;
        case "delete":
          this.reqAddLiveCodeGroup({
            id: this.form.id,
            is_del: 1,
          });
          break;
      }
    },
    inputBlur(e, num, scopeIndex, index) {
      if (num >= 500) {
        this.editBatchLimitData[scopeIndex].add_limit_list[index].add_limit = 500;
      } else if (num <= 1) {
        this.editBatchLimitData[scopeIndex].add_limit_list[index].add_limit = 1;
      }
    },
    // 分组操作
    handleCommand(command, data) {
      if (command === "add") {
        this.form.groupName = "";
        this.form.code = data.code;
      } else if (command === "edit") {
        this.form.id = data.id;
        this.form.groupName = data.name;
      } else if (command === "delete") {
        this.form.id = data.id;
        this.form.groupName = data.name;
      }
      this.operationType = command;
      this.addGroupFlag = true;
    },
    // 切换分组目标
    handleCheckList(index) {
      this.checkIndex = index;
    },
    // 确定移动
    handleMove() {
      if (this.move.group_id === "") {
        this.$message.warning("请选择分组！");
      } else {
        this.reqMoveLiveQr();
      }
    },
    // 图片下载
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    // 点击树形控件分组
    handleTreeNode(data, node) {
      this.form.id = data.id;
      if (this.code !== data.code) {
        this.code = data.code;
        this.reqGetLiveCodeList();
      }
    },
    handleCheckBox() {
      if (this.selectFlag) {
        this.selectFlag = false;
        this.tableData.map((item) => {
          item.checked = false;
        });
        this.tableData = JSON.parse(JSON.stringify(this.tableData));
      }
    },
    // 多选类型
    handleBatchType(type) {
      this.tableData.map((item) => {
        item.checked = true;
      });
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
      this.selectFlag = true;
      this.batchType = type;
      this.popoverVisible = false;
      if (type === "all") {
        this.reqBatchLiveQr();
      }
    },
    // 改变每页条数
    handleLimitChange(limit) {
      this.limit = limit;
      this.reqGetLiveCodeList();
    },
    // 改变当前页码
    handlePageChange(page) {
      this.page = page;
      this.reqGetLiveCodeList();
    },
    // 批量移动
    handleBatchMove() {
      if (this.form.id) {
        this.move.group_id = this.form.id;
      } else if (this.groupList.length >= 2) {
        this.move.group_id = this.groupList[1].id;
      }
      let idList = [];
      this.selectionData.forEach((item) => {
        idList.push(item.id);
      });
      this.move.id = idList.join(",");
      this.customer.moveVisible = true;
    },
    // 批量下载
    handleBatchDownload() {
      this.selectionData.forEach((item) => {
        this.downloadIamge(item.qr_code, item.name);
      });
    },
    // 批量编辑成员
    handleBatchEdit() {
      let type = this.selectionData[0].code_type;
      let flag = this.selectionData.every((res) => {
        return res.code_type === type;
      });
      if (flag) {
        this.batchEditType = type;
        this.batchEditVisible = true;
      } else {
        this.$message.error("只针对同一活码类型进行操作，请重新选择！");
      }
    },
    // 批量编辑关闭弹窗
    handleBatchEditClose(done) {
      this.pickSoloStaff = "";
      this.pickStaffList = [];
      this.staffCheckList = [];
      this.departmentValue = [];
      this.editLoding = false;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes([]);
      });
      done();
    },
    // 批量编辑取消编辑
    handleBatchEditCancel() {
      this.batchEditVisible = false;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes([]);
      });
      this.pickSoloStaff = "";
      this.pickStaffList = [];
      this.staffCheckList = [];
      this.departmentValue = [];
      this.editLoding = false;
    },
    // 批量编辑确定编辑
    handleBatchEditConfirm() {
      let params = {};
      let id = [];
      if (this.batchEditType === "单人") {
        if (this.pickSoloStaff) {
          this.selectionData.forEach((item) => {
            id.push(item.id);
          });
          params.id = id.join(",");
          params.wxk_staff_id = this.pickSoloStaff.user_id;
          this.reqBatchLiveStaff(params);
        } else {
          this.$message.warning("请选择企业成员！");
        }
      } else if (this.batchEditType === "多人") {
        if ((this.pickStaffList, length !== 0 || this.departmentValue)) {
          this.selectionData.forEach((item) => {
            id.push(item.id);
          });
          params.id = id.join(",");
          let wxk_staff_id = [];
          if (this.pickStaffList.length !== 0) {
            this.pickStaffList.forEach((res) => {
              wxk_staff_id.push(res.user_id);
            });
            params.wxk_staff_id = wxk_staff_id.join(",");
          }
          if (this.departmentValue) {
            params.wxk_department_id = this.departmentValue.join(",");
          }
          this.reqBatchLiveStaff(params);
        } else {
          this.$message.warning("请选择企业成员或企业部门！");
        }
      }
    },
    // 选择多名企业成员弹窗取消事件
    handlePickManyCancel() {
      this.staff.manyIn = false;
    },
    // 选择多名企业成员弹窗确定事件
    handlePickManyConfirm() {
      this.pickStaffList = this.staffCheckList;
      this.staff.manyIn = false;
    },
    // 选择多人企业成员
    pickManyStaff() {
      this.staff.manyIn = true;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.staffCheckList);
      });
    },
    // 选择企业成员
    handleCheckStaff(data, dataList) {
      let arr = dataList.checkedNodes;
      let newobj = {};
      arr = arr.reduce((preVal, curVal) => {
        newobj[curVal.user_id] ? "" : (newobj[curVal.user_id] = preVal.push(curVal));
        return preVal;
      }, []);
      this.staffCheckList = arr.filter((res) => {
        return res.user_id;
      });
    },
    //  选择多名企业成员弹窗关闭事件
    pickManyBeforeClose(done) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes([]);
      });
      done();
    },
    // 多人选择成员搜索
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 批量编辑成员上限
    handleBatchEditLimit() {
      let ids = [];
      this.selectionData.forEach((item) => {
        ids.push(item.id);
      });
      ids = ids.join(",");
      this.reqShowBatchLimit(ids);
      this.editBatchVisible = true;
    },
    // 确定编辑成员上限
    handleEditLimit() {
      let array = this.editBatchLimitData;
      for (let index = 0; index < array.length; index++) {
        if (array[index].is_add_limit && !array[index].spare_staff_id) {
          this.$message.warning("请选择备用成员");
          return false;
        }
      }
      this.reqEditBatchLimit(array);
    },
    // 批量编辑欢迎语
    handleBatchEditWelc() {
      console.log(this.selectionData);
    },
    // 下拉状态改变
    handleChange(flag) {
      this.dropShow = flag;
    },
    // 关闭弹窗
    handleClose(done) {
      this.form.groupName = "";
      done();
    },
    // 新建渠道活码
    handleAddCode() {
      this.$router.push({
        path: "/live_code/add",
        query: {
          groupId: this.form.id,
        },
      });
    },
    // 编辑渠道活码
    handleEditCode(id) {
      this.$router.push({
        path: "/live_code/add",
        query: {
          id,
        },
      });
    },
    // 统计详情
    handleStatisticDetail(id) {
      this.$router.push({
        path: "/live_code/statistic",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@color: #333;
@size: 14px;

.code-manage {
  width: 100%;
  // height: 100%;
  // overflow: hidden;
  font-size: @size;
  color: @color;

  .lookDialog {
    /deep/.el-dialog__body {
      min-height: 300px;
    }
  }

  .header-tabs {
    position: relative;
    // margin: 1px 0 20px 0;
    margin-bottom: 10px;

    > .el-button {
      width: 20%;
      padding: 8px 20px;
      background: #f6f7fb;
      border-radius: 6px 6px 0px 0px;
      border: 1px solid #b9c5e9;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      border-bottom: 1px solid transparent;
    }

    > .el-button.active {
      position: relative;
      color: #6881ec;
      background: #fff;
      z-index: 10;
    }

    .line {
      position: absolute;
      top: 31px;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #b9c5e9;
    }
  }

  .el-container {
    width: 100%;
    height: calc(100vh - 135px);

    .el-main {
      height: 100%;
      padding: 0 20px;
      // overflow: hidden;

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        margin: 15px 0;

        > span {
          margin-left: 10px;
        }
      }
    }
  }

  .addGroup {
    /deep/.el-dialog {
      width: 500px;
      height: 200px;
      background: #ffffff;

      .el-dialog__headerbtn /deep/.el-dialog__close {
        font-size: 20px;
        font-weight: bold;
        color: #ffbbc0;
      }

      /deep/.el-dialog__title {
        font-weight: bold;
      }

      /deep/.el-dialog__footer {
        width: 100%;
        height: 70px;
        line-height: 50px;
        text-align: center;
        background: #ffffff;
        box-shadow: 0px 0px 12px 0px rgba(104, 129, 236, 0.2);
        border-radius: 0px 0px 12px 12px;
      }
    }
  }

  .customer {
    /deep/.el-dialog {
      width: 700px;
      min-height: 200px;
      background: #ffffff;
      border-radius: 12px;
    }

    .el-dialog__headerbtn /deep/.el-dialog__close {
      font-size: 20px;
      font-weight: bold;
      color: #ffbbc0;
    }

    /deep/.el-dialog__title {
      font-weight: bold;
    }
  }

  .operation {
    .el-button {
      margin: 0 10px 0 0;
    }
  }

  span.label {
    display: inline-block;
    line-height: 1;
    color: #6881ec;
    background: #eef2fe;
    border-radius: 4px;
    border: 1px solid #6881ec;
    margin: 3px;
    padding: 5px;
    font-size: 12px;
    white-space: nowrap;
  }

  .table {
    height: calc(100% - 230px);
  }

  .overflow {
    display: inline-block;
    width: 450px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dialog-content {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;

    > div {
      margin-top: 20px;
    }

    .line {
      width: 1px;
      margin: 0 5px;
      background: #e5ebfb;
    }

    .left-content {
      padding-right: 10px;
      width: calc(50% - 15px);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .right-content {
      position: absolute;
      top: 0;
      left: 350px;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;

      .tle {
        height: 40px;
        line-height: 40px;
      }

      .check {
        width: 100%;
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;

        > i {
          font-size: 20px;
          cursor: pointer;
          color: #6881ec;
        }
      }
    }
  }

  .editLimit {
    /deep/.el-table__body-wrapper {
      overflow-x: hidden;
      // overflow-y: scroll;
    }
  }

  .watch {
    width: 100%;
    display: flex;
    flex-direction: column;

    .bgc {
      width: calc(100% - 40px);
      height: 20px;
      padding: 14px 20px;
      background: #f6f7fb;
      line-height: 20px;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
      margin-top: 20px;
    }

    .avatar-wrap {
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .avatar {
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 60px;
        margin: 10px 15px;
        justify-content: space-between;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
    }

    .depart-wrap {
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .depart {
        margin: 10px;
        padding: 5px 10px;
        background: #fff7e6;
        border-radius: 4px;
        line-height: 1;
        color: #fea96c;
        border: 1px solid #f5daa3;
        font-size: 12px;
      }
    }
  }

  .slot-wrap {
    display: flex;
    align-items: center;

    .center {
      display: flex;
      flex-direction: column;

      :nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
      }
    }

    .gender {
      align-self: flex-start;
      margin-top: 5px;
    }

    > :nth-child(2) {
      margin: 0 10px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
  }

  .more {
    visibility: hidden;
  }

  .el-tree-node:hover .more {
    visibility: visible;
    color: #6881ec;
  }

  .el-tree-node:hover .group-name {
    color: #6881ec;
  }

  /deep/.el-table__row {
    /deep/.el-checkbox__inner {
      margin-left: 8px;
    }
  }
}

.ul {
  li {
    line-height: 25px;
  }

  li:hover {
    color: #6881ec;
    cursor: pointer;
  }
}
</style>
