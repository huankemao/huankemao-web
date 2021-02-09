<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive> -->
    <!-- <router-view v-if="!$route.meta.keepAlive" /> -->
    <router-view />
    <HelpDialog />
  </div>
</template>
<script>
import HelpDialog from "@/components/HelpDialog.vue";
export default {
  components: {
    HelpDialog,
  },
};
</script>

<style lang="less">
#app {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;

  /deep/.el-input__inner,
  /deep/.el-textarea__inner {
    font-size: 14px !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #6881ec !important;
    background: #6881ec;
  }

  /deep/.el-radio__input.is-checked + .el-radio__label {
    color: #6881ec;
  }

  .btn-gray {
    font-weight: bold;
    color: #999;
    background-color: #f2f2f2;
    border-radius: 4px;
  }

  .btn-white {
    font-weight: bold;
    color: #6881ec;
    background-color: #fff;
    border-color: #6881ec;
    border-radius: 4px;
  }

  .btn-blue {
    font-weight: bold;
    color: #fff;
    background-color: #6881ec;
    border-color: #6881ec;
    border-radius: 4px;
  }

  .btn-orange {
    font-weight: bold;
    color: #fea96c;
    border-radius: 4px;
    background: #fff7e6;
    border: 1px solid #f5daa3;
  }

  .btn-opacity {
    font-weight: bold;
    color: #b9c5e9;
    background-color: #fff;
    border-radius: 4px;
  }

  .right {
    margin-left: auto;
  }

  // 指令性颜色
  .success {
    color: #67c23a;
  }

  .error {
    color: #f56c6c;
  }

  .warn {
    color: #e6a23c;
  }

  .fs12 {
    font-size: 12px;
  }

  .fs14 {
    font-size: 14px;
  }

  .fs16 {
    font-size: 16px;
  }

  .fs30 {
    font-size: 30px;
  }

  .title {
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 18px;
    font-weight: bold;
    color: #333;

    i {
      cursor: pointer;
    }
  }

  //帮助与说明
  .course {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 32px);
    padding: 15px;
    background: #fff7e6;
    border-radius: 6px;
    border: 1px solid #f5daa3;
    margin: 15px 0;

    span {
      display: inline-block;
      height: 22px;
    }

    p + p {
      margin-top: 5px;
    }

    .black {
      color: #333;
    }

    .pink {
      color: #f38b93;
    }

    .blue {
      cursor: pointer;
      color: #6881ec;
    }
  }

  .echarts > div:first-child {
    width: 100% !important;
  }

  canvas {
    width: 100% !important;
  }

  // 左侧分组栏
  .el-aside {
    padding: 15px;
    border-radius: 10px;

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

        .drop-wrap {
          position: absolute;
          right: 20px;
        }
      }
    }

    .el-tree-node > .el-tree-node__children {
      overflow: auto;
    }

    // 树形控件
    /deep/.el-tree-node {
      width: 173px;
      margin: 6px 0;
    }

    .el-tree-node__content {
      height: 40px;
      border-radius: 6px;
    }

    .tree-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;

      > span {
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .name-wrap {
        display: inline-block;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .active {
      color: #133ab3;
    }

    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background-color: #e5ebfb;
    }
  }

  .el-icon-more {
    font-size: 20px;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #6881ec !important;
    border-color: #6881ec;
  }

  :focus {
    outline: none;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  // 全局模态框样式
  .el-dialog__wrapper {
    overflow: hidden;
    .el-dialog {
      background: #ffffff;
      border-radius: 12px;
      top: 50%;
      transform: translate(0, -50%);
      margin-top: 0px !important;
      .el-dialog__header {
        position: relative;

        &::after {
          position: absolute;
          top: 50px;
          left: 20px;
          content: "";
          width: calc(100% - 40px);
          height: 1px;
          background: #e5ebfb;
        }

        .el-dialog__title {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }

        .el-dialog__close {
          font-size: 20px;
          color: #ffbbc0;
          font-weight: bold;
        }
      }

      .el-dialog__body {
        padding: 20px;
        max-height: 600px;
        overflow: hidden;
        .scroll {
          width: 100%;
          padding-right: 5px;
          max-height: 600px;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }

      .el-dialog__footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 0px 12px 0px rgba(104, 129, 236, 0.2);
        border-radius: 0px 0px 12px 12px;
        height: 72px;
        padding: 0;

        .el-button {
          width: 100px;
        }
      }
    }
  }

  // 分页样式
  .pagination {
    width: 100%;
    margin: 30px 0;

    .el-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #6881ec;
  }

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #fff;
    border-radius: 6px;
    padding: 0;
    min-width: 30px;
    margin: 0 5px;
    border: 1px solid rgba(19, 58, 179, 0.2);
  }

  .el-pager li {
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #ffffff;
    border-radius: 6px;
    min-width: 30px;
    border: 1px solid rgba(19, 58, 179, 0.2);
    margin: 0 5px;
  }

  // 日期选择样式
  .btn-active {
    border-radius: 4px 0 0 4px !important;
  }

  .date-active {
    border-radius: 0 4px 4px 0 !important;
    border-color: #6881ec !important;
    border-left: none;
  }

  .date-active-left .el-input__inner {
    border-radius: 0 4px 4px 0 !important;
    border-color: #6881ec;
  }

  .date-active-center .el-input__inner {
    border-radius: 0px !important;
    border-color: #6881ec;
    border-right: none;
  }
}
</style>
