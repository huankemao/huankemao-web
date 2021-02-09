<template>
  <div>
    <el-dialog
      custom-class="label-wrap"
      :title="labelTitle"
      :visible.sync="labelVisible"
      width="1000px"
      :close-on-click-modal="false"
      :before-close="handleCancel"
      @close="handleCancel"
    >
      <div class="scroll">
        <el-form label-position="left" label-width="auto" v-if="labelList.length !== 0">
          <el-form-item
            v-for="(item, index) in labelList"
            :key="index"
            :label="item.name"
          >
            <el-button
              @click="handlePickLabel(res.code)"
              style="margin: 5px"
              class="btn-gray"
              :disabled="type === 2"
              v-for="(res, num) in item.group"
              :key="num"
              size="small"
              :ref="res.code"
              :code="res.code"
              >{{ res.name }}</el-button
            >
            <!-- <el-button
              size="small"
              style="margin: 0 5px"
              class="btn-white"
              icon="el-icon-plus"
              @click="
                () => {
                  label.labelGroupId = item.id;
                  addFlag = true;
                }
              "
              >新建标签</el-button
            > -->
          </el-form-item>
          <!-- <el-form-item>
            <el-button
              style="margin: 20px 0 0 5px"
              size="small"
              class="btn-white"
              icon="el-icon-plus"
              @click="addGroupFlag = true"
              >新建标签组</el-button
            >
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          :disabled="labelLoading"
          class="btn-white"
          @click="handleCancel"
          >取 消</el-button
        >
        <el-button
          size="small"
          :disabled="labelLoading"
          :icon="labelLoading ? 'el-icon-loading' : ''"
          class="btn-blue"
          @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!--新建标签 -->
    <!-- <el-dialog
      width="600px"
      title="新增标签"
      :visible.sync="addFlag"
      @close="dialogBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form :model="label" :rules="labelRules" ref="label">
        <el-form-item label="选择分组" label-width="100px">
          <el-select
            style="width: 100%"
            v-model="label.labelGroupId"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in labelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签名称" label-width="100px" prop="labelValue">
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
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addFlag = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleLabelSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->

    <!-- 新建标签组 -->
    <!-- <el-dialog
      width="600px"
      title="
       新增标签组
      "
      :visible.sync="addGroupFlag"
      @close="dialogBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form :model="label" :rules="labelRules" ref="label">
        <el-form-item label="分组名称" label-width="100px" prop="labelGroupName">
          <el-input
            placeholder="请输入分组名（不得超过15个字符）"
            v-model="label.labelGroupName"
            maxlength="15"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="addGroupFlag = false"
          >取 消</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleSubmitGroup"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  reqShowStaffTag,
  reqGetStaffTagTree,
  reqAddStaffTagGroup,
  reqAddStaffTag,
} from "@/api/index";
export default {
  data() {
    return {
      labelList: [],
      loading: true,
      addGroupFlag: false,
      addFlag: false,
      label: {
        labelGroupName: "", //标签组名称
        labelValue: "", //添加标签的所有名称字符
        labelGroupId: "", //标签组id
        title: "",
        labelId: "",
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
    };
  },
  props: {
    labelTitle: {
      type: String,
    },
    labelVisible: {
      type: Boolean,
    },
    labelType: {
      type: String,
    },
    id: {
      type: Array,
      default: [],
    },
    labelLoading: {
      type: Boolean,
    },
  },
  watch: {
    labelVisible(val) {
      if (val) {
        this.getData();
      }
    },
  },
  computed: {
    type() {
      if (this.labelType === "give") {
        return 1;
      } else if (this.labelType === "remove") {
        return 2;
      }
    },
  },
  mounted() {},
  methods: {
    getData() {
      const oP = [];
      oP[0] = reqGetStaffTagTree({});
      oP[1] = reqShowStaffTag({ id: this.id, type: this.type });
      this.labelList = [];
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
          this.labelList = res[0].data;
        } else {
          this.labelList = [];
          this.$message.error(res.msg);
        }
        if (res[1].code === 200) {
          if (res[1].data.length !== 0) {
            if (this.type === 1) {
              res[1].data.forEach((item) => {
                this.$nextTick(() => {
                  this.$refs[item][0].$el.classList.add("btn-blue");
                  this.$refs[item][0].$el.classList.add("pick");
                  this.$refs[item][0].$el.setAttribute("disabled", "");
                  this.$refs[item][0].$el.classList.add("is-disabled");
                });
              });
            } else if (this.type === 2) {
              res[1].data.forEach((item) => {
                this.$nextTick(() => {
                  this.$refs[item][0].$el.classList.add("btn-blue");
                  this.$refs[item][0].$el.classList.add("pick");
                  this.$refs[item][0].$el.removeAttribute("disabled");
                  this.$refs[item][0].$el.classList.remove("is-disabled");
                });
              });
            }
          }
        } else {
          this.$message.error(res.msg);
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
        this.getData();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 新增编辑成员标签
    async reqAddStaffTag(params) {
      let res = await reqAddStaffTag(params);
      if (res.code === 200) {
        this.addFlag = false;
        this.getData();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 选择标签
    handlePickLabel(code) {
      let flag = this.$refs[code][0].$el.className.split(" ").some((res) => {
        return res == "pick";
      });
      let oDoms = document.querySelectorAll(".pick");
      if (oDoms.length >= 20 && !flag) {
        this.$message.warning("企业成员标签最多设置20个");
      } else {
        this.$refs[code][0].$el.classList.toggle("btn-blue");
        this.$refs[code][0].$el.classList.toggle("pick");
      }
    },
    // 取消操作
    handleCancel() {
      this.$emit("labelFun", "cancel");
    },
    // 确定操作
    handleConfirm() {
      let oDoms = document.querySelectorAll(".pick");
      let tag_ids = [];
      [...oDoms].forEach((item) => {
        tag_ids.push(item.getAttribute("code"));
      });
      if (tag_ids.length !== 0) {
        this.$emit("labelFun", "confirm", tag_ids);
      } else {
        this.$message.error("请选择标签后进行操作");
      }
    },
    // 弹窗关闭事件
    dialogBeforeClose() {
      this.label.labelGroupName = "";
      this.label.labelValue = "";
      this.label.labelId = "";
      this.$refs.label.clearValidate();
    },
    // 确认新增标签
    handleLabelSubmit() {
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
            this.reqAddStaffTag({ name: tag, group_id: this.label.labelGroupId });
          } else {
            this.$message.error("每个标签最多15个字");
          }
        } else {
          return false;
        }
      });
    },
    // 确定新增标签组
    handleSubmitGroup() {
      this.$refs.label.validate((valid) => {
        if (valid) {
          this.reqAddStaffTagGroup("", this.label.labelGroupName);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
.label-wrap {
  /deep/.el-dialog__body {
    height: 600px !important;
  }
}
/deep/.el-form-item__label {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
</style>
