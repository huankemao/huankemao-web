<template>
  <div class="custom-label">
    <el-container>
      <el-aside class="tabs" style="width: 210px">
        <div class="group-main">
          <el-button
            size="small"
            class="btn-blue"
            @click="
              () => {
                operationType = 'add';
                addGroupFlag = true;
              }
            "
            >新增分组</el-button
          >
          <el-tree
            style="margin-top: 20px"
            :data="groupData"
            node-key="id"
            ref="tree"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleTreeNode"
            :highlight-current="true"
            :current-node-key="label.labelGroupId"
          >
            <template slot-scope="{ node, data }">
              <div class="tree-wrap">
                <span
                  :title="data.name"
                  :class="
                    label.labelGroupId === data.id ? 'active name-wrap' : 'name-wrap'
                  "
                  >{{ data.name }}</span
                >
                <div class="drop-wrap">
                  <el-dropdown
                    v-show="data.name !== '所有' && data.name !== '未分组'"
                    @command="handleCommand($event, data)"
                  >
                    <span class="el-dropdown-link span-wrap">
                      <i class="more el-icon-more"></i>
                    </span>
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
          {{ $route.meta.title }}管理
          <i
            @click="showCourse = !showCourse"
            class="iconfont icon-question-circle"
            style="cursor: pointer"
          ></i>
        </div>
        <div class="course" v-show="showCourse">
          <p>
            <span class="black"
              >1、标签分组名称不可重复，同一分组下的标签名称不可重复。</span
            >
          </p>
          <p>
            <span class="black"
              >2、标签组一旦被删除，该标签组下的标签将移至【未分组】。</span
            >
          </p>
          <p>
            <span class="black">3、【未分组】为系统分组，不可修改与删除。</span>
          </p>
        </div>
        <div class="btns">
          <el-input
            size="small"
            v-model="keyword"
            placeholder="搜索标签名称"
            style="width: 200px; margin: 0 10px"
          ></el-input>
          <el-button size="small" class="btn-blue" @click="handleSearch">查找</el-button>
          <el-button size="small" class="btn-white" @click="keyword = ''">
            清空
          </el-button>
          <el-button
            :disabled="selectData.length === 0"
            size="small"
            :class="selectData.length !== 0 ? 'btn-blue right' : 'btn-opacity right'"
            @click="handleBatchDeleteLabel"
            >删除标签</el-button
          >
          <el-button
            :disabled="selectData.length !== 0"
            size="small"
            :class="selectData.length === 0 ? 'btn-blue' : 'btn-opacity'"
            @click="
              () => {
                labelType = 'add';
                label.labelGroupId = label.labelGroupId || groupData[1].id;
                addFlag = true;
              }
            "
            >新建标签</el-button
          >
        </div>
        <div class="table">
          <el-table
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{
              color: '#333',
              fontSize: '14px',
              backgroundColor: '#F6F7FB',
              fontWeight: 'normal',
            }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="标签名称">
              <div slot-scope="scope" class="flex-wrap">
                <span size="small">
                  {{ scope.row.name }}
                </span>
              </div>
            </el-table-column>
            <el-table-column prop="staff_num" label="员工数"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEditLabel(scope.row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="handleDeleteLabel(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" v-show="total !== 0">
          <el-pagination
            @size-change="
              (size) => {
                limit = size;
                getData();
              }
            "
            @current-change="handlePageChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-main>
    </el-container>

    <!--新建标签 -->
    <el-dialog
      width="600px"
      :title="labelType === 'add' ? '新增标签' : labelType === 'edit' ? '编辑标签' : ''"
      :visible.sync="addFlag"
      @close="dialogBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form
        style="margin-top: 20px"
        v-show="labelType === 'add' || labelType === 'edit'"
        :model="label"
        :rules="labelRules"
        ref="label"
      >
        <el-form-item
          label="选择分组"
          label-width="100px"
          v-show="labelType !== 'delete'"
        >
          <el-select
            style="width: 100%"
            v-model="label.labelGroupId"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in groupSelectData"
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
            :maxlength="labelType === 'edit' ? 15 : ''"
            placeholder="请输入标签（不得超过15个字符）"
            v-model="label.labelValue"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item v-show="labelType === 'add'" label="" label-width="100px">
          <span style="font-size: 12px; color: #999"
            >每个标签名称最多15个字，同时新建多个标签时，请用“空格” 隔开。</span
          >
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px" v-show="labelType === 'delete'">
        【{{
          label.labelValue
        }}】一旦删除，归属于该分组的所有标签都将被移至【未分组】，确定删除分组吗?
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addFlag = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleLabelSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 新建标签组 -->
    <el-dialog
      width="600px"
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
      @close="dialogBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form
        style="margin-top: 20px"
        v-show="operationType === 'add' || operationType === 'edit'"
        :model="label"
        :rules="labelRules"
        ref="label"
      >
        <el-form-item label="分组名称" label-width="100px" prop="labelGroupName">
          <el-input
            placeholder="请输入分组名（不得超过15个字符）"
            v-model="label.labelGroupName"
            maxlength="15"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px" v-show="operationType === 'delete'">
        【{{
          label.labelGroupName
        }}】一旦删除，归属于该分组的所有标签都将被移至【未分组】，确定删除分组吗?
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addGroupFlag = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleSubmitGroup"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqStaffTagGroup,
  reqAddStaffTagGroup,
  reqGetStaffTagList,
  reqDeleteStaffTagGroup,
  reqAddStaffTag,
  reqDeleteStaffTag,
} from "@/api/index";

export default {
  data() {
    return {
      addGroupFlag: false,
      addFlag: false,
      page: 1,
      total: 0,
      limit: 10,
      tableData: [],
      groupData: [],
      showCourse: false,
      loading: false,
      selectData: [],
      label: {
        labelGroupName: "", //标签组名称
        labelValue: "", //添加标签的所有名称字符
        labelGroupId: "", //标签组id
        title: "",
        labelId: "",
      },
      operationType: "",
      labelType: "",
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
      keyword: "",
    };
  },
  watch: {
    keyword(val) {
      if (!val) {
        this.reqGetStaffTagList();
      }
    },
  },
  computed: {
    // 分组选择列表
    groupSelectData() {
      return this.groupData.filter((res) => {
        return res.id;
      });
    },
  },
  mounted() {
    this.$bus.$on("update", () => {
      this.getData();
    });
    this.getData();
  },
  methods: {
    handlePageChange(page){
      this.page=page;
      this.getData()
    },
    getData() {
      this.loading = true;
      const oP = [];
      oP[0] = reqStaffTagGroup({});
      oP[1] = reqGetStaffTagList({
        group_id: "",
        limit: this.limit,
        page: this.page,
        keyword: "",
      });
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code == 200) {
          if (res[0].data.length != 0) {
            this.groupData = JSON.parse(JSON.stringify(res[0].data));
            this.groupData2 = JSON.parse(JSON.stringify(res[0].data));
            this.groupData.unshift({
              id: "",
              name: "所有",
            });
            this.syncDate = res[0].data[0].update_at;
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey("");
            });
          } else {
            this.groupData = [
              {
                id: "",
                name: "所有",
              },
            ];
          }
        }  else {
          this.$message.error(res[0].msg);
          this.groupData = [
            {
              id: "",
              name: "所有",
            },
          ];
        }
        if (res[1].code == 200) {
          this.tableData = res[1].data;
          this.total = res[1].count || 0;
        } else {
          this.tableData = [];
          this.total = 0;
          this.$message.error(res[1].msg);
        }
      });
    },
    // 新增编辑成员标签组
    async reqAddStaffTagGroup(id, name) {
      let res = await reqAddStaffTagGroup({
        id,
        name,
      });
      if (res.code === 200) {
        this.addGroupFlag = false;
        this.reqStaffTagGroup();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除成员标签组
    async reqDeleteStaffTagGroup(id) {
      let res = await reqDeleteStaffTagGroup({ id });
      if (res.code === 200) {
        this.reqStaffTagGroup();
        this.addGroupFlag = false;
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取成员客户标签组
    async reqStaffTagGroup() {
      let res = await reqStaffTagGroup({});
      if (res.code == 200) {
        if (res.data.length != 0) {
          this.groupData = JSON.parse(JSON.stringify(res.data));
          this.groupData.unshift({
            id: "",
            name: "所有",
          });
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey("");
          });
        } else {
          this.groupData = [
            {
              id: "",
              name: "所有",
            },
          ];
        }
      } else {
        this.$message.error(res.msg);
        this.groupData = [
          {
            id: "",
            name: "所有",
          },
        ];
      }
    },
    // 获取成员标签列表
    async reqGetStaffTagList() {
      let res = await reqGetStaffTagList({
        group_id: this.label.labelGroupId,
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
      });
      if (res.code === 200) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.label.labelGroupId);
        });
        this.tableData = res.data;
        this.total = res.count || 0;
      } else {
        this.tableData = [];
        this.total = 0;
        this.$message.error(res.msg);
      }
    },
    // 新增编辑成员标签
    async reqAddStaffTag(params) {
      let res = await reqAddStaffTag(params);
      if (res.code === 200) {
        this.addFlag = false;
        this.reqGetStaffTagList();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除成员标签
    async reqDeleteStaffTag(params) {
      let res = await reqDeleteStaffTag(params);
      if (res.code === 200) {
        this.addFlag = false;
        this.reqGetStaffTagList();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 新增/编辑/删除标签组 确认事件
    handleSubmitGroup() {
      if (this.operationType === "add") {
        this.$refs.label.validate((valid) => {
          if (valid) {
            this.reqAddStaffTagGroup("", this.label.labelGroupName);
          } else {
            return false;
          }
        });
      } else if (this.operationType === "delete") {
        this.reqDeleteStaffTagGroup(this.label.labelGroupId);
        return false;
      } else if (this.operationType === "edit") {
        this.$refs.label.validate((valid) => {
          if (valid) {
            this.reqAddStaffTagGroup(this.label.labelGroupId, this.label.labelGroupName);
          } else {
            return false;
          }
        });
      }
    },
    // 弹窗关闭事件
    dialogBeforeClose() {
      this.label.labelGroupName = "";
      this.operationType = "";
      this.labelType = "";
      this.label.labelValue = "";
      this.label.labelId = "";
      this.$refs.label.clearValidate();
    },
    // 多选项发生变化
    handleSelectionChange(data) {
      this.selectData = data;
    },
    // 标签组点击事件
    handleTreeNode(obj) {
      this.label.labelGroupId = obj.id;
      this.reqGetStaffTagList();
    },
    // 删除标签按钮
    handleDeleteLabel(data) {
      this.$confirm("确认删除所选标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        this.reqDeleteStaffTag({
          id: [data.id],
        });
      });
    },
    // 批量删除标签
    handleBatchDeleteLabel() {
      let id = [];
      this.selectData.forEach((item) => {
        id.push(item.id);
      });
      this.$confirm("确认删除所选标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false
      }).then(() => {
        this.reqDeleteStaffTag({
          id,
        });
      });
    },
    // 编辑标签按钮
    handleEditLabel(data) {
      this.label.labelGroupId = data.group_id;
      this.label.labelValue = data.name;
      this.label.labelId = data.id;
      this.labelType = "edit";
      this.addFlag = true;
    },

    // 删除/编辑标签组按钮
    handleCommand(commond, data) {
      this.operationType = commond;
      this.label.labelGroupId = data.id;
      this.label.labelGroupName = data.name;
      this.addGroupFlag = true;
    },
    // 新增/编辑标签 确认事件
    handleLabelSubmit() {
      if (this.labelType === "add") {
        this.$refs.label.validate((valid) => {
          if (valid) {
            let tag = [];
            let flag = true;
            tag = this.label.labelValue.split(" ");
            tag = tag.filter((res) => {
              return res;
            });
            flag = tag.every((res) => {
              return res.length <= 15;
            });
            if (flag) {
              console.log(tag);
              this.reqAddStaffTag({ name: tag, group_id: this.label.labelGroupId });
            } else {
              this.$message.warning("每个标签最多15个字");
            }
          } else {
            return false;
          }
        });
      } else if (this.labelType === "edit") {
        this.$refs.label.validate((valid) => {
          if (valid) {
            this.reqAddStaffTag({
              id: this.label.labelId,
              name: this.label.labelValue,
              group_id: this.label.labelGroupId,
            });
          } else {
            return false;
          }
        });
      }
    },
    // 查找按钮
    handleSearch() {
      if (this.keyword) {
        this.reqGetStaffTagList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@color: #333;
@size: 14px;

.right {
  margin-left: auto;
}

.custom-label {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: @size;
  color: @color;
  /deep/.el-form-item {
    margin-bottom: 0 !important;
  }
  /deep/.el-form-item__error {
    padding: 0;
    position: relative;
  }
  .el-container {
    width: 100%;
    height: calc(100vh - 135px);

    .el-main {
      height: 100%;
      padding: 0 15px;

      .title {
        width: 100%;
        height: 28px;
        line-height: 28px;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        margin: 15px 0;

        span {
          margin-left: 10px;
        }
      }
    }
  }
}

.el-aside {
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #b9c5e9;

  .group-main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .el-tree {
      position: absolute;
      min-width: 178px;
      padding-right: 5px;

      /deep/.el-tree-node > .el-tree-node__children {
        overflow: auto;
      }

      .drop-wrap {
        position: absolute;
        right: 20px;
      }
    }
  }

  // 树形控件
  /deep/.el-tree-node {
    width: 160px;

    /deep/.el-tree-node__content {
      height: 40px;
      border-radius: 6px;
    }
  }

  .tree-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .name-wrap {
      display: inline-block;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .span-wrap > i {
      margin-right: 10px;
    }
  }

  /deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #b9c5e9;
  }

  .active {
    color: #133ab3;
  }

  /deep/.el-icon-more {
    font-size: 20px;
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

.more {
  visibility: hidden;
}

.el-tree-node:hover .more {
  visibility: visible;
  color: #6881ec;
}

.el-tree-node:hover .name-wrap {
  color: #6881ec;
}
</style>
