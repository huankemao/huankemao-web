<template>
  <div
    class="statistic"
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="head">
      <div class="title">
        {{ name }}
      </div>
      <el-button size="small" class="btn-blue right" @click="handleBack">返回</el-button>
    </div>
    <div class="main-cards">
      <div class="card">
        <span
          >今日新增客户数&nbsp;&nbsp; <i class="iconfont icon-question-circle"> </i
        ></span>
        <p>
          <span>{{ today_count.add_customer || 0 }}</span>
          <span>累计：{{ accum_count.add_customer || 0 }}</span>
        </p>
      </div>
      <div class="card">
        <span
          >今日被客户删除/拉黑的人数&nbsp;&nbsp;
          <i class="iconfont icon-question-circle"> </i
        ></span>
        <p>
          <span>{{ today_count.deleted_customer || 0 }}</span>
          <span>累计：{{ accum_count.deleted_customer || 0 }}</span>
        </p>
      </div>
      <div class="card">
        <span
          >今日删除人数&nbsp;&nbsp; <i class="iconfont icon-question-circle"> </i
        ></span>
        <p>
          <span>{{ today_count.deleted_staff || 0 }}</span>
          <span>累计：{{ accum_count.deleted_staff || 0 }}</span>
        </p>
      </div>
      <div class="card">
        <span
          >今日净增人数&nbsp;&nbsp; <i class="iconfont icon-question-circle"> </i
        ></span>
        <p>
          <span>{{ today_count.growth || 0 }}</span>
          <span>累计：{{ accum_count.growth || 0 }}</span>
        </p>
      </div>
    </div>
    <div class="date">
      <el-button
        ref="day"
        size="small"
        :class="date_type === 1 ? 'btn-blue btn-active' : 'btn-white'"
        @click="date_type = 1"
        >按日</el-button
      >
      <el-date-picker
        style="width: 260px"
        v-show="date_type === 1"
        v-model="daysValue"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        class="date-active"
        :clearable="false"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      >
      </el-date-picker>
      <el-button
        ref="week"
        size="small"
        style="margin-left: 20px"
        :class="date_type === 2 ? 'btn-blue btn-active' : 'btn-white'"
        @click="date_type = 2"
        >按周</el-button
      >

      <el-date-picker
        style="width: 160px"
        v-show="date_type === 2"
        v-model="weekValueStart"
        type="week"
        class="date-active-center"
        format="yyyy 第 WW 周"
        value-format="yyyy-MM-dd"
        range-separator="至"
        :clearable="false"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      >
      </el-date-picker>
      <el-date-picker
        style="width: 160px"
        v-show="date_type === 2"
        v-model="weekValueEnd"
        type="week"
        class="date-active-left"
        format="yyyy 第 WW 周"
        value-format="yyyy-MM-dd"
        :clearable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
      >
      </el-date-picker>
      <el-button
        ref="month"
        size="small"
        style="margin-left: 20px"
        :class="date_type === 3 ? 'btn-blue btn-active' : 'btn-white'"
        @click="date_type = 3"
        >按月</el-button
      >
      <el-date-picker
        style="width: 260px"
        v-show="date_type === 3"
        v-model="monthValue"
        size="small"
        type="monthrange"
        format="yyyy-MM-dd"
        :clearable="false"
        class="date-active"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      >
      </el-date-picker>
      <span
        >这段时间里，共新增客户数 {{ during.add_customer }} 人、被客户删除/拉黑
        {{ during.deleted_customer }} 人、员工删除客户
        {{ during.deleted_staff }} 人、净增人数 {{ during.growth }} 人</span
      >
    </div>
    <div id="line" class="echarts"></div>
    <div class="main-footer">
      <div>
        <span>客户明细数据</span>
        <el-button size="small" class="btn-blue">导出数据</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }"
          style="width: 100%"
        >
          <el-table-column label="时间">
            <template slot-scope="scope">
              {{ scope.row.created_at }}
            </template>
          </el-table-column>
          <el-table-column prop="add_customer">
            <template slot="header">
              新增客户数&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="新增的客户人数（同一个客户重复被添加会重复计算）"
                placement="top-start"
              >
                <i class="iconfont icon-question-circle"> </i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="deleted_customer">
            <template slot="header">
              被客户删除/拉黑人数&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="同一个员工重复被删除会重复计算"
                placement="top-start"
              >
                <i class="iconfont icon-question-circle"> </i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="deleted_staff">
            <template slot="header">
              删除人数&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="员工删除的客户数（同一个客户重复被删除会重复计算）"
                placement="top-start"
              >
                <i class="iconfont icon-question-circle"> </i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="growth">
            <template slot="header">
              净增客户数&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="新增人数-被客户删除/拉黑人数"
                placement="top-start"
              >
                <i class="iconfont icon-question-circle"> </i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-show="tableData.length !== 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLiveQrStart, reqLiveQrEnd } from "@/api/index";
export default {
  data() {
    return {
      id: "",
      loading: false,
      name: "",
      tableData: [],
      page: 1,
      limit: 10,
      total: 0,
      date_type: 1,
      daysValue: [this.getCurrentMonthFirst(), this.getCurrentMonthLast()],
      weekValueStart: this.getCurrentMonthFirst(),
      weekValueEnd: this.getCurrentMonthLast(),
      monthValue: [this.getCurrentMonthFirst(), this.getCurrentMonthLast()],
      start_time: this.getCurrentMonthFirst(),
      end_time: this.getCurrentMonthLast(),
      today_count: {
        add_customer: 0,
        deleted_customer: 0,
        deleted_staff: 0,
        growth: 0,
      },
      accum_count: {
        add_customer: 0,
        deleted_customer: 0,
        deleted_staff: 0,
        growth: 0,
      },
      during: {
        add_customer: 0,
        deleted_customer: 0,
        deleted_staff: 0,
        growth: 0,
      },
    };
  },
  watch: {
    date_type(val) {
      this.change();
    },
    daysValue(val) {
      this.start_time = val[0];
      this.end_time = val[1];
      this.refresh();
    },
    monthValue(val) {
      this.start_time = val[0];
      this.end_time = val[1];
      this.refresh();
    },
    weekValueStart(val) {
      if (val.toString() > this.weekValueEnd.toString()) {
        this.weekValueStart = this.weekValueEnd;
      }
      this.change();
    },
    weekValueEnd(val) {
      if (val.toString() < this.weekValueStart.toString()) {
        this.weekValueStart = this.weekValueEnd;
      }
      this.change();
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.initData();
  },
  methods: {
    initData() {
      this.loading = true;
      let oP = [];
      oP[0] = reqLiveQrStart({ id: this.id });
      oP[1] = reqLiveQrEnd({
        id: this.id,
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        page: 1,
        limit: 1000,
      });
      oP[2] = reqLiveQrEnd({
        id: this.id,
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.page,
        limit: this.limit,
      });
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
          this.name = res[0].data.live_name;
          this.today_count = res[0].data.today_count;
          this.accum_count = res[0].data.accum_count;
        } else {
          this.name = "";
          this.today_count = {
            add_customer: 0,
            deleted_customer: 0,
            deleted_staff: 0,
            growth: 0,
          };
          this.accum_count = {
            add_customer: 0,
            deleted_customer: 0,
            deleted_staff: 0,
            growth: 0,
          };
        }
        if (res[1].code === 200) {
          this.during = res[1].data.during;
          let add_customer = [];
          let deleted_customer = [];
          let deleted_staff = [];
          let growth = [];
          let time = [];
          res[1].data.data.forEach((item) => {
            time.push(item["created_at"]);
            for (let key in item) {
              if (key === "add_customer") {
                add_customer.push(item[key]);
              } else if (key === "deleted_customer") {
                deleted_customer.push(item[key]);
              } else if (key === "deleted_staff") {
                deleted_staff.push(item[key]);
              } else if (key === "growth") {
                growth.push(item[key]);
              }
            }
          });
          this.getLine(time, add_customer, deleted_customer, deleted_staff, growth);
        }
        if (res[2].code === 200) {
          this.total = res[2].data.count;
          this.tableData = res[2].data.data;
        }
      });
    },
    refresh() {
      this.loading = true;
      let oP = [];
      oP[0] = reqLiveQrEnd({
        id: this.id,
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        page: 1,
        limit: 1000,
      });
      oP[1] = reqLiveQrEnd({
        id: this.id,
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.page,
        limit: this.limit,
      });
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
          this.during = res[0].data.during;
          let add_customer = [];
          let deleted_customer = [];
          let deleted_staff = [];
          let growth = [];
          let time = [];
          res[0].data.data.forEach((item) => {
            time.push(item["created_at"]);
            for (let key in item) {
              if (key === "add_customer") {
                add_customer.push(item[key]);
              } else if (key === "deleted_customer") {
                deleted_customer.push(item[key]);
              } else if (key === "deleted_staff") {
                deleted_staff.push(item[key]);
              } else if (key === "growth") {
                growth.push(item[key]);
              }
            }
          });
          this.getLine(time, add_customer, deleted_customer, deleted_staff, growth);
        }
        if (res[1].code === 200) {
          this.total = res[1].data.count;
          this.tableData = res[1].data.data;
        }
      });
    },
    // 获取表格数据
    async reqLiveQrEnd() {
      let res = await reqLiveQrEnd({
        id: this.id,
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.page,
        limit: this.limit,
      });
      if (res.code === 200) {
        this.total = res.data.count;
        this.tableData = res.data.data;
      } else {
        this.total = 0;
        this.tableData = [];
      }
    },
    change() {
      let val = this.date_type;
      if (val === 1) {
        this.start_time = this.daysValue[0];
        this.end_time = this.daysValue[1];
      } else if (val === 2) {
        this.start_time = this.weekValueStart;
        this.end_time = this.weekValueEnd;
      } else if (val === 3) {
        this.start_time = this.monthValue[0];
        this.end_time = this.monthValue[1];
      }
      this.refresh();
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.reqLiveQrEnd();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.reqLiveQrEnd();
    },
    // 获取当月第一天
    getCurrentMonthFirst() {
      var date = new Date();
      date.setDate(1);
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },
    // 获取当月最后一天
    getCurrentMonthLast() {
      var date = new Date();
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay = 1000 * 60 * 60 * 24;
      var lastTime = new Date(nextMonthFirstDay - oneDay);
      var month = parseInt(lastTime.getMonth() + 1);
      var day = lastTime.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },
    handleBack() {
      this.$router.push("/live_code/manage");
    },
    getLine(time, data1, data2, data3, data4) {
      let myChart = this.$echarts.init(document.getElementById("line"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: 30,
          top: 0,
          icon: "circle",
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          itemGap: 40, // 设置间距
          data: ["新增客户数", "被客户删除/拉黑人数", "删除人数", "净增人数"],
        },
        color: ["#6881EC", "#7FD5D8", "#FFBBC0", "#FEA96C"],
        grid: {
          left: "5%",
          right: "6%",
          bottom: 20,
          top: 50,
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: time,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            // 坐标轴线
            show: false, // 默认显示，属性show控制显示与否
          },
          splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["#ccc"],
              width: 1,
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "新增客户数",
            type: "line",
            data: data1,
          },
          {
            name: "被客户删除/拉黑人数",
            type: "line",
            data: data2,
          },
          {
            name: "删除人数",
            type: "line",
            data: data3,
          },
          {
            name: "净增人数",
            type: "line",
            data: data4,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.statistic {
  width: 100%;
  height: 100%;
  .head {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 20px;
  }
  .main-cards {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: space-between;
    .card {
      width: 25%;
      background: #f6f7fb;
      border-radius: 6px;
      height: calc(100% - 40px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > :nth-child(1) {
          font-size: 34px;

          font-weight: bold;
          color: #333333;
        }
      }
    }
    .card + .card {
      margin-left: 20px;
    }
  }
  .date {
    width: 100%;
    display: flex;
    height: 32px;
    align-items: center;
    margin: 20px 0;
    > span {
      margin-left: 20px;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
    }
  }
  #line {
    width: 100%;
    height: 350px;
  }
  .main-footer {
    > :nth-child(1) {
      display: flex;
      height: 32px;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      > span {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }
    }
  }
}
</style>
