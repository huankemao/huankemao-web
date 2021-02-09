<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
  //   import { uploadPath } from '../../api/storage'
  //此处的uploadPath 为后端提供的上传图片的接口
  import E from "wangeditor";
  import axios from 'axios'
  import {
    uploadUrl,
    Upload,
  } from '@/api/index'
  import md5 from 'js-md5';

  export default {
    name: "editoritem",
    data() {
      return {
        // uploadPath,
        editor: null,
        info_: null,
        uploadData: {
          type: '3'
        },
        uploadUrl: "",

      };
    },
    model: {
      prop: "value",
      event: "change"
    },
    props: {
      value: {
        type: String,
        default: ""
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear();
          this.info_ = null;
        }
      },
      value: function (value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value);
        }
      }
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
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
      this.seteditor();
      this.editor.txt.html(this.value);
    },
    methods: {
      seteditor() {
        // http://192.168.2.125:8080/admin/storage/create
        this.editor = new E(this.$refs.toolbar, this.$refs.editor);
        this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
        this.editor.customConfig.uploadImgServer =
          "http://huankemao.vip.brt360.com/photo"; // 配置服务器端地址
        // this.editor.customConfig.uploadImgHeaders = {
        //   authorization:
        //     "Bearer " + localStorage.getItem("a-d-a-n").replace(/"/g, "")
        // }; // 自定义 header
        this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 2M
        this.editor.customConfig.uploadImgMaxLength = 20; // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
        this.editor.customConfig.pasteFilterStyle = false;
        this.editor.customConfig.pasteIgnoreImg = false;


        //自定义上传
        this.editor.customConfig.customUploadImg = async (files, insert) => {
          console.log(files)
          let formdata = new FormData();
          formdata.append('file', files[0]);
          formdata.append('time', this.uploadData.time);
          formdata.append('user_id', this.uploadData.user_id);
          formdata.append('token', this.uploadData.token);
          formdata.append('sign', this.uploadData.sign);
          formdata.append('type', '3');

          axios.post(uploadUrl, formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            if (res.data.code == 200) {
              insert(res.data.data.content)

            }else{
              this.$message.error(res.data.msg)
            }
          })

          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法

          // 上传代码返回结果之后，将图片插入到编辑器中
        }

        // 配置菜单
        this.editor.customConfig.menus = [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'image',
          'video',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
        ];

        this.editor.customConfig.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
            // console.log(result)
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
            // console.log(result);
            //insertImg()为插入图片的函数
            //循环插入图片
            var url = result.data.httpUrl;
            insertImg(url);
          }
        };
        this.editor.customConfig.onchange = html => {
          this.info_ = html; // 绑定当前逐渐地值
          this.$emit("change", this.info_); // 将内容同步到父组件中
          // console.log(this.info_ )
        };
        // 创建富文本编辑器
        this.editor.create();
      }
    }
  };
</script>

<style lang="less">
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }

  .toolbar {
    border: 1px solid #ccc;
  }

  .text {
    border: 1px solid #ccc;
    height: 600px;
  }
</style>