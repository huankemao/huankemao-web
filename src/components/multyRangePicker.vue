<template>
  <div class="multyRangePicker">
    <el-select placeholder="请选择" v-model="range.active" @change="filterRange">
      <el-option
        v-for="val in range.list"
        :label="val.name"
        :value="val.value"
        :key="val.name"
      ></el-option>
    </el-select>
    <span class="date">最近同步时间：{{ date == "" ? "--" : date }}</span>
  </div>
</template>

<script>
export default {
  name: "multyRangePicker",
  props: {
    date: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      range: {
        list: [
          { name: "最近一天", value: "day" },
          { name: "最近一周", value: "week" },
          { name: "最近一月", value: "month" },
        ],
        active: "day",
      },
    };
  },
  mounted() {},
  methods: {
    filterRange() {
      this.$emit("filt", this.range.active);
    },
  },
};
</script>

<style lang="less" scoped>
.multyRangePicker {
  padding-right: 10px;
  // &>i{
  // 	color: ;
  // }
  /deep/.el-select {
    width: 120px;
    margin: 0 0 0 10px;
    .el-input__inner {
      height: 32px;
    }
    .el-input__suffix {
      .el-input__icon {
        line-height: 32px;
      }
    }
  }
  .date {
    font-size: 14px;
    margin-left: 10px;
  }
}
.btn-blue {
  font-weight: bold;
  color: #fff;
  background-color: #6881ec;
  border-radius: 5px;
}
</style>
