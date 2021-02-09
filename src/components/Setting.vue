<template>
  <el-dialog
    top="0"
    title="系统设置"
    :visible.sync="setVisible"
    width="1300px"
    :before-close="handleCloseSet"
    v-if="setVisible"
  >
    <div class="scroll">
      <div
        class="main"
        v-loading="loading"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
      >
        <p>
          <span></span>
          <span>企业微信配置</span>
        </p>
        <span class="info" v-show="success"
          >数据同步成功，无法修改配置。如需重新配置，请重新安装系统（重新安装需删除应用根目录下的install/install.lock）</span
        >
        <span class="info" v-show="!success">
          配置信息有误，数据同步失败，请重新修改配置</span
        >
        <el-form
          style="margin-top: 10px"
          label-position="left"
          label-width="240px"
          ref="form1"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="企业ID" prop="wxk_id">
            <el-input
              :disabled="wxIdDisabled"
              size="small"
              v-model="form.wxk_id"
              @blur="handleIdBlur"
            ></el-input>
            <img
              @click="handleHelp(1)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="通讯录Secret" prop="wxk_address_book_secret">
            <el-input size="small" v-model="form.wxk_address_book_secret"></el-input>
            <img
              @click="handleHelp(2)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="客户管理Secret" prop="wxk_customer_admin_secret">
            <el-input size="small" v-model="form.wxk_customer_admin_secret"></el-input>
            <img
              @click="handleHelp(3)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="客户管理回调URL" prop="wxk_customer_callback_url" required>
            <el-input
              :disabled="true"
              style="width: 610px"
              size="small"
              v-model="form.wxk_customer_callback_url"
            ></el-input>
            <el-button
              size="small"
              class="btn-blue"
              @click="handleCopy($event, form.wxk_customer_callback_url)"
              >一键复制</el-button
            >
            <img
              @click="handleHelp(4)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="客户管理回调token" prop="wxk_customer_callback_token">
            <el-input
              @blur="handleTokenBlur"
              style="width: 520px"
              size="small"
              v-model="form.wxk_customer_callback_token"
            ></el-input>
            <el-button size="small" class="btn-white" @click="handleRandom('token')"
              >随机生成</el-button
            >
            <el-button
              size="small"
              class="btn-blue"
              @click="handleCopy($event, form.wxk_customer_callback_token)"
              >一键复制</el-button
            >
            <img
              @click="handleHelp(5)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item
            label="客户管理回调EncodongAESKey"
            prop="wxk_customer_callback_key"
          >
            <el-input
              @blur="handleKeyBlur"
              style="width: 520px"
              size="small"
              v-model="form.wxk_customer_callback_key"
            ></el-input>
            <el-button size="small" class="btn-white" @click="handleRandom('key')"
              >随机生成</el-button
            >
            <el-button
              size="small"
              class="btn-blue"
              @click="handleCopy($event, form.wxk_customer_callback_key)"
              >一键复制</el-button
            >
            <img
              @click="handleHelp(6)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
        </el-form>
        <p>
          <span></span>
          <span>自建应用配置</span>
        </p>
        <el-form
          style="margin-top: 10px"
          label-position="left"
          label-width="240px"
          ref="form2"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="自建应用AgentId" prop="wxk_app_agent_id">
            <el-input size="small" v-model="form.wxk_app_agent_id"></el-input>
            <img
              @click="handleHelp(8)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="自建应用Secret" prop="wxk_app_secret">
            <el-input size="small" v-model="form.wxk_app_secret"></el-input>
            <img
              @click="handleHelp(9)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="授权登录回调域">
            <el-input
              style="width: 610px"
              disabled
              size="small"
              v-model="domain"
            ></el-input>
            <el-button size="small" class="btn-blue" @click="handleCopy($event, domain)"
              >一键复制</el-button
            >
            <img
              @click="handleHelp(10)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="下载应用Logo">
            <div class="download">
              <img src="../assets/images/logo.png" width="75" alt="" />
              <el-button
                size="small"
                class="btn-blue"
                @click="
                  () => {
                    downloadIamge();
                  }
                "
                >点击下载</el-button
              >
            </div>
          </el-form-item>
        </el-form>
        <p>
          <span></span>
          <span>公众号配置</span>
        </p>
        <el-form
          style="margin-top: 10px"
          label-position="left"
          label-width="240px"
          ref="form3"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="Appid">
            <el-input
              :disabled="appIdDisabled"
              size="small"
              v-model="form.wxk_public_app_id"
            ></el-input>
            <img
              @click="handleHelp(11)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="AppSecret">
            <el-input size="small" v-model="form.wxk_public_app_secret"></el-input>
            <img
              @click="handleHelp(12)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
        </el-form>
        <p>
          <span></span>
          <span>聊天工具栏配置</span>
        </p>
        <span class="info"
          >工具栏配置应用于【聊天工具栏】-【聊天资料】功能，且须提前配置自建应用</span
        >
        <el-form
          style="margin-top: 10px"
          label-position="left"
          label-width="240px"
          ref="form3"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="聊天资料应用主页">
            <el-input
              style="width: 610px"
              disabled
              size="small"
              v-model="chat_app_home_url"
            ></el-input>
            <el-button
              size="small"
              class="btn-blue"
              @click="handleCopy($event, chat_app_home_url)"
              >一键复制</el-button
            >
            <img
              @click="handleHelp(13)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="可信域名配置">
            <el-input
              style="width: 610px"
              disabled
              size="small"
              v-model="domain"
            ></el-input>
            <el-button size="small" class="btn-blue" @click="handleCopy($event, domain)"
              >一键复制</el-button
            >
            <img
              @click="handleHelp(14)"
              style="margin-left: 10px; cursor: pointer"
              src="../assets/images/help.png"
              width="14px"
              alt=""
            />
          </el-form-item>
          <el-form-item label="域名校验">
            <el-upload
              v-if="fileList.length === 0"
              :action="reqUploadFile"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :data="uploadData"
              name="domain_verification_file"
              :before-upload="beforeImgUpload"
              multiple
              :limit="1"
            >
              <el-button
                style="margin-left: 0px"
                class="btn-blue"
                icon="el-icon-upload"
                size="small"
                >上传校验文件</el-button
              >
            </el-upload>
            <p class="file-list" v-else>
              {{ fileList[0].name }} <i @click="fileList = []" class="el-icon-close"></i>
            </p>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin: 20px 0 0"
              size="small"
              class="btn-blue"
              @click="handleSubmit"
              >保存配置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div v-if="setVisible">
        <div id="footer"></div>
        <remote-js src="https://cdn.wulabh.com/ptsc/1.0.0/ptsc.min.js"></remote-js>
        <remote-js src="https://cdn.wulabh.com/jquery/2.1.4/jquery.min.js"></remote-js>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  reqGetWechatList,
  reqAddWechat,
  reqSyncConfig,
  reqDelConfig,
  reqGetConfigRandom,
  reqGetCallbackUrl,
  reqUploadFile,
} from "@/api/index";
import Clipboard from "clipboard";
import md5 from "js-md5";

export default {
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  props: {
    setVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        wxk_address_book_secret: "",
        wxk_id: "",
        wxk_customer_callback_url: "",
        wxk_customer_admin_secret: "",
        wxk_customer_callback_token: "",
        wxk_customer_callback_key: "",
        wxk_app_agent_id: "",
        wxk_app_secret: "",
        wxk_public_app_id: "",
        wxk_public_app_secret: "",
        domain_verification_file: "", //可信域名文件地址
      },
      loading: false,
      loadingText: "拼命加载中...",
      rules: {
        wxk_address_book_secret: [
          { required: true, message: "请输入通讯录Secret", trigger: "blur" },
        ],
        wxk_customer_admin_secret: [
          {
            required: true,
            message: "请输入客户管理Secret",
            trigger: "blur",
          },
        ],
        wxk_id: [
          {
            required: true,
            message: "请输入企业ID",
            trigger: "blur",
          },
        ],
        wxk_customer_callback_token: [
          {
            required: true,
            message: "请输入客户管理回调Token",
            trigger: "blur",
          },
        ],
        wxk_customer_callback_key: [
          {
            required: true,
            message: "请输入客户管理回调EncodongAESKey",
            trigger: "blur",
          },
        ],
        wxk_app_agent_id: [
          {
            required: true,
            message: "请输入自建应用AgentId",
            trigger: "blur",
          },
        ],
        wxk_app_secret: [
          {
            required: true,
            message: "请输入自建应用Secret",
            trigger: "blur",
          },
        ],
      },
      success: false,
      page: 1,
      limit: 10,
      keyword: "",
      domain: "",
      chat_app_home_url: "", //聊天资料应用主页
      fileList: [], // 上传文件列表
      reqUploadFile: "", // 文件上传地址
      uploadData: {}, // 上传文件参数
      wxIdDisabled: false,
      appIdDisabled: false,
    };
  },
  watch: {
    setVisible(val) {
      if (val) {
        this.getConfigAll();
      }
    },
  },
  created() {
    let time = parseInt(new Date().getTime() / 1000);
    let user_id = localStorage.getItem("user_id") || "";
    let token = localStorage.getItem("token") || "";
    let sign = md5(
      user_id + token + time + md5("huankemaoupload_domain_verification_file")
    );
    this.uploadData.time = time;
    this.uploadData.user_id = user_id;
    this.uploadData.token = token;
    this.uploadData.sign = sign;
    this.reqUploadFile = reqUploadFile;
  },
  methods: {
    // 获取初始化配置
    getConfigAll() {
      this.loading = true;
      const oP = [];
      oP[0] = reqGetWechatList({
        page: 1,
        limit: 1,
        keyword: "",
      });
      oP[1] = reqGetCallbackUrl({});
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
          if (res[0].data.length !== 0) {
            this.form = {
              id: res[0].data[0].id,
              wxk_address_book_secret: res[0].data[0].wxk_address_book_secret,
              wxk_id: res[0].data[0].wxk_id,
              wxk_customer_admin_secret: res[0].data[0].wxk_customer_admin_secret,
              wxk_customer_callback_token: res[0].data[0].wxk_customer_callback_token,
              wxk_customer_callback_key: res[0].data[0].wxk_customer_callback_key,
              wxk_app_agent_id: res[0].data[0].wxk_app_agent_id,
              wxk_app_secret: res[0].data[0].wxk_app_secret,
              wxk_public_app_id: res[0].data[0].wxk_public_app_id,
              wxk_public_app_secret: res[0].data[0].wxk_public_app_secret,
            };
            if (res[0].data[0].domain_verification_file) {
              this.fileList = [
                {
                  name: "域名校验文件.txt",
                  url: res[0].data[0].domain_verification_file,
                },
              ];
            } else {
              this.fileList = [];
            }
            if (Boolean(res[0].data[0].wxk_id)) {
              this.wxIdDisabled = true;
            } else {
              this.getToken();
              this.getKey();
              this.reqGetConfigRandom();
              this.wxIdDisabled = false;
            }
            if (Boolean(res[0].data[0].wxk_public_app_id)) {
              this.appIdDisabled = true;
            } else {
              this.appIdDisabled = false;
            }
          } else {
            this.form = {
              wxk_address_book_secret: "",
              wxk_id: "",
              wxk_customer_callback_url: "",
              wxk_customer_admin_secret: "",
              wxk_customer_callback_token: "",
              wxk_customer_callback_key: "",
              wxk_app_agent_id: "",
              wxk_app_secret: "",
              wxk_public_app_id: "",
              wxk_public_app_secret: "",
            };
            this.getToken();
            this.getKey();
            this.reqGetConfigRandom();
            this.wxIdDisabled = false;
            this.appIdDisabled = false;
          }
        } else {
          this.$message.error(res[0].msg);
          this.wxIdDisabled = false;
          this.appIdDisabled = false;
        }

        if (res[1].code === 200) {
          this.form.wxk_customer_callback_url = res[1].data.wxk_customer_callback_url;
          this.form.domain_verification_file = res[1].data.domain_verification_file;
          this.domain = res[1].data.domain;
          this.chat_app_home_url = res[1].data.chat_app_home_url;
        } else {
          this.$message.error(res[1].msg);
          this.domain = "";
          this.chat_app_home_url = "";
        }
      });
    },
    // 修改ID
    async editId() {
      let res = await reqGetConfigRandom({
        type: 6,
        wxk_id: this.form.wxk_id,
      });
    },
    // 修改ID
    handleIdBlur() {
      if (this.form.wxk_id) {
        this.editId();
      }
    },
    // 新增编辑企业微信
    async reqAddWechat(flag) {
      let res = await reqAddWechat(this.form);
      this[flag] = true;
      if (res.code == 200) {
        this.reqSyncConfig();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 项目初始化同步
    async reqSyncConfig() {
      this.loading = true;
      this.loadingText = "项目初始化同步中...";
      let res = await reqSyncConfig({});
      this.loading = false;
      this.loadingText = "";
      if (res.code == 200) {
        this.getConfigAll();
        this.$message.success("项目初始化同步成功！");
      } else {
        this.reqDelConfig();
        this.$message.error("项目初始化同步失败！");
      }
    },

    // 同步失败删除项目配置
    async reqDelConfig() {
      let res = await reqDelConfig({});
      this.reqGetWechatList();
    },
    // 获取全部配置信息
    async reqGetConfigRandom() {
      let res = await reqGetConfigRandom({ type: 3 });
      if (res.code === 200) {
        this.form.wxk_customer_callback_url = res.data.path;
        this.form.wxk_customer_callback_token = res.data.token;
        this.form.wxk_customer_callback_key = res.data.aes_key;
        this.domain = res.data.domain;
      } else {
        this.$message.error(res.msg);
        this.form.wxk_customer_callback_url = "";
        this.form.wxk_customer_callback_token = "";
        this.form.wxk_customer_callback_key = "";
        this.domain = "";
      }
    },
    // 获取回调Token
    async getToken() {
      let res = await reqGetConfigRandom({ type: 1 });
      if (res.code === 200) {
        this.form.wxk_customer_callback_token = res.data.token;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取回调密钥
    async getKey() {
      let res = await reqGetConfigRandom({ type: 2 });
      if (res.code === 200) {
        this.form.wxk_customer_callback_key = res.data.aes_key;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 修改ID
    async editId() {
      let res = await reqGetConfigRandom({
        type: 6,
        wxk_id: this.form.wxk_id,
      });
    },
    // 修改token
    async editToken() {
      let res = await reqGetConfigRandom({
        type: 4,
        wxk_customer_callback_token: this.form.wxk_customer_callback_token,
      });
      this.tokenDis = true;
    },
    // 修改key
    async editKey() {
      let res = await reqGetConfigRandom({
        type: 5,
        wxk_customer_callback_aes_key: this.form.wxk_customer_callback_key,
      });
      this.keyDis = true;
    },
    // 提交
    handleSubmit() {
      let oP = [];
      this.$refs["form1"].validate((valid) => {
        if (valid) {
          oP[0] = true;
        } else {
          oP[0] = false;
        }
      });
      this.$refs["form2"].validate((valid) => {
        if (valid) {
          oP[1] = true;
        } else {
          oP[1] = false;
        }
      });
      this.$refs["form3"].validate((valid) => {
        if (valid) {
          oP[2] = true;
        } else {
          oP[2] = false;
        }
      });
      Promise.all(oP).then((res) => {
        if (res[0] && res[1] && res[2]) {
          this.reqAddWechat();
        }
      });
    },
    // 一键复制
    handleCopy(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text });
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.onClick(e);
    },
    // 随机生成
    handleRandom(option) {
      if (option === "token") {
        this.getToken();
      } else if (option === "key") {
        this.getKey();
      }
    },
    // 修改ID
    handleIdBlur() {
      if (this.form.wxk_id) {
        this.editId();
      }
    },
    // 修改token
    handleTokenBlur() {
      if (/^[0-9a-zA-Z]{1,30}$/gi.test(this.form.wxk_customer_callback_token)) {
        this.editToken();
      } else {
        this.$message.warning("请输入长度30位以内的字母、数字");
      }
    },
    // 修改key
    handleKeyBlur() {
      if (/^[0-9a-zA-Z]{43}$/gi.test(this.form.wxk_customer_callback_key)) {
        this.editKey();
      } else {
        this.$message.warning("请输入固定长度43位的字母、数字");
      }
    },
    // 帮助
    handleHelp(domIndex) {
      this.$bus.$emit("showHelp", domIndex);
    },
    // 关闭帮助
    close(flag) {
      this.helpVisible = flag;
    },
    // 关闭弹窗
    handleCloseSet(done) {
      this.$emit("handleCloseSet");
    },
    // 图片下载
    downloadIamge() {
      var alink = document.createElement("a");
      alink.href = "/logo.png";
      alink.download = "自建应用Logo"; //图片名
      alink.click();
    },
    // 上传完成的回调
    handleSuccess(res, file, fileList) {
      this.fileList = fileList;
      if (res.code === 200) {
        this.form.domain_verification_file = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 上传列表改变的回调
    handleRemove(file, fileList) {
      this.fileList = fileList;
      if (fileList.length === 0) {
        this.form.domain_verification_file = "";
      }
    },
    // 文件格式校验
    beforeImgUpload(file) {
      const isTxt = file.type === "text/plain";
      const isLt1M = file.size / 1024 / 1024 <= 1;
      if (!isTxt) {
        this.$message.error("上传校验文件只能是 txt 格式!");
      } else if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
      }
      return isTxt && isLt1M;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  > p {
    display: flex;
    align-items: center;
    height: 32px;
    background: #e5ebfb;
    border-radius: 4px 4px 0px 0px;
    margin-top: 5px;

    > :nth-child(1) {
      width: 3px;
      height: 16px;
      background: #6881ec;
      border-radius: 2px;
      margin: 0 10px;
    }
    > :nth-child(2) {
      font-size: 16px;
      font-weight: bold;
      color: #6881ec;
    }
  }
  .info {
    width: calc(100% - 20px);
    height: 32px;
    margin-top: 10px;
    background: #fff7e6;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #f5daa3;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 32px;
  }
}
/deep/ .el-input {
  width: 700px;
}
.el-button {
  margin-left: 10px;
}
/deep/.el-dialog {
  margin-bottom: 0px;
}
/deep/.el-form-item__error {
  position: relative !important;
}
/deep/.el-form-item {
  margin-bottom: 0 !important;
}
.download {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    margin-bottom: 15px;
  }
  .el-button {
    margin-left: 0px;
  }
}
.hide /deep/.el-upload--text {
  display: none;
}
.file-list {
  width: 670px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  padding: 0 15px;
  height: 30px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  i {
    visibility: hidden;
  }
  &:hover {
    background-color: #f5f7fa;
  }
  &:hover i {
    visibility: visible;
  }
}
</style>
