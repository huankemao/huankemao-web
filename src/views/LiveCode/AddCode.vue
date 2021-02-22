<template>
  <div
    class="add-code"
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="head">
      <div class="title">
        {{ !$route.query.id ? $route.meta.title : "编辑渠道活码" }}
      </div>
      <el-button size="small" class="btn-blue" @click="handleBack"> 返回 </el-button>
    </div>
    <div class="steps">
      <span :class="active === 1 ? 'circle active' : 'circle active el-icon-check'">{{
        active === 1 ? "1" : ""
      }}</span>
      <span class="text">基础设置</span>
      <span :class="active === 1 ? 'line' : 'line active'"></span>
      <span
        :class="
          active === 1
            ? 'circle'
            : active === 2
            ? 'circle active'
            : 'circle active el-icon-check'
        "
        >{{ active > 2 ? "" : 2 }}</span
      >
      <span class="text">引流成员设置</span>
      <span :class="active < 3 ? 'line' : 'line active'"></span>
      <span :class="active < 3 ? 'circle' : 'circle active'">3</span>
      <span class="text">欢迎语设置</span>
    </div>
    <div class="main">
      <!-- 步骤一结构 -->
      <div class="form" v-show="active === 1">
        <el-form label-position="left" label-width="180px" :model="form">
          <el-form-item label="选择分组" required>
            <SelectTree
              v-if="!loading"
              :options="groupOptions"
              :accordion="false"
              :value="form.groupId"
              @getValue="getSelectTreeValue"
            />
          </el-form-item>
          <el-form-item label="活码名称" required>
            <el-input
              style="width: 600px"
              type="textarea"
              placeholder="限30字符"
              v-model="form.liveCodeName"
              maxlength="30"
              size="small"
              :disabled="Boolean($route.query.id)"
              resize="none"
              :autosize="{ minRows: 1, maxRows: 1 }"
              show-word-limit
            >
            </el-input>
            <span v-if="!Boolean($route.query.id)" class="last-text"
              >（创建成功后不可修改）</span
            >
          </el-form-item>
          <el-form-item label="自动添加好友">
            <el-switch active-color="#6881EC" v-model="form.switchValue"> </el-switch>
            <span class="last-text">{{
              form.switchValue
                ? "（开启时，客户扫码添加成员自动成员好友，无需确认）"
                : "（关闭时，客户扫码添加成员需成员确认）"
            }}</span>
          </el-form-item>
          <el-form-item>
            <template slot="label">
              客户标签
              <el-tooltip
                class="item"
                effect="dark"
                content="客户通过扫码添加企业成员后，将被自动打上选中的标签"
                placement="top-start"
              >
                <i class="iconfont icon-question-circle"> </i>
              </el-tooltip>
            </template>
            <div class="tabs-wrap" v-loading="label.loading">
              <el-form label-width="270px" v-show="!label.loading">
                <template v-for="(item, index) in customLabelList">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :label="item.name"
                    :key="index"
                  >
                    <el-button
                      style="margin: 0 5px"
                      size="small"
                      :ref="citem.id"
                      class="btn-gray"
                      @click="handlePickLabel(citem.id)"
                      v-for="(citem, index) in item.group"
                      :key="index"
                    >
                      {{ citem.name }}
                    </el-button>
                    <el-button
                      size="small"
                      style="margin: 0 5px"
                      class="btn-white"
                      icon="el-icon-plus"
                      @click="handleAddLabel(item)"
                      >新建标签</el-button
                    >
                  </el-form-item>
                </template>
                <el-form-item>
                  <el-button
                    style="margin: 20px 0 0 5px"
                    size="small"
                    class="btn-white"
                    icon="el-icon-plus"
                    @click="handleAddLabelGroup"
                    >新建标签组</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" class="btn-blue" @click="handleNext"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 新建标签与标签组 -->
        <el-dialog
          width="600px"
          :title="label.title"
          :visible.sync="label.visible"
          :before-close="dialogBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form
            class="forms"
            style="margin-top: 20px"
            v-show="label.title === '新增标签'"
            :model="label"
            :rules="labelRules"
            ref="labelForm1"
          >
            <el-form-item label="选择分组" label-width="100px">
              <el-select
                style="width: 100%"
                v-model="label.labelGroupName"
                disabled
                placeholder="请选择"
                size="small"
              >
              </el-select>
            </el-form-item>
            <el-form-item
              style="margin-bottom: 10px"
              label="标签名称"
              label-width="100px"
              prop="labelValue"
            >
              <el-input
                placeholder="请输入标签（不得超过15个字符）"
                v-model="label.labelValue"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="" label-width="100px">
              <span style="font-size: 12px; color: #999"
                >每个标签名称最多15个字，同时新建多个标签时，请用“空格” 隔开。</span
              >
            </el-form-item>
          </el-form>
          <el-form
            style="margin-top: 20px"
            v-show="label.title === '新增标签组'"
            :model="label"
            :rules="labelRules"
            ref="labelForm2"
          >
            <el-form-item label="分组名称" label-width="100px" prop="labelGroupName">
              <el-input
                placeholder="请输入分组名（不得超过15个字符）"
                v-model="label.labelGroupName"
                maxlength="15"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              style="margin-bottom: 10px"
              label="标签名称"
              label-width="100px"
              prop="labelValue"
            >
              <el-input
                placeholder="请输入标签（不得超过15个字符）"
                v-model="label.labelValue"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="" label-width="100px">
              <span style="font-size: 12px; color: #999"
                >标签名称最多15个字符，同时新建多个标签时，请用“空格”隔开。</span
              >
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              size="small"
              class="btn-white"
              @click="
                () => {
                  label.visible = false;
                  label.labelGroupName = '';
                  $refs.labelForm1.resetFields();
                  $refs.labelForm2.resetFields();
                }
              "
              >取 消</el-button
            >
            <el-button size="small" class="btn-blue" @click="handleSubmitLabel"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
      <!-- 步骤二结构 -->
      <div class="form" v-show="active === 2">
        <!-- <span class="info">
          扫码添加成员规则：在周期和特殊时期共存情况下，扫码优先添加特殊时期的成员。</span
        > -->
        <el-form label-position="left" label-width="180px" :model="form">
          <el-form-item label="类型">
            <el-radio v-model="radio" :disabled="Boolean($route.query.id)" :label="1"
              >单人</el-radio
            >
            <el-radio v-model="radio" :disabled="Boolean($route.query.id)" :label="2"
              >多人</el-radio
            >
            <span v-if="!Boolean($route.query.id) && radio == 1" class="last-text"
              >（当客户通过活码扫码添加好友时，所加为好友的成员为设置的成员,创建成功后不可修改）</span
            >
            <span v-if="!Boolean($route.query.id) && radio == 2" class="last-text"
              >（当客户通过活码扫码添加好友时，所加为好友的成员为将从设置的成员中随机分配,创建成功后不可修改）</span
            >
          </el-form-item>
          <el-form-item style="margin-bottom: 10px" label="企业成员" required>
            <el-button size="small" class="btn-blue" @click="handleEditPick">
              {{ pickStaffList.length !== 0 ? "编辑" : "添加" }}
            </el-button>
            <el-tooltip
              v-if="Boolean($route.query.id) && radio === 1"
              class="item"
              effect="dark"
              content="成员更改后，原活码图片上成员头像不会随之更改，无功能影响。"
              placement="top-start"
            >
              <i class="iconfont icon-question-circle" style="margin-left: 10px"> </i>
            </el-tooltip>
          </el-form-item>
          <el-form-item
            style="margin-bottom: 10px"
            label="已选成员列表"
            v-show="pickStaffList.length !== 0"
          >
            <div class="overhidden">
              <span v-for="(item, index) in pickStaffList" :key="index"
                >{{ item.name }}&nbsp;</span
              >
            </div>
          </el-form-item>
          <el-form-item
            style="margin-bottom: 10px"
            label="已选部门列表"
            v-show="radio === 2 && pickDepartment.length !== 0"
          >
            <div class="overhidden">
              <span v-for="(item, index) in pickDepartment" :key="index"
                >{{ item.name }}&nbsp;</span
              >
            </div>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px" label="员工添加上限">
            <el-switch
              @change="changeAddswitch"
              v-model="AddSwitch"
              active-color="#6881EC"
            >
            </el-switch>
            <span class="last-text"
              >（因受官方限制，无法对动态部门的员工设置添加好友上限，只可针对指定活码成员进行设置）</span
            >
          </el-form-item>
          <el-form-item v-if="AddSwitch">
            <el-table
              :data="pickStaffList"
              style="width: 500px"
              :header-row-style="{ height: '35px' }"
              class="table"
              :row-style="{ height: '35px' }"
              :cell-style="{ height: '35px' }"
              :header-cell-style="{
                color: '#333',
                fontSize: '14px',
                backgroundColor: '#F6F7FB',
                fontWeight: 'normal',
                height: '35px',
              }"
            >
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column label="上限">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    min="1"
                    max="500"
                    size="small"
                    v-model="numList[scope.$index].num"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备用员工" v-show="AddSwitch" required>
            <el-select
              v-model="spare_staff_id"
              size="small"
              style="width: 300px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in staff.soloData"
                :key="item.user_id"
                :label="item.name"
                :value="item.user_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" class="btn-white" @click="handlePrev"
              >上一步</el-button
            >
            <el-button size="small" class="btn-blue" @click="handleNext"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 添加多人企业成员 -->
        <el-dialog
          v-loading="staff.loading"
          title="添加企业成员"
          :visible.sync="staff.visibleMany"
          :close-on-click-modal="false"
          width="500px"
        >
          <el-form style="margin-top: 20px" label-position="left" label-width="120px">
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
            <el-button
              size="small"
              class="btn-white"
              @click="
                () => {
                  staff.visibleMany = false;
                  onePickList = [];
                  staffCheckList = [];
                  departmentValue = [];
                }
              "
              >取 消</el-button
            >
            <el-button size="small" class="btn-blue" @click="addManyConfirm"
              >确 定</el-button
            >
          </span>
        </el-dialog>
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
                :data="staff.manyData"
                :props="staff.props"
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

        <!-- 添加单人企业成员 -->
        <el-dialog
          v-loading="staff.loading"
          title="选择企业成员"
          :visible.sync="staff.visibleSolo"
          :close-on-click-modal="false"
          :before-close="
            () => {
              staff.visibleSolo = false;
              if (pickStaffList.length !== 0) {
                pickStaff = pickStaffList[0];
              } else {
                pickStaff = '';
              }
            }
          "
          width="500px"
        >
          <el-form style="margin-top: 20px" label-position="left">
            <el-form-item label="选择企业成员" label-width="120px" required>
              <el-select value-key="user_id" v-model="pickStaff" placeholder="请选择成员">
                <el-option
                  v-for="item in staff.soloData"
                  :key="item.user_id"
                  :label="item.name"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button
              size="small"
              class="btn-white"
              @click="
                () => {
                  staff.visibleSolo = false;
                  if (pickStaffList.length !== 0) {
                    pickStaff = pickStaffList[0];
                  } else {
                    pickStaff = '';
                  }
                }
              "
              >取 消</el-button
            >
            <el-button
              size="small"
              class="btn-blue"
              @click="
                () => {
                  if (!pickStaff) {
                    $message.warning('请选择企业成员！');
                  } else {
                    pickStaffList = [];
                    pickStaffList.push(pickStaff);
                    staff.visibleSolo = false;
                  }
                }
              "
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>

      <!-- 步骤三结构 -->
      <div class="form" v-show="active === 3">
        <div class="switch">
          <span class="label">扫码推送欢迎语</span>
          <el-switch v-model="form.scanCodeSwitch" active-color="#6881EC"> </el-switch>
          <span class="last-text"
            >（关闭后，将不再推送此活码设置的欢迎语，仅推送【系统欢迎语】,若已在企微后台为成员配置欢迎语，则此欢迎语无效，仅推送【系统欢迎语】）</span
          >
        </div>
        <div class="phone-main" v-show="form.scanCodeSwitch">
          <div class="phone">
            <div class="top-head"></div>
            <div class="content">
              <div class="content-main">
                <div class="message" v-show="textLength">
                  <img
                    class="avatar-left"
                    src="../../assets/images/avatar.png"
                    width="32px"
                  />
                  <div class="input-value" ref="input-text"></div>
                </div>
                <div class="message">
                  <img
                    v-show="image.submit || link.submit || mini.submit || href.submit"
                    class="avatar-left"
                    src="../../assets/images/avatar.png"
                    width="32px"
                    alt=""
                  />
                  <div class="imgBox" v-if="contType === 2 && image.submit">
                    <img class="pic" :src="image.data.content" alt="" />
                  </div>
                  <div class="link" v-else-if="contType === 3 && link.submit">
                    <p class="link-title">{{ link.data.title }}</p>
                    <div>
                      <span class="link-desc">{{ link.data.summary }}</span>
                      <img class="link-cover" :src="link.data.cover" alt="" />
                    </div>
                  </div>
                  <div class="mini" v-else-if="contType === 6 && mini.submit">
                    <p class="mini-title">{{ mini.data.title }}</p>
                    <div>
                      <img class="mini-cover" :src="mini.data.cover" alt="" />
                    </div>
                  </div>
                  <div class="link" v-else-if="contType === 8 && href.submit">
                    <p class="link-title">{{ href.data.title }}</p>
                    <div>
                      <span class="link-desc">{{ href.data.summary }}</span>
                      <img class="link-cover" :src="href.data.cover" alt="" />
                    </div>
                  </div>
                  <!-- <div class="text" v-else-if="contType === 1 && texts.submit">
                    <p class="text-title">{{ texts.data.content }}</p>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="phone-foot"></div>
          </div>
          <div class="main-right">
            <div class="operate">
              <div
                contenteditable="true"
                id="textarea"
                class="custom-textarea"
                ref="custom-textarea"
                @input="changeText"
              ></div>
              <!-- <w-textarea v-model="text"  @add='addTag' :tools='tool'
               /> -->
              <span>{{ textLength }}/1000</span>
              <div class="btn">
                <span>点击插入：</span>
                <el-button size="small" class="btn-orange" @click="handleAddBtn"
                  >客户名称</el-button
                >
              </div>
              <div
                class="btns"
                v-show="
                  !image.submit &&
                  !link.submit &&
                  !mini.submit &&
                  !texts.submit &&
                  !href.submit
                "
              >
                <el-button
                  size="small"
                  class="btn-white"
                  @click="
                    () => {
                      contType = 1;
                      type = 1;
                      reqGetContentGroupList();
                      pickVisible = true;
                    }
                  "
                  >添加快捷消息</el-button
                >

                <el-button
                  size="small"
                  class="btn-white"
                  @click="
                    () => {
                      contType = 2;
                      type = 2;
                      reqGetContentGroupList();
                      pickVisible = true;
                    }
                  "
                  >添加图片</el-button
                >

                <el-button
                  size="small"
                  class="btn-white"
                  @click="
                    () => {
                      type = 3;
                      contType = 3;
                      reqGetContentGroupList();
                      pickVisible = true;
                    }
                  "
                  >添加文章</el-button
                >
                <el-button
                  size="small"
                  class="btn-white"
                  @click="
                    () => {
                      contType = 6;
                      reqGetContentGroupList();
                      type = 6;
                      pickVisible = true;
                    }
                  "
                  >添加小程序</el-button
                >
                <el-button
                  size="small"
                  class="btn-white"
                  @click="
                    () => {
                      contType = 8;
                      reqGetContentGroupList();
                      type = 8;
                      pickVisible = true;
                    }
                  "
                  >添加跳转链接</el-button
                >
              </div>
              <div v-show="contType === 2 && image.submit" class="show-data">
                <span
                  @click="
                    () => {
                      pickVisible = true;
                    }
                  "
                >
                  <!-- {{ image.data.file_name }} -->
                  <img :src="image.data.content" width="50" height="50" alt="" />
                </span>
                <i
                  @click="
                    () => {
                      image.data = '';
                      image.submit = false;
                      contId = '';
                    }
                  "
                  class="el-icon-close"
                ></i>
              </div>
              <div v-show="contType === 1 && texts.submit" class="show-data">
                <!-- <i @click="handleText" class="el-icon-link"></i> -->
                <span @click="handleText">{{ texts.data.content }}</span>
                <i @click="delText" class="el-icon-close"></i>
              </div>
              <div v-show="contType === 3 && link.submit" class="show-data">
                <i @click="handleLink" class="el-icon-link"></i>
                <span @click="handleLink">{{ link.data.title }}</span>
                <i
                  @click="
                    () => {
                      link.data = '';
                      link.changeData = '';
                      link.submit = false;
                      contId = '';
                    }
                  "
                  class="el-icon-close"
                ></i>
              </div>
              <div v-show="contType === 8 && href.submit" class="show-data">
                <i @click="handleHref" class="el-icon-link"></i>
                <span @click="handleHref">{{ href.data.title }}</span>
                <i
                  @click="
                    () => {
                      href.data = '';
                      href.changeData = '';
                      href.submit = false;
                      contId = '';
                    }
                  "
                  class="el-icon-close"
                ></i>
              </div>
              <div v-show="contType === 6 && mini.submit" class="show-data">
                <svg
                  @click="handleMini"
                  t="1609929975914"
                  class="icon"
                  style="cursor: pointer"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3010"
                  width="14"
                  height="14"
                >
                  <path
                    d="M740.672 37.504c156.352 0 283.52 115.584 283.52 258.496 0 44.416-13.056 87.872-36.608 127.04-35.648 57.216-92.672 99.584-161.664 119.744a161.408 161.408 0 0 1-45.184 7.36 52.8 52.8 0 0 1-53.76-52.928c0-29.76 23.68-52.864 53.76-52.864 2.112 0 6.528 0 11.904-2.048 46.336-12.8 82.944-39.168 103.424-74.24 13.952-22.144 20.48-46.72 20.48-72.064 0-83.84-78.72-152.512-174.72-152.512a197.76 197.76 0 0 0-94.72 24.32c-50.816 28.544-80.896 76.16-80.896 128.192v443.904c0 89.984-50.752 172.672-134.848 219.328-45.184 25.408-96 38.272-147.712 38.272-156.288 0-283.52-115.648-283.52-258.56 0-44.352 13.12-87.872 36.608-127.04 35.648-57.216 92.736-99.584 161.664-119.68 19.328-5.312 32.384-7.36 45.184-7.36 30.272 0 53.824 23.36 53.824 52.864a52.8 52.8 0 0 1-53.76 52.928c-2.176 0-6.592 0-11.904 2.048-46.4 13.76-82.944 40.32-103.424 74.176-14.016 22.208-20.48 46.72-20.48 72.128 0 83.84 78.72 152.448 175.616 152.448a197.76 197.76 0 0 0 94.784-24.256c50.752-28.608 80.832-76.224 80.832-128.192V296.192c0-89.984 50.752-172.608 134.848-219.328a283.52 283.52 0 0 1 146.752-39.36z"
                    fill="#333333"
                    p-id="3011"
                  ></path>
                </svg>
                <span @click="handleMini">{{ mini.data.title }}</span>
                <i
                  @click="
                    () => {
                      mini.data = '';
                      mini.changeData = '';
                      mini.submit = false;
                      contId = '';
                    }
                  "
                  class="el-icon-close"
                ></i>
              </div>
            </div>
            <div class="btns">
              <el-button size="small" class="btn-white" @click="handlePrev"
                >上一步</el-button
              >
              <el-button size="small" class="btn-blue" @click="handleCreateLiveCode">{{
                $route.query.id ? "更新" : "创建"
              }}</el-button>
            </div>
          </div>
        </div>
        <div class="btns fiexd" v-show="!form.scanCodeSwitch">
          <el-button size="small" class="btn-white" @click="handlePrev">上一步</el-button>
          <el-button size="small" class="btn-blue" @click="handleCreateLiveCode"
            >创建</el-button
          >
        </div>
      </div>
    </div>

    <!-- 选择素材 -->
    <el-dialog
      title="选择素材"
      :visible.sync="pickVisible"
      width="630px"
      :close-on-click-modal="false"
    >
      <div
        v-loading="contLoading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <div class="btns-top">
          <SelectTree
            v-if="!contLoading"
            :options="allContGroupList"
            :props="contProps"
            :accordion="false"
            :value="pickGroupId"
            @getValue="getPickGroupId"
          />
          <el-input
            style="width: 220px"
            size="small"
            placeholder="输入标题/内容进行搜索"
            v-model="contSearch"
            maxlength="50"
          >
          </el-input>
          <el-button
            size="small"
            class="btn-blue"
            @click="
              () => {
                ContentList();
              }
            "
            >查找</el-button
          >
          <el-button
            size="small"
            class="btn-white"
            @click="
              () => {
                contSearch = '';
                ContentList();
              }
            "
            >清空</el-button
          >
          <el-button
            v-show="type === 2"
            size="small"
            class="btn-blue"
            @click="
              () => {
                uploadVisible = true;
              }
            "
            >本地上传</el-button
          >
          <el-button
            v-show="type === 3"
            size="small"
            class="btn-blue"
            @click="
              () => {
                addTextImg = true;
                pickVisible = false;
              }
            "
            >新建</el-button
          >
          <el-button
            v-show="type != 2 && type != 3"
            size="small"
            class="btn-blue"
            @click="lookMaterial"
            >新建</el-button
          >
        </div>

        <div v-if="contType == 1" class="text-wrap">
          <span v-show="contList.length === 0" style="display: inline-block; margin: auto"
            >暂无数据</span
          >
          <div
            v-show="contList.length !== 0"
            @click="handlePickImg(item)"
            :ref="item.id"
            v-for="(item, index) in contList"
            :key="index"
          >
            <p class="content">{{ item.content }}</p>
          </div>
        </div>
        <div class="img-wrap" v-else>
          <span v-show="contList.length === 0" style="display: inline-block; margin: auto"
            >暂无数据</span
          >
          <div
            v-show="contList.length !== 0 && contType != 1"
            class="list"
            @click="handlePickImg(item)"
            :ref="item.id"
            v-for="(item, index) in contList"
            :key="index"
          >
            <img :src="type === 2 ? item.content : item.cover" class="pick-img" alt="" />
            <span class="bgc">{{ item.file_name }}</span>
          </div>
        </div>
        <div class="pagination" v-show="contTotal !== 0">
          <el-pagination
            @size-change="
              (limit) => {
                contLimit = limit;
                ContentList();
              }
            "
            @current-change="
              (page) => {
                contPage = page;
                ContentList();
              }
            "
            :current-page="contPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="contLimit"
            layout="total, prev, pager, next, jumper"
            :total="contTotal"
          >
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handlePickCancel"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handlePickConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 上传图片素材 -->
    <el-dialog
      title="上传图片素材"
      :visible.sync="uploadVisible"
      :close-on-click-modal="false"
      width="500px"
      :before-close="
        (done) => {
          uploadForm.uploadFile = '';
          done();
        }
      "
    >
      <el-form
        v-loading="uploading"
        style="margin-top: 20px"
        label-position="left"
        label-width="100px"
        ref="uploadForm"
        :model="uploadForm"
        :rules="uploadRules"
      >
        <el-form-item style="margin-bottom: 10px" label="上传图片" prop="uploadFile">
          <el-upload
            :class="hideUpload ? 'hide avatar-uploader' : 'avatar-uploader'"
            :action="uploadUrl"
            :data="uploadData"
            :show-file-list="false"
            :on-change="handleUploadChange"
            :on-remove="handleUploadRemove"
            :on-success="reqUploadSuccess"
            :before-upload="beforeImgUpload"
          >
            <img
              v-if="uploadForm.uploadFile"
              :src="uploadForm.uploadFile"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="font-size: 12px"
          >（图片大小不超过2M，支持JPG、JPEG及PNG格式）</el-form-item
        >
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handleUploadCancel"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="uploadSubmit">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 图文 -->
    <el-dialog
      title="新增文章"
      :visible.sync="addTextImg"
      width="1200px"
      @close="
        () => {
          $refs.formLabelAlign.resetFields();
          type = 3;
          contType = 3;
          pickVisible = true;
        }
      "
      :close-on-click-modal="false"
    >
      <el-form
        label-width="200px"
        :model="formLabelAlign"
        ref="formLabelAlign"
        :rules="linkRules"
        class="scroll"
      >
        <el-form-item label="选择分组">
          <SelectTree
            :options="groupOptions"
            :accordion="false"
            :value="formLabelAlign.content_group_id"
            @getValue="handleChange"
          />
        </el-form-item>
        <el-form-item
          label="标题"
          class="limitContent"
          prop="title"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        >
          <el-input
            size="small"
            placeholder="输入文章标题（请勿输入特殊字符）"
            v-model="formLabelAlign.title"
            maxlength="32"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item
          :label="'封面\n（建议尺寸200*200）'"
          prop="cover"
          :rules="[{ required: true, message: '请选择封面图片' }]"
        >
          <img
            v-if="formLabelAlign.cover"
            :src="formLabelAlign.cover"
            class="avatar"
            @click="
              () => {
                contType = 2;
                type = 2;
                reqGetContentGroupList();
                pickVisible = true;
              }
            "
          />
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            @click="
              () => {
                contType = 2;
                type = 2;
                reqGetContentGroupList();
                pickVisible = true;
              }
            "
          ></i>
        </el-form-item>

        <el-form-item
          class="limitContent"
          label="摘要（选填）"
          prop="summary"
          :rules="[{ required: true, message: '请输入文章摘要' }]"
        >
          <el-input
            size="small"
            type="textarea"
            resize="none"
            placeholder="请输入内容"
            v-model="formLabelAlign.summary"
            maxlength="128"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item class="limitContent" label="作者（选填）">
          <el-input
            size="small"
            v-model="formLabelAlign.user"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item class="limitContent" label="原文链接（选填）" prop="link">
          <el-input size="small" v-model="formLabelAlign.link"></el-input>
        </el-form-item>
        <el-form-item label="说明（选填）" class="limitContent">
          <el-input
            size="small"
            v-model="formLabelAlign.explain"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="正文"
          prop="content"
          :rules="[{ required: true, message: '请输编辑正文' }]"
        >
          <div class="content">
            <editor-bar
              v-model="formLabelAlign.content"
              :isClear="isClear"
              @change="edtiorContentChange"
            ></editor-bar>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handleLinkCancel"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleLinkConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 小程序 -->
    <el-dialog
      title="小程序"
      :visible.sync="proVisible"
      width="700px"
      :before-close="
        (done) => {
          $refs.miniForm.resetFields();
          done();
        }
      "
      :close-on-click-modal="false"
    >
      <el-form label-width="100px" :model="mini" ref="miniForm" :rules="miniRules">
        <el-form-item label="添加方式">
          <el-radio v-model="addType" label="new">新建</el-radio>
          <el-radio v-model="addType" label="import">导入</el-radio>
        </el-form-item>

        <el-form-item v-show="addType === 'new'" label="图片封面" prop="cover">
          <div
            class="plus-wrap"
            @click="
              () => {
                type = 2;
                pickVisible = true;
              }
            "
            v-show="!mini.cover"
          >
            <i class="el-icon-plus"></i>
          </div>
          <div
            class="plus-wrap"
            style="float: left; position: relative"
            v-show="mini.cover"
          >
            <img :src="mini.cover" alt="" />
            <el-button
              type="text"
              style="color: #6881ec; position: absolute; bottom: -14px; right: -70px"
              @click="
                () => {
                  type = 2;
                  pickVisible = true;
                }
              "
              >重新选择</el-button
            >
          </div>
        </el-form-item>
        <el-form-item v-show="addType === 'new'" label="填写标题" prop="title">
          <el-input maxlength="30" show-word-limit v-model="mini.title"></el-input>
        </el-form-item>
        <el-form-item v-show="addType === 'new'" label="AppID" prop="appid">
          <el-input
            placeholder="请填写小程序AppID，必须是关联到企业的小程序应用"
            v-model="mini.appid"
          >
          </el-input>
        </el-form-item>
        <el-form-item v-show="addType === 'new'" label="Page路径" prop="pagePath">
          <el-input
            placeholder="请填写小程序路径,例如pages/index/index"
            v-model="mini.pagePath"
          ></el-input>
        </el-form-item>
        <el-form-item v-show="addType === 'new'" label="素材同步" required>
          <el-radio v-model="mini.source" :label="1">素材库</el-radio>
          <el-radio v-model="mini.source" :label="2">同步至资料包</el-radio>
          <SelectTree
            v-show="mini.source === 1"
            v-if="!contLoading"
            :options="contGroupList"
            :props="contProps"
            :accordion="false"
            :value="contGroupId"
            @getValue="getContGroupId"
          />
        </el-form-item>
        <el-form-item label="图文" v-show="addType === 'import'">
          <div
            v-show="mini.changeData === ''"
            class="img-text"
            @click="
              () => {
                type = 6;
                pickVisible = true;
              }
            "
          >
            <i class="el-icon-plus"></i>
          </div>
          <div
            v-show="mini.changeData !== ''"
            class="img-text"
            @click="
              () => {
                type = 6;
                pickVisible = true;
              }
            "
          >
            <i class="el-icon-success success"></i>
            <span class="desc">已选择一条小程序</span>
            <span class="edit">修改</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handleMiniCancel"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleMiniConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <Material :materialVisible="materialVisible" @closepop="closepop" :types="types" />
  </div>
</template>

<script>
import Material from "@/components/Material.vue";

import {
  reqGetLiveCodeGroupList,
  reqGetCustomTree,
  reqAddCustomLabel,
  reqGetSoloStaff,
  reqGetManyStaff,
  reqGetDepartmentList,
  reqAddLiveQr,
  reqGetContentGroupList,
  ContentList,
  Upload,
  uploadUrl,
  ContentAdd,
  reqShowLive,
  reqGetMediaId,
} from "@/api/index";
import SelectTree from "@/components/SelectTree";
import md5 from "js-md5";
import EditorBar from "@/components/wangwangEditor/wangwangEditor";

export default {
  name: "AddCode",
  components: {
    SelectTree,
    Material,
    EditorBar,
  },
  data() {
    var url = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("跳转链接不能为空"));
      } else if (value.match(/(http|https):\/\/\S*/gi)) {
        return callback();
      } else {
        return callback(
          new Error("请检查跳转链接格式是否正确（以http://或者https://开头）")
        );
      }
    };
    return {
      tool: [
        {
          text: "bibi标签",
          type: "tag",
        },
      ],
      addTextImg: false,
      isClear: false,
      formLabelAlign: {
        content_group_id: "",
        summary: "",
        cover: "",
        content: "",
        user: "",
        link: "",
        wx_cover: "",
        title: "",
        explain: "",
        source: "",
        file_name: "",
      },
      types: "",
      materialVisible: false,
      pickVisible: false,
      uploadVisible: false,
      imgVisible: false,
      proVisible: false,
      disabledName: false,
      active: 1,
      loading: true,
      AddSwitch: false, // 是否设置员工添加上限
      textarea: "",
      radio: 1,
      form: {
        name: "",
        liveCodeId: "",
        groupId: "", //分组ID
        liveCodeName: "", //活码名称
        switchValue: true,
        staff: "",
        scanCodeSwitch: true, // 是否推送
      },
      label: {
        labelGroupName: "", //新增标签组名称
        labelValue: "", //添加标签的所有名称字符
        loading: false,
        labelGroupId: "", //标签组id
        visible: false,
        groupName: "",
        title: "",
      },
      labelRules: {
        labelValue: [
          {
            required: true,
            message: "请输入标签名称",
            trigger: "blur",
          },
        ],
        labelGroupName: [
          {
            required: true,
            message: "请输入标签组名称",
            trigger: "blur",
          },
        ],
      },
      numList: [],
      pickDepartment: [],
      spare_staff_id: "",
      labelIdList: [],
      pickTreeNode: [],
      groupOptions: [],
      options: [],
      defaultProps: {
        children: "group",
        label: "name",
      },
      staffNumber: 0,
      staffCheckList: [],
      customLabelList: [],
      customLabelListLength: 0,
      endIndex: 3,
      fucusIndex: 0,
      text: "",
      oldText: "",
      staff: {
        checked: false,
        page: 1,
        soloData: [],
        manyData: [],
        loading: false,
        visibleMany: false,
        visibleSolo: false,
        manyIn: false,
        search: "",
        props: {
          label: "name",
          children: "group",
        },
        soloName: "",
      },
      pickStaff: "",
      pickStaffList: [],
      onePickList: [],
      pickStaffObj: "",
      departmentList: [],
      departmentValue: "",
      textLength: 0,
      contGroupList: [],
      allContGroupList: [],
      contList: [],
      hideUpload: false,
      contPage: 1,
      contLimit: 8,
      contLoading: false,
      contGroupId: "",
      pickGroupId: "",
      contTotal: 0,
      contSearch: "",
      contType: "",
      uploading: false,
      uploadType: 2,
      nowOperation: "",
      addType: Boolean(this.$route.query.id) ? "import" : "new",
      uploadUrl: "",
      contProps: {
        children: "son",
        label: "name",
      },
      uploadForm: {
        source: 1,
        uploadFile: "",
      },
      uploadRules: {
        uploadFile: [
          {
            required: true,
            message: "请选择图片",
            trigger: "change",
          },
        ],
      },
      image: {
        data: "",
        submit: false,
      },
      link: {
        cover: "",
        title: "",
        summary: "",
        source: 1,
        link: "",
        data: "",
        changeData: "",
        submit: false,
      },
      linkRules: {
        cover: [
          {
            required: true,
            message: "请选择封面图",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        link: [
          {
            validator: url,
            trigger: "blur",
            required: true,
          },
        ],
        summary: [
          {
            trigger: "blur",
          },
        ],
      },
      href: {
        cover: "",
        title: "",
        appid: "",
        pagePath: "",
        source: 1,
        data: {},
        changeData: "",
        submit: false,
      },
      mini: {
        cover: "",
        title: "",
        appid: "",
        pagePath: "",
        source: 1,
        data: {},
        changeData: "",
        submit: false,
        media_id: "",
      },
      texts: {
        cover: "",
        title: "",
        appid: "",
        pagePath: "",
        source: 1,
        data: "",
        changeData: "",
        submit: false,
      },
      miniRules: {
        cover: [
          {
            required: true,
            message: "请选择封面图",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        appid: [
          {
            required: true,
            message: "请输入小程序AppID",
            trigger: "blur",
          },
        ],
        pagePath: [
          {
            required: true,
            message: "请输入小程序路径",
            trigger: "blur",
          },
        ],
      },
      uploadData: {},
      uplSucInfo: "",
      pickLiveCodeData: "",
      pickData: "",
      type: 2,
      contId: "",
      filterText: "",
    };
  },
  watch: {
    $route(to, from) {
      if (from.name === "AddCode" && to.name == "CodeManage") {
        this.$destroy();
      }
    },
    pickData(val) {
      if (!val) {
        this.contList.forEach((item) => {
          this.$refs[item.id][0].classList.remove("l-active");
        });
      }
    },
    staff: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.staff.soloData.forEach((item) => {
          if (val.soloValue === item.user_id) {
            this.staff.soloName = item.name;
          }
        });
      },
      deep: true,
    },
    pickVisible(val) {
      if (val) {
        this.getContentData();
      }
    },
    // 切换添加方式
    addType(val) {
      if (this.contType === 3) {
        this.$refs["linkForm"].resetFields();
        this.link.cover = "";
        this.link.title = "";
        this.link.summary = "";
        this.link.source = 1;
        this.link.link = "";
        this.link.changeData = "";
      } else if (this.contType === 6) {
        this.$refs["miniForm"].resetFields();
        this.mini.cover = "";
        this.mini.title = "";
        this.mini.appid = "";
        this.mini.source = 1;
        this.mini.pagePath = "";
        this.mini.changeData = "";
      }
      this.contId = "";
    },
    contLoading(val) {
      if (val) {
        this.$nextTick(() => {
          this.contList.forEach((item) => {
            if (item.id === this.contId) {
              this.$refs[item.id][0].classList.add("l-active");
            } else {
              this.$refs[item.id][0].classList.remove("l-active");
            }
          });
        });
      }
    },
    uploadForm: {
      handler(val, oldVal) {
        this.$refs.uploadForm.validateField("uploadFile");
      },
      deep: true,
    },
    radio() {
      if (!Boolean(this.$route.query.id)) {
        this.pickDepartment = [];
        this.pickStaffList = [];
        this.departmentValue = [];
        this.onePickList = [];
        this.staffCheckList = [];
        this.numList = [];
        this.pickStaff = "";
        this.AddSwitch = false;
      }
    },
    text(val) {
      this.$refs["input-text"].innerHTML = val;
    },
    pickGroupId() {
      this.ContentList();
    },
    numList: {
      handler(val) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].num <= 0 || val[i].num === "") {
            val[i].num = 1;
          } else if (val[i].num >= 500) {
            val[i].num = 500;
          }
        }
      },
      deep: true,
    },
    filterText(val) {
      this.$refs.tree.filter(val);
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
    this.form.groupId = this.$route.query.groupId;
    this.getInit();
  },
  created() {
    // console.log(1111)
    // this.$bus.$on("bus", (res) => {
    //   console.log('回来啦')
    // });
  },
  methods: {
    addTag(e, a) {
      // console.log(e)
    },
    chooseImg() {
      this.pickVisible = true;
    },
    edtiorContentChange(val) {
      this.formLabelAlign.content = val;
    },
    handleChange(e) {
      this.formLabelAlign.content_group_id = e;
    },
    getInit() {
      let time = parseInt(new Date().getTime() / 1000);
      let user_id = localStorage.getItem("user_id") || "";
      let token = localStorage.getItem("token") || "";
      let sign = md5(user_id + token + time + md5("shenlanguoshiphoto"));
      this.uploadData.time = time;
      this.uploadData.user_id = user_id;
      this.uploadData.token = token;
      this.uploadData.sign = sign;
      this.uploadData.type = 2;
      this.uploadUrl = uploadUrl;
      let oDiv = this.$refs["custom-textarea"];
      let oText = this.$refs["input-text"];
      let oP = [];
      oP[0] = reqGetLiveCodeGroupList({});
      oP[1] = reqGetCustomTree({});
      oP[2] = reqGetSoloStaff({
        page: this.staff.page,
        limit: 10000,
      });
      oP[3] = reqGetManyStaff({});
      oP[4] = reqGetDepartmentList({});
      Promise.all(oP).then((values) => {
        this.loading = false;
        if (values[0].code === 200) {
          this.groupOptions = values[0].data;
        } else {
          this.groupOptions = [];
        }
        if (values[1].code === 200) {
          this.customLabelList = values[1].data;
          this.customLabelListLength = values[1].data.length;
        } else {
          this.customLabelList = [];
          this.customLabelListLength = 0;
        }
        if (values[2].code === 200) {
          this.staff.soloData = values[2].data;
        } else {
          this.staff.soloData = [];
        }
        if (values[3].code === 200) {
          this.staff.manyData = values[3].data;
        } else {
          this.staff.manyData = [];
        }
        if (values[4].code === 200) {
          this.departmentList = values[4].data;
        } else {
          this.departmentList = [];
        }
        if (this.$route.query.id) {
          this.form.liveCodeId = this.$route.query.id;
          this.getEditInfo(this.$route.query.id);
        }
        console.log(this.form.liveCodeId);
      });
    },
    // 获取编辑回显
    async getEditInfo(id) {
      this.loading = true;
      let res = await reqShowLive({
        id,
      });
      if (res.code === 200) {
        this.loading = false;
        let data = JSON.parse(JSON.stringify(res.data));
        this.form.groupId = data.group_id;
        this.form.liveCodeName = data.name;
        if (data.tag_name.length !== 0) {
          this.labelIdList = data.tag_ids.split(",");
          this.labelIdList.forEach((item) => {
            this.$nextTick(() => {
              this.$refs[item][0].$el.classList.add("btn-blue");
            });
          });
        }
        if (data.code_type === "多人") {
          this.radio = 2;
        } else if (data.code_type === "单人") {
          this.radio = 1;
        }
        if (data.add_limit) {
          this.numList = data.add_limit;
        }
        if (data.is_add_friends === 1) {
          this.form.switchValue = true;
        } else if (data.is_add_friends === 0) {
          this.form.switchValue = false;
        }
        if (data.wxk_department_id) {
          this.pickDepartment = [];
          data.wxk_department_id.split(",").forEach((item) => {
            this.departmentList.forEach((res) => {
              if (item == res.code) {
                this.pickDepartment.push(res);
              }
            });
          });
        }
        if (data.wxk_staff_id) {
          this.pickStaffList = [];
          this.staffCheckList = [];
          data.wxk_staff_id.split(",").forEach((item) => {
            this.staff.soloData.forEach((res) => {
              if (item == res.user_id) {
                this.pickStaffList.push(res);
                this.staffCheckList.push(res);
              }
            });
          });
        }
        if (data.is_add_limit === 1) {
          this.AddSwitch = true;
        } else if (data.is_add_limit === 0) {
          this.AddSwitch = false;
        }
        this.spare_staff_id = data.spare_staff_id;
        this.form.scanCodeSwitch = Boolean(data.is_welcome_msg);
        if (data.is_welcome_msg === 1) {
          let oDiv = this.$refs["custom-textarea"];
          let oText = this.$refs["input-text"];
          let str = `<span contenteditable="false" class="custom-span">客户名称</span>`;
          let welcome_data = data.welcome_data;
          if (welcome_data.text) {
            oDiv.innerHTML = welcome_data.text.content.split("{name}").join(str);
            oText.innerHTML = oDiv.innerHTML;
            this.textLength = oDiv.textContent.length;
            this.text = oDiv.innerHTML;
          }
          console.log(welcome_data);

          if (welcome_data.link) {
            this.contType = 3;
            this.link.data = welcome_data.link;
            this.link.data.cover = welcome_data.link.picurl;
            this.link.data.link = welcome_data.link.url;
            this.link.data.summary = welcome_data.link.desc;
            this.link.submit = true;
          } else if (welcome_data.image) {
            this.contType = 2;
            this.image.data = welcome_data.image;
            this.image.data.content = welcome_data.image.pic_url;
            this.image.submit = true;
            this.reqGetMediaId(welcome_data.image.media_id);
          } else if (welcome_data.miniprogram) {
            console.log(welcome_data.miniprogram);
            this.contType = 6;
            this.mini.submit = true;
            // pic_media_id: this.mini.data.media_id,
            //   appid: this.mini.data.applets_id,
            //   page: this.mini.data.applets_path,
            // this.mini.data = welcome_data.miniprogram;
            this.mini.data.media_id = welcome_data.miniprogram.pic_media_id;
            this.mini.data.applets_id = welcome_data.miniprogram.appid;
            this.mini.data.applets_path = welcome_data.miniprogram.page;
            this.mini.data.title = welcome_data.miniprogram.title;
            this.reqGetMediaId(welcome_data.miniprogram.pic_media_id);
          }
          //  else if (welcome_data.texts) {
          //   this.contType = 1;
          //   this.texts.submit = true;
          //   this.reqGetMediaId(welcome_data.texts.content);
          // } else if (welcome_data.href) {
          //   this.contType = 8;
          //   this.texts.submit = true;
          //   this.reqGetMediaId(welcome_data.href.pic_media_id);
          // }
          // console.log(this.contType);
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    async reqGetMediaId(media_id) {
      // let res = await reqGetMediaId({
      //   media_id,
      // });
      // console.log(res)
      // if (res.code === 200) {
      if (this.contType === 6) {
        let res = await reqGetMediaId({
          type: 6,
          media_id,
        });
        if (res.code == 200) {
          this.mini.data.cover = res.data.cover;
          this.mini.submit = true;
          console.log(this.mini.data);
        }
      } else if (this.contType === 2) {
        let res = await reqGetMediaId({
          type: 2,
          media_id,
        });
        if (res.code == 200) {
          this.contId = res.data.id;
        }
      }
      // } else {
      //   this.$message.error(res.msg);
      // }
    },
    // 获取分组列表
    async reqGetLiveCodeGroupList() {
      let res = await reqGetLiveCodeGroupList({});
      if (res.code === 200) {
        this.groupOptions = res.data;
      } else {
        this.groupOptions = [];
      }
    },
    //  获取客户标签树结构
    async reqGetCustomTree() {
      this.label.loading = true;
      let res = await reqGetCustomTree({});
      this.label.loading = false;
      if (res.code === 200) {
        this.customLabelList = res.data;
        this.customLabelListLength = res.data.length;
      } else {
        this.customLabelList = [];
        this.customLabelListLength = 0;
      }
    },
    // 新增客户标签
    async reqAddCustomLabel(option) {
      let res = await reqAddCustomLabel(option);
      if (res.code === 200) {
        this.reqGetCustomTree();
        this.label.visible = false;
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },

    // 获取单人成员列表
    async reqGetSoloStaff() {
      let res = await reqGetSoloStaff({
        page: this.staff.page,
        limit: 1000,
      });
      if (res.code === 200) {
        this.staff.soloData = res.data;
      } else {
        this.staff.soloData = [];
      }
    },
    // 获取多人成员列表
    async reqGetManyStaff() {
      let res = await reqGetManyStaff({});
      if (res.code === 200) {
        this.staff.manyData = res.data;
      } else {
        this.staff.manyData = [];
      }
    },
    delText() {
      this.texts.data = "";
      this.texts.changeData = "";
      this.texts.submit = false;
      this.contId = "";
      let oDiv = this.$refs["custom-textarea"];
      this.text = oDiv.innerHTML = "";
      this.textLength = oDiv.textContent.length;
    },
    // 获取部门列表
    async reqGetDepartmentList() {
      let res = await reqGetDepartmentList({});
      if (res.code === 200) {
        this.departmentList = res.data;
      } else {
        this.departmentList = [];
      }
    },
    // 新增编辑活码
    async reqAddLiveQr(option) {
      let res = await reqAddLiveQr(option);
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.$router.push("/live_code/manage");
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取素材分组列表
    async reqGetContentGroupList() {
      this.contLoading = true;
      let res = await reqGetContentGroupList({});
      if (res.code === 200) {
        this.contGroupList = JSON.parse(JSON.stringify(res.data.data));
        this.allContGroupList = JSON.parse(JSON.stringify(res.data.data));
        this.allContGroupList.unshift({
          id: "",
          name: "所有",
        });
        this.pickGroupId = "";
        this.contGroupId = JSON.parse(JSON.stringify(res.data.data))[0].id;
      } else {
        this.contGroupList = [];
        this.allContGroupList = [];
        this.pickGroupId = "";
        this.contGroupId = "";
      }
      this.contLoading = false;
    },

    // 获取内容列表
    async ContentList(params = false) {
      let res = await ContentList({
        type: this.type,
        content_group_id: this.pickGroupId,
        search_name: this.contSearch,
        page: this.contPage,
        limit: this.contLimit,
      });
      if (res.code == 200) {
        this.contList = res.data.data;
        if (params) {
          this.contId = res.data.data[0].id;
        }
        this.$nextTick(() => {
          this.contList.forEach((item) => {
            if (item.id === this.contId) {
              this.$refs[item.id][0].classList.add("l-active");
            } else {
              this.$refs[item.id][0].classList.remove("l-active");
            }
          });
        });
      } else {
        this.contList = [];
      }
    },

    //  添加内容
    async ContentAdd(option, flag = false) {
      this.uploading = true;
      let res = await ContentAdd(option);
      this.uploading = false;
      // console.log(res)
      if (res.code === 200) {
        this.contId = "";
        this.uploadVisible = false;
        this.ContentList(true);

        // this.pickVisible = false;
        // if (this.contType === 2) {
        //   this.image.data = this.uplSucInfo;
        //   this.image.submit = true;
        // } else if (this.contType === 3) {
        //   if (flag) {
        //     this.imgVisible = false;
        //     this.link.submit = true;
        //   } else {
        //     this.link.data = this.uplSucInfo;
        //     this.link.cover = this.uplSucInfo.content;
        //   }
        // } else if (this.contType === 6) {
        //   if (flag) {
        //     this.proVisible = false;
        //     this.mini.submit = true;
        //   } else {
        //     this.mini.data = this.uplSucInfo;
        //     this.mini.cover = this.uplSucInfo.content;
        //   }
        // }
      } else {
        this.$message.error(res.msg);
      }
    },
    // 多人选择成员搜索
    filterNode(value, data) {
      // console.log(value, data);
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //  选择多名企业成员弹窗关闭事件
    pickManyBeforeClose(done) {
      done();
      this.staffCheckList = JSON.parse(JSON.stringify(this.pickStaffList));
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes([]);
      });
    },
    // 选择多名企业成员弹窗取消事件
    handlePickManyCancel() {
      this.staff.manyIn = false;
    },
    // 选择多名企业成员弹窗确定事件
    handlePickManyConfirm() {
      this.onePickList = JSON.parse(JSON.stringify(this.staffCheckList));
      this.staff.manyIn = false;
    },
    // 选择多人企业成员
    pickManyStaff() {
      this.staff.manyIn = true;
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.staffCheckList);
      });
    },
    // 添加多人确定按钮
    addManyConfirm() {
      if (this.departmentValue.length !== 0 || this.staffCheckList.length !== 0) {
        this.pickDepartment = [];
        this.departmentList.forEach((item) => {
          this.departmentValue.forEach((res) => {
            if (item.code == res) {
              this.pickDepartment.push(item);
            }
          });
        });
        this.pickStaffList = this.onePickList;
        if (this.pickStaffList.length === 0) {
          this.AddSwitch = false;
        }
        this.staff.visibleMany = false;
      } else {
        this.$message.warning("请选择部门或者企业成员！");
      }
    },
    // 员工添加上限开发
    changeAddswitch(val) {
      if (this.radio === 1) {
        if (this.pickStaffList.length !== 0) {
          this.numList = [];
          this.pickStaffList.map((item, index) => {
            this.numList.push({
              name: item.name,
              user_id: item.user_id,
              num: 100,
            });
          });
          this.AddSwitch = val;
        } else {
          this.AddSwitch = false;
          this.$message.warning("请先选择成员");
        }
      } else if (this.radio === 2) {
        if (this.pickStaffList.length !== 0) {
          this.numList = [];
          this.pickStaffList.map((item, index) => {
            this.numList.push({
              name: item.name,
              user_id: item.user_id,
              num: 100,
            });
          });
          this.AddSwitch = val;
        } else {
          if (this.pickDepartment.length !== 0) {
            this.$message.warning("因受官方限制，无法对动态部门的员工设置添加好友上限");
          } else {
            this.$message.warning("请先选择成员");
          }
          this.AddSwitch = false;
        }
      }
    },
    // 选择素材取消事件
    handlePickCancel() {
      this.pickVisible = false;
      this.pickData = "";
      this.contList.forEach((item) => {
        if (item.id === this.contId) {
          this.$refs[item.id][0].classList.add("l-active");
        } else {
          this.$refs[item.id][0].classList.remove("l-active");
        }
      });
    },
    // 选择素材确定事件
    handlePickConfirm() {
      if (this.pickData.id) {
        this.contId = this.pickData.id;
      }
      if (this.contId) {
        this.contList.forEach((item) => {
          if (item.id === this.contId) {
            if (this.contType === 2) {
              if (this.addTextImg == true) {
                this.formLabelAlign.cover = item.content;
                this.formLabelAlign.file_name = item.file_name;
                this.type = 3;
              } else {
                this.image.data = item;
                this.image.submit = true;
              }
            } else if (this.contType === 3) {
              this.link.changeData = item;
              this.link.data = this.link.changeData;
              this.imgVisible = false;
              this.link.submit = true;
            } else if (this.contType === 6) {
              // console.log(item);
              this.mini.changeData = item;
              this.mini.submit = true;
              this.mini.data = this.mini.changeData;
            } else if (this.contType === 1) {
              let oDiv = this.$refs["custom-textarea"];
              this.text = oDiv.innerHTML = item.content = item.content;
              this.textLength = oDiv.textContent.length;
              this.texts.changeData = item;
              this.texts.submit = true;
              this.texts.data = this.texts.changeData;
            } else if (this.contType === 8) {
              this.href.changeData = item;
              this.href.submit = true;
              this.href.data = this.href.changeData;
            }
          }
        });
        this.pickVisible = false;
      } else {
        this.$message.warning("请选择素材！");
      }
    },
    // 图文确定添加
    handleLinkConfirm() {
      this.contType = 3;
      this.$refs["formLabelAlign"].validate(async (valid) => {
        if (valid) {
          let arr = [];
          arr.push({
            content_group_id: this.formLabelAlign.content_group_id,
            type: "3",
            user: this.formLabelAlign.user,
            title: this.formLabelAlign.title,
            content: this.formLabelAlign.content,
            cover: this.formLabelAlign.cover,
            wx_cover: this.formLabelAlign.wx_cover,
            summary: this.formLabelAlign.summary,
            link: this.formLabelAlign.link,
            explain: this.formLabelAlign.explain,
            user_id: localStorage.getItem("phone"),
            source: 1,
            file_name: this.formLabelAlign.file_name,
          });
          let res = await ContentAdd({
            arr: arr,
          });
          if (res.code == "200") {
            this.addTextImg = false;
            this.reqGetContentGroupList();
            // this.pickVisible = true;
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // 图文添加取消
    handleLinkCancel() {
      this.$refs["formLabelAlign"].resetFields();
      // this.link.changeData = "";
      this.addTextImg = false;
    },

    // 小程序确定添加
    handleMiniConfirm() {
      this.contType = 6;
      if (this.addType === "new") {
        this.$refs["miniForm"].validate((valid) => {
          if (valid) {
            let option = {};
            let obj = {};
            obj.type = 6;
            obj.user = localStorage.getItem("phone") || "";
            obj.title = this.mini.title;
            this.mini.data.title = this.mini.title;
            this.mini.data.cover = this.mini.data.content;
            obj.content = this.mini.data.content;
            obj.cover = this.mini.cover;
            obj.media_id = this.mini.data.media_id;
            obj.created_at = this.mini.data.created_at;
            obj.source = this.mini.data.source;
            obj.applets_id = this.mini.appid;
            obj.applets_path = this.mini.pagePath;
            obj.content_group_id = this.contGroupId;
            this.mini.data.applets_id = this.mini.appid;
            this.mini.data.applets_path = this.mini.pagePath;
            option.arr = [];
            option.arr.push(obj);
            this.ContentAdd(option, true);
          }
        });
      } else if (this.addType === "import") {
        if (this.mini.changeData) {
          this.proVisible = false;
          this.mini.submit = true;
          this.mini.data = this.mini.changeData;
        } else {
          this.$message.warning("请选择小程序！");
        }
      }
    },
    // 小程序取消添加
    handleMiniCancel() {
      this.$refs["miniForm"].resetFields();
      this.mini.changeData = "";
      this.proVisible = false;
    },
    // 获取内容分组ID
    getContGroupId(id) {
      this.contGroupId = id;
    },
    getPickGroupId(id) {
      this.pickGroupId = id;
    },
    // 选择图片限制
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpg";
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 <= 2;
      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error("上传图片只能是 JPG、JPEG、PNG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG && isLt2M) || (isLt2M && isJPEG) || (isLt2M && isPNG);
    },
    // 提交上传
    uploadSubmit() {
      this.$refs["uploadForm"].validate((valid) => {
        if (valid) {
          this.uplSucInfo.type = 2;
          this.uplSucInfo.user = localStorage.getItem("phone");
          this.uplSucInfo.source = this.uploadForm.source;
          this.ContentAdd({
            arr: [this.uplSucInfo],
          });
        }
      });
    },
    // 上传完成回调
    reqUploadSuccess(res, file) {
      this.uploadForm.uploadFile = URL.createObjectURL(file.raw);
      this.uplSucInfo = res.data;
    },
    // 选择素材
    handlePickImg(data) {
      this.contList.forEach((item) => {
        this.$refs[item.id][0].classList.remove("l-active");
      });
      this.$refs[data.id][0].classList.add("l-active");
      this.pickData = data;
    },
    // 取消上传
    handleUploadCancel() {
      this.uploadForm.uploadFile = "";
      this.uploadVisible = false;
      this.$refs.uploadForm.resetFields();
    },
    // 上传内容变化触发
    handleUploadChange(file, fileList) {
      this.hideUpload = fileList.length >= 1;
    },
    // 上传内容删除
    handleUploadRemove(file, fileList) {
      this.uploadForm.uploadFile = "";
      this.hideUpload = fileList.length >= 1;
    },
    // 获取素材相关数据
    getContentData() {
      this.contLoading = true;
      let oP = [];
      oP[0] = reqGetContentGroupList({});
      oP[1] = ContentList({
        search_name: "",
        type: this.type,
        content_group_id: "",
        page: this.contPage,
        limit: this.contLimit,
      });
      Promise.all(oP).then((values) => {
        this.contLoading = false;
        if (values[0].code === 200) {
          if (values[0].data.data.length !== 0) {
            this.contGroupList = JSON.parse(JSON.stringify(values[0].data.data));
            this.allContGroupList = JSON.parse(JSON.stringify(values[0].data.data));
            this.allContGroupList.unshift({
              id: "",
              name: "所有",
            });
            this.contGroupId = JSON.parse(JSON.stringify(values[0].data.data))[0].id;
            this.pickGroupId = "";
          }
        } else {
          this.$message.error(values[0].msg);
          this.contGroupList = [];
          this.allContGroupList = [];
          this.contGroupId = "";
          this.pickGroupId = "";
        }
        if (values[1].code === 200) {
          this.contTotal = values[1].data.total;
          this.contList = values[1].data.data;
          this.$nextTick(() => {
            // console.log(this.contList);
            this.contList.forEach((item) => {
              if (item.id === this.contId) {
                // console.log(this.$refs[item.id])
                this.$refs[item.id][0].classList.add("l-active");
              } else {
                this.$refs[item.id][0].classList.remove("l-active");
              }
            });
          });
        } else {
          this.$message.error(values[1].msg);
          this.contList = [];
          this.contTotal = 0;
        }
      });
    },
    //  创建活码
    handleCreateLiveCode() {
      let is_add_friends = "";
      let is_welcome_msg = "";
      let is_add_limit = "";
      let tag_ids = "";
      let content = "";
      let ele = document.getElementById("textarea");
      let str = `<span contenteditable="false" class="custom-span">客户名称</span>`;
      let image = {};
      let link = {};
      let miniprogram = {};
      let welcome_data = {};
      let add_limit = [];
      let wxk_staff_id = "";

      if (this.radio === 1 && this.AddSwitch) {
        add_limit = [];
        let obj = {};
        obj.user_id = this.pickStaffList[0].user_id;
        obj.num = this.numList[0].num;
        add_limit.push(obj);
      } else if (this.radio === 2 && this.AddSwitch) {
        if (this.numList.length !== 0) {
          add_limit = [];
          this.numList.forEach((item) => {
            let obj = {};
            obj.user_id = item.user_id;
            obj.num = item.num;
            add_limit.push(obj);
          });
        }
      }
      content = this.text.split(str).join("{name}");
      // console.log(content)
      if (this.form.switchValue) {
        is_add_friends = 1;
      } else {
        is_add_friends = 0;
      }
      if (this.AddSwitch) {
        is_add_limit = 1;
      } else {
        is_add_limit = 0;
      }
      if (this.labelIdList.length !== 0) {
        tag_ids = this.labelIdList.join(",");
      }
      let option = {
        group_id: this.form.groupId, //分组id
        name: this.form.liveCodeName, // 活码名称
        is_add_friends, //是否自动添加好友(1-是 0-否)
        is_add_limit,
        tag_ids, // 客户标签ID，可多个逗号分隔
        code_type: this.radio, // 活码成员类型（1-单人 2-多人 ）
        is_welcome_msg, // 是否开启扫码推送欢迎语（1-是 0-否 ）
      };
      if (this.form.scanCodeSwitch) {
        is_welcome_msg = 1;
      } else {
        is_welcome_msg = 0;
      }

      if (is_add_limit === 1) {
        option.spare_staff_id = this.spare_staff_id;
      }
      if (this.AddSwitch) {
        option.add_limit = add_limit;
        option.spare_staff_id = this.spare_staff_id;
      }
      if (this.radio == 1) {
        option.wxk_staff_id = this.pickStaffList[0].user_id;
      } else if (this.radio == 2 && this.pickStaffList.length !== 0) {
        let userId = [];
        this.pickStaffList.map((item) => {
          userId.push(item.user_id);
        });
        option.wxk_staff_id = userId.join(",");
      }
      if (this.$route.query.id) {
        option.id = this.$route.query.id;
        // option.id = this.form.liveCodeId;
      }
      if (this.pickDepartment.length !== 0) {
        let wxk_department_id = [];
        this.pickDepartment.forEach((item) => {
          wxk_department_id.push(item.code);
        });
        option.wxk_department_id = wxk_department_id.join(",");
      }

      if (this.form.scanCodeSwitch) {
        if (
          content ||
          this.image.submit ||
          this.link.submit ||
          this.mini.submit ||
          this.texts.submit ||
          this.href.submit
        ) {
          if (content) {
            content = content
              .split("<div>")
              .join("<br>")
              .split("</div>")
              .join("")
              .split("<p>")
              .join("<br>")
              .split("</p>")
              .join("");
            welcome_data.text = {};
            welcome_data.text.content = content;
          }
          console.log(this.image.submit);
          console.log(this.link.submit);
          console.log(this.href.submit);
          console.log(this.mini.submit);
          if (this.image.submit) {
            welcome_data.image = {
              media_id: this.image.data.media_id,
              pic_url: this.image.data.content,
            };
          } else if (this.link.submit) {
            welcome_data.link = {
              title: this.link.data.title,
              picurl: this.link.data.cover,
              desc: this.link.data.explain,
              url: this.link.data.link
                ? this.link.data.link
                : this.baseURL +
                  "/article-preview/index.html?id=" +
                  this.link.data.id +
                  "&type=1",
              // url:
            };
          } else if (this.mini.submit) {
            console.log(this.mini.data);

            welcome_data.miniprogram = {
              title: this.mini.data.title,
              pic_media_id: this.mini.data.media_id,
              appid: this.mini.data.applets_id,
              page: this.mini.data.applets_path,
            };
          } else if (this.href.submit) {
            welcome_data.link = {
              title: this.href.data.title,
              picurl: this.href.data.cover,
              desc: this.href.data.summary,
              url: this.href.data.link,
            };
          }
          option.is_welcome_msg = is_welcome_msg;
          option.welcome_data = welcome_data;
          this.reqAddLiveQr(option);
        } else {
          this.$message.warning("最少推送一种类型");
        }
      } else {
        option.is_welcome_msg = is_welcome_msg;
        this.reqAddLiveQr(option);
      }
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
    // 获取选择分组
    getSelectTreeValue(groupId) {
      this.form.groupId = groupId;
    },
    // 返回活码管理
    handleBack() {
      this.$router.push("/live_code/manage");
    },

    // 选择客户标签
    handlePickLabel(id) {
      let btnDom = this.$refs[id][0].$el;
      if (btnDom.classList.toggle("btn-blue")) {
        if (this.labelIdList.length < 20) {
          this.labelIdList.push(id);
        } else {
          btnDom.classList.remove("btn-blue");
          this.$message.warning("客户标签最多设置20个");
        }
      } else {
        this.labelIdList.splice(
          this.labelIdList.findIndex((item) => item.id === id),
          1
        );
      }
    },
    // 新增标签
    handleAddLabel(data) {
      this.label.labelGroupName = data.name;
      this.label.labelGroupId = data.id;
      this.label.visible = true;
      this.label.labelValue = "";
      this.label.title = "新增标签";
    },
    // 新增标签组
    handleAddLabelGroup() {
      this.label.title = "新增标签组";
      this.label.labelGroupName = "";
      this.label.labelValue = "";
      this.label.labelGroupId = "";
      this.label.visible = true;
    },
    // 确认新增标签/标签组
    handleSubmitLabel() {
      if (this.label.title === "新增标签") {
        this.$refs.labelForm1.validate((valid) => {
          if (valid) {
            let tag = [];
            let flag = true;
            tag = this.label.labelValue.split(" ");
            tag = tag.filter((res) => {
              return res != false;
            });
            flag = tag.every((res) => {
              return res.length <= 15;
            });
            if (flag) {
              tag.map((item, index) => {
                tag[index] = {
                  name: item,
                };
              });
              this.reqAddCustomLabel({
                group_id: this.label.labelGroupId,
                tag,
              });
            } else {
              this.$message.warning("每个标签最多15个字");
            }
          }
        });
      } else {
        this.$refs.labelForm2.validate((valid) => {
          if (valid) {
            let tag = [];
            let flag = true;
            tag = this.label.labelValue.split(" ");
            tag = tag.filter((res) => {
              return res != false;
            });
            flag = tag.every((res) => {
              return res.length <= 15;
            });
            if (flag) {
              tag.map((item, index) => {
                tag[index] = {
                  name: item,
                };
              });
              this.reqAddCustomLabel({
                group_name: this.label.labelGroupName,
                tag,
              });
            } else {
              this.$message.warning("每个标签最多15个字");
            }
          }
        });
      }
    },
    // 弹窗关闭之前
    dialogBeforeClose(done) {
      this.$refs["labelForm1"].resetFields();
      this.$refs["labelForm2"].resetFields();
      done();
    },
    // 下一步
    handleNext() {
      if (this.active === 1) {
        if (this.form.groupId === "") {
          this.$message.warning("请选择分组");
        } else if (this.form.liveCodeName === "") {
          this.$message.warning("请输入活码名称");
        } else {
          this.active = 2;
        }
      } else if (this.active === 2) {
        if (this.AddSwitch) {
          if (this.spare_staff_id) {
            if (this.radio === 1) {
              if (this.pickStaffList.length !== 0) {
                this.active = 3;
              } else {
                this.$message.warning("请添加企业成员！");
              }
            } else if (this.radio === 2) {
              if (this.pickStaffList.length !== 0 || this.pickDepartment.length !== 0) {
                this.active = 3;
              } else {
                this.$message.warning("请添加企业成员或部门！");
              }
            }
          } else {
            this.$message.warning("请选择备用员工");
          }
        } else {
          if (this.radio === 1) {
            if (this.pickStaffList.length !== 0) {
              this.active = 3;
            } else {
              this.$message.warning("请添加企业成员！");
            }
          } else if (this.radio === 2) {
            if (this.pickStaffList.length !== 0 || this.pickDepartment.length !== 0) {
              this.active = 3;
            } else {
              this.$message.warning("请添加企业成员或部门！");
            }
          }
        }
      }
    },
    // 上一步
    handlePrev() {
      this.active--;
    },
    //点击插入
    handleAddBtn() {
      let oDiv = this.$refs["custom-textarea"];
      oDiv.focus();
      let str = `<span contenteditable="false" class="custom-span">客户名称</span>`;
      if (1000 - this.textLength >= 4) {
        this.pasteHtmlAtCaret(str);
        this.text = oDiv.innerHTML;
        this.textLength = oDiv.textContent.length;
      }
    },
    // 插入客户名称
    pasteHtmlAtCaret(html) {
      var sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
    },
    po_Last_Div(obj) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        var range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    },
    // 监听输入框变化
    changeText(e) {
      let oDiv = this.$refs["custom-textarea"];
      this.text = oDiv.innerHTML;
      this.textLength = oDiv.textContent.length;
      if (this.textLength >= 1000) {
        this.textLength = 1000;
        this.text = oDiv.textContent.slice(0, this.textLength + 1);
        oDiv.innerHTML = this.text;
      }
    },
    handleEditPick() {
      if (this.radio === 1) {
        this.staff.visibleSolo = true;
      } else if (this.radio === 2) {
        this.staffCheckList = JSON.parse(JSON.stringify(this.pickStaffList));
        this.onePickList = JSON.parse(JSON.stringify(this.pickStaffList));
        this.departmentValue = [];
        this.pickDepartment.forEach((item) => {
          if (item.code) {
            this.departmentValue.push(item.code);
          }
        });
        this.staff.visibleMany = true;
      }
    },
    //点击快捷消息
    handleText() {
      this.text.cover = this.text.data.cover;
      this.text.summary = this.text.data.summary || "";
      this.text.title = this.text.data.title;
      this.text.link = this.text.data.link;
      this.text.changeData = this.text.data;
      this.imgVisible = true;
    },
    //点击跳转链接
    handleHref() {
      this.href.cover = this.href.data.cover;
      this.href.summary = this.href.data.summary || "";
      this.href.title = this.href.data.title;
      this.href.link = this.href.data.link;
      this.href.changeData = this.href.data;
      this.imgVisible = true;
    },
    // 点击图文
    handleLink() {
      this.link.cover = this.link.data.cover;
      this.link.summary = this.link.data.summary || "";
      this.link.title = this.link.data.title;
      this.link.link = this.link.data.link;
      this.link.changeData = this.link.data;
      this.imgVisible = true;
    },
    // 点击小程序
    handleMini() {
      this.contType = 6;
      this.reqGetContentGroupList();
      this.type = 6;
      this.pickVisible = true;
      // this.mini.changeData = this.mini.data;
      // this.mini.cover = this.mini.data.cover;
      // this.mini.title = this.mini.data.title;
      // this.mini.appid = this.mini.data.applets_id;
      // this.mini.pagePath = this.mini.data.applets_path;
      // this.mini.source = this.mini.data.source;
      // this.proVisible = true;
    },
    lookMaterial() {
      this.types = this.contType;
      if (this.types == 3) {
        this.pickVisible = false;
        this.$router.push({
          path: "/content/addgraphic",
          query: {
            path: this.$route.name,

            types: 1,
          },
        });
      } else {
        this.materialVisible = true;
      }
    },
    closepop() {
      // console.log(123456)
      this.materialVisible = false;
      this.types = "";
      this.getContentData();
    },
  },
};
</script>

<style lang="less" scoped>
.add-code {
  position: relative;
  width: 100%;
  height: calc(100vh - 140px);
  overflow: hidden;

  .table {
    max-height: 300px;
    overflow-y: auto;
  }

  /deep/.el-form-item {
    margin-bottom: 0 !important;
  }

  /deep/.el-form-item__error {
    padding: 0;
    position: relative;
  }

  /deep/.el-input__count {
    height: 0;
    top: 0;
    line-height: 33px;
  }

  /deep/.el-table td {
    padding: 0 !important;
  }

  /deep/ .el-table th {
    padding: 0 !important;
  }

  /deep/.el-table__header tr {
    line-height: 0 !important;
  }

  /deep/.el-form-item__error {
    position: relative;
  }

  .avatar-uploader .el-upload {
    border: 1px solid #b9c5e9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 1px solid #b9c5e9;
    border-radius: 6px;
    margin-bottom: 8px;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    margin-bottom: 8px;
  }

  .el-upload__tip {
    margin: 0;
    font-size: 12px;

    font-weight: 400;
    color: #999999;
    line-height: 17px;
  }

  .head {
    display: flex;
    align-items: center;
  }

  .steps {
    margin-top: 15px;
    width: 100%;
    display: flex;
    align-items: center;

    // > span {
    //   cursor: pointer;
    // }
    span + span {
      margin-left: 10px;
    }

    .circle {
      line-height: 30px;
      color: #fff;
      text-align: center;
      width: 30px;
      height: 30px;
      background-color: #e5ebfb;
      font-size: 20px;
      border-radius: 50%;
    }

    .text {
      font-size: 14px;
      color: #333;
      height: 20px !important;
      border: none;
    }

    .line {
      flex-grow: 1;
      height: 10px;
      background: #e5ebfb;
      border-radius: 5px;
    }

    .active {
      background: #6881ec;
    }
  }

  .main {
    position: absolute;
    top: 100px;
    left: 0;
    right: -5px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;

    .form {
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .el-form-item {
        margin: 0px !important;
      }

      /deep/.el-textarea__inner {
        font-size: 14px;
      }

      .last-text {
        display: inline-block;
        color: #f38b93;
      }

      .tabs-wrap {
        width: 80%;
        height: 300px;
        padding: 20px 10px 20px 20px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #b9c5e9;

        > .el-form {
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
        }
      }

      .info {
        width: calc(100% - 32px);
        padding: 15px;
        color: #333;
        font-size: 14px;
        line-height: 1.3;
        background: #fff7e6;
        border-radius: 6px;
        border: 1px solid #f5daa3;
        margin-bottom: 20px;
      }

      .switch {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 14px;

        span.label {
          width: 180px;
        }
      }

      .phone-main {
        display: flex;
        justify-content: center;
        margin: 30px 0 50px 0;

        > div {
          margin: 0 20px;
        }

        .phone {
          display: flex;
          flex-direction: column;
          width: 350px;
          height: 700px;
          border: 6px solid #333;
          box-shadow: 0px 0px 20px 5px rgba(100, 100, 100, 0.4);
          border-radius: 40px;

          .top-head {
            width: 100%;
            height: 88px;
            background-image: url("../../assets/images/phone_head.png");
            background-size: 100%;
          }

          .phone-foot {
            width: 100%;
            height: 90px;
            background-image: url("../../assets/images/phone_foot.png");
            background-size: 100%;
          }

          > .content {
            width: 100%;
            height: calc(100% - 130px);
            background: #f3f3f3;
            position: relative;
            overflow: hidden;

            .content-main {
              font-size: 14px;
              color: #333;
              position: absolute;
              top: 20px;
              left: 10px;
              right: -5px;
              bottom: 10px;
              overflow-x: hidden;
              overflow-y: scroll;

              .message {
                display: flex;

                .input-value {
                  width: calc(100% - 90px);
                  padding: 10px;
                  min-height: 40px;
                  line-height: 1.5;
                  font-size: 14px;
                  color: #333;
                  background-color: #fff;
                  margin-left: 10px;
                  box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.06);
                  border-radius: 4px 12px 12px 12px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  word-wrap: break-word;
                  user-select: none;
                }

                .avatar-left {
                  width: 32px;
                  height: 32px;
                  border: 1px solid #6881ec;
                  border-radius: 50%;
                  background-color: #fff;
                }

                .imgBox {
                  width: 260px;
                  height: 0; //容器内有内容，所以要将height设为0
                  padding-bottom: 260px; //这里和宽值一样
                  overflow: hidden;
                  position: relative;
                  margin-left: 10px;
                  border-radius: 4px 12px 12px 12px;

                  .pic {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;

                    // max-width: 260px;
                    // height: auto;
                    // object-fit: cover;
                    // border: none;
                  }
                }

                .link {
                  width: 260px;
                  overflow: hidden;
                  margin-left: 10px;
                  background-color: #fff;
                  padding: 10px;
                  border-radius: 4px 12px 12px 12px;

                  > div {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #999;

                    span {
                      width: 140px;
                      overflow: hidden;
                      display: -webkit-box;
                      text-overflow: ellipsis;
                      -webkit-box-orient: vertical;
                      word-break: break-all;
                    }

                    .link-cover {
                      width: 115px;
                      height: 115px;
                      object-fit: cover;
                    }
                  }

                  .link-title {
                    width: 100%;
                    line-height: 1.3;
                  }
                }

                .text {
                  width: calc(100% - 90px);
                  padding: 10px;
                  height: 100%;
                  line-height: 1.5;
                  font-size: 14px;
                  color: #333;
                  background-color: #fff;
                  margin-left: 10px;
                  box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.06);
                  border-radius: 4px 12px 12px 12px;
                  overflow-x: hidden;
                  overflow-y: auto;

                  .text-title {
                    width: 100%;
                    line-height: 1.3;
                  }
                }

                .mini {
                  width: 260px;
                  overflow: hidden;
                  margin-left: 10px;
                  background-color: #fff;
                  padding: 10px;
                  border: 1px solid #ccc;
                  border-radius: 5px;

                  > div {
                    margin-top: 10px;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;
                    color: #999;

                    .mini-cover {
                      width: 115px;
                      height: 115px;
                      object-fit: cover;
                    }
                  }

                  .mini-title {
                    width: 100%;
                    line-height: 1.3;
                  }
                }
              }

              .message + .message {
                margin-top: 20px;
              }
            }
          }
        }

        .main-right {
          display: flex;
          flex-direction: column;

          .operate {
            // -webkit-user-select: text !important;
            position: relative;
            width: 640px;
            height: 395px;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #b9c5e9;
            padding: 15px;
            color: #333;
            font-size: 14px;

            > span {
              position: absolute;
              top: 225px;
              right: 25px;
              font-size: 12px;
              color: #999;
            }

            .btn {
              margin: 20px 0;
            }

            .custom-textarea {
              -webkit-user-select: text !important;
              font-size: 14px;
              color: #333;
              width: calc(100% - 20px);
              height: 200px;
              padding: 10px 10px 20px;
              background: #ffffff;
              border-radius: 4px;
              border: 1px solid #b9c5e9;
              outline: none;
              overflow-x: hidden;
              overflow-y: auto;
              word-wrap: break-word;
              user-select: none;
            }
          }

          .btns {
            display: flex;
            align-items: center;
            margin-top: 20px;

            .el-button + .el-button {
              margin-left: 10px;
            }
          }
        }
      }
    }
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

  .btns-top {
    margin: 20px 0;
    display: flex;
    align-items: center;

    .el-input {
      margin: 0 5px 0 10px;
    }

    .el-button {
      margin: 0 5px;
    }
  }

  .text-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    div {
      font-size: 14px;
      width: 240px;
      // height: 50px;
      margin: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding: 10px;
      box-sizing: border-box;

      .content {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .l-active {
      border: 2px solid #6881ec;
    }
  }

  .img-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    div {
      width: 135px;
      position: relative;
      height: 135px;
      margin: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      text-align: center;
      cursor: pointer;

      img {
        width: 135px;
        height: 135px;
        object-fit: cover;
        border-radius: 5px;
      }

      span.bgc {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 25px;
        line-height: 25px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.3);
        /*让长段文本不换行*/
        white-space: nowrap;
        /*设置文本超出元素宽度部分隐藏*/
        overflow-x: hidden;
        /*设置文本超出部分用省略号显示*/
        text-overflow: ellipsis;
      }
    }

    .l-active {
      border: 2px solid #6881ec;
    }
  }

  .load-more {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-dialog {
    /deep/.el-tree-node {
      position: relative;
    }

    .staff-name {
      position: absolute;
      left: 295px;
    }
  }

  .show-data {
    // height: 20px;
    line-height: 20px;
    display: flex;

    span {
      margin: 0 10px;
      max-width: 100px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      cursor: pointer;
    }

    i {
      cursor: pointer;
    }
  }

  .plus-wrap {
    width: 135px;
    height: 135px;
    text-align: center;
    line-height: 150px;
    cursor: pointer;
    border: 1px dashed #ccc;

    > img {
      width: 135px;
      height: 135px;
      object-fit: cover;
    }

    i {
      font-size: 20px;
      color: #999;
    }
  }

  .img-text {
    width: 400px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    border: 1px dashed #ccc;
    cursor: pointer;

    .success {
      color: rgb(126, 211, 33);
      font-size: 20px;
      vertical-align: middle;
    }

    span.desc {
      color: #333;
      font-size: 14px;
      margin: 0 15px 0 10px;
    }

    span.edit {
      color: #6881ec;
      vertical-align: middle;
    }
  }
}
</style>
<style lang="less">
.custom-span {
  display: inline-block;
  font-weight: bold;
  color: #fea96c;
  border-radius: 5px;
  background: #fff7e6;
  border: 1px solid #f5daa3;
  width: 80px;
  height: 32px;
  margin: 5px 0;
  line-height: 32px;
  text-align: center;
}

.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  // border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.hide .el-upload--picture-card {
  display: none;
}

img {
  object-fit: cover !important;
}

.fiexd {
  position: absolute;
  top: 100px;
  left: 180px;
}
</style>
