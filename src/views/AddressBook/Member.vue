<template>
  <div class="member">
    <div class="scroll">
      <div class="title">{{ $route.meta.title }}</div>
      <el-form
        v-if="screenVisible"
        label-position="left"
        label-width="auto"
        class="screenForm"
        style="margin-bottom: 0"
      >
        <el-form-item label="选择企业部门">
          <el-select size="small" v-model="department_id" placeholder="请选择企业部门">
            <el-option key="" label="全部" value=""> </el-option>
            <el-option
              v-for="item in departmentList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择企业成员">
          <el-select size="small" v-model="user_id" placeholder="请选择企业成员">
            <el-option key="" label="全部" value=""> </el-option>
            <el-option
              v-for="item in staffList"
              :key="item.user_id"
              :label="item.name"
              :value="item.user_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择成员状态">
          <el-select size="small" v-model="status" placeholder="请选择成员状态">
            <el-option key="" label="全部" value=""> </el-option>
            <el-option
              v-for="(value, key) in staff_status"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外部联系人权限">
          <el-select
            size="small"
            v-model="external_authority"
            placeholder="请选择外部联系人权限"
          >
            <el-option
              v-for="item in permissions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btns" v-if="screenVisible">
        <el-button size="small" class="btn-white" @click="handleSearch">查找</el-button>
        <el-button size="small" class="btn-blue" @click="handleClearSearch"
          >清空</el-button
        >
      </div>
      <div class="btns">
        <el-button
          size="small"
          class="btn-blue"
          @click="screenVisible = !screenVisible"
          >{{ screenVisible ? "收起筛选" : "展开筛选" }}</el-button
        >
        <el-button
          size="small"
          class="btn-white"
          icon="el-icon-refresh"
          @click="synchUserData()"
        ></el-button>
        <div>
          <multyRangePicker :date="syncDate" @filt="filt" />
        </div>
        <el-button
          :disabled="selectData.length === 0"
          size="small"
          :class="selectData.length !== 0 ? 'btn-blue right' : 'btn-opacity right'"
          @click="handleGiveLabel"
          >打标签</el-button
        >
        <el-button
          :disabled="selectData.length === 0"
          size="small"
          :class="selectData.length !== 0 ? 'btn-blue' : 'btn-opacity'"
          @click="handleRemoveLabel"
          >移除标签</el-button
        >
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          ref="table"
          :data="tableData"
          style="width: 100%"
          @sort-change="handleChangeSort"
          :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="企业成员" width="150">
            <template slot-scope="scope">
              <div class="slot-wrap">
                <el-avatar :size="32" :src="scope.row.avatar"></el-avatar>
                <span>{{ scope.row.name }}</span>
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
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="80"></el-table-column>
          <el-table-column prop="tag_ids" label="所属标签">
            <div slot-scope="scope" class="flex-wrap">
              <span size="small" v-for="(item, index) in scope.row.tag_ids" :key="index">
                {{ item }}
              </span>
            </div>
          </el-table-column>
          <el-table-column label="外部联系人" width="100">
            <template slot-scope="scope">
              {{ scope.row.external_authority == 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="new_apply_cnt" width="100" sortable="custom">
            <template slot="header">
              发起申请数
              <el-tooltip
                class="item"
                content="发起申请数，成员通过「搜索手机号」、「扫一扫」、「从微信好友中添加」、「从群聊中添加」、「添加共享、分配给我的客户」、「添加单向、双向删除好友关系的好友」、「从新的联系人推荐中添加」等渠道主动向客户发起的好友申请数量。"
                placement="top"
              >
                <i class="iconfont icon-question-circle"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.new_apply_cnt || 0 }}</template>
          </el-table-column>
          <el-table-column
            prop="new_contact_cnt"
            label="新增客户数"
            sortable="custom"
            width="100"
          >
            <template slot="header">
              新增客户数
              <el-tooltip
                class="item"
                content="新增客户数，成员新添加的客户数量。"
                placement="top"
                ><i class="iconfont icon-question-circle"></i
              ></el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.new_contact_cnt || 0 }}</template>
          </el-table-column>
          <el-table-column prop="chat_cnt" sortable="custom" width="100">
            <template slot="header">
              聊天总数
              <el-tooltip
                class="item"
                content="聊天总数， 成员有主动发送过消息的聊天数，包括单聊和群聊。"
                placement="top"
              >
                <i class="iconfont icon-question-circle"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.chat_cnt || 0 }}</template>
          </el-table-column>
          <el-table-column prop="message_cnt" sortable="custom" width="100">
            <template slot="header">
              发送消息数
              <el-tooltip
                class="item"
                content="发送消息数，成员在单聊和群聊中发送的消息总数。"
                placement="top"
              >
                <i class="iconfont icon-question-circle"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.message_cnt || 0 }}</template>
          </el-table-column>
          <el-table-column prop="reply_percentage" label="已回复聊天占比" width="100">
            <template slot="header">
              已回复聊天占比
              <el-tooltip
                class="item"
                content="已回复聊天占比，客户主动发起聊天后，成员在一个自然日内有回复过消息的聊天数/客户主动发起的聊天数比例，不包括群聊，仅在确有回复时返回。"
                placement="top-start"
              >
                <i class="iconfont icon-question-circle"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.reply_percentage || 0 }}%</template>
          </el-table-column>
          <el-table-column prop="avg_reply_time" label="平均首次回复时长" width="100">
            <template slot-scope="scope">{{ scope.row.avg_reply_time || 0 }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleLimitChange"
          @current-change="handlePageChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 打标签/移除标签组件 -->
    <StaffLabelDialog
      @labelFun="labelFun"
      :labelType="labelType"
      :labelTitle="labelTitle"
      :labelVisible="labelVisible"
      :labelLoading="labelLoading"
      :id="id"
    />
  </div>
</template>

<script>
import multyRangePicker from "../../components/multyRangePicker";
import {
  reqGetUserList,
  reqSynchroDate,
  syncStaffBehavior,
  reqStaffToggle,
  reqShowGetStaffScreen,
  reqGetDepartmentList,
  reqGetSoloStaff,
  reqDepartmentStaff,
} from "@/api/index";
import StaffLabelDialog from "@/components/StaffLabel/StaffLabelDialog";
export default {
  components: {
    multyRangePicker,
    StaffLabelDialog,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      tableData: [],
      total: 0,
      loading: false,
      syncDate: "",
      date: "",
      time_behavior: "day",
      selectData: [],
      labelVisible: false,
      labelLoading: false,
      labelTitle: "",
      labelType: "",
      id: [],
      staff_user_id: [], // 成员user_id数组
      // 以下为筛选条件
      department_id: "", //  部门id
      user_id: "", // 单个成员id
      status: "", // 成员状态
      external_authority: "", // 外部联系人权限
      order: "",
      screenVisible: false,
      permissions: [
        { label: "全部", value: "" },
        { label: "有", value: 1 },
        { label: "没有", value: 0 },
      ],
      departmentList: [],
      staffList: [],
      staff_status: {},
      screenLoading: false,
    };
  },
  watch: {
    department_id(val) {
      if (val) {
        this.user_id = "";
        this.reqDepartmentStaff(val);
      }
    },
  },
  mounted() {
    this.getData();
    this.$bus.$on("update", () => {
      this.getData();
    });
  },
  methods: {
    getData() {
      this.loading = true;
      const oP = [];
      oP[0] = reqGetDepartmentList({});
      oP[1] = reqGetSoloStaff({ page: 1, limit: 10000 });
      oP[2] = reqGetUserList({
        page: this.page,
        limit: this.limit,
        time_behavior: this.time_behavior,
        department_id: "",
        staff_id: "",
        status: "",
        external_authority: "",
        order: "",
      });
      oP[3] = reqSynchroDate({});
      oP[4] = reqShowGetStaffScreen({});
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
          this.departmentList = res[0].data;
        } else {
          this.departmentList = [];
        }
        if (res[1].code === 200) {
          this.staffList = res[1].data;
        } else {
          this.staffList = [];
        }
        if (res[2].code === 200) {
          this.total = res[2].count;
          this.tableData = res[2].data;
        } else {
          this.tableData = [];
          this.total = 0;
        }
        if (res[3].code === 200) {
          this.syncDate = res[3].data;
        } else {
          this.syncDate = "--";
        }
        if (res[4].code === 200) {
          this.staff_status = res[4].data.staff_status;
        } else {
          this.staff_status = {};
        }
      });
    },
    // 根据部门Code获取成员列表
    async reqDepartmentStaff(code) {
      let res = await reqDepartmentStaff({ code });
      if (res.code === 200) {
        this.staffList = res.data;
      } else {
        this.staffList = [];
      }
    },
    //获取企业成员列表
    async reqGetUserList() {
      this.loading = true;
      let res = await reqGetUserList({
        page: this.page,
        limit: this.limit,
        time_behavior: this.time_behavior,
        department_id: this.department_id,
        staff_id: this.user_id,
        status: this.status,
        external_authority: this.external_authority,
        order: this.order,
      });
      if (res.code == 200) {
        this.total = res.count;
        this.tableData = res.data;
      } else {
        this.tableData = [];
      }
      this.loading = false;
    },
    // 获取企业成员最后一次同步时间
    async reqSynchroDate() {
      let res = await reqSynchroDate({});
      if (res.code == 200) {
        this.syncDate = res.data;
      } else {
        this.syncDate = "--";
      }
    },
    // 同步成员行为数据
    async synchUserData() {
      this.$message({
        center: true,
        iconClass: "el-icon-loading ",
        duration: 0,
        message: "正在进行成员行为数据同步，请耐心等待...",
      });
      let res = await syncStaffBehavior({});
      this.$message.closeAll();
      if (res.code == 200) {
        this.$message.success("同步成功！");
        this.reqGetUserList();
      } else {
        this.$message.error("同步失败！");
      }
    },
    // 成员打标签/移除标签
    async reqStaffToggle(staff_user_id, tag_ids, type) {
      let res = await reqStaffToggle({
        staff_user_id,
        tag_ids,
        type,
      });
      this.labelLoading = false;
      if (res.code === 200) {
        this.labelVisible = false;
        this.reqGetUserList();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    filt(res) {
      this.time_behavior = res;
      this.reqGetUserList();
    },
    handleSelectionChange(data) {
      this.selectData = data;
    },
    // 改变每页条数
    handleLimitChange(limit) {
      this.limit = limit;
      this.reqGetUserList();
    },
    // 改变当前页码
    handlePageChange(page) {
      this.page = page;
      this.reqGetUserList();
    },
    // 标签弹窗回传数据
    labelFun(type, data) {
      if (type === "confirm") {
        this.labelLoading = true;
        let tag_ids = data;
        let type = this.labelType === "give" ? 1 : this.labelType === "remove" ? 2 : "";
        this.reqStaffToggle(this.staff_user_id, tag_ids, type);
      } else if (type === "cancel") {
        this.labelVisible = false;
      }
    },
    // 打标签
    handleGiveLabel() {
      this.staff_user_id = [];
      this.id = [];
      this.selectData.forEach((item) => {
        this.staff_user_id.push(item.user_id);
        this.id.push(item.id);
      });
      this.labelTitle = "打标签";
      this.labelType = "give";
      this.labelVisible = true;
    },
    // 移除标签
    handleRemoveLabel() {
      this.staff_user_id = [];
      this.id = [];
      this.selectData.forEach((item) => {
        this.staff_user_id.push(item.user_id);
        this.id.push(item.id);
      });
      this.labelTitle = "移除标签";
      this.labelType = "remove";
      this.labelVisible = true;
    },
    // 监听表格排序
    handleChangeSort(option) {
      this.order = "";
      if (option.order) {
        this.order = option.prop + " " + option.order.split("ending")[0];
      } else {
        this.order = "";
      }
      this.reqGetUserList();
    },
    // 查找按钮
    handleSearch() {
      this.reqGetUserList();
    },
    // 清空按钮
    handleClearSearch() {
      this.department_id = "";
      this.user_id = "";
      this.status = "";
      this.external_authority = "";
      this.reqGetUserList();
    },
  },
};
</script>

<style lang="less" scoped>
@color: #333;
@size: 14px;
.btn-blue {
  font-weight: bold;
  color: #fff;
  background-color: #6881ec;
  border-radius: 5px;
}
.btn-white {
  font-weight: bold;
  color: #6881ec;
  background-color: #fff;
  border-radius: 5px;
}
.right {
  margin-left: auto;
}

.member {
  width: 100%;
  // height: 100%;
  // position: relative;
  // overflow: hidden;

  .scroll {
    // position: absolute;
    height: calc(100vh - 135px);
    left: 0;
    top: 0;
    right: -5px;
    bottom: 0;
    overflow-x: hidden;
    padding-right: 20px;
    // overflow-y: hidden;
  }

  .title {
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 18px;
    font-weight: bold;
  }

  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px 0;
    span {
      font-size: 14px;
      color: #333;
      margin-left: 10px;
    }
  }

  .table {
    // height: calc(100% - 184px);
    .el-table {
      color: #333;
    }
    .slot-wrap {
      display: flex;
      align-items: center;

      > :nth-child(2) {
        margin: 0 10px;
        max-width: 60px;
      }
    }
  }
  /deep/.el-input__inner {
    line-height: 32px;
  }
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  span {
    line-height: 1;
    color: #6881ec;
    background: #eef2fe;
    border-radius: 4px;
    border: 1px solid #6881ec;
    margin: 3px;
    padding: 5px;
    font-size: 12px;
  }
}
.screenForm {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .el-select {
    width: 310px;
  }
  .el-form-item {
    display: inline-block;
    margin-left: 15px;
  }
}
</style>
