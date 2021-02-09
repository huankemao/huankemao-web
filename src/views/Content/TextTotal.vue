<template>
    <div class="text_total">
        <el-dialog title="数据详情" :visible.sync="materialVisible" :close-on-click-modal="false" class="addApplet"
            width="90%" :before-close='materClose'>

            <!-- <div class="top">
                <h4>数据详情</h4>
                <el-button size="small" class="btn-blue" @click="Return">返回</el-button>
            </div> -->

            <el-alert title="仅对通过【聊天工具栏】中的资料进行行为统计。" type="success" :closable="false">
            </el-alert>
            <div class="total">
                <el-card shadow="never">
                    <p>阅读次数<i  class="iconfont icon-question-circle" style="cursor:pointer"></i></p>
                    <h6>{{info.read_num==null ?'0':info.read_num}}</h6>
                </el-card>
                <el-card shadow="never">
                    <p>分享次数<i class="iconfont icon-question-circle" style="cursor:pointer"></i></p>
                    <h6>{{info.share_num==null ?'0':info.share_num}}</h6>

                </el-card>
                <el-card shadow="never">                
                    <p>搜索次数<i class="iconfont icon-question-circle" style="cursor:pointer"></i></p>
                    <h6>{{info.search_num==null ?'0':info.search_num}}</h6>

                </el-card>
            </div>
            <div class="header-tabs">
                <el-button :class="checked=='1' ? 'active' : ''" @click="handleCheckTabs('1')" v-if="type==3">阅读详情
                </el-button>
                <el-button :class="checked=='2' ? 'active' : ''" @click="handleCheckTabs('2')">分享详情</el-button>
                <el-button :class="checked=='3' ? 'active' : ''" @click="handleCheckTabs('3')">团队详情</el-button>
                <span class="line"></span>
            </div>
            <div class="search">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input placeholder="请输入成员姓名" v-model="formInline.value" size="small" @click="search"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button size="small" class="btn-blue" @click="search">查找</el-button>
                        <el-button size="small" class="btn-white" @click="()=>{formInline.value=''
                            }">清空</el-button>
                    </el-form-item>
                </el-form>
                <!-- <el-button size="small" class="btn-blue">添加到客户池</el-button> -->

            </div>
           
            <el-table v-if="checked==1" :key="Math.random()" ref="multipleTable" :data="tableData" :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }" style="width: 100%">

                <el-table-column prop="nickname" label="客户姓名" v-if="checked==1">
                </el-table-column> 
                <el-table-column label="客户状态" v-if="checked==1">
                    <template slot-scope="scope">{{scope.row.state==0?'未知':'--'}}</template>
                </el-table-column>
                <el-table-column label="地区" v-if="checked==1">
                    <template slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</template>
                </el-table-column>
                <el-table-column prop="staff_name" label="分享人" v-if="checked==1">
                    <template slot-scope="scope">{{scope.row.staff_name?scope.row.staff_name:'系统扫码预览'}}</template>
                </el-table-column>
                <el-table-column prop="reading_time" label="阅读时间" v-if="checked==1">
                </el-table-column>
                <el-table-column prop="reading_duration" label="阅读时长(秒)" v-if="checked==1">
                </el-table-column>


            </el-table>
            <el-table v-else-if="checked==2" :key="Math.random()" ref="multipleTable" :data="tableData" :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }" style="width: 100%">

                <el-table-column prop="staff_name" label="成员名称" v-if="checked==2">
                </el-table-column>

                <el-table-column prop="content_engine_title" label="分享素材名称" v-if="checked==2">
                </el-table-column>
                <el-table-column prop="customer_name" label="接收客户名称" v-if="checked==2">
                </el-table-column>
                <el-table-column prop="create_at" label="发送时间" v-if="checked==2">
                </el-table-column>


            </el-table>
             <el-table v-else :key="Math.random()" ref="multipleTable" :data="tableData" :header-cell-style="{
            color: '#333',
            fontSize: '14px',
            backgroundColor: '#F6F7FB',
            fontWeight: 'normal',
          }" style="width: 100%">

                <el-table-column prop="staff_name" label="成员名称" v-if="checked==3">
                    <template slot-scope="scope">{{scope.row.staff_name?scope.row.staff_name:'系统扫码预览'}}</template>
                </el-table-column>


                <el-table-column label="阅读人数/次数" v-if="checked==3">
                    <template slot-scope="scope">{{scope.row.read_number}}/{{scope.row.read_times}}</template>
                </el-table-column>
                <el-table-column label="分享人数/次数" v-if="checked==3">
                    <template slot-scope="scope">{{scope.row.share_number}}/{{scope.row.share_times}}</template>

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
        ContentdataTotal,
        ContentdataDetails
    } from '@/api/index'
    export default {
        props: {
            materialVisible: {
                type: Boolean,
                default: false,
            },
            totalType: {
                type: Boolean,
                default: false,
            },
            content_id: {
                type: String,
                default: false,
            }
        },
        watch: {
            totalType: function (data) {
                // console.log(data)
                if (data) {
                    this.type = 3;
                    this.checked = '1'
                }

            },
            materialVisible: function (data) {
                console.log(this.type)

                this.getInfo();
            },
        },
        data() {
            return {
                formInline: {
                    value: ''
                },
                checked: '2',

                info: {},
                path: '',
                open: '',
                tableData: [],
                limit: 10,
                page: 1,
                total: 0,
                type: ''
            }
        },
        methods: {
            handleLimitChange(val) {
                this.limit=val;
                this.getList();
            },
            handlePageChange(val) {
                this.page=val;
                this.getList()
            },
            search(){
                this.getList()
            },
            handleCheckTabs(data) {
                this.checked = data;
                this.formInline.value = ''
                this.getList();
            },
            Return() {
                this.type = 1;
                this.checked = '2';
                this.totalType = false;
                this.$emit('closepop'); //通知父组件改变


            },
            async getInfo() {
                let res = await ContentdataTotal({
                    id: this.content_id
                })

                if (res.code == '200') {
                    this.info = res.data;
                    this.getList()

                }
            },
            async getList() {
                let res = await ContentdataDetails({
                    // id: '6ae859ff-4ad3-17a0-815c-8a8eab1309d4',
                    id: this.content_id,
                    type: this.checked,
                    keyword: this.formInline.value,
                    page: this.page,
                    limit: this.limit
                })
                this.tableData = res.data;
                this.total = res.count;
                console.log(res)
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
                this.type = 1;
                this.checked = '2';
                this.totalType = false;
                this.$emit('closepop'); //通知父组件改变
            },
        },
        created() {
            // console.log(this.$route.query)
            // if (this.$route.query.path) {
            //     this.path = this.$route.query.path;
            // }
            // if (this.$route.query.open) {
            //     this.open = this.$route.query.open;
            // }
            // if (this.$route.query.type) {
            //     this.type = this.$route.query.type;
            //     if (this.type == 3) {
            //         this.checked = '1'
            //     } else {
            //         this.checked = '2'
            //     }
            // }
        }
    }
</script>
<style lang="less" scoped>
    .text_total {
        .addApplet {
            /deep/.el-dialog {
                display: flex;
                flex-direction: column;
                margin: 0 !important;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                // width: 800px;
                background: #ffffff;
                border-radius: 12px;

                /deep/ .el-dialog__body {
                    flex: 1;
                    overflow: auto;
                    max-height: 780px !important;
                    padding-top: 20px !important;
                    box-sizing: border-box;
                }
            }
        }

        .el-timeline-item {
            padding-bottom: 40px;
        }

        /deep/.el-timeline-item__node {
            width: 11px;
            height: 11px;
            background: #F0F2FD;
            border: 1px solid #6881EC;
        }

        /deep/.el-timeline-item__content {
            display: flex;
            padding: 0 20px;
            box-sizing: border-box;

            .time {
                margin-right: 40px;
                font-size: 16px;

                font-weight: 400;
                color: #999999;
                line-height: 22px;
            }

            .content {

                font-size: 16px;

                font-weight: 400;
                color: #333333;
                line-height: 22px;
            }
        }

        .el-table {
            margin-top: 20px;
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

                font-weight: 400;
                color: #333333;
            }

            >.el-button.active {
                position: relative;
                color: #6881ec;
                background: #fff;
                border-bottom: 1px solid transparent;
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

        .search {
            display: flex;
            justify-content: space-between;

            /deep/.el-form-item {
                margin-bottom: 0;
            }
        }

        .top {
            display: flex;
            justify-content:flex-end;
            align-items: center;
            height: 32px;

            h4 {

                font-size: 18px;

                font-weight: bold;
                color: #333333;
            }
        }


        .total {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .el-card {
                width: 33%;
                background: #F6F7FB;
                border-radius: 6px;
                margin-right: 20px;

                p {

                    font-size: 16px;

                    font-weight: 400;
                    color: #333333;
                    line-height: 22px;

                    i {
                        margin-left: 6px;
                    }
                }

                h6 {
                    margin-top: 20px;
                    font-size: 36px;

                    font-weight: bold;
                    color: #333333;
                    line-height: 50px;
                }
            }
        }

        .el-alert {
            margin: 20px 0 20px 0;
            font-size: 16px;

            font-weight: 400;
            color: #333333;
            line-height: 22px;
            background: #FFF7E6;
            border-radius: 6px;
            border: 1px solid #F5DAA3;
        }
    }
</style>