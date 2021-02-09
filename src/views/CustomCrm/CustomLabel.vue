<template>
  <div class="custom-label">
    <el-container>
      <el-aside class="tabs" style="width: 210px">
        <div class="group-main">
          <el-button size="small" class="btn-blue" @click="handleAddLabelGroup"
            >新增分组</el-button
          >
          <el-tree
            style="margin-top: 20px"
            :data="groupData"
            node-key="code"
            ref="tree"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="handleTreeNode"
            :highlight-current="true"
            :current-node-key="code"
          >
            <template slot-scope="{ node, data }">
              <div class="tree-wrap">
                <span :class="code === data.code ? 'active name-wrap' : 'name-wrap'">{{
                  data.name
                }}</span>
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
            @click="delTags"
            >删除标签</el-button
          >
          <el-button
            :disabled="selectData.length !== 0"
            size="small"
            :class="selectData.length === 0 ? 'btn-blue' : 'btn-opacity'"
            @click="handleAddLabel"
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
            <el-table-column prop="customer_num" label="客户数"> </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="editLabel(scope.row)">编辑</el-button>
                <el-button type="text" @click="delLabel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
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
      </el-main>
    </el-container>
    <!--新建标签 -->
    <el-dialog
      width="600px"
      :title="
        operationType2 === 'add'
          ? '新增标签'
          : operationType2 === 'edit'
          ? '编辑标签'
          : operationType2 === 'delete'
          ? '删除标签'
          : ''
      "
      :visible.sync="addGroupFlag2"
      @close="dialogBeforeClose()"
      :close-on-click-modal="false"
    >
      <el-form
        style="margin-top: 20px"
        v-show="operationType2 === 'add' || operationType2 === 'edit'"
        :model="label"
        :rules="labelRules"
        ref="label"
      >
        <el-form-item
          label="选择分组"
          label-width="100px"
          v-show="operationType2 === 'add'"
          size="small"
        >
          <el-select
            style="width: 100%"
            v-model="label.labelGroupId"
            placeholder="请选择"
            @change="change"
          >
            <el-option
              v-for="item in groupData2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择分组"
          label-width="100px"
          v-show="operationType2 === 'edit'"
        >
          <el-select
            style="width: 100%"
            v-model="label.labelGroupId"
            placeholder="请选择"
            @change="change"
            size="small"
          >
            <el-option
              v-for="item in groupData2"
              :key="item.code"
              :label="item.name"
              :value="item.code"
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
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="" label-width="100px">
          <span style="font-size: 12px; color: #999"
            >每个标签名称最多15个字，同时新建多个标签时，请用“空格” 隔开。</span
          >
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px" v-show="operationType2 === 'delete'">
        确定删除标签【{{ label.labelGroupName }}】吗?
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addGroupFlag2 = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleSubmitLabel"
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
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-show="operationType === 'add'"
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
        <el-form-item v-show="operationType === 'add'" label="" label-width="100px">
          <span style="font-size: 12px; color: #999"
            >标签名称最多15个字符，同时新建多个标签时，请用“空格”隔开。</span
          >
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
  reqGetCustomTagGroup,
  reqGetCustomTag,
  reqUpload,
  reqAddCustomLabel,
  reqEditCustomLabel,
  reqEditCustomTag,
} from "@/api/index";
export default {
  data() {
    return {
      tagId: "",
      addGroupFlag: false,
      addGroupFlag2: false,
      page: 1,
      total: 0,
      limit: 10,
      value: "",
      checkIndex: "default",
      tableData: [],
      groupData: [],
      groupData2: [],
      showCourse: false,
      code: "",
      groupId: "",
      loading: false,
      imageUrl: "",
      syncDate: "",
      selectData: [],
      label: {
        labelGroupName: "", //新增标签组名称
        labelValue: "", //添加标签的所有名称字符
        loading: false,
        labelGroupId: "", //标签组id
        visible: false,
        groupName: "",
        title: "",
      },
      operationType: "",
      operationType2: "",
      code: "",
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
        this.reqGetCustomTag();
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
      oP[0] = reqGetCustomTagGroup({});
      oP[1] = reqGetCustomTag({
        code: this.code,
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
              code: "",
              name: "所有",
            });
            this.syncDate = res[0].data[0].update_at;
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey("");
            });
            this.reqGetCustomTag();
          } else {
            this.groupData = [
              {
                code: "",
                name: "所有",
              },
            ];
            this.code = "";
          }
        } else {
          this.$message.error(res[0].msg);
          this.groupData = [
            {
              code: "",
              name: "所有",
            },
          ];
          this.code = "";
        }
        if (res[1].code == 200) {
          this.tableData = res[1].data;
          this.total = res[1].count;
        } else {
          this.$message.error(res[1].msg);
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    // 获取客户标签组
    async reqGetCustomTagGroup() {
      let res = await reqGetCustomTagGroup({});
      if (res.code == 200) {
        if (res.data.length != 0) {
          this.groupData = JSON.parse(JSON.stringify(res.data));
          this.groupData.unshift({
            code: "",
            name: "所有",
          });
          this.syncDate = res.data[0].update_at;
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.code);
          });
          this.reqGetCustomTag();
        } else {
          this.groupData = [
            {
              code: "",
              name: "所有",
            },
          ];
          this.code = "";
          this.total = 0;
        }
      } else {
        this.$message.error(res.msg);
        this.groupData = [
          {
            code: "",
            name: "所有",
          },
        ];
        this.code = "";
        this.total = 0;
      }
    },
    // 获取客户标签列表
    async reqGetCustomTag() {
      this.loading = true;
      let res = await reqGetCustomTag({
        code: this.code,
        limit: this.limit,
        page: this.page,
        keyword: this.keyword,
      });
      this.loading = false;
      if (res.code == 200) {
        this.tableData = res.data;
        this.total = res.count;
      } else {
        this.$message.error(res.msg);
        this.tableData = [];
      }
    },
    // 新增客户标签
    async reqAddCustomLabel(option) {
      let res = await reqAddCustomLabel(option);
      if (res.code === 200) {
        this.getData();
        this.addGroupFlag2 = false;
        this.addGroupFlag = false;
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 点击树形控件分组
    handleTreeNode(data) {
      this.page = 1;
      this.groupId = data.id;
      this.label.labelGroupId = data.id;
      this.code = data.code;
      this.reqGetCustomTag();
    },
    // 分组操作
    handleCommand(command, data) {
      this.operationType = command;
      if (command === "add") {
        this.parent_id = data.id;
        this.addGroupFlag = true;
      } else if (command === "edit") {
        this.code = data.code;
        this.group_id = data.id;
        this.label.labelGroupName = data.name;
        this.addGroupFlag = true;
      } else if (command === "delete") {
        this.group_id = data.id;
        this.label.labelGroupName = data.name;
        this.addGroupFlag = true;
      }
    },
    handleSelectionChange(data) {
      this.selectData = data;
    },
    change() {
      console.log(this.label.labelGroupId);
    },
    editLabel(data) {
      this.tagId = data.id;
      this.label.labelGroupId = data.parent_code;
      this.label.labelValue = data.name;
      this.operationType2 = "edit";
      this.addGroupFlag2 = true;
      // this.tagCode=data.code;
    },
    delLabel(data) {
      console.log(data);
      this.tagId = data.id;

      this.label.labelGroupName = data.name;
      // this.operationType2 = 'delete';
      // this.addGroupFlag2 = true;
      this.$confirm("确认删除该标签？", "提示", {
        cancelButtonClass: "btn-white",
        confirmButtonClass: "btn-blue",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(() => {
          var arr = [];
          arr.push(this.tagId);
          this.delTag(arr);
        })
        .catch(() => {});
    },
    // 切换分组目标
    handleCheckList(index, code) {
      this.code = code;
      this.reqGetCustomTag();
      this.checkIndex = index;
    },
    // 改变每页条数
    handleLimitChange(limit) {
      this.limit = limit;
      this.reqGetCustomTag();
    },
    // 改变当前页码
    handlePageChange(page) {
      this.page = page;
      this.reqGetCustomTag();
    },
    async handleSubmitGroup() {
      if (this.operationType == "add") {
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
                group_name: this.label.labelGroupName,
                tag,
              });
            } else {
              this.$message.warning("每个标签最多15个字");
            }
          }
        });
      } else if (this.operationType == "edit") {
        let res = await reqEditCustomLabel({
          code: this.code,
          type: 1,
          name: this.label.labelGroupName,
        });
        if (res.code == 200) {
          this.addGroupFlag = false;
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.getData();
        }
      } else if (this.operationType == "delete") {
        let res = await reqEditCustomLabel({
          code: this.code,
          type: 2,
        });
        if (res.code == 200) {
          this.addGroupFlag = false;
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getData();
        }
      }
    },
    // 确认新增标签/标签组
    async handleSubmitLabel() {
      if (this.operationType2 == "add") {
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
              this.$message.warning("每个标签最多15个字");
            }
          }
        });
      } else if (this.operationType2 == "edit") {
        let res = await reqEditCustomTag({
          id: this.tagId,
          type: 1,
          name: this.label.labelValue,
          parent_code: this.label.labelGroupId,
        });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.addGroupFlag2 = false;
          this.getData();
        }
      }
    },
    delTags() {
      this.$confirm("确认删除标签？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false,
      })
        .then(async () => {
          var arr = [];
          this.selectData.map((item) => {
            arr.push(item.id);
          });
          this.delTag(arr);
        })
        .catch(() => {});
    },
    async delTag(arr) {
      let res = await reqEditCustomTag({
        id: arr,
        type: 2,
      });
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.addGroupFlag2 = false;
        this.getData();
      }
    },
    // 弹窗关闭之前
    dialogBeforeClose(done) {
      this.$refs["label"].resetFields();
      // this.$refs["labelForm2"].resetFields();
    },
    // 新建标签
    handleAddLabel() {
      // this.label.title = "新建标签";
      this.operationType2 = "add";

      this.label.labelValue = "";
      this.label.labelGroupId = this.label.labelGroupId || this.groupData[1].id;
      this.addGroupFlag2 = true;
    },
    // 新增标签组
    handleAddLabelGroup() {
      this.operationType = "add";
      this.label.labelGroupName = "";
      this.label.labelValue = "";
      this.label.labelGroupId = "";
      this.addGroupFlag = true;
    },
    // 查找按钮
    handleSearch() {
      if (this.keyword) {
        this.reqGetCustomTag();
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
