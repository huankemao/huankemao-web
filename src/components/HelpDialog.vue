<template>
  <div class="help" v-show="visible" @click="visible = false">
    <div
      class="main"
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
    >
      <div class="head">
        <span>常见问题</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="line"></div>
      <div class="content" ref="content" @scroll="handleScroll">
        <h3 style="margin-top: 0">
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何登录企业微信
        </h3>
        <p>
          1
          打开浏览器，在地址栏输入企业微信官网地址：https://work.weixin.qq.com/，点击企业登录
        </p>
        <img src="../assets/helpImages/1-1.png" alt="" />
        <p>2 然后扫描二维码进入企业微信管理后台</p>
        <img class="left-pic" src="../assets/helpImages/1-2.png" alt="" />
        <img class="right-pic" src="../assets/helpImages/1-3.png" alt="" />
        <h3 style="margin-top: 55px">
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取企业ID
        </h3>
        <p>
          1
          进入企业微信管理后台，点击右上角“我的企业”，在企业信息最后一行找到并复制“企业ID”
        </p>
        <img src="../assets/helpImages/2-1.png" alt="" />
        <p>2 将复制好的“企业ID”粘贴到这里</p>
        <img src="../assets/helpImages/2-2.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取通讯录Secret
        </h3>
        <p>1 点击企业微信管理后台“管理工具”，然后点击“通讯录同步”</p>
        <img src="../assets/helpImages/3-1.png" alt="" />
        <p>2 找到并复制“通讯录Secret”</p>
        <img src="../assets/helpImages/3-2.png" alt="" />
        <p>3 将复制好的“通讯录Secret”粘贴到这里</p>
        <img src="../assets/helpImages/3-3.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取客户管理Secret
        </h3>
        <p>1 点击企业微信管理后台“客户联系”，然后点击“API”，找到并复制“客户管理Secret”</p>
        <img src="../assets/helpImages/4-1.png" alt="" />
        <p>2 将复制好的“客户管理Secret”粘贴到这里</p>
        <img src="../assets/helpImages/4-2.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何设置客户管理回调URL
        </h3>
        <p>
          1
          点击企业微信管理后台“客户联系”，然后点击“API”，找到接收事件服务器，点击“设置”或“编辑”
        </p>
        <img src="../assets/helpImages/5-1.png" alt="" />
        <p>2 在唤客猫企业微信SCRM系统后台复制“客户管理回调URL”</p>
        <img src="../assets/helpImages/5-2.png" alt="" />
        <p>3 找到“URL”输入框，将复制好的“客户管理回调URL”粘贴到这里</p>
        <img src="../assets/helpImages/5-3.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何设置客户管理回调Token
        </h3>
        <p>1 在唤客猫企业微信SCRM系统后台复制“客户管理回调Token”</p>
        <img src="../assets/helpImages/6-1.png" alt="" />
        <p>2 找到“Token”输入框，将复制好的“客户管理回调Token”粘贴到这里</p>
        <img src="../assets/helpImages/6-2.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何设置客户管理回调EncodingAESKey
        </h3>
        <p>1 在唤客猫企业微信SCRM系统后台复制“客户管理回调EncodingAESKey”</p>
        <img src="../assets/helpImages/7-1.png" alt="" />
        <p>
          2 找到“EncodingAESKey”输入框，将复制好的“客户管理回调EncodingAESKey”粘贴到这里
        </p>
        <img src="../assets/helpImages/7-2.png" alt="" />
        <p>3 确认“URL”、“Token”、“EncodingAESKey”全部填写完毕，点击“保存”</p>
        <img src="../assets/helpImages/7-3.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何自建应用
        </h3>
        <p>1 点击企业微信管理后台“应用管理”，找到“自建”，点击“创建应用”</p>
        <img src="../assets/helpImages/8-1.png" alt="" />
        <p>2 上传应用logo，填写应用名称，选择部门/成员</p>
        <img src="../assets/helpImages/8-2.png" alt="" />
        <p>3 选择位于最上方的组织架构</p>
        <img src="../assets/helpImages/8-3.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取自建应用AgentId
        </h3>
        <p>1 找到并点击创建的应用</p>
        <img src="../assets/helpImages/9-1.png" alt="" />
        <p>2 找到并复制自建应用“AgentId”</p>
        <img src="../assets/helpImages/9-2.png" alt="" />
        <p>3 将复制好的自建应用“AgentId”粘贴到这里</p>
        <img src="../assets/helpImages/9-3.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取自建应用Secret
        </h3>
        <p>1 找到并复制自建应用“Secret”</p>
        <img src="../assets/helpImages/10-1.png" alt="" />
        <p>2 将复制好的自建应用“Secret”粘贴到这里</p>
        <img src="../assets/helpImages/10-2.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何配置授权登录回调域
        </h3>
        <p>1 复制配置栏的授权登录回调域</p>
        <p>2 登录企业微信管理后台，在应用管理中找到并点击已创建的自建应用</p>
        <img src="../assets/helpImages/15-2.png" alt="" />
        <p>3 找到企业微信授权登录，点击设置按钮进入设置页面</p>
        <img src="../assets/helpImages/15-3.png" alt="" />
        <p>
          4 点击web网页下方的设置授权回调域，将复制的回调域粘贴至填写栏，点击保存完成配置
        </p>
        <img src="../assets/helpImages/15-4.png" alt="" />
        <img src="../assets/helpImages/15-5.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取公众号AppId
        </h3>
        <p>1 登录公众号平台</p>
        <img src="../assets/helpImages/11-1.png" alt="" />
        <p>2 点击菜单“基本配置”，复制“AppID”</p>
        <img src="../assets/helpImages/11-2.png" alt="" />
        <img src="../assets/helpImages/11-3.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何获取公众号AppSecret
        </h3>
        <p>1 登录公众号平台</p>
        <img src="../assets/helpImages/12-1.png" alt="" />
        <p>
          2 点击菜单“基本配置”，在开发者秘钥项点击重置/启用按钮，按照步骤操作查看AppSecret
        </p>
        <img src="../assets/helpImages/12-2.png" alt="" />
        <p>3 管理员进行扫码验证</p>
        <img src="../assets/helpImages/12-3.png" alt="" />
        <p>4 如何公众号登录密码进行密码验证</p>
        <img src="../assets/helpImages/12-4.png" alt="" />
        <p>5 查看并复制AppSecret</p>
        <img src="../assets/helpImages/12-5.png" alt="" />
        <img src="../assets/helpImages/12-6.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何配置【聊天资料】应用主页
        </h3>
        <p>1 复制系统设置-工具栏配置-【聊天资料】应用主页地址</p>
        <p>2 登录企业微信后台，找到并点击已创建的应用</p>
        <img src="../assets/helpImages/13-2.png" alt="" />
        <p>3 找到并点击聊天工具栏配置</p>
        <img src="../assets/helpImages/13-3.png" alt="" />
        <p>
          4
          点击配置按钮，填写页面名称，并将复制的【聊天资料】应用主页地址粘贴至填写栏，点击保存即可
        </p>
        <img src="../assets/helpImages/13-4.png" alt="" />
        <h3>
          <span></span>
          <img src="../assets/images/help_cover.png" alt="" />
          如何配置可信域名
        </h3>
        <p>1 复制系统设置-工具栏配置-可信域名地址</p>
        <p>2 找到并点击已创建的自建应用</p>
        <img src="../assets/helpImages/14-2.png" alt="" />
        <p>3 找到【网页授权及JS-SDK】，点击设置可信域名进入配置页面</p>
        <img src="../assets/helpImages/14-3.png" alt="" />
        <p>
          4
          将复制的可信域名粘贴至可调用JS-SDK、跳转小程序的可信域名栏，配置完成点击申请校验按钮进行域名校验
        </p>
        <img src="../assets/helpImages/14-4.png" alt="" />
        <p>
          5
          点击可信域名下的申请校验域名，下载校验文件，并在系统设置中的校验文件栏上传此文件
        </p>
        <img src="../assets/helpImages/14-5.png" alt="" />
        <h3></h3>
      </div>
    </div>
    <div
      v-show="showImg"
      class="imgWrap"
      @click="
        (e) => {
          e.stopPropagation();
          showImg = false;
        }
      "
    >
      <span>
        <img class="bigImg" @click="showImg = false" :src="src" alt="" />
        <i class="el-icon-arrow-left icon-left"></i>
        <i class="el-icon-arrow-right icon-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      src: "",
      showImg: false,
      index: 0,
      domIndex: 0,
      visible: false,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.setScrollTop();
      }
    },
  },
  mounted() {
    let oDoms = document.querySelectorAll(".content>img");
    let oIcon = document.querySelectorAll(".imgWrap>span>i");
    for (let i = 0; i < oDoms.length; i++) {
      oDoms[i].onclick = (e) => {
        this.src = oDoms[i].src;
        this.index = i;
        this.showImg = true;
      };
    }
    for (let i = 0; i < oIcon.length; i++) {
      oIcon[i].onclick = (e) => {
        if (i == 0) {
          this.index--;
          this.index <= 0 ? (this.index = 0) : (this.index = this.index);
        } else {
          this.index++;
          this.index >= oDoms.length - 1
            ? (this.index = oDoms.length - 1)
            : (this.index = this.index);
        }
        this.src = oDoms[this.index].src;
        e.stopPropagation();
      };
    }
    this.$bus.$on("showHelp", (domIndex) => {
      console.log(domIndex);
      this.visible = true;
      this.domIndex = domIndex;
    });
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.visible = false;
    },
    handleScroll() {
      let oHs = document.querySelectorAll(".content>h3");
      [...oHs].forEach((item, index) => {
        let oLine = item.querySelector("span");
        if (index < oHs.length - 1) {
          oLine.style.height =
            parseInt(oHs[index + 1].offsetTop - oHs[index].offsetTop - 130) + "px";
        }
      });
    },
    // 设置滚动距离
    setScrollTop() {
      let oDoms = document.querySelectorAll(".content>h3");
      let oDom = this.$refs.content;
      this.$nextTick(() => {
        oDom.scrollTop = parseInt(oDoms[this.domIndex].offsetTop - 100);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.imgWrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10020;
  span {
    position: relative;
    display: block;
    width: 1250px;
    height: 702px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 702px;
    text-align: center;
    img {
      max-width: 1250px;
      max-height: 702px;
    }
    i {
      position: absolute;
      top: 50%;
      font-size: 40px;
      border: 2px solid #ccc;
      border-radius: 50%;
      color: #ccc;
      cursor: pointer;
    }
    .icon-left {
      left: 10px;
      transform: translateY(-50%);
    }
    .icon-right {
      right: 10px;
      transform: translateY(-50%);
    }
  }
}
.alert-success {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 90px;
  padding: 10px 20px;
  background: #e1faf6;
  border-radius: 4px;
  border: 1px solid #9ad2c9;
  z-index: 10000;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  user-select: text;
}
.help {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 660px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px 40px;
    z-index: 10010;
    .head {
      display: flex;
      align-items: center;
      height: 20px;
      justify-content: space-between;
      span {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        vertical-align: middle;
      }
      i {
        font-size: 20px;
        font-weight: bold;
        color: #ffbbc0;
        vertical-align: middle;
        cursor: pointer;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #e5ebfb;
      margin-top: 20px;
    }
    .content {
      margin: 20px 0;
      width: 100%;
      height: 600px;
      overflow-x: hidden;
      overflow-y: scroll;
      h3 {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        margin: 100px auto 0;
        font-size: 20px;
        > span {
          position: absolute;
          content: "";
          top: 30px;
          left: 14px;
          width: 0;
          border-left: 2px dashed #ccc;
          height: 0;
        }
        img {
          display: inline-block;
          width: 30px;
          margin: 0px;
          margin-right: 20px;
          margin-left: 0px;
        }
      }
      .col1 {
        &::before {
          height: 930px;
        }
      }
      .col2 {
        &::before {
          height: 1100px;
        }
      }
      .col3 {
        &::before {
          height: 1665px;
        }
      }
      .col4 {
        &::before {
          height: 1100px;
        }
      }
      .col5 {
        &::before {
          height: 1665px;
        }
      }
      .col6 {
        &::before {
          height: 1100px;
        }
      }
      .col7 {
        &::before {
          height: 1665px;
        }
      }
      .col8 {
        &::before {
          height: 1665px;
        }
      }
      .col9 {
        &::before {
          height: 1665px;
        }
      }
      .col10 {
        &::before {
          height: 1100px;
        }
      }
      .col11 {
        &::before {
          height: 1100px;
        }
      }
      .col12 {
        &::before {
          height: 3240px;
        }
      }
      .col13 {
        &::before {
          height: 1715px;
        }
      }
      .col14 {
        &::before {
          height: 2280px;
        }
      }
      .col15 {
        &::before {
          height: 2235px;
        }
      }
      p {
        position: relative;
        top: 0;
        left: 0;
        width: 850px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 28px;
        margin: 20px 0 12px 45px;
        user-select: text;
        &::before {
          position: absolute;
          content: "";
          top: 50%;
          left: -25px;
          width: 20px;
          transform: translate(0, -50%);
          height: 0;
          border-top: 2px dashed #ccc;
        }
      }
      img {
        width: 850px;
        margin: 0 0 45px 52px;
        display: block;
        cursor: pointer;
      }
      .left-pic {
        width: 563px;
        height: 322px;
        object-fit: cover;
        display: inline-block;
      }
      .right-pic {
        width: 280px;
        height: 322px;
        object-fit: cover;
        display: inline-block;
        margin: 0 0 45px 0;
      }
    }
  }
}
</style>
