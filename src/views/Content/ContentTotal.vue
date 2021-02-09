<template>
    <div class="content_total">
        <el-dialog title="内容统计" :visible.sync="materialVisible" :close-on-click-modal="false" class="addApplet"
            :before-close='materClose' width='1300px'>

            <el-row class="total" :gutter="24">
                <el-col :span="8">
                    <el-card shadow="never">
                        <h6>昨日搜索次数</h6>
                        <div class="num">
                            <h4>{{num.search_num?num.search_num:0}}</h4>
                            <p v-if="num.search_num_before==0">与前日持平</p>
                            <p v-else>{{num.search_num_before}}</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="never">
                        <h6>昨日发送次数</h6>
                        <div class="num">
                            <h4>{{num.send_num?num.send_num:0}}</h4>
                            <p v-if="num.send_num_before==0">与前日持平</p>
                            <p v-else>{{num.send_num_before}}</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="never">
                        <h6>昨日客户阅读次数</h6>
                        <div class="num">
                            <h4>{{num.open_num?num.open_num:0}}</h4>
                            <p v-if="num.open_num_before==0">与前日持平</p>
                            <p v-else>{{num.open_num_before}}</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="header-tabs">
                <el-button :class="checked=='1' ? 'active' : ''" @click="handleCheckTabs('1')">内容TOP10</el-button>
                <el-button :class="checked=='2' ? 'active' : ''" @click="handleCheckTabs('2')">员工TOP10</el-button>
                <el-button :class="checked=='3' ? 'active' : ''" @click="handleCheckTabs('3')">搜索词TOP10</el-button>
                <el-button :class="checked=='4' ? 'active' : ''" @click="handleCheckTabs('4')">搜索次数</el-button>
                <el-button :class="checked=='5' ? 'active' : ''" @click="handleCheckTabs('5')">发送次数</el-button>
                <el-button :class="checked=='6'? 'active' : ''" @click="handleCheckTabs('6')">阅读次数</el-button>
                <span class="line"></span>
            </div>

            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
                <el-form-item label="" v-if="checked=='1'" prop="search_name">
                    <el-input placeholder="请输入内容" v-model="formInline.search_name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="" v-if="checked=='1'||checked=='2'||checked=='4'||checked=='5'||checked=='6'"
                    prop="content_engine_group_id">
                    <el-select v-model="formInline.content_engine_group_id" placeholder="所有分组" size="small" clearable>
                        <el-option :label="item.name" :value="item.id" v-for="(item,index) in option" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="daysValue">
                    <el-button ref="day" :class="dateType === 'days' ? 'btn-blue btn-active' : 'btn-white'"
                        @click="dateType = 'days'" size="small">按日</el-button>
                    <el-date-picker style="width: 260px" v-show="dateType === 'days'" v-model="daysValue"
                        type="daterange" size="small" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd" class="date-active">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="" prop="weekValueStart">
                    <el-button ref="week" :class="dateType === 'week' ? 'btn-blue btn-active' : 'btn-white'"
                        size="small" @click="dateType = 'week'">按周</el-button>

                    <el-date-picker style="width: 160px" v-show="dateType === 'week'" v-model="weekValueStart"
                        type="week" size="small" format="yyyy 第 WW 周" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd" class="date-active-center" :clearable="false">
                    </el-date-picker>
                    <el-date-picker style="width: 160px" v-show="dateType === 'week'" v-model="weekValueEnd" type="week"
                        size="small" format="yyyy 第 WW 周" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd" class="date-active-left" :clearable="false">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="" prop="monthValue">
                    <el-button ref="month" class="btn-white"
                        :class="dateType === 'month' ? 'btn-blue btn-active' : 'btn-white'" size="small"
                        @click="dateType = 'month'">按月</el-button>
                    <el-date-picker style="width: 260px" v-show="dateType === 'month'" v-model="monthValue" size="small"
                        format="yyyy-MM-dd" type="monthrange" range-separator="至" start-placeholder="开始月份"
                        end-placeholder="结束月份" value-format="yyyy-MM-dd" class="date-active">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-button ref="month" class="btn-blue" @click="search()" size="small"> 查询</el-button>
                </el-form-item>

            </el-form>
            <div class="sign" v-if="checked=='1'||checked=='2'">
                <div class="sign_t" @click="changeNum('1')">
                    <p class="sp1"></p>
                    <h6>
                        搜索次数
                    </h6>
                </div>
                <div class="sign_t" @click="changeNum('2')">
                    <p class="sp2"></p>
                    <h6>
                        发送次数
                    </h6>
                </div>
                <div class="sign_t" @click="changeNum('3')">
                    <p class="sp3"></p>
                    <h6>
                        阅读次数
                    </h6>
                </div>

            </div>
            <div id="bar" class="echarts"></div>


            <div class="bot">
                <h6 class="bot_title">详细数据</h6>

                <el-button size="medium" @click="exportExcel()">导出数据</el-button>
            </div>
            <el-table element-loading-text="加载中..." element-loading-spinner="el-icon-loading" ref="multipleTable"
                :data="tableData" :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }" style="width: 100%">
                <el-table-column prop="num" label="次数" v-if="checked=='1'">
                </el-table-column>
                <el-table-column prop="content_engine_title" label="内容" v-if="checked=='1'">
                </el-table-column>
                <el-table-column prop="content_engine_type" label="类型" v-if="checked=='1'">
                    <template slot-scope="scope">{{Type(scope.row.content_engine_type)}}</template>

                </el-table-column>

                <el-table-column prop="phone" label="成员名称" v-if="checked=='2'">
                </el-table-column>
                <el-table-column prop="create_count" label="次数" v-if="checked=='2'">
                </el-table-column>
                <el-table-column prop="search_name" label="搜索名称" v-if="checked=='3'">
                </el-table-column>
                <el-table-column prop="num" label="次数" v-if="checked=='3'">
                </el-table-column>
                <el-table-column prop="num" label="次数" v-if="checked=='4'||checked=='5'||checked=='6'">
                </el-table-column>
                <el-table-column prop="created_at" label="时间" v-if="checked=='4'||checked=='5'||checked=='6'">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleLimitChange" @current-change="handlePageChange" :current-page="page"
                    :page-sizes="[10, 20, 50, 100]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>

            </div>
        </el-dialog>


    </div>
</template>
<script>
    import {
        ContentNum,
        ContentTop,
        ContentSearch,
        ContentGroupList,
        StaffTop,
        SearchTop
    } from '@/api/index'
    export default {
        props: {
            materialVisible: {
                type: Boolean,
                default: false,

            },

        },
        watch: {
            materialVisible: function (data) {
                console.log(data)
                if (data) {
                    this.getTime();
                }


            },
            weekValueStart(val) {
                if (val.toString() > this.weekValueEnd.toString()) {
                    this.weekValueStart = this.weekValueEnd;
                }
            },
            weekValueEnd(val) {
                if (val.toString() < this.weekValueStart.toString()) {
                    this.weekValueStart = this.weekValueEnd;
                }
            }
        },
        data() {

            return {
                checked: 1,
                formInline: {
                    content_engine_group_id: '',
                    start_time: this.getCurrentMonthFirst(),
                    end_time: this.getCurrentMonthLast(),
                    search_name: ''
                },
                tableData: [],
                value1: '',
                radio1: '按日',
                num: {},
                dateType: "days",
                daysValue: [this.getCurrentMonthFirst(), this.getCurrentMonthLast()],
                weekValueStart: this.getCurrentMonthFirst(),
                weekValueEnd: this.getCurrentMonthLast(),
                monthValue: [this.getCurrentMonthFirst(), this.getCurrentMonthLast()],
                option: [],
                types: 1,
                numType: '',
                topType: '1',
                page: 1,
                total: 0,
                limit: 10
            }
        },

        methods: {
            handleLimitChange(val) {
                this.limit = val;
                if (this.checked == '4') {
                    this.numType = 1;
                    this.getNum();
                } else if (this.checked == '5') {
                    this.numType = 2;
                    this.getNum();
                } else if (this.checked == '6') {
                    this.numType = 3;
                    this.getNum();
                } else if (this.checked == '1') {
                    this.topType = '1'
                    this.getcontentTop();
                } else if (this.checked == '2') {
                    this.topType = '1'
                    this.getstaffTop();
                } else if (this.checked == '3') {
                    this.getsearchTop()
                }
            },
            handlePageChange(val) {
                this.page = val;
                if (this.checked == '4') {
                    this.numType = 1;
                    this.getNum();
                } else if (this.checked == '5') {
                    this.numType = 2;
                    this.getNum();
                } else if (this.checked == '6') {
                    this.numType = 3;
                    this.getNum();
                } else if (this.checked == '1') {
                    this.topType = '1'
                    this.getcontentTop();
                } else if (this.checked == '2') {
                    this.topType = '1'
                    this.getstaffTop();
                } else if (this.checked == '3') {
                    this.getsearchTop()
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
            exportExcel() {
                if (this.tableData.length != 0) {
                    require.ensure([], () => {

                        var {
                            export_json_to_excel
                        } = require('../../assets/js/Export2Excel');
                        if (this.checked == 1) {
                            var tHeader = ['次数', '内容', '类型'];
                            var filterVal = ['num', 'content_engine_title', 'type'];
                        } else if (this.checked == 2) {
                            var tHeader = ['手机号', '次数'];
                            var filterVal = ['phone', 'create_count'];
                        } else if (this.checked == 3) {
                            var tHeader = ['搜索名称', '次数'];
                            var filterVal = ['search_name', 'num'];
                        } else {
                            var tHeader = ['次数', '时间'];
                            var filterVal = ['num', 'created_at'];
                        }

                        var list = this.tableData;
                        var data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '列表excel');
                    })
                } else {
                    this.$message.error('暂无数据')
                }

            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            search() {
                if (this.dateType == 'days') {
                    if (this.daysValue) {
                        this.formInline.start_time = this.daysValue[0];
                        this.formInline.end_time = this.daysValue[1];
                    } else {
                        this.formInline.start_time = '';
                        this.formInline.end_time = '';
                    }
                    this.types = 1;
                    // this.getNum()
                } else if (this.dateType == 'week') {

                    this.formInline.start_time = this.weekValueStart;
                    this.formInline.end_time = this.weekValueEnd;
                    this.types = 2;
                    // this.getNum()
                } else if (this.dateType) {
                    if (this.monthValue.length != 0) {
                        this.formInline.start_time = this.monthValue[0];
                        this.formInline.end_time = this.monthValue[1];
                    } else {
                        this.formInline.start_time = '';
                        this.formInline.end_time = '';
                    }
                    this.types = 3;
                    // this.getNum()
                }
                if (this.checked == '4') {
                    this.getNum();
                } else if (this.checked == '5') {
                    this.getNum();
                } else if (this.checked == '6') {
                    this.getNum();
                } else if (this.checked == '1') {
                    this.getcontentTop();
                } else if (this.checked == '2') {
                    this.getstaffTop();
                } else if (this.checked == '3') {
                    this.getsearchTop()
                }
            },
            //获取内容top10
            async getcontentTop() {
                let res = await ContentTop({
                    type: this.topType,
                    search_name: this.formInline.search_name,
                    content_engine_group_id: this.formInline.content_engine_group_id,
                    start_time: this.formInline.start_time,
                    end_time: this.formInline.end_time,
                    content_engine_type: '',
                    wx_user_id: '',
                    page: this.page,
                    limit: this.limit
                })
                if (res.code == '200') {
                    var time = [];
                    var num = [];
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                    res.data.data.map(item => {
                        item.type = this.Type(item.content_engine_type)
                        time.push(item.content_engine_title)
                        num.push(item.num);
                    })
                    let myChart = this.$echarts.init(document.getElementById("bar"));
                    if (this.topType == 1) {
                        var option = {

                            color: ['#6881EC'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                // name: '直接访问',
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }]
                        };
                    } else if (this.topType == 2) {
                        var option = {

                            color: ['#7FD5D8'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                // name: '直接访问',
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }]
                        };
                    } else {
                        var option = {

                            color: ['#FFBBC0'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                // name: '直接访问',
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }]
                        };
                    }

                    myChart.setOption(option);
                }
            },
            //获取员工top10
            async getstaffTop() {
                let res = await StaffTop({
                    type: this.topType,
                    content_engine_group_id: this.formInline.content_engine_group_id,
                    start_time: this.formInline.start_time,
                    end_time: this.formInline.end_time,
                    content_engine_type: '',
                    page: this.page,
                    limit: this.limit
                })
                if (res.code == '200') {
                    var time = [];
                    var num = [];
                    this.tableData = res.data.data;
                    this.total = res.data.count;
                    res.data.data.map(item => {
                        time.push(item.phone)
                        num.push(item.create_count);
                    })
                    let myChart = this.$echarts.init(document.getElementById("bar"));
                    if (this.topType == 1) {
                        var option = {

                            color: ['#6881EC'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                // name: '直接访问',
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }]
                        };
                    } else if (this.topType == 2) {
                        var option = {

                            color: ['#7FD5D8'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                // name: '直接访问',
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }]
                        };
                    } else {
                        var option = {

                            color: ['#FFBBC0'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                data: time,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: [{
                                type: 'value'
                            }],
                            series: [{
                                // name: '直接访问',
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }]
                        };
                    }

                    myChart.setOption(option);
                }
            },
            //获取搜索词top10
            async getsearchTop() {
                let res = await SearchTop({
                    start_time: this.formInline.start_time,
                    end_time: this.formInline.end_time,
                    page: this.page,
                    limit: this.limit
                })
                if (res.code == '200') {
                    var time = [];
                    var num = [];
                    this.tableData = res.data.data;
                    this.total = res.data.count;

                    res.data.data.map(item => {
                        time.push(item.search_name)
                        num.push(item.num);
                    })
                    let myChart = this.$echarts.init(document.getElementById("bar"));

                    var option = {
                        color: ['#3398DB'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: time,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: [{
                            // name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: num
                        }]
                    };
                    myChart.setOption(option);
                }
            },
            //获取顶部次数
            async getTime() {
                let res = await ContentNum({})
                if (res.code == '200') {
                    console.log(res)
                    this.num = res.data;
                    this.getGroup();
                }
            },
            //获取分组
            async getGroup() {
                let res = await ContentGroupList({});
                if (res.code == 200) {
                    this.option = res.data.data;
                    this.getcontentTop();
                }


            },
            //获取搜索，发送，阅读柱状图
            async getNum(data) {
                let res = await ContentSearch({
                    type: this.numType,
                    date_type: this.types,
                    wx_user_id: '',
                    search_name: this.formInline.search_name,
                    content_engine_group_id: this.formInline.content_engine_group_id,
                    content_engine_type: '',
                    start_time: this.formInline.start_time,
                    end_time: this.formInline.end_time,
                    page: this.page,
                    limit: this.limit
                });

                if (res.code == 200) {
                    this.tableData = res.data.data;
                    this.total = res.data.count;

                    var time = [];
                    var num = [];
                    res.data.data.map(item => {
                        time.push(item.created_at)
                        num.push(item.num);
                    })
                    let myChart = this.$echarts.init(document.getElementById("bar"));

                    var option = {
                        color: ['#3398DB'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: time,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: [{
                            // name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: num
                        }]
                    };
                    myChart.setOption(option);
                }

            },
            changeNum(data) {
                if (this.checked == 1) {
                    this.topType = data;
                    this.getcontentTop();
                } else if (this.checked == 2) {
                    this.topType = data;
                    this.getstaffTop();
                }
            },
            handleCheckTabs(flag) {
                this.checked = flag;
                this.topType == 1;
                this.page = 1;
                this.$refs['formInline'].resetFields()
                if (this.checked == '4') {
                    this.numType = 1;
                    this.getNum();
                } else if (this.checked == '5') {
                    this.numType = 2;
                    this.getNum();
                } else if (this.checked == '6') {
                    this.numType = 3;
                    this.getNum();
                } else if (this.checked == '1') {
                    this.topType = '1'
                    this.getcontentTop();
                } else if (this.checked == '2') {
                    this.topType = '1'
                    this.getstaffTop();
                } else if (this.checked == '3') {
                    this.getsearchTop()
                }
            },
            Type(data) {
                if (data) {
                    if (data == '1') {
                        return '文本'
                    } else if (data == '2') {
                        return '图片'
                    } else if (data == '3') {
                        return '文章'
                    } else if (data == '4') {
                        return '音频'
                    } else if (data == '5') {
                        return '视频'
                    } else if (data == '6') {
                        return '小程序'
                    } else if (data == '7') {
                        return '文件'
                    }
                }
            },
            materClose() {
                this.$emit('closepop'); //通知父组件改变
            },
        }
    }
</script>
<style lang="less" scoped>
    .content_total {
        /deep/.el-dialog {
            width: 1300px;
            height:800px;
            overflow-y: auto;
            
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            margin: 0 !important;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ffffff;
        }

        // /deep/.el-dialog__body {
        //     height: 200px;
        //     overflow-y: auto;
        // }

        #bar {
            width: 100%;
            height: 340px;
        }

        .title {
            font-size: 20px;

            font-weight: bold;
            color: #333333;
            line-height: 28px;
        }

        .content {
            text-align: center;

            img {
                width: 100px;
                height: 92px;
                margin: 69px 0 10px 0;
            }

            p {

                font-size: 14px;

                font-weight: 400;
                color: #B9C5E9;
                line-height: 20px;
            }
        }

        .total {
            // margin-top: 20px;

            .el-card {
                background: #F6F7FB;
                border-radius: 6px;

                h6 {
                    font-size: 16px;

                    font-weight: 400;
                    color: #333333;
                    line-height: 22px;
                }

                .num {
                    display: flex;
                    justify-content: space-between;
                    align-content: flex-start;
                    margin-top: 20px;

                    h4 {

                        font-size: 36px;

                        font-weight: bold;
                        color: #333333;
                        line-height: 50px;
                    }

                    p {

                        font-size: 16px;

                        font-weight: 400;
                        color: #333333;
                        line-height: 50px;
                    }
                }
            }
        }

        .el-form {
            /deep/.el-input__inner {
                border-radius: 6px;
                border: 1px solid #B9C5E9;
            }

            // /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {

            //     background: #6881EC;
            //     // border-radius: 6px 0px 0px 6px;
            //     border-color: #6881EC;
            // }

            // /deep/.el-range-editor.el-input__inner {
            //     height: 42px !important;
            //     border-radius: 0 6px 6px 0;
            // }

            // /deep/.el-radio-button__inner:first-child {
            //     border-radius: 4px 0 0 4px !important;
            // }

            // /deep/.el-input__inner {
            //     // border-radius: 6px;
            //     border: 1px solid #B9C5E9 !important;
            // }
        }

        .header-tabs {
            position: relative;
            margin: 20px 0;

            >.el-button {
                width: 122px;
                padding: 8px 20px;
                background: #f6f7fb;
                border-radius: 6px 6px 0px 0px;
                border: 1px solid #b9c5e9;
                font-size: 14px;
                border-bottom: 1px solid transparent;

                font-weight: 400;
                color: #333333;
            }

            >.el-button.active {
                position: relative;
                color: #6881ec;
                background: #fff;
                z-index: 10;
            }

            .line {
                position: absolute;
                top: 31px;
                left: 0;
                display: inline-block;
                width: 100%;
                height: 1px;
                background-color: #b9c5e9;
            }
        }


        .sign {
            display: flex;
            align-items: center;

            .sign_t {
                display: flex;
                align-items: center;
                margin-right: 40px;

                // p {
                //     width: 8px;
                //     height: 8px;
                //     background: #333;
                //     border-radius: 50%;
                // }
                .active1 {}
            }

            h6 {

                font-size: 14px;

                font-weight: 400;
                color: #333333;
                line-height: 20px;
            }

            p {
                margin-right: 6px;
            }

            .sp1 {
                width: 8px;
                height: 8px;
                background: #6881EC;
                border-radius: 50%;
            }

            .sp2 {
                width: 8px;
                height: 8px;

                background: #7FD5D8;
                border-radius: 50%;
            }

            .sp3 {
                width: 8px;
                height: 8px;
                background: #FFBBC0;
                border-radius: 50%;
            }
        }

        .content {
            min-height: 267px;
            border-bottom: 1px solid #E5EBFB;
        }

        .bot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 30px 0 20px 0;

            .bot_title {
                font-size: 16px;

                font-weight: bold;
                color: #333333;
            }

            .el-button {
                color: #fff;
                background: #6881EC;
                border-radius: 5px;
            }
        }

    }
</style>