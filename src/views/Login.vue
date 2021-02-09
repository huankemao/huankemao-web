<template>
  <div class="login">
    <div class="logo">
      <LoginSvg />
      <span>
        <span class="cn">唤客猫企业微信SCRM系统</span>
        <span class="eng">HUANKEMAO ENTERPRISE WECHAT SCRM SYSTEM</span>
      </span>
    </div>
    <div class="form">
      <div class="input">
        <div class="text">管理员登录</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="phone">
            <el-input
              v-model="ruleForm.phone"
              maxlength="11"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div v-if="!verifyFlag" class="verify-btn" @click="onVerify">
          <span>点击验证</span>
        </div>
        <div v-else class="verify">
          <i class="el-icon-success"></i>
          <span>验证成功</span>
        </div>

        <Vcode
          :show="isShow"
          @success="onSuccess"
          @close="onClose"
          :imgs="imgs"
          :canvasWidth="310"
          :canvasHeight="155"
          :sliderSize="36"
        />
        <div class="login-btn" @click="handleLogin">登录</div>
        <div class="or">
          <span class="line-left"></span>
          <span class="font">OR</span>
          <span class="line-right"></span>
        </div>
        <div class="wechat-btn" @click="handleWxLogin">
          <img src="../assets/images/wechat.png" />企业微信登录
        </div>
      </div>
      <div class="line"></div>
      <div class="pic">
        <span class="font">让生意更简单</span>
        <span class="bor"></span>
        <span class="fonts">销售即社交，销售即运营，销售即服务</span>
        <img src="../assets/images/login_pic.png" alt="唤客猫" />
        <div class="copy-right">COPYRIGHT©️唤客猫 2020</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vcode from "@/components/Vcode";
import { reqLogin, reqWxLogin, reqGetWxLogin } from "@/api/index";
export default {
  components: {
    Vcode,
  },
  data() {
    var phone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
        callback(new Error("手机号有误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      isShow: false,
      verifyFlag: false,
      imgs: [],
      ruleForm: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          {
            required: true,
            validator: phone,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.code) {
      this.reqGetWxLogin(this.$route.query.code);
    }
  },
  methods: {
    // 登录
    async reqLogin() {
      this.verifyFlag = false;
      let res = await reqLogin({
        phone: this.ruleForm.phone,
        password: this.ruleForm.password,
      });
      this.loginStatus = false;
      if (res.code == 200) {
        this.$cookies.config("1d");
        this.$cookies.set("token", res.data.token);
        localStorage.setItem("phone", this.ruleForm.phone);
        this.$message.success(res.msg);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        this.$router.push("/index");
      } else {
        this.$message.error(res.msg);
      }
    },
    // 企业微信登录
    async reqWxLogin() {
      let res = await reqWxLogin();
      if (res.code === 200) {
        window.location.href = res.data.url;
      } else {
        this.$message.error(
          "当前未配置企业微信相关信息，无法使用企业微信登录，请使用账号登录"
        );
      }
    },
    //  缓存用户信息
    async reqGetWxLogin(code) {
      let res = await reqGetWxLogin(code);
      if (res.code === 200) {
        localStorage.setItem("phone", res.data.phone);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        this.$router.push("/index");
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 登录
    handleLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.verifyFlag) {
            this.reqLogin();
          } else {
            this.$message.warning("请点击按钮进行验证");
          }
        } else {
          return false;
        }
      });
    },
    // 微信登录
    handleWxLogin() {
      this.reqWxLogin();
    },
    onVerify() {
      this.isShow = true;
    },
    // 用户通过了验证
    onSuccess() {
      this.verifyFlag = true;
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
    },
    // 用户点击遮罩层，应该关闭模态框
    onClose() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 800px;
  background: url("../assets/images/login_bg.png") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-form-item {
    margin-bottom: 22px !important;
  }

  .logo {
    width: 790px;
    display: flex;
    align-items: center;
    margin-top: 10vh;

    > span {
      margin-left: 15px;
      display: flex;
      height: 50px;
      flex-direction: column;
      justify-content: space-around;

      .cn {
        font-size: 25px;
        font-weight: 600;
        color: #f7faff;
        line-height: 1;
      }

      .eng {
        font-size: 8px;
        font-weight: 400;
        color: #f7faff;
        line-height: 1;
      }
    }
  }

  .form {
    width: 790px;
    height: 440px;
    background: #ffffff;
    border-radius: 4px;
    margin-top: 30px;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    padding-top: 50px;
    box-sizing: border-box;

    .input {
      padding: 0 60px;

      .el-form {
        margin-top: 20px;
      }

      > div + div {
        margin-top: 20px;
      }

      .text {
        height: 20px !important;
        font-size: 16px;
        font-weight: 400;
        color: #6881ec;
        line-height: 20px;
      }

      .el-input {
        width: 290px;
      }

      /deep/.el-input__inner {
        border: none;
        border-bottom: 1px solid #eee;
        padding: 0;
      }

      .verify-btn {
        position: relative;
        width: 290px;
        height: 36px;
        background: #f6f7fb;
        border: 1px solid #b9c5e9;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 36px;
        cursor: pointer;

        &::before {
          position: absolute;
          top: 50%;
          left: 20px;
          width: 20px;
          height: 20px;
          background: #f6f7fb;
          border: 1px solid #b9c5e9;
          border-radius: 50%;
          content: "";
          transform: translate(0, -50%);
        }

        &::after {
          position: absolute;
          top: 50%;
          left: 26px;
          width: 10px;
          height: 10px;
          background: #b9c5e9;
          border-radius: 50%;
          content: "";
          transform: translate(0, -50%);
        }

        span {
          margin-left: 60px;
        }

        &:active {
          background: #f0f0f0;
        }
      }

      .verify {
        display: flex;
        width: 100%;
        height: 36px;
        align-items: center;
        background-color: #eefff5;
        line-height: 36px;
        border-radius: 4px;
        border: 2px solid #67c23a;

        i {
          margin: 0 20px 0;
          color: #67c23a;
          font-size: 20px;
        }

        span {
          font-size: 14px;
          font-weight: 400;
          color: #333;
        }
      }

      .login-btn {
        width: 290px;
        height: 36px;
        background: #6881ec;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        line-height: 36px;
        text-align: center;
        cursor: pointer;

        &:active {
          background-color: #3551ec;
        }
      }

      .or {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 11px;

        .line-left,
        .line-right {
          width: 120px;
          height: 1px;
          background: #eeeeee;
        }

        .font {
          height: 11px;
          font-size: 12px;
          line-height: 1;
          font-weight: 400;
          color: #999999;
        }
      }

      .wechat-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 290px;
        height: 36px;
        background: #f6f7fb;
        border: 1px solid #b9c5e9;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
        color: #6881ec;
        cursor: pointer;

        &:active {
          background: #f0f0f0;
        }

        img {
          width: 20px;
          height: 17px;
          margin-right: 11px;
        }
      }
    }

    .line {
      width: 0;
      height: 346px;
      border-left: 1px solid #ededed;
    }

    .pic {
      display: flex;
      flex-direction: column;
      padding: 0 36px;

      .font {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #6881ec;
        margin-bottom: 12px;
      }

      .bor {
        width: 18px;
        height: 3px;
        background: #6881ec;
        border-radius: 2px;
      }

      .fonts {
        margin-top: 12px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }

      .copy-right {
        // margin-top: 15px;
        text-align: center;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>
