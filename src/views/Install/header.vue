<template>
  <div class="public-header">
    <el-header style="height: 54px; font-size: 20px">
      <div class="logo">
        <logo-svg />
        <span class="icon-su"></span>
        <span class="text-title">让生意更简单</span>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.public-header {
  width: 100%;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.06);
    font-size: 20px;
    font-weight: bold;
    .logo {
      height: 28px;
      display: flex;
      align-items: center;
      width: 1200px;
      text-align: left;
      .icon-su {
        display: inline-block;
        width: 1px;
        height: 20px;
        margin: 0 20px;
        background: #b9c5e9;
      }
      .text-title {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>
