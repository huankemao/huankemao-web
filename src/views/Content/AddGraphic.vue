<template>
  <div class="add_graphic">
    <div class="top">
      <h4>{{ title_name }}</h4>
      <el-button size="small" class="btn-blue" @click="Return">返回</el-button>
    </div>
    <el-form label-position="left" label-width="180px" :model="formLabelAlign" class="group-main" ref="formLabelAlign"
      :rules="rule">
      <el-form-item label="选择分组">
        <!-- <SelectTree :options="groupList" :props="contProps" :accordion="false" :value="content_group_id" @getValue="handleChange" /> -->
        <el-cascader :props="defaultProps2" v-model="formLabelAlign.content_group_id" :options="groupList"
          @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="标题" class="limitContent" prop="title" :rules="[{ required: true, message: '请输入文章标题' }]">
        <el-input placeholder="输入文章标题（请勿输入特殊字符）" v-model="formLabelAlign.title" maxlength="32" show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item :label="'封面\n（建议尺寸200*200）'" prop="cover" :rules="[{ required: true, message: '请选择封面图片' }]">
        <el-row>
          <el-col>
            <img v-if="formLabelAlign.cover" :src="formLabelAlign.cover" class="avatar"
              @click=" () => { (pickVisible = true), (dioType = 1); } " />
            <i v-else class="el-icon-plus avatar-uploader-icon"
              @click=" () => { (pickVisible = true), (dioType = 1); } "></i>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item class="limitContent" label="摘要（选填）" prop="summary" :rules="[{ required: true, message: '请输入文章摘要' }]">
        <el-input type="textarea" resize="none" placeholder="请输入内容" v-model="formLabelAlign.summary" maxlength="128"
          show-word-limit></el-input>
      </el-form-item>
      <el-form-item class="limitContent" label="作者（选填）">
        <el-input v-model="formLabelAlign.user" maxlength="11" show-word-limit></el-input>
      </el-form-item>
      <el-form-item class="limitContent" label="原文链接（选填）" prop="link">
        <el-input v-model="formLabelAlign.link"></el-input>
      </el-form-item>
      <!-- <el-form-item class="limitContent" label="聊天工具栏正式发布（选填）" prop="source" v-if="open">
        <el-switch v-model="formLabelAlign.source" :active-value="2" :inactive-value="1"></el-switch>
      </el-form-item> -->
      <el-form-item label="说明（选填）" class="limitContent">
        <el-input v-model="formLabelAlign.explain" maxlength="255" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="正文" prop="content" :rules="[{ required: true, message: '请输编辑正文' }]">
        <div class="content">
          <editor-bar v-model="formLabelAlign.content" :isClear="isClear" @change="edtiorContentChange"></editor-bar>
        </div>
      </el-form-item>
      <div class="bottom">
        <el-button size="small" class="btn-white" @click="look">预 览</el-button>
        <el-button size="small" class="btn-blue" @click="submit">提 交</el-button>
      </div>
    </el-form>
    <!-- 二维码预览 -->
    <el-dialog title="预览" :visible.sync="dio1"  class="addText" @close="codeClose">
      <div class="qrcode" ref="qrCodeUrl"></div>
      <div class="tip">手机微信扫码预览</div>
    </el-dialog>
    <!-- 素材库 -->
    <el-dialog title="选择素材" :visible.sync="pickVisible" width="730px" :close-on-click-modal="false">
      <div class="btns-top">
        <SelectTree :options="allContGroupList" :props="contProps" :accordion="false" :value="pickGroupId"
          @getValue="getPickGroupId" />
        <el-input style="width: 200px" size="small" placeholder="输入标题/内容进行搜索" v-model="contSearch" maxlength="50">
        </el-input>
        <el-button size="small" class="btn-blue" @click="
            () => {
              ContentList();
            }
          ">
          查找
        </el-button>
        <el-button size="small" class="btn-white" @click="
            () => {
              contSearch = '';
              ContentList();
            }
          ">
          清空
        </el-button>
        <el-button v-show="type === 2" size="small" class="btn-blue" @click="
            () => {
              uploadVisible = true;
            }
          ">
          本地上传
        </el-button>
      </div>
      <div class="img-wrap">
        <span v-show="contList.length === 0" style="display: inline-block; margin: auto">暂无数据</span>
        <div v-show="contList.length !== 0" class="list" @click="handlePickImg(item)" :ref="item.id"
          v-for="(item, index) in contList" :key="index">
          <span class="ly">素材来源：{{ item.source === 1 ? "素材库" : "活码" }}--{{
              item.content_group_name
            }}</span>
          <img :src="item.content" class="pick-img" alt="" />
          <span class="bgc">{{ item.file_name }}</span>
        </div>
      </div>
      <div class="pagination" v-show="contTotal !== 0">
        <el-pagination @size-change="
            (limit) => {
              contLimit = limit;
              ContentList();
            }
          " @current-change="
            (page) => {
              contPage = page;
              ContentList();
            }
          " :current-page="contPage" :page-sizes="[10, 20, 50, 100]" :page-size="contLimit"
          layout="total, prev, pager, next, jumper" :total="contTotal"></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handlePickCancel">取 消</el-button>
        <el-button size="small" class="btn-blue" @click="handlePickConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 本地上传 -->
    <el-dialog title="上传图片素材" :visible.sync="uploadVisible" :close-on-click-modal="false" width="500px"
      @close="closeDialog('uploadForm')">
      <el-form style="margin-top: 20px" label-position="left" label-width="150px" ref="uploadForm" :model="uploadForm">
        <el-form-item style="margin-bottom: 10px" label="上传图片" prop="uploadFile" :rules="[
					  { required: true, message: '请选择图片'},
					]">
          <el-upload :class="hideUpload ? 'hide avatar-uploader' : 'avatar-uploader'" :action="uploadUrl"
            :data="uploadData" :show-file-list="false" :on-change="handleUploadChange" :on-remove="handleUploadRemove"
            :on-success="reqUploadSuccess" :before-upload="beforeImgUpload">
            <img v-if="uploadForm.uploadFile" :src="uploadForm.uploadFile" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              （图片大小不超过2M，支持JPG、JPEG及PNG格式）
            </div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="是否发布到正式" prop="source"
          ><el-switch
            v-model="uploadForm.source"
            :active-value="2"
            :inactive-value="1"
          ></el-switch
        ></el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" class="btn-white" @click="handleUploadCancel">取 消</el-button>
        <el-button size="small" class="btn-blue" @click="uploadSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import EditorBar from "../../components/wangwangEditor/wangwangEditor";
  import md5 from "js-md5";
  import SelectTree from "@/components/SelectTree";
  import QRCode from "qrcodejs2";
  import {
    ContentGroupList,
    uploadUrl,
    ContentAdd,
    Upload,
    ContentEdit,
    reqGetContentGroupList,
    ContentList,
    ContentPriview,
    ContentInfo,
  } from "@/api/index";
  export default {
    name: "editor",
    components: {
      EditorBar,
      SelectTree,
    },
    data() {
      var isEmail = (rule, value, callback) => {
        if (value != "") {
          // 不为空的时候进行验证
          const reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确链接"));
          }
        } else {
          // 为空的时候就直接放过去（这里一定要写，不然既不报错也不会往下走【应该和router的next()相同】）
          callback();
        }
      };
      return {

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
        defaultProps2: {
          value: "id",
          children: "son",
          label: "name",
        },
        options: [],
        content: "",
        isClear: false,
        dio1: false,
        groupList: [],
        uploadData: {
          type: "2",
        },
        uploadUrl: "",
        checked: "3",
        phone: "",
        pickVisible: false,
        allContGroupList: [],
        contGroupId: "",
        pickGroupId: "",
        contProps: {
          children: "son",
          label: "name",
        },
        contSearch: "",
        uploadVisible: false,
        uploadVisible: false,
        contList: [],
        type: 2,
        contPage: 1,
        contLimit: 8,
        contId: "",
        contTotal: 0,
        dioType: "",
        pickData: {},
        uploadForm: {
          uploadFile: "",
          source: "",
        },
        hideUpload: false,
        path: "",
        open: "",
        title_name: "添加文章",
        rule: {
          link: [{
            validator: isEmail,
            trigger: "blur",
          }, ],
        },
      };
    },
    created() {
      this.phone = localStorage.getItem("phone");
      if (this.$route.query.path) {
        this.path = this.$route.query.path;
      }
      if (this.$route.query.open) {
        this.open = this.$route.query.open;
      }
      if (this.$route.query.name == "modify") {
        this.title_name = "修改文章";
      }
      if (this.$route.query.group_id) {
        this.formLabelAlign.content_group_id = this.$route.query.group_id;
      }
      if (this.$route.query.types) {
        this.types = this.$route.query.types;
      }
    },
    mounted() {
      let time = parseInt(new Date().getTime() / 1000);
      let user_id = localStorage.getItem("user_id") || "";
      let token = localStorage.getItem("token") || "";
      let sign = md5(user_id + token + time + md5("shenlanguoshiphoto"));
      this.uploadData.time = time;
      this.uploadData.user_id = user_id;
      this.uploadData.token = token;
      this.uploadData.sign = sign;
      this.uploadUrl = uploadUrl;
      this.getTree();
      if (this.$route.query.data) {
        this.getInfo();
      }
    },
    methods: {
      handleChange(e) {
        this.formLabelAlign.content_group_id = e[e.length - 1];
      },
      beforeAvatarUpload(file) {
        let types = ["image/jpeg", "image/jpg", "image/png"];
        const isImage = types.includes(file.type);
        const isLtSize = file.size / 1024 / 1024 < 2;
        if (!isImage) {
          this.$message.error("上传图片只能是 JPG.Png 格式!");
        }
        if (!isLtSize) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isImage && isLtSize;
      },
      //数据回填
      async getInfo() {
        let res = await ContentInfo({
          code: this.$route.query.data,
          type: "1",
        });
        Object.assign(this.formLabelAlign, res.data);
        delete this.formLabelAlign.create_date;
        // console.log(res)
      },
      //获取树形小组
      async getTree() {
        let res = await ContentGroupList({});
        if (res.code == 200) {
          this.groupList = res.data.data;
          console.log(this.formLabelAlign.group_id);
          if (!this.formLabelAlign.content_group_id) {
            this.formLabelAlign.content_group_id = this.groupList[0].id;
          }
          this.reqGetContentGroupList();
        }
      },
      // 获取内容列表
      async ContentList() {
        let res = await ContentList({
          type: this.type,
          content_group_id: this.pickGroupId,
          search_name: this.contSearch,
          page: this.contPage,
          limit: this.contLimit,
        });
        if (res.code == 200) {
          this.contList = res.data.data;
          this.contTotal = res.data.total;
        } else {
          this.contList = [];
        }
      },
      // 获取素材分组列表
      async reqGetContentGroupList() {
        this.contLoading = true;
        let res = await reqGetContentGroupList({});
        if (res.code === 200) {
          this.allContGroupList = JSON.parse(JSON.stringify(res.data.data));
          this.allContGroupList.unshift({
            id: "",
            name: "所有",
          });
          this.pickGroupId = "";
          this.contGroupId = JSON.parse(JSON.stringify(res.data.data))[0].id;
          this.ContentList();
        } else {
          this.allContGroupList = [];
          this.pickGroupId = "";
          this.contGroupId = "";
        }
        this.contLoading = false;
      },
      //本地上传
      async ContentAdd(data) {
        let res = await ContentAdd(data);
        if (res.code == "200") {
          this.contId = "";
          this.uploadVisible = false;
          this.reqGetContentGroupList();
        }
      },
      // 上传完成回调
      reqUploadSuccess(res, file) {
        this.uploadForm.uploadFile = URL.createObjectURL(file.raw);
        this.uplSucInfo = res.data;
      },
      handlePickImg(data) {
        this.contList.forEach((item) => {
          this.$refs[item.id][0].classList.remove("l-active");
        });
        this.$refs[data.id][0].classList.add("l-active");
        this.pickData = data;
      },
      // 选择图片限制
      beforeImgUpload(file) {
        const isJPG = file.type === "image/jpg";
        const isJPEG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 <= 2;
        if (!isJPG && !isJPEG && !isPNG) {
          this.$message.error("上传图片只能是 JPG、JPEG、PNG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return (isJPG && isLt2M) || (isLt2M && isJPEG) || (isLt2M && isPNG);
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
      getPickGroupId(id) {
        this.pickGroupId = id;
      },
      handleUploadCancel() {
        this.uploadForm.uploadFile = "";
        this.uploadVisible = false;
        this.$refs.uploadForm.resetFields();
      },
      uploadSubmit() {
        this.$refs["uploadForm"].validate((valid) => {
          if (valid) {
            this.uplSucInfo.type = "2";
            this.uplSucInfo.user_id = localStorage.getItem("phone");
            this.uplSucInfo.title = "";
            this.uplSucInfo.explain = "";
            this.uplSucInfo.source = '1';
            this.ContentAdd({
              arr: [this.uplSucInfo],
            });
          }
        });
      },
      handlePickCancel() {
        this.pickVisible = false;
        this.pickData = "";
        this.dioType = "";
        this.contList.forEach((item) => {
          if (item.id === this.contId) {
            this.$refs[item.id][0].classList.add("l-active");
          } else {
            this.$refs[item.id][0].classList.remove("l-active");
          }
        });
      },
      handlePickConfirm() {
        this.pickVisible = false;
        if (this.dioType == "1") {
          this.formLabelAlign.cover = this.pickData.content;
          this.formLabelAlign.file_name = this.pickData.file_name;
        } else if (this.dioType == "2") {
          this.formLabelAlign.wx_cover = this.pickData.content;
        }
      },
      submit() {
        this.$refs["formLabelAlign"].validate(async (valid) => {
          if (valid) {
            if (this.formLabelAlign.id) {
              let arr = [];
              arr.push(this.formLabelAlign);
              let res = await ContentEdit({
                arr: arr,
              });
              if (res.code == "200") {
                this.$message.success(res.msg);
                if (this.open) {
                  this.$router.push({
                    name: this.path,
                    params: {
                      type: "open",
                    },
                  });
                } else {
                  this.$router.push({
                    name: this.path,
                    params: {
                      id: '3',
                    },
                  });
                }
              } else {
                this.$message.success(res.msg);
              }
            } else {
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
                user_id: this.phone,
                source: this.open ? '1' : "2",
                file_name: this.formLabelAlign.file_name,
              });
              let res = await ContentAdd({
                arr: arr,
              });
              if (res.code == "200") {
                this.$message.success(res.msg);
                if (this.open) {
                  this.$router.push({
                    name: this.path,
                    params: {
                      type: "open",
                    },
                  });
                }  else {
                  this.$router.push({
                    name: this.path,
                    params: {
                      id: '3',
                    },
                  });
                }
              } else {
                this.$message.error(res.msg);
              }
            }
          }
        });
      },
      async look() {
        if (this.formLabelAlign.title == "") {
          this.$message.error("请输入标题");
        } else if (this.formLabelAlign.content == "") {
          this.$message.error("请输入内容");
        } else {
          let res = await ContentPriview({
            content: this.formLabelAlign.content,
            title: this.formLabelAlign.title,
            phone: localStorage.getItem("phone"),
            link: this.formLabelAlign.link,
          });
          if (res.code == 200) {
            this.dio1 = true;
            this.$nextTick(() => {
              this.creatQrCode(res.data);
            });
          }
        }
      },
      creatQrCode(id) {
        var href = this.baseURL +"/article-preview/huankemao_h5.html?id=" + id;
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: href,
          width: 240,
          height: 240,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      },
      codeClose() {
        this.$refs.qrCodeUrl.innerHTML = "";
      },
      Return() {
        if (this.open) {
          this.$router.push({
            name: this.path,
            params: {
              type: "open",
            },
          });
        }else {
          this.$router.push({
            name: this.path,
            params: {
              id: this.checked,
            },
          });
        }
      },
      closeDialog(data) {
        this.$refs[data].resetFields();
      },
      edtiorContentChange(val) {
        this.formLabelAlign.content = val;
      },
    },
  };
</script>
<style lang="less" scoped>
  .add_graphic {
    width: 100%;
    height: 100%;
    // position: relative;
    // overflow: auto;

    /deep/.el-form-item__error {
      position: relative;
    }

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      h4 {
        font-size: 20px;

        font-weight: bold;
        color: #333333;
        line-height: 28px;
      }
    }

    .group-main {
      position: relative;
      width: 100%;
      // height: calc(100% - 32px);
      
    }

    .el-form-item {
      margin-bottom: 3px;
    }

    /deep/.el-form-item__content {
      // margin-bottom: 12px;
      line-height: 24px;
      overflow: hidden;

      .el-textarea {
        margin: 7px 0;
      }

      .el-input__inner {
        height: 33px;
      }
    }

    /deep/.el-form--label-top .el-form-item__label {
      padding: 0;
      line-height: 25px;
    }

    /deep/.avatar-uploader .el-upload {
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
      border: 1px solid #b9c5e9;
      border-radius: 6px;
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }

    .avatar {
      width: 120px;
      height: 125px;
      display: block;
    }

    .content {
      max-width: 1000px;
      // margin-top: 20px;
    }

    .bottom {
      text-align: center;
      margin: 20px 0;
    }

    /deep/.el-dialog {
      width: 380px;
      // height: 200px;
      background: #ffffff;
      border-radius: 12px;

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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

      .img-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        div {
          width: 160px;
          position: relative;
          height: 175px;
          margin: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          text-align: center;
          cursor: pointer;

          .ly {
            display: inline-block;
            width: calc(100% - 20px);
            border-bottom: 1px solid #ccc;
            font-size: 14px;
            color: #333;
            padding: 0 10px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            /*让长段文本不换行*/
            white-space: nowrap;
            /*设置文本超出元素宽度部分隐藏*/
            overflow-x: hidden;
            /*设置文本超出部分用省略号显示*/
            text-overflow: ellipsis;
          }

          img {
            max-width: 150px;
            max-height: 138px;
            object-fit: cover;
          }

          span.bgc {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
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

      .qrcode {
        display: flex;
        justify-content: center;
        margin-top: 5px;
      }

      .tip {
        margin-top: 20px;
        text-align: center;
        font-size: 16px;

        font-weight: 400;
        color: #333333;
        line-height: 22px;
      }
    }
  }

  .limitContent {
    /deep/.el-form-item__content {
      width: 500px;
    }
  }

  /deep/.el-form-item__label {
    white-space: pre-line;
  }
</style>