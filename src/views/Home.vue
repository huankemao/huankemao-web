<template>
  <div class="home">
    <el-container style="width: 100%; height: 100%">
      <el-aside width="160px" style="height: 100%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="企业微信" name="wechat">
            <el-menu :router="true" :default-active="$route.path" :unique-opened="true">
              <template v-for="(item, index) in routesList">
                <template v-if="item.children">
                  <el-submenu :index="index + ''" :key="index">
                    <template slot="title">
                      <img
                        style="margin-left: 5px"
                        :src="
                          require(`../assets/images/${
                            $route.path.split('/')[1] &&
                            $route.path.split('/')[1] === item.path
                              ? item.active
                              : item.icon
                          }`)
                        "
                        width="14"
                        alt=""
                      />
                      <span
                        style="margin-left: 10px"
                        :class="
                          $route.path.split('/')[1] &&
                          $route.path.split('/')[1] === item.path
                            ? 'active - color'
                            : ''
                        "
                        >{{ item.title }}</span
                      >
                    </template>
                    <el-menu-item
                      v-for="(citem, index) in item.children"
                      :key="index"
                      :index="citem.path"
                    >
                      {{ citem.title }}
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item style="padding-left: 5px" :index="item.path" :key="index">
                    <img
                      style="margin-left: 12px"
                      :src="
                        require(`../assets/images/${
                          $route.path === item.path ? item.active : item.icon
                        }`)
                      "
                      width="14"
                      alt=""
                    />
                    <span style="margin-left: 10px" slot="title">{{ item.title }}</span>
                  </el-menu-item>
                </template>
              </template>
            </el-menu>
          </el-tab-pane>
          <el-tab-pane label="公众号" name="public"></el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container style="width: 100%; margin-left: 15px">
        <el-header style="height: 60px; font-size: 20px">
          <div class="header-logo">
            <LogoSvg />
            <span></span>
            <span>让生意更简单!</span>
          </div>
          <div class="header-btns">
            <el-button
              size="small"
              icon="el-icon-folder-opened"
              class="btn-white"
              @click="handleOpenMaterial"
              >素材库
            </el-button>
            <el-button
              size="small"
              class="btn-white"
              icon="el-icon-refresh"
              style="margin: 0 40px 0 10px"
              @click="reqSyncConfig"
              >同步企业微信</el-button
            >
            <i
              class="el-icon-setting"
              style="font-size: 24px; margin-right: 20px; cursor: pointer"
              @click="handleShowSetting"
            ></i>
            <img src="../assets/images/question.png" width="20px" alt="" />
            <img
              style="margin: 0 20px"
              src="../assets/images/message.png"
              width="20px"
              alt=""
            />

            <el-dropdown @command="handleCommand" style="cursor: pointer">
              <span class="el-dropdown-link">
                <span class="phone">{{ phone }}</span
                ><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="out">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view />

          <!-- <router-view /> -->
        </el-main>
      </el-container>
    </el-container>
    <Material :materialVisible="materialVisible" @closepop="closepop" />
    <Setting :setVisible="setVisible" @handleCloseSet="handleCloseSet" />
  </div>
</template>

<script>
import { reqLogout, reqSyncConfig, reqDelConfig } from "@/api/index";
import Material from "@/components/Material.vue";
import Setting from "@/components/Setting.vue";

export default {
  name: "Home",
  components: {
    Material,
    Setting,
  },
  watch: {
    "$route.params.type": function (newVal, oldVal) {
      if (newVal == "open") {
        this.materialVisible = true;
      }
    },
  },
  data() {
    return {
      phone: localStorage.getItem("phone"),
      activeName: "wechat",
      routesList: [
        {
          path: "/index",
          icon: "home.png",
          active: "home_active.png",
          title: "首页",
        },
        {
          icon: "code.png",
          active: "code_active.png",
          path: "live_code",
          title: "获客工具",
          children: [
            {
              path: "/live_code/manage",
              title: "渠道活码",
            },
          ],
        },
        {
          icon: "custom.png",
          active: "custom_active.png",
          path: "custom_crm",
          title: "客户CRM",
          children: [
            {
              path: "/custom_crm/manage",
              title: "客户",
            },
            {
              path: "/custom_crm/label",
              title: "客户标签",
            },
          ],
        },
        {
          icon: "chat.png",
          active: "chat_active.png",
          title: "销售工具",
          path: "content",
          children: [
            {
              path: "/content/manage",
              title: "聊天工具栏",
            },
          ],
        },
        {
          icon: "book.png",
          active: "book_active.png",
          path: "address_book",
          title: "企业管理",
          children: [
            {
              path: "/address_book/member_list",
              title: "员工管理",
            },
            {
              path: "/address_book/label_list",
              title: "企业标签",
            },
          ],
        },
      ],
      materialVisible: false,
      setVisible: false,
    };
  },
  mounted() {
    this.$bus.$on("showConfig", () => {
      this.setVisible = true;
    });
  },
  methods: {
    // 登出
    async reqLogout() {
      let res = await reqLogout({
        user_id: localStorage.getItem("user_id"),
      });
      if (res.code == 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        this.$router.push("/login");
      }
    },
    // 项目初始化同步
    async reqSyncConfig() {
      this.$message({
        center: true,
        iconClass: "el-icon-loading ",
        duration: 0,
        message: "正在进行企业微信同步，请耐心等待...",
      });
      let res = await reqSyncConfig({});
      this.$message.closeAll();
      if (res.code == 200) {
        this.$bus.$emit("update");
        this.$message.success("同步成功！");
      } else {
        this.reqDelConfig();
        this.$message.error("同步失败！");
      }
    },

    // 同步失败删除项目配置
    async reqDelConfig() {
      let res = await reqDelConfig({});
    },
    // 退出登录
    handleCommand(command) {
      switch (command) {
        case "set":
          break;
        case "out":
          this.reqLogout();
          break;
      }
    },
    // 切换标签页
    handleClick() {},
    // 打开素材库
    handleOpenMaterial() {
      this.materialVisible = true;
    },
    closepop() {
      this.materialVisible = false;
    },
    // 弹出系统配置
    handleShowSetting() {
      this.setVisible = true;
    },
    // 关闭系统设置
    handleCloseSet() {
      this.setVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
@active-color: #133ab3;
@calc: calc(100% - 30px);
@icon-size: 16px;
@color: #333;

.active-color {
  color: @active-color;
}

.home {
  width: @calc;
  height: @calc;
  padding: 15px;
  background-color: #f6f7fb;
  overflow: hidden;
  min-width: 1400px;

  .el-aside {
    position: relative;
    overflow: hidden;
    min-height: 100px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.06);
    border-radius: 12px;

    .el-tabs {
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 17px;
      }

      /deep/.el-tabs__header {
        margin: 15px 0;
      }

      /deep/.el-tabs__content {
        margin-top: 15px;
      }

      /deep/.el-tabs__active-bar {
        height: 4px;
        background: @active-color;
        border-radius: 2px;
      }

      /deep/.el-tabs__nav {
        width: 100%;
      }

      /deep/.el-tabs__item {
        font-weight: bold;
        padding: 0 14px;
        width: 50%;
        text-align: justify;
        text-align-last: justify;
      }

      /deep/.el-tabs__item.is-active {
        color: @active-color;
      }

      /deep/.el-tabs__nav-wrap::after {
        background-color: #fff;
      }

      .el-menu {
        border-right: none;

        .el-icon-menu {
          font-size: 22px;
        }

        .el-submenu__title i,
        .el-menu-item i {
          font-size: @icon-size;
          color: @color;
        }

        /deep/.el-submenu__icon-arrow {
          font-weight: bold;
        }

        /deep/.el-menu-item.is-active {
          color: @active-color;
          background: #e5ebfb;
          border-right: 4px solid @active-color;
        }

        /deep/.el-menu-item.is-active i {
          color: @active-color;
        }

        /deep/.el-menu-item {
          width: 158px;
          padding: 0;
          height: 40px;
          line-height: 40px;
          margin: 10px 0;
        }

        .el-submenu {
          margin: 10px 0;

          /deep/.el-menu-item {
            min-width: 158px;
            padding-left: 40px !important;
          }
        }

        /deep/.el-submenu__title {
          padding-left: 12px !important;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.06);
    border-radius: 12px;
    font-size: 20px;
    font-weight: bold;
  }

  .el-main {
    width: 100%;
    padding: 15px;
    margin-top: 15px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.06);
    border-radius: 12px;
  }

  .phone {
    // margin-right: 20px;
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
  }

  .header-logo {
    display: flex;
    align-items: center;

    :nth-child(2) {
      width: 1px;
      height: 20px;
      background: #b9c5e9;
      margin: 0 20px;
    }

    :nth-child(3) {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
  }

  .header-btns {
    display: flex;
    align-items: center;
  }
}
</style>
