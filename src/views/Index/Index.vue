<template>
  <div
    class="index"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="title">{{ $route.meta.title }}</div>
    <div class="flex-wrap">
      <div class="main-left">
        <div class="yl">
          <p class="main-head">
            <span></span>
            <span>引流数据统计</span>
          </p>
          <div v-if="ylBarFlag" id="ylBar" class="echarts"></div>
          <div class="notfound" v-else>
            <img src="../../assets/file_type/none.png" width="100px" alt="" />
            <span>暂无数据</span>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="hk">
          <p class="main-head">
            <span></span>
            <span>获客计划进度</span>
          </p>
          <div class="pie-wrap">
            <div class="month">
              <el-progress
                type="circle"
                :stroke-width="18"
                :percentage="100"
                :color="customColor"
                :format="format"
              ></el-progress>
              <p>
                <span>月度完成进度</span>
                <span>已完成</span>
              </p>
            </div>
            <div class="season">
              <el-progress
                type="circle"
                :stroke-width="18"
                :percentage="25"
                :color="customColor"
                :format="format"
              ></el-progress>
              <p>
                <span>季度完成进度</span>
                <span>25%</span>
              </p>
            </div>
            <div class="year">
              <el-progress
                type="circle"
                :stroke-width="18"
                :percentage="30"
                :color="customColor"
                :format="format"
              ></el-progress>
              <p>
                <span>年度完成进度</span>
                <span>30%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-left">
        <div class="khPie">
          <p class="main-head">
            <span></span>
            <span>客户数据统计</span>
          </p>
          <div class="content">
            <div class="pies">
              <div id="allPie" class="echarts"></div>
              <div class="legend">
                <p>
                  <span class="c1"></span>
                  <span>已认领客户</span>
                </p>
                <p class="num">{{ total_customer.claimed || 0 }}</p>
                <p>
                  <span class="c2"></span>
                  <span>待认领客户</span>
                </p>
                <p class="num">{{ total_customer.unclaimed || 0 }}</p>
              </div>
              <div id="losePie" class="echarts"></div>
              <div class="legend">
                <p>
                  <span class="c1"></span>
                  <span>员工删除</span>
                </p>
                <p class="num">{{ loss_customer.deleted_staff || 0 }}</p>
                <p>
                  <span class="c2 unactive"></span>
                  <span>客户删除</span>
                </p>
                <p class="num">{{ loss_customer.deleted_customer || 0 }}</p>
              </div>
            </div>
            <div class="list">
              <p>
                <span>跟进中客户</span>
                <span>{{ follow_total.under_follow || 0 }}</span>
              </p>
              <p>
                <span>未跟进客户</span>
                <span>{{ follow_total.not_followed || 0 }}</span>
              </p>
              <p>
                <span>已成交客户</span>
                <span>{{ follow_total.closed || 0 }}</span>
              </p>
            </div>
            <div class="list">
              <p>
                <span>今日新增客户</span>
                <span>{{ today_count.add_customer || 0 }}</span>
              </p>
              <p>
                <span>今日净增客户</span>
                <span>{{ today_count.growth || 0 }}</span>
              </p>
              <p>
                <span>今日流失客户</span>
                <span>{{ today_count.deleted_customer || 0 }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="khBar">
          <p class="main-head">
            <span></span>
            <span>客户增长趋势</span>
            <el-button
              style="margin-left: auto"
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
              class="date-active"
              type="daterange"
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
              v-model="daysValue[0]"
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
              v-model="daysValue[1]"
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
              v-model="daysValue"
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
          </p>
          <div class="content">
            <div class="legend">
              <span>
                <span class="icon-circle c1"></span>
                <span class="text">新增客户数</span>
              </span>
              <span>
                <span class="icon-circle c2"></span>
                <span class="text">流失客户数</span>
              </span>
            </div>
            <div v-if="khBarFlag" id="khAdd" class="echarts"></div>
            <div v-else class="notfound">
              <img src="../../assets/file_type/none.png" width="100px" alt="" />
              <span>暂无数据</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main-left">
        <div class="xsPie">
          <p class="main-head">
            <span></span>
            <span>线索统计</span>
          </p>
          <div class="content">
            <div>
              <el-progress
                type="dashboard"
                :width="150"
                :stroke-width="18"
                :percentage="30"
                :color="customColor"
                :format="format2"
              ></el-progress>
              <span class="top">转化率</span>
              <span class="bottom">
                <span>线索总计</span>
                <span>7784</span>
              </span>
            </div>
            <div class="legend">
              <p>
                <span class="c1"></span>
                <span>已转化</span>
              </p>
              <p class="num">15641</p>
              <p>
                <span class="c2 unactive"></span>
                <span>未转化</span>
              </p>
              <p class="num">1541</p>
            </div>
            <div class="list">
              <p>
                <span>今日新增线索</span>
                <span>240</span>
              </p>
              <p>
                <span>昨日新增线索</span>
                <span>240</span>
              </p>
              <p>
                <span>本月新增线索</span>
                <span>240</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="xsTable">
          <p class="main-head">
            <span></span>
            <span>最新线索</span>
          </p>
          <el-table
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-spinner="el-icon-loading"
            ref="multipleTable"
            height="100%"
            style="margin-top: 15px"
            :data="tableData"
            :header-cell-style="{
              color: '#333',
              fontSize: '14px',
              backgroundColor: '#F6F7FB',
              fontWeight: 'normal',
            }"
          >
            <el-table-column label="客户名称"> </el-table-column>
            <el-table-column prop="follow_add_way" label="联系方式"> </el-table-column>
            <el-table-column label="添加日期"> </el-table-column>
            <el-table-column prop="address" label="状态"> </el-table-column>
            <el-table-column label="操作"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqDrainage, reqCustomTrend, reqCustomTotal } from "@/api/index";
import { GetPercent } from "@/util/utils";
export default {
  data() {
    return {
      stat_type: 1,
      date_type: 1,
      daysValue: [],
      color: ["#6881EC", "#FFBBC0", "#7fd5d8"],
      name: "新增客户数",
      tableData: [],
      loading: false,
      ylBarFlag: true,
      khBarFlag: true,
      loading: true,
      total_customer: "",
      loss_customer: "",
      follow_total: "",
      today_count: "",
    };
  },
  watch: {
    daysValue(val) {
      if (new Date(val[0]).getTime() > new Date(val[1]).getTime()) {
        this.daysValue[0] = val[1];
        this.daysValue[1] = val[1];
      }
      this.reqCustomTrend();
    },
  },
  created() {
    this.daysValue = [
      this.fun_date(-6),
      new Date().toLocaleDateString().split("/").join("-"),
    ];
  },
  mounted() {
    window.onresize = () => {
      let ylBar = this.$echarts.init(document.getElementById("ylBar"));
      let khAdd = this.$echarts.init(document.getElementById("khAdd"));
      let allPie = this.$echarts.init(document.getElementById("allPie"));
      let losePie = this.$echarts.init(document.getElementById("losePie"));
      ylBar.resize();
      khAdd.resize();
      allPie.resize();
      losePie.resize();
    };
    this.getData();
    this.$bus.$on("update", () => {
      this.getData();
    });
  },
  methods: {
    getData() {
      const oP = [];
      oP[0] = reqDrainage({});
      oP[1] = reqCustomTrend({
        date_type: this.date_type,
        start_time: this.daysValue[0],
        end_time: this.daysValue[1],
        page: 1,
        limit: 10000,
      });
      oP[2] = reqCustomTotal({});
      Promise.all(oP).then((res) => {
        this.loading = false;
        if (res[0].code === 200) {
          this.ylBarFlag = true;
          let name = [];
          let value = [];
          let all = 0;
          res[0].data.forEach((item) => {
            name.push(item.name);
            value.push(item.count);
          });
          value.forEach((item) => {
            all += item;
          });
          value.forEach((item, index) => {
            name.map((res, num) => {
              if (index === num) {
                name[index] = `${res}\n\n${item}(${GetPercent(item, all)})`;
              }
            });
          });
          this.$nextTick(() => {
            this.getYlBar(name, value);
          });
        } else {
          this.ylBarFlag = false;
        }
        if (res[1].code === 200) {
          this.khBarFlag = true;
          let add = [];
          let lose = [];
          let time = [];
          res[1].data.data.forEach((item) => {
            add.push(item.add_customer);
            lose.push(item.deleted_customer);
            time.push(item.created_at);
          });
          this.getKhAddBar(time, add, lose);
        } else {
          this.khBarFlag = false;
        }
        if (res[2].code === 200) {
          this.loss_customer = res[2].data.loss_customer;
          this.follow_total = res[2].data.follow_total;
          this.today_count = res[2].data.today_count;
          this.total_customer = res[2].data.total_customer;
          this.getAllPie(this.total_customer.total, [
            { value: this.total_customer.claimed || 0, name: "已认领客户" },
            { value: this.total_customer.unclaimed || 0, name: "待认领客户" },
          ]);
          this.getLosePie(this.loss_customer.total, [
            { value: this.loss_customer.deleted_staff || 0, name: "员工删除" },
            { value: this.loss_customer.deleted_customer || 0, name: "客户删除" },
          ]);
        } else {
        }
      });
    },
    //  客户增长
    async reqCustomTrend() {
      let res = await reqCustomTrend({
        date_type: this.date_type,
        start_time: this.daysValue[0],
        end_time: this.daysValue[1],
        page: 1,
        limit: 10000,
      });
      if (res.code === 200) {
        let add = [];
        let lose = [];
        let time = [];
        res.data.data.forEach((item) => {
          add.push(item.add_customer);
          lose.push(item.loss);
          time.push(item.created_at);
        });
        this.getKhAddBar(time, add, lose);
      } else {
        this.khBarFlag = false;
      }
    },
    // 获取aa天前/后的日期(正数表示后，负数表示前)
    fun_date(aa) {
      var date1 = new Date(),
        time1 =
          date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + aa);
      var y = date2.getFullYear();
      var m =
        date2.getMonth() + 1 < 10 ? "0" + (date2.getMonth() + 1) : date2.getMonth() + 1;
      var d = date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate();
      var time2 = y + "-" + m + "-" + d;
      return time2;
    },
    // 进度条颜色控制
    customColor(percentage) {
      if (percentage < 100) {
        return "#6881EC";
      } else {
        return "#67C23A";
      }
    },
    // 进度条文字控制
    format(percentage) {
      let all = 40;
      return (percentage / 100) * all + "/" + all;
    },
    format2(percentage) {
      return percentage + "%";
    },
    // 引流统计柱状图
    getYlBar(dataX, dataY) {
      let myChart = this.$echarts.init(document.getElementById("ylBar"));
      let option = {
        grid: {
          left: 0,
          right: 20,
          bottom: 0,
          top: 0,
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
        },
        xAxis: [
          {
            show: true,
            type: "category",
            data: dataX,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              //---坐标轴 轴线
              show: false, //---是否显示
            },
            axisTick: {
              //---坐标轴 刻度
              show: false, //---是否显示
            },
            splitLine: {
              //---grid 区域中的分隔线
              show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            },
          },
        ],
        yAxis: [
          {
            show: false,
          },
        ],
        series: [
          {
            type: "bar",
            data: dataY,
            itemStyle: {
              barBorderColor: "#6881EC",
              color: "#6881EC",
              barBorderRadius: 3,
            },
            showBackground: true,
            backgroundStyle: {
              color: "#E4E9F2",
              barBorderRadius: 3,
            },
            barWidth: 6, //---柱形宽度
          },
        ],
      };
      myChart.setOption(option);
    },
    //总客户数据统计
    getAllPie(all, data) {
      let myChart = this.$echarts.init(document.getElementById("allPie"));
      let option = {
        tooltip: {
          trigger: "item",
          position: function (point) {
            // 固定在顶部
            return [point[0], "10%"];
          },
        },
        color: this.color,
        series: [
          {
            type: "pie",
            radius: ["60%", "100%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              borderRadius: "100%",
              borderColor: "#fff",
              borderWidth: 10,
            },
            label: {
              show: true,
              position: "center",
              color: "#333",
              formatter: () => {
                return "总客户\n\n" + all;
              },
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    //丢失客户数据统计
    getLosePie(all, data) {
      let myChart = this.$echarts.init(document.getElementById("losePie"));
      let option = {
        tooltip: {
          trigger: "item",
        },
        color: this.color,
        series: [
          {
            type: "pie",
            radius: ["60%", "100%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              borderRadius: "100%",
              borderColor: "#fff",
              borderWidth: 10,
            },
            label: {
              show: true,
              position: "center",
              color: "#333",
              formatter: () => {
                return "流失客户\n\n" + all;
              },
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            labelLine: {
              show: false,
            },
            data,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 客户增长趋势
    getKhAddBar(time, data1, data2) {
      let myChart = this.$echarts.init(document.getElementById("khAdd"));
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
          left: "6%",
          right: "6%",
          bottom: 0,
          top: 30,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: time,
            axisLine: {
              //---坐标轴 轴线
              show: true, //---是否显示
              lineStyle: {
                color: "#999",
              },
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisTick: {
              //---坐标轴 刻度
              show: false, //---是否显示
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 2,
            axisLine: {
              //---坐标轴 轴线
              show: false, //---是否显示
            },
            axisTick: {
              //---坐标轴 刻度
              show: false, //---是否显示
            },
            splitLine: {
              //---grid 区域中的分隔线
              show: true, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
              lineStyle: {
                type: "dashed",
                color: "#E6E7EB",
              },
            },
          },
        ],
        series: [
          {
            name: "新增客户数",
            type: "line",
            barWidth: "60%",
            data: data1,
            itemStyle: {
              barBorderColor: this.color[0],
              color: this.color[0],
              barBorderRadius: [4],
            },
            barWidth: 16, //---柱形宽度
          },
          {
            name: "流失客户数",
            type: "line",
            data: data2,
            itemStyle: {
              barBorderColor: this.color[1],
              color: this.color[1],
              barBorderRadius: [4],
            },
            barWidth: 16, //---柱形宽度
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  position: relative;
  width: calc(100% + 5px);
  height: 100%;
  overflow: auto;
  background-color: #fff;
  .notfound {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    > span {
      font-size: 14px;
      color: #333333;
    }
  }
  .main-head {
    display: flex;
    align-items: center;
    line-height: 20px;
    > span:nth-child(1) {
      width: 4px;
      height: 16px;
      background: #6881ec;
      border-radius: 2px;
    }
    > span:nth-child(2) {
      height: 20px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      margin-left: 10px;
    }
  }
  .flex-wrap {
    width: calc(100% - 5px);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .main-left {
      width: 37.5%;
      background: #ffffff;

      > div {
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #b9c5e9;
        margin: 15px 15px 0 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > div {
          height: calc(100% - 35px);
        }
      }
    }
    .main-right {
      width: 62.5%;
      background: #ffffff;
      > div {
        padding: 15px;
        border-radius: 6px;
        border: 1px solid #b9c5e9;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > div {
          height: calc(100% - 35px);
        }
      }
    }
    .yl,
    .hk {
      height: calc((100vh - 305px) / 100 * 27);
      height: 226px;
    }
    .khPie,
    .khBar {
      height: calc((100vh - 305px) / 100 * 42);
      height: 350px;
    }
    .xsPie,
    .xsTable {
      height: calc((100vh - 305px) / 100 * 31);
      height: 265px;
    }
    .hk .pie-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        width: 33%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        > div {
          width: 125px;
          height: 125px;
        }
        > P {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          span + span {
            margin-top: 20px;
          }
        }
      }
      > :nth-child(2) {
        border-left: 1px solid #e5ebfb;
        border-right: 1px solid #e5ebfb;
      }
    }
    .khPie > .content {
      .pies {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 190px;
        > div {
          position: relative;
          width: 25%;
          height: 140px;
        }
        .abs {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          > :nth-child(1) {
            font-size: 12px;
            font-weight: 400;
            color: #333333;
          }
          > :nth-child(2) {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
          }
        }
        > div + div {
          margin-left: 20px;
        }
        .legend {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          > p {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 20px;

            .c1 {
              width: 8px;
              height: 8px;
              background: #6881ec;
              border-radius: 50%;
              margin-right: 10px;
            }
            .c2 {
              width: 8px;
              height: 8px;
              background: #ffbbc0;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
          > p + p {
            margin-top: 15px;
          }
          .num {
            margin-left: 18px;
          }
        }
      }
      .list {
        width: 100%;
        display: flex;
        margin-top: 20px;
        > p {
          width: calc(33% - 20px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          background-color: #f6f7fb;
          height: 40px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
        }
        > :nth-child(2) {
          margin: 0 20px;
        }
      }
    }
    .khBar {
      .main-head {
        align-items: flex-start;
        > span:nth-child(1) {
          margin-top: 2px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .legend {
          display: flex;
          height: 20px !important;
          align-items: center;
          .text {
            font-size: 12px;
            border: none !important;
            font-weight: 400;
            color: #333333;
          }
          .icon-circle {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin: 0 5px 0 40px;
          }
          .c1 {
            background-color: #6881ec;
            margin-left: 0px;
          }
          .c2 {
            background-color: #ffbbc0;
          }
          .c3 {
            background-color: #7fd5d8;
          }
        }
        #khAdd {
          height: calc(100% - 35px);
        }
      }
    }
    .xsPie > .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div:nth-child(1) {
        position: relative;
        top: 0;
        left: 0;
        > .top {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translate(-50%, 0);
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 1;
        }
        > .bottom {
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translate(-50%, 0);
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
          > span:nth-child(1) {
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 1;
            margin-right: 20px;
          }
          > span:nth-child(2) {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            line-height: 1;
          }
        }
      }
      .legend {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        > p {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;

          .c1 {
            width: 8px;
            height: 8px;
            background: #6881ec;
            border-radius: 50%;
            margin-right: 10px;
          }
          .c2 {
            width: 8px;
            height: 8px;
            background: #ffbbc0;
            border-radius: 50%;
            margin-right: 10px;
          }
          .unactive {
            background-color: #e4e9f2;
          }
        }
        > p + p {
          margin-top: 15px;
        }
        .num {
          margin-left: 18px;
        }
      }
      .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        > p {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          background-color: #f6f7fb;
          height: 40px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
          > span + span {
            margin-left: 20px;
          }
        }
        > p:nth-child(2) {
          margin: 20px 0;
        }
      }
    }
  }
}
</style>
