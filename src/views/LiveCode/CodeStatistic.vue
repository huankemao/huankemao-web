<template>
  <div
    class="code-statistic"
    v-loading="loading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="head">
      <div class="title">
        {{ $route.meta.title }}
      </div>
    </div>
    <div class="main-cards">
      <div class="card">
        <span
          >昨日新增客户数&nbsp;&nbsp;
          <el-tooltip
            class="item"
            content="新增客户数，成员新添加的客户数量。"
            placement="top"
          >
            <i class="iconfont icon-question-circle"> </i>
          </el-tooltip>
        </span>
        <p>
          <span>{{ yesterday_count.add_customer || 0 }}</span>
          <span>{{
            before_count.add_customer == 0
              ? "与前日持平"
              : before_count.add_customer > 0
              ? "与前日相比增长" + Math.abs(before_count.add_customer) + "%"
              : "与前日相比下降" + Math.abs(before_count.add_customer) + "%"
          }}</span>
        </p>
      </div>
      <div class="card">
        <span
          >昨日被客户删除/拉黑的人数&nbsp;&nbsp;
          <el-tooltip
            class="item"
            content="删除/拉黑成员的客户数，即将成员删除或加入黑名单的客户数。"
            placement="top"
          >
            <i class="iconfont icon-question-circle"> </i>
          </el-tooltip>
        </span>
        <p>
          <span>{{ yesterday_count.deleted_customer || 0 }}</span>
          <span>{{
            before_count.deleted_customer == 0
              ? "与前日持平"
              : before_count.deleted_customer > 0
              ? "与前日相比增长" + Math.abs(before_count.deleted_customer) + "%"
              : "与前日相比下降" + Math.abs(before_count.deleted_customer) + "%"
          }}</span>
        </p>
      </div>
      <div class="card">
        <span
          >昨日删除人数&nbsp;&nbsp;
          <el-tooltip class="item" content="员工删除的客户数。" placement="top">
            <i class="iconfont icon-question-circle"> </i></el-tooltip
        ></span>
        <p>
          <span>{{ yesterday_count.deleted_staff || 0 }}</span>
          <span>{{
            before_count.deleted_staff == 0
              ? "与前日持平"
              : before_count.deleted_staff > 0
              ? "与前日相比增长" + Math.abs(before_count.deleted_staff) + "%"
              : "与前日相比下降" + Math.abs(before_count.deleted_staff) + "%"
          }}</span>
        </p>
      </div>
      <div class="card">
        <span
          >昨日净增人数&nbsp;&nbsp;
          <el-tooltip
            class="item"
            content="新增客户数减去昨日被客户删除/拉黑人数。"
            placement="top"
          >
            <i class="iconfont icon-question-circle"> </i></el-tooltip
        ></span>
        <p>
          <span>{{ yesterday_count.growth || 0 }}</span>
          <span>{{
            before_count.growth == 0
              ? "与前日持平"
              : before_count.growth > 0
              ? "与前日相比增长" + Math.abs(before_count.growth) + "%"
              : "与前日相比下降" + Math.abs(before_count.growth) + "%"
          }}</span>
        </p>
      </div>
    </div>
    <div class="header-tabs">
      <el-button :class="checked === 1 ? 'active' : ''" @click="handleCheckTabs(1)"
        >活码TOP10</el-button
      >
      <el-button :class="checked === 2 ? 'active' : ''" @click="handleCheckTabs(2)"
        >客户增长</el-button
      >
      <el-button :class="checked === 3 ? 'active' : ''" @click="handleCheckTabs(3)"
        >客户属性</el-button
      >
      <span class="line"></span>
    </div>
    <div class="flex">
      <div class="date" v-show="checked !== 3">
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
          class="date-active"
          value-format="yyyy-MM-dd"
          range-separator="至"
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
          class="btn-white"
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
          class="date-active"
          format="yyyy-MM-dd"
          :clearable="false"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
        <el-select
          size="small"
          style="margin-left: 20px"
          v-model="group_code"
          placeholder="请选择"
        >
          <el-option label="所有活码" value=""> </el-option>
          <el-option
            v-for="item in liveGroupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="legend" v-show="checked === 1">
        <span @click="handleChange(0)">
          <span class="icon-circle c1"></span>
          <span class="text">新增客户数</span>
        </span>
        <span @click="handleChange(1)">
          <span class="icon-circle c2 c-active"></span>
          <span class="text">被客户删除/拉黑人数</span>
        </span>
        <span @click="handleChange(2)">
          <span class="icon-circle c3 c-active"></span>
          <span class="text">删除人数</span>
        </span>
        <span @click="handleChange(3)">
          <span class="icon-circle c4 c-active"></span>
          <span class="text">净增人数</span>
        </span>
      </div>
    </div>

    <div id="bar" class="echarts" v-show="checked === 1"></div>
    <div id="line" class="echarts" v-show="checked === 2"></div>
    <div class="main-footer" v-show="checked === 1">
      <div class="f-title">
        <span>详细数据</span>
        <el-button size="small" class="btn-blue">导出数据</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="topTableData"
          :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6idF7FB',
            fontWeight: 'normal',
          }"
          style="width: 100%"
        >
          <el-table-column label="排行">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="活码名称"> </el-table-column>
          <el-table-column
            prop="num"
            :label="
              stat_type === 1
                ? '新增客户数'
                : stat_type === 2
                ? '被客户删除/拉黑人数'
                : stat_type === 3
                ? '删除人数'
                : stat_type === 4
                ? '净增人数'
                : ''
            "
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-show="topTableData.length !== 0">
        <el-pagination
          @size-change="
            (limit) => {
              topLimit = limit;
            }
          "
          @current-change="
            (page) => {
              topPage = page;
            }
          "
          :current-page="topPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="topLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="topTotal"
        >
        </el-pagination>
      </div>
    </div>
    <div class="main-footer" v-show="checked === 2">
      <div class="f-title">
        <span>详细数据</span>
        <el-button size="small" class="btn-blue">导出数据</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="growTableData"
          :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }"
          style="width: 100%"
        >
          <el-table-column prop="created_at" label="时间"> </el-table-column>
          <el-table-column prop="add_customer" label="新增客户数"> </el-table-column>
          <el-table-column prop="deleted_customer" label="被客户删除/拉黑人数">
          </el-table-column>
          <el-table-column prop="deleted_staff" label="删除人数" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="流失率">
            <template slot="header">
              流失率&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="(被客户删除/拉黑人数+员工删除客户人数)/当前总客户人数"
                placement="top-start"
              >
                <i style="cursor: pointer" class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.loss }}%</template>
          </el-table-column>
          <el-table-column prop="growth">
            <template slot="header">
              净增人数&nbsp;
              <el-tooltip
                class="item"
                effect="dark"
                content="新增人数-被客户删除/拉黑人数"
                placement="top-start"
              >
                <i style="cursor: pointer" class="el-icon-question"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-show="growTableData.length !== 0">
        <el-pagination
          @size-change="
            (limit) => {
              growLimit = limit;
              getAddTable();
            }
          "
          @current-change="
            (page) => {
              growPage = page;
              getAddTable();
            }
          "
          :current-page="growPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="growLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="growTotal"
        >
        </el-pagination>
      </div>
    </div>
    <div class="main-footer" v-show="checked === 3">
      <p class="date">
        <el-date-picker
          style="width: 260px"
          v-model="dateValue"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          :clearable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        >
        </el-date-picker>
        <el-select
          size="small"
          style="margin-left: 20px"
          v-model="groupCode"
          placeholder="请选择"
        >
          <el-option label="所有活码" value=""> </el-option>
          <el-option
            v-for="item in liveGroupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
      <div class="f-title">
        <span>详细数据</span>
        <el-button size="small" class="btn-blue">导出数据</el-button>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="attrTableData"
          :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }"
          style="width: 100%"
        >
          <el-table-column prop="follow_state" label="渠道"> </el-table-column>
          <el-table-column prop="num" label="新增客户数"> </el-table-column>
          <el-table-column label="客户占比">
            <template slot-scope="scope">{{ scope.row.ratio }}%</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-show="attrTableData.length !== 0">
        <el-pagination
          @size-change="
            (limit) => {
              attrLimit = limit;
            }
          "
          @current-change="
            (page) => {
              attrPage = page;
            }
          "
          :current-page="attrPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="attrLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="attrTotal"
        >
        </el-pagination>
      </div>
      <div class="f-title">
        <span>客户性别统计</span>
      </div>
      <div id="line-pie"></div>
    </div>
  </div>
</template>

<script>
import {
  reqGetLiveCodeGroupList,
  reqGetStatistics,
  reqGetTop,
  reqGetAdd,
  reqGetAttribute,
} from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      checked: 1, // 1：活码top10  2：客户增长  3：客户属性
      topTableData: [], // top10数据
      topPage: 1,
      topLimit: 10,
      topTotal: 0,
      growTableData: [],
      growPage: 1,
      growLimit: 10,
      growTotal: 0,
      attrTableData: [],
      attrPage: 1,
      attrLimit: 10,
      attrTotal: 0,
      date_type: 1,
      daysValue: [this.getCurrentMonthFirst(), this.getCurrentMonthLast()],
      weekValueStart: this.getCurrentMonthFirst(),
      weekValueEnd: this.getCurrentMonthLast(),
      monthValue: [
        new Date().getMonth() + 2 > 12
          ? new Date().getFullYear() - 1 + "-" + new Date().getMonth() - 10 + "-01"
          : new Date().getFullYear() - 1 + "-" + new Date().getMonth() + 2 + "-01",
        new Date().getFullYear() +
          "-" +
          new Date().getMonth() +
          1 +
          "-" +
          new Date().getDate(),
      ],
      start_time: this.getCurrentMonthFirst(),
      end_time: this.getCurrentMonthLast(),
      liveGroupList: [],
      group_code: "",
      groupCode: "",
      stat_type: 1,
      name: "新增客户数",
      color: ["#6881EC", "#7FD5D8", "#FFBBC0", "#FEA96C"],
      before_count: {
        add_customer: 0,
        deleted_customer: 0,
        deleted_staff: 0,
        growth: 0,
      },
      yesterday_count: {
        add_customer: 0,
        deleted_customer: 0,
        deleted_staff: 0,
        growth: 0,
      },
      topData: [],
      dateValue: [this.getCurrentMonthFirst(), this.getCurrentMonthLast()],
      during: {
        add_num: 0,
        ratio: 0,
      },
    };
  },
  watch: {
    checked(val) {
      if (val === 1) {
        this.reqGetTop();
      } else if (val === 2) {
        this.reqGetAdd();
      } else if (val === 3) {
        this.reqGetAttribute();
      }
    },
    stat_type(val) {
      if (val === 1) {
        this.name = "新增客户数";
      } else if (val === 2) {
        this.name = "被客户删除/拉黑人数";
      } else if (val === 3) {
        this.name = "删除人数";
      } else if (val === 4) {
        this.name = "净增人数";
      }
      if (this.checked === 1) {
        this.reqGetTop();
      } else if (this.checked === 2) {
        this.reqGetAdd();
      }
    },
    dateValue() {
      this.reqGetAttribute();
    },
    groupCode() {
      this.reqGetAttribute();
    },
    date_type(val) {
      this.changeDate();
    },
    daysValue(val) {
      this.start_time = val[0];
      this.end_time = val[1];
      if (this.checked === 1) {
        this.reqGetTop();
      } else if (this.checked === 2) {
        this.reqGetAdd();
      }
    },
    monthValue(val) {
      this.start_time = val[0];
      this.end_time = val[1];
      if (this.checked === 1) {
        this.reqGetTop();
      } else if (this.checked === 2) {
        this.reqGetAdd();
      }
    },
    weekValueStart(val) {
      if (val.toString() > this.weekValueEnd.toString()) {
        this.weekValueStart = this.weekValueEnd;
      }
      this.changeDate();
    },
    weekValueEnd(val) {
      if (val.toString() < this.weekValueStart.toString()) {
        this.weekValueStart = this.weekValueEnd;
      }
      this.changeDate();
    },
    group_code() {
      if (this.checked === 1) {
        this.reqGetTop();
      } else if (this.checked === 2) {
        this.reqGetAdd();
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.loading = true;
      const oP = [];
      oP[0] = reqGetStatistics({});
      oP[1] = reqGetTop({
        stat_type: this.stat_type,
        start_time: this.start_time,
        end_time: this.end_time,
        group_code: this.group_code,
      });
      oP[2] = reqGetLiveCodeGroupList({});
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code == 200) {
          this.before_count = res[0].data.before_count;
          this.yesterday_count = res[0].data.yesterday_count;
        } else {
          this.before_count = {
            add_customer: 0,
            deleted_customer: 0,
            deleted_staff: 0,
            growth: 0,
          };
          this.yesterday_count = {
            add_customer: 0,
            deleted_customer: 0,
            deleted_staff: 0,
            growth: 0,
          };
        }
        if (res[1].code === 200) {
          this.topTableData = res[1].data;
          this.topTotal = res[1].data.length;
          if (res[1].data.length !== 0) {
            let dataX = [];
            let dataY = [];
            res[1].data.forEach((item) => {
              dataX.push(item.name);
              dataY.push(item.num);
            });
            this.getBar(this.name, dataX, dataY);
          } else {
            this.getBar(this.name, ["暂无数据"], [0]);
          }
        } else {
          this.topTotal = 0;
          this.topTableData = [];
          this.getBar(this.name, ["暂无数据"], [0]);
        }
        if (res[2].code === 200) {
          this.liveGroupList = res[2].data;
        }
      });
    },
    // 活码TOP10数据
    async reqGetTop() {
      this.loading = true;
      let res = await reqGetTop({
        stat_type: this.stat_type,
        start_time: this.start_time,
        end_time: this.end_time,
        group_code: this.group_code,
      });
      this.loading = false;
      if (res.code === 200) {
        this.topTableData = res.data;
        this.topTotal = res.data.length;
        if (res.data.length !== 0) {
          let dataX = [];
          let dataY = [];
          res.data.forEach((item) => {
            dataX.push(item.name);
            dataY.push(item.num);
          });
          this.getBar(this.name, dataX, dataY);
        } else {
          this.getBar(this.name, ["暂无数据"], [0]);
        }
      } else {
        this.topTotal = 0;
        this.topTableData = [];
        this.getBar(this.name, ["暂无数据"], [0]);
      }
    },
    // 客户增长
    reqGetAdd() {
      this.loading = true;
      const oP = [];
      oP[0] = reqGetAdd({
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        group_code: this.group_code,
        page: 1,
        limit: 10000,
      });
      oP[1] = reqGetAdd({
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        group_code: this.group_code,
        page: this.growPage,
        limit: this.growLimit,
      });
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
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
        } else {
          this.$message.error(res.msg);
        }
        if (res[1].code === 200) {
          this.growTableData = res[1].data.data;
          this.growTotal = res[1].data.count;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 客户增长表格
    async getAddTable() {
      let res = await reqGetAdd({
        date_type: this.date_type,
        start_time: this.start_time,
        end_time: this.end_time,
        group_code: this.group_code,
        page: this.growPage,
        limit: this.growLimit,
      });
      if (res.code === 200) {
        this.growTableData = res.data.data;
        this.growTotal = res.data.count;
      } else {
        this.$message.error(res.msg);
        this.growTableData = [];
        this.growTotal = 0;
      }
    },
    // 客户属性统计
    async reqGetAttribute() {
      let res = await reqGetAttribute({
        start_time: this.dateValue[0],
        end_time: this.dateValue[1],
        group_code: this.groupCode,
      });
      if (res.code === 200) {
        console.log(res.data);
        let soure = [["product"]];
        let lineData = [];
        this.attrTableData = res.data.add_customer_list;
        this.during = res.data.during;
        for (let key in res.data.gender_info) {
          soure.push([key]);
          lineData.push({ type: "line", smooth: true, seriesLayoutBy: "row" });
        }
        res.data.gender_list.forEach((item) => {
          soure[0].push(item.created_at);
          soure.map((res) => {
            if (res[0] === "男") {
              res.push(item.unknown_num);
            } else if (res[0] === "女") {
              res.push(item.female_num);
            } else if (res[0] === "未知") {
              res.push(item.male_num);
            }
          });
        });
        this.getLinePie(soure, lineData);
      }
    },
    changeDate() {
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
      if (this.checked === 1) {
        this.reqGetTop();
      } else if (this.checked === 2) {
        this.reqGetAdd();
      }
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
    // 标签页切换
    handleCheckTabs(index) {
      this.checked = index;
    },
    // 折线图切换显示
    handleChange(index) {
      let oDoms = document.getElementsByClassName("icon-circle");
      for (let i = 0; i < oDoms.length; i++) {
        oDoms[i].classList.add("c-active");
      }
      oDoms[index].classList.remove("c-active");
      this.stat_type = parseInt(index + 1);
    },
    // 柱状图
    getBar(name, dataX, dataY) {
      let myChart = this.$echarts.init(document.getElementById("bar"));
      let option = {
        color: [this.color[this.stat_type - 1]],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "5%",
          right: "6%",
          bottom: 0,
          top: 50,
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: [
          {
            type: "category",
            data: dataX,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name,
            type: "bar",
            barWidth: "60%",
            data: dataY,
          },
        ],
      };
      myChart.setOption(option);
    },
    // 折线图
    getLine(time, data1, data2, data3, data4) {
      let myChart = this.$echarts.init(document.getElementById("line"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          right: 30,
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
          bottom: 0,
          top: 97,
          containLabel: true,
        },
        toolbox: {
          top: 47,
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
    // 客户性别统计图
    getLinePie(source, lineData) {
      setTimeout(() => {
        let myChart = this.$echarts.init(document.getElementById("line-pie"));
        let option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source,
          },
          color: this.color,
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            ...lineData,
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: `{b}: {@${source[0][1]}} ({d}%)`,
              },
              encode: {
                itemName: "product",
                value: source[0][1],
                tooltip: source[0][1],
              },
            },
          ],
        };
        myChart.on("updateAxisPointer", function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });
        myChart.setOption(option);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.code-statistic {
  width: 100%;
  min-height: 100vh;
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
  .header-tabs  {
    position: relative;
    margin: 20px 0;

    > .el-button  {
      padding: 8px 20px;
      background: #f6f7fb;
      border-radius: 6px 6px 0px 0px;
      border: 1px solid #b9c5e9;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
    }

    > .el-button.active  {
      position: relative;
      color: #6881ec;
      background: #fff;
      border-bottom: 1px solid transparent;
      z-index: 10;
    }

    .line  {
      position: absolute;
      top: 31px;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #b9c5e9;
    }
  }
  .legend {
    display: flex;
    height: 20px;
    align-items: center;
    > span {
      cursor: pointer;
    }
    .text {
      font-size: 12px;
      font-weight: 400;
      color: #333333;
      border: none !important;
    }
    .icon-circle {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 5px 0 20px;
    }
    .c1 {
      background-color: #6881ec;
    }
    .c2 {
      background-color: #7fd5d8;
    }
    .c3 {
      background-color: #ffbbc0;
    }
    .c4 {
      background-color: #fea96c;
    }
    .c-active {
      background-color: rgb(224, 224, 224);
    }
  }
  .date {
    width: 760px;
    display: flex;
    height: 32px;
    align-items: center;
    margin: 20px 0;
    z-index: 20;
    > span {
      margin-left: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
  }
  #line {
    width: 100%;
    height: 300px;
    top: -47px;
    z-index: 10;
  }
  #bar {
    width: 100%;
    height: 350px;
  }
  .main-footer {
    .date {
      display: flex;
      align-items: center;
    }
    .f-title {
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
  #line-pie {
    margin-top: 20px;
    width: 100%;
    height: 600px;
  }
}
.flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
