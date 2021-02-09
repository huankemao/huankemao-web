<template>
  <div class="custom-list">
    <div class="header-tabs">
      <el-button :class="checked ? 'active' : ''" @click="handleCheckTabs(true)"
        >企微客户
        <i
          v-show="checked"
          @click="showCourse = !showCourse"
          class="iconfont icon-question-circle"
        ></i
      ></el-button>
      <el-button
        :class="!checked ? 'active' : ''"
        @click="
          () => {
            $message.info('板块建设中...');
            //handleCheckTabs(false)
          }
        "
        >非企微客户<i
          v-show="!checked"
          @click="
            () => {
              showCourse = !showCourse;
            }
          "
          class="iconfont icon-question-circle"
        ></i
      ></el-button>
      <span class="line"></span>
    </div>
    <div class="course" v-show="showCourse && checked">
      <p>
        <span class="black"
          >1、客户管理：提供成员客户统一管理、跟进、客户数据分析，有效管理、跟进客户</span
        >
      </p>
      <p>
        <span class="black">2、离职成员客户被继承后归属成员将显示最新归属成员</span>
      </p>
      <p>
        <span class="black">3、客户打标签上限为20</span>
      </p>
    </div>
    <div class="course" v-show="showCourse && !checked">
      <p>
        <span class="black"
          >1、为了避免销售人员长时间沟通无果或是恶意保护占有客户资源，在其私有池里，当客户达到回收条件后，自动将该客户放回至【客户公海】--【非企微客户】列表。</span
        >
      </p>
      <p>
        <span class="black"
          >2、当被其他员工认领后，再进入到该认领员工的私有池里，即【客户管理】--【非企微客户】列表。</span
        >
      </p>
    </div>
    <div v-show="showForm" class="form">
      <el-form
        :rules="rules"
        label-position="left"
        ref="searchForm"
        label-width="85px"
        class="searchForm"
        style="margin-bottom: 0"
      >
        <el-form-item label="关键词" prop="keyword">
          <el-input size="small" placeholder="请输入关键词" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="follow_remark_mobiles">
          <el-input size="small" v-model="follow_remark_mobiles"></el-input>
        </el-form-item>
        <el-form-item label="客户性别">
          <el-select size="small" v-model="gender" placeholder="请选择客户性别">
            <el-option
              v-for="(value, key) in genderObj"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户来源">
          <el-select size="small" v-model="follow_add_way" placeholder="请选择客户来源">
            <el-option
              v-for="(value, key) in wayObj"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟进状态">
          <el-select size="small" v-model="follow_status" placeholder="请选择跟进状态">
            <el-option
              v-for="(value, key) in statusObj"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门成员">
          <el-select size="small" v-model="follow_userid" placeholder="请选择部门成员">
            <el-option
              v-for="item in staffList"
              :key="item.user_id"
              :label="item.name"
              :value="item.user_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="addDate"
            size="small"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="showForm" class="searchForm">
      <el-button size="small" class="btn-blue" @click="reqGetCustomList()"
        >查找</el-button
      >
      <el-button size="small" class="btn-white" @click="handleClear">清空</el-button>
      <el-button type="text" size="small" style="color: #6881ec">更多筛选</el-button>
      <el-button
        type="text"
        size="small"
        @click="
          () => {
            showForm = false;
          }
        "
        >收起<i class="el-icon-arrow-up"></i
      ></el-button>
    </div>
    <div v-else class="searchForm">
      <el-input size="small" v-model="keyword" placeholder="关键词查找"></el-input>
      <el-button size="small" class="btn-blue" @click="reqGetCustomList()"
        >查找</el-button
      >
      <el-button size="small" class="btn-white" @click="handleClear">清空</el-button>
      <el-button size="small" type="text" @click="showForm = true"
        >更多筛选<i class="el-icon-arrow-down"></i
      ></el-button>
    </div>
    <div class="btns">
      <el-button size="small" class="btn-white" @click="lookRepeat"
        >查看重复客户</el-button
      >
      <span>共 {{ all_num || 0 }} 位客户，实际客户 {{ actual_num || 0 }} 位</span>
      <el-button
        size="small"
        :class="selectData.length === 0 ? 'btn-opacity right' : 'btn-white right'"
        :disabled="selectData.length === 0"
        @click="exportExcel"
        >导出客户</el-button
      >
      <el-button
        size="small"
        :class="selectData.length === 0 ? 'btn-opacity' : 'btn-white'"
        :disabled="selectData.length === 0"
        @click="Tagging"
        >打标签</el-button
      >
      <el-button
        size="small"
        :class="selectData.length === 0 ? 'btn-opacity' : 'btn-white'"
        :disabled="selectData.length === 0"
        @click="removeTag"
        >移除标签</el-button
      >
    </div>
    <div class="table">
      <el-table
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{
          color: '#333',
          fontSize: '14px',
          backgroundColor: '#F6F7FB',
          fontWeight: 'normal',
        }"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="客户信息" width="220">
          <template slot-scope="scope">
            <div class="slot-wrap">
              <el-avatar
                :size="32"
                :src="scope.row.avatar"
                style="min-width: 32px"
              ></el-avatar>
              <div class="center">
                <span>{{ scope.row.name }}</span>
                <span>所在群：0个</span>
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
        <el-table-column prop="follow_add_way" label="来源" width="220">
        </el-table-column>
        <el-table-column label="标签">
          <div slot-scope="scope" class="flex-wrap">
            <span size="small" v-for="(item, index) in scope.row.tag_ids" :key="index">
              {{ item }}
            </span>
          </div>
        </el-table-column>
        <el-table-column label="归属成员">
          <template slot-scope="scope">
            <div class="sucy">
              <span>
                <span>{{ scope.row.follow_name }}</span
                >--<span>{{ scope.row.follow_createtime }}</span>
              </span>
              <span>备注：{{ scope.row.follow_remark }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="follow_status" label="跟进状态" width="180">
        </el-table-column>
        <!-- <el-table-column label="操作"> </el-table-column> -->
      </el-table>
    </div>

    <div class="pagination" v-show="total !== 0">
      <el-pagination
        @size-change="handleLimitChange"
        @current-change="handlePageChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 打标签 -->
    <el-dialog
      width="1000px"
      :title="addtags == 1 ? '增加标签' : '移除标签'"
      :visible.sync="addTag"
      class="tagBialog"
      @close="
        () => {
          (labelIdList = []), (addtags = ''), (disabledStores = []);
        }
      "
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <!-- <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
        <el-form-item label="选择分组" v-show="addtags == 1" prop="labelGroupId">
          <el-select v-model="formInline.labelGroupId" placeholder="所有分组" size="small" clearable
            @change="groupChange()">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in groupData" :key="index.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-checkbox-group v-model="checkList" :max="20" v-if="addtags == 1">
        <el-checkbox :disabled="disabledStores.includes(item.id)" :label="item.id" v-for="(item, index) in tagGroup"
          :key="index">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group v-model="checkList" v-else>
        <el-checkbox :label="item.id" v-for="(item, index) in tagGroup2" :key="index">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
      <el-button size="small" v-show="addtags == 1" class="btn-blue" @click="
          () => {
            addGroupFlag = true;
          }
        ">新建标签</el-button> -->
      <div class="tabs-wrap scroll">
        <el-form label-width="100px" v-if="addtags == 1">
          <template v-for="(item, index) in customLabelList">
            <el-form-item style="margin-bottom: 15px" :label="item.name" :key="index">
              <el-button
                style="margin: 0 5px"
                size="small"
                :ref="citem.id"
                class="btn-gray"
                :disabled="disabledStores.includes(citem.id)"
                @click="handlePickLabel(citem.id)"
                v-for="(citem, index) in item.group"
                :key="index"
              >
                {{ citem.name }}
              </el-button>
            </el-form-item>
          </template>
        </el-form>
        <el-form label-width="100px" v-else>
          <template v-for="(item, index) in customLabelList">
            <el-form-item style="margin-bottom: 15px" :label="item.name" :key="index">
              <el-button
                style="margin: 0 5px"
                size="small"
                :ref="citem.id"
                class="btn-gray"
                :disabled="!disabledStores.includes(citem.id)"
                @click="handlePickLabel(citem.id)"
                v-for="(citem, index) in item.group"
                :key="index"
              >
                {{ citem.name }}
              </el-button>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addTag = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleSubmitTag"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 新建标签 -->
    <el-dialog
      width="600px"
      title="新增标签"
      :visible.sync="addGroupFlag"
      @close="dialogColse('label')"
      :close-on-click-modal="false"
    >
      <el-form :model="label" :rules="labelRules" ref="label">
        <el-form-item label="选择分组" label-width="100px" prop="labelGroupId">
          <el-select
            style="width: 100%"
            v-model="label.labelGroupId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in groupData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
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
          ></el-input>
        </el-form-item>
        <el-form-item label="" label-width="100px">
          <span style="font-size: 12px; color: #999"
            >每个标签名称最多15个字，同时新建多个标签时，请用“空格” 隔开。</span
          >
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addGroupFlag = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleSubmitLabel"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqGetCustomList,
  reqShowList,
  reqGetSoloStaff,
  reqRepeatList,
  reqGetCustomTagGroup,
  reqGetCustomTag,
  customerTag,
  reqAddCustomLabel,
  showCustomerTag,
  reqGetCustomTree,
} from "@/api/index";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      addtags: "",
      addGroupFlag: false,
      label: {
        labelGroupId: "",
        labelValue: "",
      },
      formInline: {
        labelGroupId: "",
      },
      checkList: [],
      option: [],
      addTag: false,
      checked: true,
      showForm: false,
      rules: {},
      showCourse: false,
      page: 1,
      limit: 10,
      total: 0,
      tableData: [],
      loading: false,
      addDate: "",
      keyword: "", //关键字
      follow_remark_mobiles: "", //手机号
      gender: "", //性别
      follow_add_way: "", // 客户来源
      follow_status: "", //跟进状态
      follow_userid: "", //成员
      genderObj: null, // 性别数据对象
      wayObj: null, // 来源数据对象
      statusObj: null, // 状态数据对象
      staffList: [], //  成员列表
      groupData: [],
      tagGroup: [],
      group_code: "",
      selectData: [],
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
      actual_num: 0,
      all_num: 0,
      disabledStores: [],
      tagGroup2: [],
      customLabelList: [],
      customLabelListLength: 0,
      labelIdList: [],
    };
  },
  watch: {
    showForm(val) {
      this.reset();
      // this.tableHeight();
    },
  },
  mounted() {
    this.getData();
    this.getGroup();
    this.$bus.$on("update", () => {
      this.getData();
    });
    window.onresize = () => {
      // this.tableHeight();
    };
  },
  methods: {
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
          this.labelIdList.findIndex((item) => item === id),
          1
        );
      }
      console.log(this.labelIdList);
    },
    //打标签
    async handleSubmitTag() {
      if (this.addtags == 1) {
        if (this.labelIdList.length > 0) {
          var arr = [];
          this.selectData.map((item) => {
            arr.push(item.id);
          });
          let res = await customerTag({
            id: arr,
            tag_ids: this.labelIdList,
            type: 1,
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.addTag = false;
            this.reqGetCustomList();
          }
        } else {
          this.$message.error("请选择标签后进行操作");
        }
      } else {
        if (this.labelIdList.length > 0) {
          var arr = [];
          this.selectData.map((item) => {
            arr.push(item.id);
          });
          let res = await customerTag({
            id: arr,
            tag_ids: this.labelIdList,
            type: 2,
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.addTag = false;
            this.reqGetCustomList();
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.addTag = false;
              this.reqGetCustomList();
            }
          } 
        } else {
          this.$message.error("请选择标签后进行操作");
        }
      }
    },
    //导出数据
    exportExcel() {
      require.ensure([], () => {
        var { export_json_to_excel } = require("../../assets/js/Export2Excel");
        var tHeader = [
          "客户名",
          "所在群",
          "来源",
          "标签",
          "归属成员",
          "归属时间",
          "备注",
          "跟进状态",
        ];
        var filterVal = [
          "name",
          "0",
          "follow_add_way",
          "tag_ids",
          "follow_name",
          "follow_createtime",
          "follow_remark",
          "address",
        ];
        var list = this.selectData;
        var data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    async getGroup() {
      let res = await reqGetCustomTagGroup({});
      if (res.code == 200) {
        this.groupData = JSON.parse(JSON.stringify(res.data));
        this.reqGetCustomTag();
      }
    },
    groupChange(e) {
      this.group_code = this.groupData.filter(
        (item) => item.id == this.formInline.labelGroupId
      )[0].code;
      this.reqGetCustomTag();
    },
    // 获取客户标签列表
    async reqGetCustomTag() {
      let res = await reqGetCustomTag({
        code: this.group_code,
        limit: 1000,
        page: 1,
      });
      if (res.code == 200) {
        this.tagGroup = res.data;
        // this.tagGroup2 = res.data;
      }
    },
    //新建标签
    async handleSubmitLabel() {
      this.$refs.label.validate((valid) => {
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
            this.$message.error("请选择标签后进行操作");
          }
        }
      });
    },
    // 新增客户标签
    async reqAddCustomLabel(option) {
      let res = await reqAddCustomLabel(option);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "新增成功",
        });
        this.addGroupFlag = false;
        this.reqGetCustomTag();
      } else {
        this.$message.error(res.msg);
      }
    },
    //查看重复
    async lookRepeat() {
      let res = await reqRepeatList({
        keyword: this.keyword,
        gender: this.gender,
        follow_userid: this.follow_userid,
        start_time: this.addDate ? this.addDate[0] : "",
        end_time: this.addDate ? this.addDate[1] : "",
        page: this.page,
        limit: this.limit,
      });
      if (res.code == 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    async removeTag() {
      var arr = [];
      this.selectData.map((item) => {
        arr.push(item.id);
      });
      let res = await showCustomerTag({
        id: arr,
        type: 2,
      });
      if (res.code == 200) {
        this.checkList = res.data;
        var arr = [];
        if (res.data.length > 0) {
          let data = JSON.parse(JSON.stringify(res));
          this.labelIdList = data.data;
          this.disabledStores = Object.assign([], data.data);
          console.log(this.labelIdList);
          this.labelIdList.forEach((item) => {
            setTimeout(() => {
              this.$refs[item][0].$el.classList.add("btn-blue");
            }, 0);
          });
        }
        this.addTag = true;
      }
    },
    async Tagging() {
      if (this.selectData.length > 0) {
        var arr = [];
        this.selectData.map((item) => {
          arr.push(item.id);
        });
        let res = await showCustomerTag({
          id: arr,
          type: 1,
        });
        if (res.code == 200) {
          let data = JSON.parse(JSON.stringify(res));
          this.labelIdList = data.data;
          this.disabledStores = Object.assign([], data.data);
          this.labelIdList.forEach((item) => {
            setTimeout(() => {
              this.$refs[item][0].$el.classList.add("btn-blue");
            }, 0);
          });
          this.addTag = true;
          this.addtags = 1;
        }
      } else {
        this.$message.error("请先选择数据");
      }
    },
    getData() {
      this.loading = true;
      const oP = [];
      oP[0] = reqGetCustomList({
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
        follow_remark_mobiles: this.follow_remark_mobiles,
        gender: this.gender,
        follow_add_way: this.follow_add_way,
        follow_status: this.follow_status,
        follow_userid: this.follow_userid,
        start_time: this.addDate ? this.addDate[0] : "",
        end_time: this.addDate ? this.addDate[1] : "",
      });
      oP[1] = reqShowList({});
      oP[2] = reqGetSoloStaff({
        page: 1,
        limit: 10000,
      });
      oP[3] = reqGetCustomTree({});
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code == 200) {
          this.total = res[0].count;
          this.tableData = res[0].data;
        } else {
          this.tableData = [];
        }
        if (res[1].code === 200) {
          this.genderObj = res[1].data.gender;
          this.wayObj = res[1].data.follow_add_way;
          this.statusObj = res[1].data.follow_status;
          this.all_num = res[1].data.all_num;
          this.actual_num = res[1].data.actual_num;
        } else {
          this.$message.error(res[1].msg);
          this.genderObj = {};
          this.wayObj = {};
          this.statusObj = {};
        }
        if (res[2].code === 200) {
          this.staffList = res[2].data;
        } else {
          this.$message.error(res[2].msg);
          this.staffList = [];
        }
        if (res[3].code == 200) {
          this.customLabelList = res[3].data;

          this.customLabelListLength = res[3].data.length;
        } else {
          this.customLabelList = [];
          this.customLabelListLength = 0;
        }
      });
    },
    // 获取客户列表
    async reqGetCustomList() {
      this.loading = true;
      let res = await reqGetCustomList({
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
        follow_remark_mobiles: this.follow_remark_mobiles,
        gender: this.gender,
        follow_add_way: this.follow_add_way,
        follow_status: this.follow_status,
        follow_userid: this.follow_userid,
        start_time: this.addDate ? this.addDate[0] : "",
        end_time: this.addDate ? this.addDate[1] : "",
      });
      if (res.code == 200) {
        this.total = res.count;
        this.tableData = res.data;
      } else {
        this.tableData = [];
      }
      this.loading = false;
    },
    // 重置
    reset() {
      this.addDate = "";
      this.keyword = ""; //关键字
      this.follow_remark_mobiles = ""; //手机号
      this.gender = ""; //性别
      this.follow_add_way = ""; // 客户来源
      this.follow_status = ""; //跟进状态
      this.follow_userid = ""; //成员
    },
    // 清空
    handleClear() {
      this.reset();
      this.reqGetCustomList();
    },
    // 标签页切换
    handleCheckTabs(flag) {
      this.checked = flag;
    },
    // 多选框
    handleSelectionChange(option) {
      this.selectData = option;
    },
    // 改变每页条数
    handleLimitChange(limit) {
      this.limit = limit;
      this.reqGetCustomList();
    },
    // 改变当前页码
    handlePageChange(page) {
      this.page = page;
      this.reqGetCustomList();
    },
    dialogColse(data) {
      this.$refs[data].resetFields();
      this.tagGroup2 = [];
      if (data != "label") {
        this.addtags = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@color: #333;
@active-color: #6881ec;
@size: 14px;

.fontpublic {
  color: #333;
}

@blue: #6881ec;

.custom-list {
  width: 100%;
  // height: 100%;
  // overflow: hidden;
  font-size: @size;
  color: @color;

  .el-checkbox {
    width: 45%;
    margin: 0 0 30px 0;
  }

  /deep/.el-form-item {
    margin-bottom: 0 !important;
  }

  /deep/.el-form-item__error {
    padding: 0;
    position: relative;
  }

  .tagBialog {
    /deep/.el-dialog__body {
    //   width: 600px;
      height: 600px;
    // background: #ffffff;
    // border-radius: 12px;
    // display: flex;
    // flex-direction: column;
    // margin: 0 !important;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);

    }
  }

  .header-tabs {
    position: relative;
    margin: 0 0 20px 0;

    > .el-button {
      width: 122px;
      padding: 8px 20px;
      background: #f6f7fb;
      border-radius: 6px 6px 0px 0px;
      border: 1px solid #b9c5e9;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
    }

    > .el-button.active {
      position: relative;
      color: #6881ec;
      background: #fff;
      border-bottom: 1px solid transparent;
      z-index: 10;
    }

    .line {
      position: absolute;
      top: 33px;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #b9c5e9;
    }
  }

  .course {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 32px);
    padding: 15px;
    background: #fff7e6;
    border-radius: 6px;
    border: 1px solid #f5daa3;
    margin-bottom: 15px;

    span {
      display: inline-block;
      height: 22px;
    }

    p + p {
      margin-top: 5px;
    }

    .black {
      color: #333333;
    }

    .pink {
      color: #f38b93;
    }

    .blue {
      cursor: pointer;
      color: #6881ec;
    }
  }

  .form {
    .el-form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .btn {
      width: 100%;
      border-radius: 6px;
      color: #b9c5e9;
      border: 1px solid #b9c5e9;
    }

    .el-form-item {
      width: 395px;
      margin-left: 10px;
    }

    .left {
      flex: 1;

      .blue {
        background-color: @blue;
        color: #fff;
      }

      .white {
        background-color: #fff;
        color: @blue;
      }
    }

    /deep/.el-form-item__label {
      font-size: @size;
      color: @color;
      padding: 0px;
    }

    /deep/.el-input__inner {
      width: 310px;
    }
  }

  .searchForm {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    /deep/.el-button--text {
      color: #6881ec;
    }

    > .el-input {
      width: 220px;
      margin-right: 10px;

      /deep/.el-input__inner {
        width: 220px;
      }
    }
  }

  .btns {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    span {
      margin-left: 10px;
    }
  }

  .table {
    // height: calc(100vh - 377px);

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

    .sucy {
      display: flex;
      flex-direction: column;

      > :nth-child(1) {
        display: flex;
        align-items: center;

        :nth-child(1) {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
        }

        :nth-child(2) {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
        }
      }

      > :nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
      }
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
  }}
</style>