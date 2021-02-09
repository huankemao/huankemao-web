<template>
    <div class="content_manage">
        <el-container>
            <el-aside class="tabs" style="width: 210px">
                <div class="group-main">
                    <el-button size="small" class="btn-blue" @click="
              () => {
                operationType = 'add';
                form.groupName = '';
                form.code = '';
                addGroupFlag = true;
              }
            ">新增分组</el-button>

                    <el-tree style="margin-top: 20px" :data="groupList" node-key="code" default-expand-all
                        :draggable="true" :expand-on-click-node="false" :props="defaultProps"
                        @node-click="handleTreeNode" :highlight-current="true" :current-node-key="code">
                        <template slot-scope="{ node, data }">
                            <div class="tree-wrap">
                                <span
                                    :class="code === data.id ? 'active group-name' : 'group-name'">{{ data.name }}</span>
                                <div class="drop-wrap">
                                    <el-dropdown v-if="data.name !== '所有' && data.name !== '未分组'"
                                        @command="handleCommand($event, data)">
                                        <span class="el-dropdown-link span-wrap">
                                            <i class="more el-icon-more"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="edit">编辑分组</el-dropdown-item>
                                            <el-dropdown-item command="delete">删除分组</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </div>
                        </template>
                    </el-tree>
                </div>
            </el-aside>
            <el-main>
                <div class="title">聊天工具栏<i @click="showCourse = !showCourse" class="iconfont icon-question-circle"> </i>
                </div>
                <div class="course" v-show="showCourse">
                    <p>
                        <span class="black">1、聊天工具栏提供统一管理，分类统计，实现内部文件规范化统一化管理，外部客户聊天数据实时统计，及时捕捉客户意向。</span>
                    </p>
                    <p> <span class="black">2、销售工具中的聊天工具栏含各类型文件，方便与客户沟通时可直接通过【销售工具】中的【聊天工具栏】发送给客户。</span></p>
                    <p> <span class="black">3、使用聊天工具栏需配置聊天工具栏，配置成功后可使用，<a href="#" style="color:#6881EC"
                                @click="setting">立即前往</a></span>
                    </p>
                    <p>
                        <span class="black">4、聊天工具栏中文章提供阅读时长统计，使用此功能需配置公众号，<a href="#" style="color:#6881EC"
                                @click="setting">立即前往</a></span>
                    </p>
                </div>
                <div class="header-tabs">
                    <el-button :class="checked=='0' ? 'active' : ''" @click="handleCheckTabs('0')">所有</el-button>
                    <el-button :class="checked=='1' ? 'active' : ''" @click="handleCheckTabs('1')">快捷消息</el-button>
                    <el-button :class="checked=='2' ? 'active' : ''" @click="handleCheckTabs('2')">图片</el-button>
                    <el-button :class="checked=='3' ? 'active' : ''" @click="handleCheckTabs('3')">文章</el-button>
                    <el-button :class="checked=='8' ? 'active' : ''" @click="handleCheckTabs('8')">跳转链接</el-button>
                    <el-button :class="checked=='4' ? 'active' : ''" @click="handleCheckTabs('4')">音频</el-button>
                    <el-button :class="checked=='5'? 'active' : ''" @click="handleCheckTabs('5')">视频</el-button>
                    <el-button :class="checked=='6'? 'active' : ''" @click="handleCheckTabs('6')">小程序</el-button>
                    <el-button :class="checked=='7'? 'active' : ''" @click="handleCheckTabs('7')">文件</el-button>
                    <span class="line"></span>
                </div>
                <div class="search">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="">
                            <el-input placeholder="请输入内容" v-model="formInline.value" size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button size="small" class="btn1" @click="getList">查找</el-button>
                            <el-button size="small" class="btn2" @click="formInline.value=''">清空</el-button>
                        </el-form-item>
                    </el-form>
                    <div v-if="checked=='0'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ?'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                    </div>
                    <div v-else-if="checked=='1'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <el-button size="small" class="btns" @click="()=>{dio1=true,form.content_group_id=content_group_id?content_group_id:groupList2[0].id
                        }">添加快捷消息</el-button>
                    </div>
                    <div v-else-if="checked=='2'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handDown()">批量下载</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="()=>{
                            dio2=true,form2.content_group_id=content_group_id?content_group_id:groupList2[0].id
                            }">上传图片</el-button>
                    </div>
                    <div v-else-if="checked=='3'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="addGraphic">添加文章</el-button>
                        <!-- <el-button size="small" class="btns" @click="()=>{
                            dio3=true,form3.content_group_id=content_group_id
                            }">快速创建</el-button> -->
                    </div>
                    <div v-else-if="checked=='4'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="()=>{
                            dio4=true,form4.content_group_id=content_group_id?content_group_id:groupList2[0].id
                            }">上传音频</el-button>
                    </div>
                    <div v-else-if="checked=='5'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="()=>{
                            dio6=true,form6.content_group_id=content_group_id?content_group_id:groupList2[0].id
                            }">上传视频</el-button>
                    </div>
                    <div v-else-if="checked=='6'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="()=>{
                            dio5=true,form5.content_group_id=content_group_id?content_group_id:groupList2[0].id
                            }">上传小程序</el-button>
                    </div>
                    <div v-else-if="checked=='7'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="()=>{
                            dio7=true,form7.content_group_id=content_group_id?content_group_id:groupList2[0].id
                            }">上传文件</el-button>
                    </div>
                    <div v-else-if="checked=='8'">
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleMove">批量移动</el-button>
                        <el-button :disabled="selectionData.length == 0"
                            :class="selectionData.length === 0 ? 'btn-opacity':'btn-blue'" size="small"
                            @click="handleDel()">批量删除</el-button>
                        <!-- <el-button size="small" class="btn-white" disabled>同步公众号</el-button> -->
                        <el-button size="small" class="btns" @click="()=>{
                            dio3=true,form3.content_group_id=content_group_id?content_group_id:groupList2[0].id
                            }">添加跳转链接</el-button>
                    </div>
                </div>

                <el-table element-loading-text="加载中..." element-loading-spinner="el-icon-loading" ref="table"
                    style="width: 100%" :data="tableData" :row-style="{height: '81px'}"
                    :header-cell-style="{color: '#333', fontSize: '14px', backgroundColor: '#F6F7FB',fontWeight: 'normal'}"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column label="内容">
                        <template slot-scope="scope">
                            <div v-if="scope.row.type=='1'">
                                <div class="cont_box">
                                    <img src="../../assets/file_type/texts.png"
                                        style="width: 40px; height: 40px;margin-right: 12px;">
                                    <el-tooltip class="item" effect="dark" :content="scope.row.content"
                                        placement="bottom">
                                        <el-button type="text" class="btn_tip">{{scope.row.content}}</el-button>
                                    </el-tooltip>
                                </div>

                            </div>
                            <div v-else-if="scope.row.type=='2'" class="cont_box">
                                <img :src="scope.row.content" style="width: 40px; height: 40px;margin-right: 12px;">
                                <el-tooltip class="item" effect="dark" :content="scope.row.file_name"
                                    placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.file_name}}</el-button>
                                </el-tooltip>
                            </div>

                            <div class="cont_box" v-else-if="scope.row.type=='3'">

                                <img :src="scope.row.cover" style="width: 40px; height: 40px;margin-right: 12px;">
                                <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.title}}</el-button>
                                </el-tooltip>
                            </div>
                            <div class="cont_box" v-else-if="scope.row.type=='4'">
                                <img src="../../assets/file_type/listen.png"
                                    style="width: 40px; height: 40px;margin-right: 12px;" @click="play(scope.row.id)">
                                <audio :ref="scope.row.id" @ended="over(scope.row)">
                                    <source :src="scope.row.content" />
                                </audio>
                                <el-tooltip class="item" effect="dark" :content="scope.row.file_name"
                                    placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.file_name}}</el-button>
                                </el-tooltip>
                            </div>
                            <div class="cont_box" v-else-if="scope.row.type=='5'">
                                <!-- <video :src="scope.row.content" controls="true"
                                    class="video-js vjs-big-play-centered vjs-fluid"
                                    style="width: 60px;height:60px;margin-right:15px" @play="onPlayerPlay(scope.row.id)"
                                    :ref="scope.row.id">
                                </video> -->
                                <Video ref="child2" :src="scope.row.content" @checkVideoFun='checkVideoFun'
                                    @masksCloseFun='masksCloseFun'
                                    style="width: 60px;height:60px;margin-right:15px"></Video>


                                <el-tooltip class="item" effect="dark" :content="scope.row.file_name"
                                    placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.file_name}}</el-button>
                                </el-tooltip>
                            </div>
                            <div class="cont_box" v-else-if="scope.row.type=='6'">
                                <img :src="scope.row.cover" style="width: 40px; height: 40px;margin-right: 12px;">

                                <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.title}}</el-button>
                                </el-tooltip>
                            </div>
                            <div class="cont_box" v-else-if="scope.row.type=='8'">
                                <img :src="scope.row.cover" style="width: 40px; height: 40px;margin-right: 12px;">

                                <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.title}}</el-button>
                                </el-tooltip>
                            </div>
                            <div v-else-if="scope.row.type=='7'" class="cont_box">
                                <img src="../../assets/file_type/word.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-if="scope.row.file_suffix=='1'">
                                <img src="../../assets/file_type/excel.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='2'">
                                <img src="../../assets/file_type/ppt.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='3'">
                                <img src="../../assets/file_type/pdf.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='4'">
                                <img src="../../assets/file_type/img.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='5'">
                                <img src="../../assets/file_type/audio.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='6'">
                                <img src="../../assets/file_type/vedio.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='7'">
                                <img src="../../assets/file_type/txt.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='8'">
                                <img src="../../assets/file_type/zip.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;"
                                    v-else-if="scope.row.file_suffix=='9'">
                                <img src="../../assets/file_type/other.png"
                                    style="width: 35px; height: 40px;margin-right: 12px;" v-else>
                                <el-tooltip class="item" effect="dark" :content="scope.row.file_name"
                                    placement="bottom">
                                    <el-button type="text" class="btn_tip">{{scope.row.file_name}}</el-button>
                                </el-tooltip>
                            </div>

                        </template>

                    </el-table-column>

                    <el-table-column prop="explain" label="说明" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="user_id" label="上传者"></el-table-column>
                    <el-table-column label="素材来源">
                        <template slot-scope="scope">{{scope.row.source==1?'素材库':'聊天工具栏'}}</template>
                    </el-table-column>
                    <el-table-column label="类型"><template slot-scope="scope">{{Type(scope.row.type)}}</template>
                    </el-table-column>
                    <el-table-column prop="create_at" label="添加时间"></el-table-column>
                    <el-table-column prop="name" width='200' label="操作">
                        <template slot-scope="scope">
                            <div class="operation">
                                <el-button class="text_btn" type="text"
                                    v-if="scope.row.type=='1'||scope.row.type=='3'||scope.row.type=='6'||scope.row.type=='8'"
                                    @click="modify(scope.row)">编辑</el-button>
                                <el-button class="text_btn" type="text" @click="removes(scope.row)">移动</el-button>
                                <el-button class="text_btn" type="text" @click="look(scope.row)"
                                    v-if="scope.row.type=='2'||scope.row.type=='3'">
                                    预览</el-button>
                                <!-- <el-button class="text_btn" type="text" @click="texttotal(scope.row)">数据
                                </el-button> -->
                                <el-button class="text_btn" type="text"
                                    v-if="scope.row.type=='1'||scope.row.type=='2'||scope.row.type=='4'||scope.row.type=='5'||scope.row.type=='6'||scope.row.type=='7'||scope.row.type=='8'"
                                    @click="Delete(scope.row)">删除</el-button>
                                <el-button class="text_btn" type="text"
                                    @click="downloadIamge(scope.row.content,scope.row.file_name)"
                                    v-if="scope.row.type=='2'">
                                    下载
                                </el-button>
                            </div>

                        </template>
                    </el-table-column>
                </el-table>


                <div class="pagination">
                    <el-pagination @size-change="handleLimitChange" @current-change="handlePageChange"
                        :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                    <!-- <img src="../../assets/images/total.png" class="total_btn" @click="lookTotal()"> -->
                </div>
            </el-main>
        </el-container>
        <Setting :setVisible="setVisible" @handleCloseSet="handleCloseSet" />
        <!-- 分组操作弹窗 -->
        <el-dialog :title="
        operationType === 'add'
          ? '新增分组'
          : operationType === 'edit'
          ? '编辑分组'
          : operationType === 'delete'
          ? '删除分组'
          : ''
      " :visible="addGroupFlag" :close-on-click-modal="false" class="addGroup" @close="closeDialog('group')"
            width='500px'>
            <el-form v-show="operationType === 'add' || operationType === 'edit'" label-position="left"
                label-width="120px" :model="group" ref="group">
                <el-form-item label="分组名称" prop="name" :rules="[
					  { required: true, message: '请输入分组名称'},
					]">
                    <el-input v-model="group.name" placeholder="请输入分组名（不得超过15个字符）" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <div style="margin-top: 20px" v-show="operationType === 'delete'">
                【{{
          groud_name
        }}】一旦删除，归属于该分组的所有内容都将被移至【未分组】，确定删除分组吗?
            </div>
            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="addGroupFlag=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="handleConfirm">确 定</el-button>
            </template>
        </el-dialog>
        <!-- 添加文本 -->
        <el-dialog :title="modify_data.id?'修改快捷消息':'添加快捷消息'" :visible.sync="dio1" :close-on-click-modal="false"
            @close="closeDialog('form')" class="addText" width='640px'>
            <el-form label-position="left" label-width="120px" :model="form" ref="form">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader :props="defaultProps2" v-model="form.content_group_id" :options="groupList2"
                        @change="handleChange"></el-cascader>
                </el-form-item>

                <el-form-item label="快捷消息内容" prop="content" :rules="[
					  { required: true, message: '请输入快捷消息内容'},
					]" :autosize="{ minRows: 8,}">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form.content" maxlength="1000" :rows="8"
                        show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form.explain" maxlength="255" show-word-limit></el-input>
                </el-form-item>
            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio1=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="addText">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 上传图片 -->
        <el-dialog title="上传图片" :visible.sync="dio2" :close-on-click-modal="false" class="addText" width='640px'
            @close="closeDialog('form2')">
            <el-form label-position="left" label-width="120px" :model="form2" ref="form2">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader @change="handleChange" :props="defaultProps2" v-model="form2.content_group_id"
                        :options="groupList2"></el-cascader>
                </el-form-item>

                <el-form-item label="上传图片" prop="filelist" :rules="[
					  { required: true, message: '请选择图片'},
					]">
                    <el-upload ref="upload" class="upload-demo" :action="uploadUrl" :data="uploadData" name='file'
                        :before-upload="beforeAvatarUpload" :show-file-list="false" :on-success="reqUploadSuccess">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">图片大小不超过2M，图片名不能重复，支持JPG、JPEG及PNG格式</div>

                    </el-upload>
                    <div class="upimg_box" v-if="form2.filelist">
                        <div class="img_box" v-for="(item,index) in form2.filelist" :key="index">
                            <el-image :src="item.content" class="img" :preview-src-list="srcList" :lazy='true'
                                @click="Preview(item.content)">
                            </el-image>
                            <!-- <img :src="item.content" class="img"> -->
                            <img src="../../assets/images/del.png" class="del" @click="delImg(item)">
                            <img src="../../assets/images/look.png" class="look" @click="Preview(item.content)">
                        </div>

                    </div>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form2.explain" maxlength="255" show-word-limit></el-input>
                </el-form-item>
            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio2=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="uploadImg">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 上传视频 -->
        <el-dialog title="上传视频" :visible.sync="dio6" :close-on-click-modal="false" class="addText"
            @close="closeDialog('form6')" width='640px'>
            <el-form label-position="left" label-width="120px" :model="form6" ref="form6">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader :props="defaultProps2" v-model="form6.content_group_id" :options="groupList2"
                        @change="handleChange"></el-cascader>
                </el-form-item>

                <el-form-item label="视频" prop="filelist" :rules="[
					  { required: true, message: '请选择视频'},
					]">
                    <el-upload class="upload-demo" :action="uploadUrl" :data="uploadData4" :show-file-list="false"
                        name='file' :on-success="reqUploadSuccess5" :before-upload="beforeAvatarUpload3">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">视频上传大小不超过10M，支持MP4格式。</div>
                    </el-upload>
                    <div class="vedio_list" v-if="form6.filelist">
                        <div class="vedio_box" v-for="(item,index) in form6.filelist" :key="index">
                            <!-- <video :src="item.content" controls="true" class="video-js vjs-big-play-centered vjs-fluid"
                                style="width:100px;height:70px" @play="onPlayerPlay2(item.media_id)"
                                :ref="item.media_id">
                            </video> -->
                            <Video ref="child2" :src="item.content" @checkVideoFun='checkVideoFun'
                                @masksCloseFun='masksCloseFun' style="width:100px;height:70px"></Video>

                            <img src="../../assets/images/del.png" class="del" @click="delVedio(item)">
                        </div>

                    </div>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form6.explain" maxlength="255" show-word-limit></el-input>
                </el-form-item>
            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio6=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="uploadMp4">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 上传文件 -->
        <el-dialog title="上传文件" :visible.sync="dio7" :close-on-click-modal="false" class="addText"
            @close="closeDialog('form7')" width='640px'>
            <el-form label-position="left" label-width="120px" :model="form7" ref="form7" v-loading="loading"
                element-loading-text="文件上传中..." element-loading-spinner="el-icon-loading">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader :props="defaultProps2" v-model="form7.content_group_id" :options="groupList2"
                        @change="handleChange"></el-cascader>
                </el-form-item>

                <el-form-item label="文件" prop="filelist" :rules="[
					  { required: true, message: '请上传文件'},
					]">
                    <el-upload class="upload-demo" :action="uploadUrl" :data="uploadData5" name='file'
                        :on-success="reqUploadSuccess6" :on-remove="handleRemove" :show-file-list="false"
                        :before-upload="beforeFileUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <div class="upfile_box" v-if="form7.filelist">
                        <div class="file_box" v-for="(item,index) in form7.filelist" :key="index">
                            <img src="../../assets/file_type/other.png" class="img">
                            <img src="../../assets/images/del.png" class="del" @click="delFile(item)">
                            <el-tooltip class="item" effect="dark" :content="item.file_name" placement="bottom">
                                <el-button type="text" class="btn_tip">{{item.file_name}}</el-button>
                            </el-tooltip>
                        </div>

                    </div>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form7.explain" maxlength="255" show-word-limit></el-input>
                </el-form-item>
            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio7=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="uploadFile">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 上传音频 -->
        <el-dialog title="上传音频" :visible.sync="dio4" :close-on-click-modal="false" class="addText"
            @close="closeDialog('form4')" width='640px'>
            <el-form label-position="left" label-width="120px" :model="form4" ref="form4">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader @change="handleChange" :props="defaultProps2" v-model="form4.content_group_id"
                        :options="groupList2"></el-cascader>
                </el-form-item>

                <el-form-item label="上传音频" prop="filelist" :rules="[
					  { required: true, message: '请选择音频'},
					]">
                    <el-upload class="upload-demo" :action="uploadUrl" :data="uploadData3"
                        :on-success="reqUploadSuccess3" :show-file-list="false" :before-upload="beforeAvatarUpload2"
                        :on-preview="handlePreview">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">音频上传大小不超过2MB，播放长度不超过60s，支持AMR格式</div>
                    </el-upload>
                    <div class="audio_list" v-if="form4.filelist">
                        <div class="audio_box" v-for="(item,index) in form4.filelist" :key="index">
                            <div class="button" @click="play2(item.media_id)">
                                <img src="../../assets/images/audio.png" class="img">
                            </div>
                            <img src="../../assets/images/del.png" class="del" @click="delAudio(item)">
                            <audio :ref="item.media_id" @ended="over(item)">
                                <source src="http://huankemao.vip.brt360.com/static/file/20201225135238.MP3" />
                            </audio>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form4.explain" maxlength="255" show-word-limit></el-input>
                </el-form-item>
            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio4=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="uploadVedio">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 快速创建-文章 -->
        <el-dialog :title="modify_data.id?'修改跳转链接':'上传跳转链接'" :visible.sync="dio3" :close-on-click-modal="false"
            class="addText" @close="closeDialog('form3')">
            <el-form label-position="left" label-width="120px" :model="form3" ref="form3" :rules="rule3">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader @change="handleChange" :props="defaultProps2" v-model="form3.content_group_id"
                        :options="groupList2"></el-cascader>
                </el-form-item>
                <el-form-item label="图片封面" prop="cover" :rules="[
					  { required: true, message: '请选择图片封面'},
					]">
                    <!-- <el-upload class="avatar-uploader" :show-file-list="false" :action="uploadUrl" :data="uploadData"
                        :before-upload="beforeAvatarUpload" :on-success="reqUploadSuccess2">
                        <img v-if="form3.cover" :src="form3.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">图片大小不超过2M，图片名不能重复，支持JPG、JPEG及PNG格式</div>
                    </el-upload> -->
                    <img v-if="form3.cover" :src="form3.cover" class="avatar"
                        @click=" () => { (pickVisible = true),(ContentList()), (dioType = 2); } " />
                    <i v-else class="el-icon-plus avatar-uploader-icon"
                        @click=" () => { (pickVisible = true),(ContentList()), (dioType = 2); } "></i>
                </el-form-item>
                <el-form-item label="填写标题" prop="title" :rules="[
					  { required: true, message: '请填写标题'},
					]">
                    <el-input v-model="form3.title" maxlength="30" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="添加描述" prop="summary" :rules="[
					  { required: true, message: '请添加描述'},
					]">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form3.summary" maxlength="128"
                        show-word-limit>
                    </el-input>
                </el-form-item>
                <!-- <el-form-item label="说明" prop="title" :rules="[
					  { required: true, message: '请输入说明'},
					]">
                    <el-input v-model="form3.title"></el-input>
                </el-form-item> -->
                <el-form-item label="点击跳转" prop="link">
                    <el-input v-model="form3.link"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="explain">
                    <el-input v-model="form3.explain" maxlength="255" show-word-limit></el-input>
                </el-form-item>
            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio3=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="uploadTxImg">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 上传小程序 -->
        <el-dialog :title="modify_data.id?'修改小程序':'上传小程序'" :visible.sync="dio5" :close-on-click-modal="false"
            class="addApplet" @close="closeDialog('form5')" width='800px' top='20px'>
            <el-container>
                <el-aside class="tab">
                    <p>{{form5.content}}</p>
                    <img :src="form5.cover" class="img" v-if="form5.cover">
                    <p v-else class="img"></p>
                    <p class="tip"><img class="tip_img" src="../../assets/images/tip.png">小程序</p>
                </el-aside>
                <el-main>
                    <el-alert :closable="false">
                        <p>添加的小程序必须是与企业微信相关联的小程序，否则将发送失败。</p>


                    </el-alert>
                    <el-form label-position="left" label-width="120px" :model="form5" ref="form5">
                        <el-form-item label="选择分组" prop="content_group_id">
                            <el-cascader @change="handleChange" :props="defaultProps2" v-model="form5.content_group_id"
                                :options="groupList2">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="小程序appId" prop="applets_id" :rules="[
					  { required: true, message: '请输入小程序appId'},
					]">
                            <el-input v-model="form5.applets_id" maxlength="255" show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item label="小程序路径" prop="applets_path" :rules="[
					  { required: true, message: '请输入小程序路径'},
					]">
                            <el-input v-model="form5.applets_path" maxlength="255" show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item label="卡片标题" prop="title" :rules="[
					  { required: true, message: '请输入卡片标题'},
					]">
                            <el-input v-model="form5.title" maxlength="12" show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item label="卡片封面" prop="cover" :rules="[
					  { required: true, message: '请选择卡片封面'},
					]">
                            <!-- <el-upload class="avatar-uploader" :show-file-list="false" :action="uploadUrl"
                                :data="uploadData" :before-upload="beforeAvatarUpload" :on-success="reqUploadSuccess4">
                                <img v-if="form5.cover" :src="form5.cover" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div slot="tip" class="el-upload__tip">图片大小不超过2M，支持JPG、JPEG及PNG格式</div>
                            </el-upload> -->
                            <img v-if="form5.cover" :src="form5.cover" class="avatar"
                                @click=" () => { (pickVisible = true),(ContentList()), (dioType = 1); } " />
                            <i v-else class="el-icon-plus avatar-uploader-icon"
                                @click=" () => { (pickVisible = true),(ContentList()), (dioType = 1); } "></i>
                        </el-form-item>
                        <el-form-item label="说明" prop="explain">
                            <el-input v-model="form5.explain" maxlength="255" show-word-limit></el-input>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio5=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="upload_wx">提 交</el-button>
            </template>
        </el-dialog>
        <!-- 移动选择小组 -->
        <el-dialog title="移动分组" :visible.sync="dio8" :close-on-click-modal="false" class="addText"
            @close="closeDialog('form8')" width='500px'>
            <el-form label-position="left" label-width="120px" :model="form8" ref="form8">
                <el-form-item label="选择分组" prop="content_group_id">
                    <el-cascader @change="handleChange" :props="defaultProps2" v-model="form8.content_group_id"
                        :options="groupList2"></el-cascader>
                </el-form-item>


            </el-form>

            <template slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="dio8=false">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="move">移 动</el-button>
            </template>
        </el-dialog>
        <!-- 预览图片 -->
        <el-dialog title="图片预览" :visible.sync="dio9" class="addText" width='640px'>
            <div class="img_box">
                <img :src="look_img" class="look_img">

            </div>
        </el-dialog>
        <!-- 预览文章 -->
        <el-dialog title="文章预览" :visible.sync="dio10" class="lookImg" @close='closeQrcode' width='640px'>
            <div class="qrcode" ref="qrCodeUrl"></div>
            <div class="tip">
                手机微信扫码预览
            </div>

        </el-dialog>
        <ConentnTotal :materialVisible="materialVisible" :totalType='totalType' :content_id='content_id'
            @closepop="closepop" />
        <ContenttTotal :materialVisible="materialVisible2" @closepop="closepop2" />


        <!-- 素材库 -->
        <el-dialog title="选择素材" :visible.sync="pickVisible" width="730px" :close-on-click-modal="false">
            <div class="btns-top">
                <SelectTree :options="groupList" :props="contProps" :accordion="false" :value="pickGroupId"
                    @getValue="getPickGroupId" />
                <el-input style="width: 200px" size="small" placeholder="输入标题/内容进行搜索" v-model="contSearch"
                    maxlength="50">
                </el-input>
                <el-button size="small" class="btn-blue" @click="
            () => {
              ContentList();
            }
          ">
                    查找
                </el-button>
                <el-button size="small" class="btn-white" @click="
            () => {
              contSearch = '';
              ContentList();
            }
          ">
                    清空
                </el-button>
                <el-button size="small" class="btn-blue" @click="
            () => {
              uploadVisible = true;
            }
          ">
                    本地上传
                </el-button>
            </div>
            <div class="img-wrap">
                <span v-show="contList.length === 0" style="display: inline-block; margin: auto">暂无数据</span>
                <div v-show="contList.length !== 0" class="list" @click="handlePickImg(item)" :ref="item.id"
                    v-for="(item, index) in contList" :key="index">
                    <span class="ly">素材来源：{{ item.source === 1 ? "素材库" : "活码" }}--{{
              item.content_group_name
            }}</span>
                    <img :src="item.content" class="pick-img" alt="" />
                    <span class="bgc">{{ item.file_name }}</span>
                </div>
            </div>
            <div class="pagination" v-show="contTotal !== 0">
                <el-pagination @size-change="
            (limit) => {
              contLimit = limit;
              ContentList();
            }
          " @current-change="
            (page) => {
              contPage = page;
              ContentList();
            }
          " :current-page="contPage" :page-sizes="[10, 20, 50, 100]" :page-size="contLimit"
                    layout="total, prev, pager, next, jumper" :total="contTotal"></el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="handlePickCancel">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="handlePickConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 本地上传 -->
        <el-dialog title="上传图片素材" :visible.sync="uploadVisible" :close-on-click-modal="false" width="500px"
            @close="closeDialog('uploadForm')">
            <el-form style="margin-top: 20px" label-position="left" label-width="150px" ref="uploadForm"
                :model="uploadForm">
                <el-form-item style="margin-bottom: 10px" label="上传图片" prop="uploadFile" :rules="[
					  { required: true, message: '请选择图片'},
					]">
                    <el-upload :class="hideUpload ? 'hide avatar-uploader' : 'avatar-uploader'" :action="uploadUrl"
                        :data="uploadData" :show-file-list="false" :on-change="handleUploadChange"
                        :on-remove="handleUploadRemove" :on-success="reqUploadimgSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="uploadForm.uploadFile" :src="uploadForm.uploadFile" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">
                            （图片大小不超过2M，支持JPG、JPEG及PNG格式）
                        </div>
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" class="btn-white" @click="handleUploadCancel">取 消</el-button>
                <el-button size="small" class="btn-blue" @click="uploadSubmit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import SelectTree from "@/components/SelectTree";
    import Video from "@/components/video";
    import QRCode from 'qrcodejs2'
    import {
        ContentList,
        ContentGroupList,
        ContentGroupAdd,
        ContentGroupEdit,
        ContentGroupDel,
        ContentAdd,
        Upload,
        ContentDel,
        uploadUrl,
        ContentEdit
    } from '@/api/index'
    import ConentnTotal from "@/views/Content/TextTotal";
    import ContenttTotal from "@/views/Content/ContentTotal";
    import Setting from "@/components/Setting.vue";

    export default {
        components: {
            ConentnTotal,
            ContenttTotal,
            SelectTree,
            Video,
            Setting
        },
        data() {
            var isEmail = (rule, value, callback) => {
                if (value != "") {
                    // 不为空的时候进行验证
                    const reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error("请输入正确链接"));
                    }
                } else {
                    // 为空的时候就直接放过去（这里一定要写，不然既不报错也不会往下走【应该和router的next()相同】）
                    return callback(new Error("请输入跳转链接"));
                }
            };
            return {
                setVisible: false,
                videoState: false,
                rule3: {
                    link: [{
                        required: true,
                        validator: isEmail,
                        trigger: "blur",
                    }, ],
                },
                uploadForm: {
                    uploadFile: ''
                },
                hideUpload: false,
                uploadVisible: false,
                dioType: '',
                pickVisible: false,
                contList: [],
                contSearch: '',
                pickGroupId: '',
                contProps: {
                    children: "son",
                    label: "name",
                },
                allContGroupList: [],
                materialVisible2: false,
                content_id: '',
                totalType: false,
                materialVisible: false,
                loading: false,
                look_img: '',
                content_html: "",
                operationType: '',
                addGroupFlag: false,
                uploadUrl: '',
                groupList: [],
                group: {
                    name: ''
                },
                defaultProps: {
                    children: "son",
                    label: "name",
                },
                defaultProps2: {
                    value: 'id',
                    children: "son",
                    label: "name",
                },

                code: '',
                checked: 0,
                formInline: {
                    value: ''
                },
                tableData: [],
                dio1: false,
                dio2: false,
                dio3: false,
                dio4: false,
                dio5: false,
                dio6: false,
                dio7: false,
                dio8: false,
                dio9: false,
                dio10: false,
                options: [],
                form: {
                    user: '',
                    content_group_id: '',
                    content: "",
                    explain: ''
                },
                form2: {
                    explain: '',
                    content_group_id: '',
                    content: '',
                    cover: '',
                    img: '',
                    filelist: []
                },
                form3: {
                    link: '',
                    cover: '',
                    content: '',
                    title: '',
                    content_group_id: "",
                    explain: '',
                    media_id: '',
                    summary: ""
                },
                form4: {
                    content_group_id: '',
                    filelist: [],
                    explain: '',

                },
                form5: {
                    cover: '',
                    title: '',
                    content_group_id: "",
                    applets_path: "",
                    applets_id: '',
                    explain: '',
                    media_id: ''
                },
                form6: {
                    content_group_id: '',
                    filelist: [],
                    explain: '',

                },
                form7: {
                    content_group_id: "",
                    file: '',
                    filelist: [],
                    explain: '',

                },
                form8: {
                    content_group_id: ''
                },
                fileList: [],
                fileList2: [],
                fileList3: [],
                fileList4: [],
                page: 1,
                limit: 10,
                total: 0,
                parent_id: 0,
                group_id: '',

                imgdata: [],
                vediodata: [],
                uploadData: {
                    type: '2'
                },
                uploadData2: {
                    type: '3'
                },
                uploadData3: {
                    type: '4'
                },
                uploadData4: {
                    type: '5'
                },
                uploadData5: {
                    type: '7'
                },
                apdata: [],
                groud_name: "",
                filedata: [],
                selectionData: [],
                content_group_id: '',
                content: {},
                modify_data: {},
                checke_id: '',
                phone: '',
                audio_src: '',
                srcList: [],
                groupList2: [],
                tableHeight: '',
                showIndex: null,
                showCourse: false,
                contPage: 1,
                contLimit: 8,
                contTotal: 0,
                pickData: {}

            }
        },
        watch: {

            showIndex(val) {
                let oIs = document.querySelectorAll(".more");
                if (val) {
                    this.$nextTick(() => {
                        oIs[val - 2].classList.remove("hidden");
                    });
                } else {
                    for (let i = 0; i < oIs.length; i++) {
                        oIs[i].classList.add("hidden");
                    }
                }
            },
            $route(to, from) {
                console.log(to, from)
                if (from.name == 'AddGraphic') {
                    this.checked = 3
                    this.getList();

                }
            }
        },
        created() {
            if (this.$route.params.id) {
                this.checked = this.$route.params.id
            }
            this.phone = localStorage.getItem('phone')
            this.getTree();

        },
        mounted() {
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 229
            let time = parseInt(new Date().getTime() / 1000);
            let user_id = localStorage.getItem("user_id") || "";
            let token = localStorage.getItem("token") || "";
            let sign = md5(user_id + token + time + md5("shenlanguoshiphoto"));
            this.uploadData.time = time;
            this.uploadData.user_id = user_id;
            this.uploadData.token = token;
            this.uploadData.sign = sign;

            this.uploadData2.time = time;
            this.uploadData2.user_id = user_id;
            this.uploadData2.token = token;
            this.uploadData2.sign = sign;

            this.uploadData3.time = time;
            this.uploadData3.user_id = user_id;
            this.uploadData3.token = token;
            this.uploadData3.sign = sign;

            this.uploadData4.time = time;
            this.uploadData4.user_id = user_id;
            this.uploadData4.token = token;
            this.uploadData4.sign = sign;
            this.uploadData5.time = time;
            this.uploadData5.user_id = user_id;
            this.uploadData5.token = token;
            this.uploadData5.sign = sign;
            this.uploadUrl = uploadUrl;
        },

        methods: {
            checkVideoFun(videos) {},
            masksCloseFun() {},
            uploadSubmit() {
                this.$refs["uploadForm"].validate((valid) => {
                    if (valid) {
                        this.uplSucInfo.type = "2";
                        this.uplSucInfo.user_id = localStorage.getItem("phone");
                        this.uplSucInfo.title = "";
                        this.uplSucInfo.explain = "";
                        this.uplSucInfo.source = '1';
                        this.ContentAdd({
                            arr: [this.uplSucInfo],
                        });
                    }
                });
            },
            //本地上传
            async ContentAdd(data) {
                let res = await ContentAdd(data);
                if (res.code == "200") {
                    this.uploadVisible = false;
                    this.ContentList();
                }
            },
            reqUploadimgSuccess(res, file) {
                this.uploadForm.uploadFile = URL.createObjectURL(file.raw);
                this.uplSucInfo = res.data;
            },
            // 上传内容变化触发
            handleUploadChange(file, fileList) {
                this.hideUpload = fileList.length >= 1;
            },
            handleUploadCancel() {
                this.uploadForm.uploadFile = "";
                this.uploadVisible = false;
                this.$refs.uploadForm.resetFields();
            },
            // 上传内容删除
            handleUploadRemove(file, fileList) {
                this.uploadForm.uploadFile = "";
                this.hideUpload = fileList.length >= 1;
            },
            handlePickCancel() {
                this.pickVisible = false;
                this.pickData = "";
                this.dioType = "";
                this.contList.forEach((item) => {
                    if (item.id === this.contId) {
                        this.$refs[item.id][0].classList.add("l-active");
                    } else {
                        this.$refs[item.id][0].classList.remove("l-active");
                    }
                });
            },
            handlePickConfirm() {
                this.pickVisible = false;
                if (this.dioType == "1") {
                    this.form5.cover = this.pickData.content;
                    this.form5.file_suffix = this.pickData.file_suffix;
                    this.form5.file_name = this.pickData.file_name;

                    this.form5.created_at = this.pickData.created_at;
                    this.form5.media_id = this.pickData.media_id
                } else if (this.dioType == "2") {
                    this.form3.cover = this.pickData.content;
                    this.form3.file_suffix = this.pickData.file_suffix;
                    this.form3.file_name = this.pickData.file_name;

                    this.form3.created_at = this.pickData.created_at;
                    this.form3.media_id = this.pickData.media_id
                }
            },
            handlePickImg(data) {
                this.contList.forEach((item) => {
                    this.$refs[item.id][0].classList.remove("l-active");
                });
                this.$refs[data.id][0].classList.add("l-active");
                this.pickData = data;
            },
            // 获取内容列表
            async ContentList() {
                let res = await ContentList({
                    type: '2',
                    content_group_id: this.pickGroupId,
                    search_name: this.contSearch,
                    page: this.contPage,
                    limit: this.contLimit,
                });
                if (res.code == 200) {
                    this.contList = res.data.data;
                    this.contTotal = res.data.total;
                } else {
                    this.contList = [];
                }
            },
            getPickGroupId(id) {
                this.pickGroupId = id;
            },
            //获取列表
            async getList() {
                let res = await ContentList({
                    source: '2',
                    search_name: this.formInline.value,
                    type: this.checked,
                    content_group_id: this.content_group_id,
                    page: this.page,
                    limit: this.limit
                })
                if (res.code == 200) {
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                    this.ContentList();

                }

            },
            //获取树形小组
            async getTree() {
                let res = await ContentGroupList({})

                if (res.code == 200) {
                    this.groupList = [{
                        name: "所有",
                        id: "",
                        code: ""
                    }];
                    res.data.data.forEach(item => {
                        this.groupList.push(item)
                    })
                    this.groupList2 = res.data.data;
                    this.getList();

                }
            },
            //添加-修改-删除小组
            async handleConfirm() {
                if (this.operationType == 'add') {
                    this.$refs["group"].validate(async valid => {
                        if (valid) {
                            let res = await ContentGroupAdd({
                                name: this.group.name,
                                parent_id: this.parent_id
                            })
                            if (res.code == '200') {
                                this.addGroupFlag = false;
                                this.$message.success(res.msg);
                                this.getTree();
                            } else {
                                this.$message.error(res.msg);
                            }
                        }
                    })

                } else if (this.operationType == 'edit') {
                    this.$refs["group"].validate(async valid => {
                        if (valid) {
                            let res = await ContentGroupEdit({
                                id: this.group_id,
                                name: this.group.name,
                                parent_id: this.parent_id
                            })
                            if (res.code == '200') {
                                this.addGroupFlag = false;
                                this.$message.success(res.msg);
                                this.getTree();
                            } else {
                                this.$message.error(res.msg);
                            }
                        }
                    })

                } else if (this.operationType == 'delete') {
                    let res = await ContentGroupDel({
                        id: this.group_id
                    })
                    if (res.code == '200') {
                        this.addGroupFlag = false;
                        this.$message.success(res.msg);
                        this.getTree();
                    } else {
                        this.$message.success(res.msg);
                    }
                }
            },
            // 分组操作
            handleCommand(command, data) {
                this.operationType = command;
                if (command === "add") {
                    this.parent_id = data.id;
                    this.addGroupFlag = true;
                } else if (command === "edit") {
                    this.parent_id = data.parent_id;
                    this.group_id = data.id;
                    this.group.name = data.name;
                    this.addGroupFlag = true;
                } else if (command === "delete") {
                    this.group_id = data.id;
                    this.groud_name = data.name;
                    this.addGroupFlag = true;
                }

            },
            //添加文本
            async addText() {
                this.$refs["form"].validate(async valid => {
                    if (valid) {
                        if (this.modify_data.id) {
                            let arr = [];
                            this.form.user = this.phone;
                            arr.push(this.form);
                            let res = await ContentEdit({
                                arr: arr
                            })
                            if (res.code == '200') {
                                this.dio1 = false;
                                this.$message.success(res.msg);
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        } else {
                            let arr = [];

                            arr.push({
                                content_group_id: this.form.content_group_id,
                                type: this.checked,
                                explain: this.form.explain,
                                content: this.form.content,
                                user_id: this.phone,
                                title: '',
                                source: 2
                            })
                            let res = await ContentAdd({
                                arr: arr
                            });
                            if (res.code == '200') {
                                this.dio1 = false;
                                this.$message.success(res.msg);
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        }
                    }
                })


            },

            reqUploadSuccess3(res, file, fileList) {
                if (res.code == '200') {
                    var obj = '';
                    obj = {
                        content: res.data.content,
                        file_name: res.data.file_name,
                        file_suffix: res.data.file_suffix,
                        media_id: res.data.media_id,
                        created_at: res.data.created_at
                    }
                    this.form4.filelist.push(obj)

                    // console.log(file)
                } else {
                    this.$message.error(res.msg)
                }

            },
            reqUploadSuccess2(res) {
                if (res.code == '200') {
                    this.form3.cover = res.data.content;
                    this.form3.file_suffix = res.data.file_suffix;
                    this.form3.file_name = res.data.file_name;

                    this.form3.created_at = res.data.created_at;
                    this.form3.media_id = res.data.media_id
                } else {
                    this.$message.error(res.msg)
                }

            },
            reqUploadSuccess(res) {
                if (res.code == '200') {
                    var obj = '';
                    obj = {
                        content: res.data.content,
                        file_name: res.data.file_name,
                        file_suffix: res.data.file_suffix,

                        media_id: res.data.media_id,
                        created_at: res.data.created_at
                    }
                    this.form2.filelist.push(obj);
                } else {
                    this.$message.error(res.msg)
                }

            },
            reqUploadSuccess4(res) {
                if (res.code == '200') {
                    this.form5.cover = res.data.content;
                    this.form5.file_suffix = res.data.file_suffix;
                    this.form5.file_name = res.data.file_name;

                    this.form5.created_at = res.data.created_at;
                    this.form5.media_id = res.data.media_id
                } else {
                    this.$message.error(res.msg)
                }

            },
            reqUploadSuccess5(res, file, fileList) {
                if (res.code == '200') {
                    var obj = '';
                    obj = {
                        content: res.data.content,
                        file_name: res.data.file_name,
                        file_suffix: res.data.file_suffix,
                        media_id: res.data.media_id,
                        created_at: res.data.created_at
                    }

                    this.form6.filelist.push(obj)
                } else {
                    this.$message.error(res.msg)
                }


            },
            reqUploadSuccess6(res, file, fileList) {
                if (res.code == '200') {
                    this.loading = false;
                    var obj = '';
                    obj = {
                        content: res.data.content,
                        file_name: res.data.file_name,
                        file_suffix: res.data.file_suffix,
                        media_id: res.data.media_id,
                        created_at: res.data.created_at,
                        name: res.data.file_name
                    }
                    this.form7.filelist.push(obj);
                    console.log(this.form7.filelist)
                } else {
                    this.$message.error(res.msg)
                }

            },
            //添加图片
            async uploadImg() {
                this.$refs["form2"].validate(async valid => {
                    if (valid) {
                        this.form2.filelist.map((item, index) => {
                            this.form2.filelist[index].content_group_id = this.form2
                                .content_group_id;
                            this.form2.filelist[index].type = 2;
                            this.form2.filelist[index].user_id = this.phone;
                            this.form2.filelist[index].title = '';
                            this.form2.filelist[index].source = '2';
                            this.form2.filelist[index].explain = this.form2
                                .explain;
                            // delete this.form2.filelist[index].name;
                            // delete this.form2.filelist[index].percentage;
                            // delete this.form2.filelist[index].uid;
                            // delete this.form2.filelist[index].status;
                            // delete this.form2.filelist[index].size;
                            // delete this.form2.filelist[index].raw;
                            // delete this.form2.filelist[index].response;
                            // delete this.form2.filelist[index].contcreated_atent;
                        })
                        let res = await ContentAdd({
                            arr: this.form2.filelist
                        })
                        if (res.code == '200') {
                            this.dio2 = false;
                            this.$message.success(res.msg);
                            this.getList();
                            this.$refs['form2'].resetFields();
                            console.log(this.form2);

                        } else {
                            this.$message.success(res.msg);
                        }
                    }
                })



            },
            //快速添加文章
            uploadTxImg() {
                this.$refs["form3"].validate(async valid => {
                    if (valid) {
                        if (this.modify_data.id) {
                            let arr = [];
                            this.form3.user = this.phone;
                            arr.push(this.form3);
                            let res = await ContentEdit({
                                arr: arr
                            })
                            if (res.code == '200') {
                                this.dio3 = false;
                                this.$message.success(res.msg);
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        } else {
                            let arr = [];
                            arr.push({
                                content: '',
                                content_group_id: this.form3.content_group_id,
                                type: 8,
                                source: '2',
                                file_name: this.form3.file_name,
                                media_id: this.form3.media_id,
                                title: this.form3.title,
                                summary: this.form3.summary,
                                cover: this.form3.cover,
                                link: this.form3.link,
                                explain: this.form3.explain,
                                user: this.phone
                            })
                            let res = await ContentAdd({
                                arr: arr
                            })
                            if (res.code == '200') {
                                this.dio3 = false;
                                this.$message.success(res.msg);
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        }
                    }
                })


            },
            //添加音频
            async uploadVedio() {
                this.$refs["form4"].validate(async valid => {
                    if (valid) {
                        this.form4.filelist.map((item, index) => {
                            this.form4.filelist[index].content_group_id = this.form4
                                .content_group_id;
                            this.form4.filelist[index].type = 4;
                            this.form4.filelist[index].user_id = this.phone;
                            this.form4.filelist[index].explain = this.form4.explain;
                            this.form4.filelist[index].title = '';
                            this.form4.filelist[index].source = '2';

                        })
                        let res = await ContentAdd({
                            arr: this.form4.filelist
                        })
                        if (res.code == '200') {
                            this.dio4 = false;
                            this.$message.success(res.msg);
                            this.getList();
                        } else {
                            this.$message.success(res.msg);
                        }
                    }
                })

            },
            //添加小程序
            upload_wx() {
                this.$refs["form5"].validate(async valid => {
                    // console.log(this.form5)
                    if (valid) {
                        if (this.modify_data.id) {
                            let arr = [];
                            this.form5.user = this.phone;
                            arr.push(this.form5);
                            let res = await ContentEdit({
                                arr: arr
                            })
                            if (res.code == '200') {
                                this.dio5 = false;
                                this.$message.success(res.msg);
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        } else {
                            let arr = [];
                            arr.push({
                                content: '',
                                cover: this.form5.cover,
                                title: this.form5.title,
                                content_group_id: this.form5.content_group_id,
                                applets_path: this.form5.applets_path,
                                applets_id: this.form5.applets_id,
                                type: '6',
                                source: '2',
                                user_id: this.phone,
                                file_suffix: this.form5.file_suffix,
                                file_name: this.form5.file_name,
                                explain: this.form5.explain,
                                media_id: this.form5.media_id
                            })
                            let res = await ContentAdd({
                                arr: arr
                            })
                            if (res.code == '200') {
                                this.dio5 = false;
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        }
                    }
                })


            },
            //添加文件
            uploadFile() {
                this.$refs["form7"].validate(async valid => {
                    if (valid) {
                        console.log(this.form7.filelist)
                        this.form7.filelist.map((item, index) => {
                            this.form7.filelist[index].content_group_id = this
                                .form7.content_group_id;
                            this.form7.filelist[index].type = 7;
                            this.form7.filelist[index].user_id = this.phone;
                            this.form7.filelist[index].title = '';
                            this.form7.filelist[index].source = '2';
                            this.form7.filelist[index].explain = this
                                .form7.explain;
                            delete this.form7.filelist[index].uid;
                            delete this.form7.filelist[index].status;
                            delete this.form7.filelist[index].name;
                        })
                        let res = await ContentAdd({
                            arr: this.form7.filelist
                        })
                        if (res.code == '200') {
                            this.dio7 = false;
                            this.$message.success(res.msg);
                            this.getList();
                        } else {
                            this.$message.success(res.msg);
                        }
                    }
                })

            },
            //添加视频
            uploadMp4() {
                this.$refs["form6"].validate(async valid => {
                    if (valid) {
                        this.form6.filelist.map((item, index) => {
                            this.form6.filelist[index].content_group_id = this.form6
                                .content_group_id;
                            this.form6.filelist[index].type = 5;
                            this.form6.filelist[index].user_id = this.phone;
                            this.form6.filelist[index].title = '';
                            this.form6.filelist[index].source = '2';
                            this.form6.filelist[index].explain = this.form6
                                .explain;

                        })
                        let res = await ContentAdd({
                            arr: this.form6.filelist
                        })
                        if (res.code == '200') {
                            this.dio6 = false;
                            this.$message.success(res.msg);
                            this.getList();
                        } else {
                            this.$message.success(res.msg);
                        }
                    }
                })

            },
            handleMove() {
                if (this.selectionData.length == 0) {
                    this.$message.error('请先选择数据')
                } else {
                    this.form8.content_group_id = this.groupList2[0].id;
                    this.dio8 = true;
                }
            },
            //批量删除
            async handleDel() {
                if (this.selectionData.length == 0) {
                    this.$message.error('请先选择数据')
                } else {
                    this.$confirm('素材已同步至企微聊天资料中，删除后聊天资料中的素材将一并删除，确认删除？', '提示', {
                            cancelButtonClass: 'btn-white',
                            confirmButtonClass: 'btn-blue',
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            closeOnClickModal: false
                        }).then(async () => {
                            let arr = [];
                            this.selectionData.forEach(item => {
                                arr.push({
                                    id: item.id
                                })
                            })
                            let res = await ContentDel({
                                del_type: 2,
                                arr: arr
                            })
                            if (res.code == '200') {
                                this.$message.success(res.msg);
                                this.getList();
                            } else {
                                this.$message.success(res.msg);
                            }
                        })
                        .catch(() => {});

                }

            },
            handDown() {
                if (this.selectionData.length == 0) {
                    this.$message.error('请先选择数据')
                } else {
                    this.selectionData.forEach(item => {
                        this.downloadIamge(item.content, item.file_name);
                    })
                }
            },
            //刪除表格
            async Delete(data) {
                if (data.source == '2') {
                    this.$confirm('素材已同步至企微聊天资料中，删除后聊天资料中的素材将一并删除，确认删除？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        closeOnClickModal: false
                    }).then(async () => {
                        let arr = [];
                        arr.push({
                            id: data.id
                        })
                        let res = await ContentDel({
                            arr: arr,
                            del_type: 2
                        })
                        if (res.code == '200') {
                            this.$message.success(res.msg);
                            this.getList();
                        } else {
                            this.$message.success(res.msg);
                        }
                    }).catch(() => {

                    });
                } else {
                    let arr = [];
                    arr.push({
                        id: data.id
                    })
                    let res = await ContentDel({
                        del_type: 2,
                        arr: arr
                    })
                    if (res.code == '200') {
                        this.$message.success(res.msg);
                        this.getList();
                    } else {
                        this.$message.success(res.msg);
                    }
                }

            },
            //移动         
            async move() {
                this.selectionData.map(item => {
                    item.content_group_id = this.form8
                        .content_group_id;
                })
                let res = await ContentEdit({
                    arr: this.selectionData
                })
                if (res.code == '200') {
                    this.dio8 = false;
                    this.$message.success(res.msg);
                    this.getList();
                    this.selectionData = []
                } else {
                    this.$message.success(res.msg);
                }
            },
            onPlay() {},
            //下载
            downloadIamge(imgsrc, name) { //下载图片地址和图片名
                var image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
                // var alink = document.createElement("a");
                // alink.href = imgsrc;
                // alink.download = name; //图片名
                // alink.click();

            },
            beforeFileUpload() {
                this.loading = true;
            },
            removes(data) {
                this.selectionData = [];
                this.selectionData.push(data);
                this.form8.content_group_id = data.content_group_id;
                this.dio8 = true;
            },
            //重置
            reset() {
                this.$refs['form3'].resetFields();
            },
            //播放
            handlePlayAudio() {},
            treeChange(e) {
                console.log(e)
            },
            Preview(url) {
                this.srcList = [];
                this.srcList.push(url)
            },
            delImg(data) {
                let filter = this.form2.filelist.filter(
                    (item) => item.content != data.content
                );
                this.form2.filelist = filter;
            },
            delFile(data) {
                let filter = this.form7.filelist.filter(
                    (item) => item.content != data.content
                );
                this.form7.filelist = filter;
            },
            delAudio(data) {
                let filter = this.form4.filelist.filter(
                    (item) => item.content != data.content
                );
                this.form4.filelist = filter;
            },
            delVedio(data) {
                let filter = this.form6.filelist.filter(
                    (item) => item.content != data.content
                );
                this.form6.filelist = filter;
            },
            onPlayerPlay(id) {
                this.$refs[id].play();
            },
            play(data) {
                console.log(data)
                this.$refs[data].play();
            },
            onPlayerPlay2(id) {
                this.$nextTick(() => {
                    this.$refs[id][0].play()
                })
            },
            play2(data) {
                this.$nextTick(() => {
                    this.$refs[data][0].play()

                })
            },
            over(data) {
                console.log(data)
            },
            handlePreview(file) {
                var alink = document.createElement("a");
                alink.href = file.content;
                alink.click();
                console.log(file);

            },
            modify(data) {
                this.modify_data = data;
                if (this.modify_data.type == '1') {
                    this.dio1 = true;
                    this.$nextTick(() => {
                        Object.assign(this.form, this.modify_data);
                    })
                } else if (this.modify_data.type == '3') {
                    // let datas = JSON.stringify(data);
                    this.$router.push({
                        path: '/content/addgraphic',
                        query: {
                            data: data.id,
                            path: this.$route.name,
                            name: 'modify'
                        }
                    })
                    // this.dio3 = true;


                } else if (this.modify_data.type == '6') {
                    this.dio5 = true;
                    this.$nextTick(() => {
                        Object.assign(this.form5, this.modify_data);
                    })

                } else if (this.modify_data.type == '8') {
                    this.dio3 = true;
                    this.$nextTick(() => {
                        Object.assign(this.form3, this.modify_data);
                    })

                }

            },
            addGraphic() {
                this.$router.push({
                    path: '/content/addgraphic',
                    query: {
                        path: this.$route.name,
                        group_id: this.content_group_id,

                    }
                })
            },
            handleChange(e) {
                if (this.dio1 == true) {
                    this.form.content_group_id = e[e.length - 1];
                } else if (this.dio2 == true) {
                    this.form2.content_group_id = e[e.length - 1];

                } else if (this.dio3 == true) {
                    this.form3.content_group_id = e[e.length - 1];

                } else if (this.dio4 == true) {
                    this.form4.content_group_id = e[e.length - 1];

                } else if (this.dio5 == true) {
                    this.form5.content_group_id = e[e.length - 1];

                } else if (this.dio6 == true) {
                    this.form6.content_group_id = e[e.length - 1]
                } else if (this.dio7 == true) {
                    this.form7.content_group_id = e[e.length - 1];

                } else if (this.dio8 == true) {
                    this.form8.content_group_id = e[e.length - 1];

                }
            },
            handleLimitChange(val) {
                this.limit = val;
                this.getList();
            },
            handlePageChange(val) {
                this.page = val;
                this.getList();
            },
            handleRemove(file, filelist) {
                this.form7.filelist = filelist;
            },
            beforeAvatarUpload(file) {
                let types = ['image/jpeg', 'image/jpg', 'image/png'];
                const isImage = types.includes(file.type);
                const isLtSize = file.size / 1024 / 1024 < 2;
                if (!isImage) {
                    this.$message.error('上传图片只能是JPG、JPEG及PNG格式!');
                    return false;
                }
                if (!isLtSize) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return false;
                }
                return isImage && isLtSize;

            },
            beforeAvatarUpload2(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'mp3' || testmsg === 'amr'
                const isLtSize = file.size / 1024 / 1024 < 2;
                if (!extension) {
                    this.$message.error('上传音频只能是AMR格式!');
                    return false;
                }
                if (!isLtSize) {
                    this.$message.error('上传音频大小不能超过 2MB!');
                    return false;
                }
                return extension && isLtSize;
            },
            beforeAvatarUpload3(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'mp4'
                const isLtSize = file.size / 1024 / 1024 < 2;

                if (!extension) {
                    this.$message.error('上传视频只能是MP4格式!');
                    return false;
                }
                if (!isLtSize) {
                    this.$message.error('上传视频大小不能超过10MB!');
                    return false;
                }
                return extension && isLtSize;
            },
            handleCheckTabs(flag) {
                this.page = 1
                this.checked = flag;
                this.getList()
            },
            handleSelectionChange(data) {
                this.selectionData = [];
                this.selectionData = data;
            },
            handleTreeNode(data) {
                this.content_group_id = data.id;
                // console.log(this.content_group_id)
                this.code = data.id;
                this.getList()
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
                    } else if (data == '8') {
                        return '跳转链接'
                    }
                }
            },
            texttotal(data) {
                if (data.type == 3) {
                    // console.log(1)
                    this.totalType = true;
                } else {
                    this.totalType = false;

                }
                this.materialVisible = true;
                this.content_id = data.id;
                // this.$router.push({
                //     path: '/content/texttotal',
                //     query: {
                //         id: id,
                //         type: this.checked,
                //         path: this.$route.name,
                //     }
                // })
            },
            setting() {
                this.setVisible = true;

            },
            // 关闭系统设置
            handleCloseSet() {
                this.setVisible = false;
            },
            look(data) {
                if (data.type == '2') {
                    this.look_img = data.content;
                    this.dio9 = true;
                } else {
                    this.dio10 = true;
                    this.$nextTick(() => {
                        this.creatQrCode(data.id)
                    })
                }

            },
            creatQrCode(id) {
                var href = this.baseURL + '/article-preview/huankemao_h5.html?id=' + id + '&type=1'
                var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: href,
                    width: 240,
                    height: 240,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            },
            closeDialog(data, filedata) {
                if (data) {
                    this.$refs[data].resetFields();
                }
                this.modify_data = {}
                this.addGroupFlag = false;
                this.parent_id = 0;
                this.form2.filelist = [];
                this.form3.filelist = [];
                this.form4.filelist = [];
                this.form5.filelist = [];
                this.form6.filelist = [];
                this.form7.filelist = [];

            },
            closeQrcode() {
                setTimeout(() => {
                    this.$refs.qrCodeUrl.innerHTML = '';
                }, 1000)
            },
            closepop() {
                this.materialVisible = false;
                this.totalType = false;
            },
            closepop2() {
                this.materialVisible2 = false;

            },
            lookTotal() {
                this.materialVisible2 = true;
            }
        }
    }
</script>
<style lang="less" scoped>
    @color: #333;
    @size: 14px;

    .content_manage {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: @size;
        color: @color;

        /deep/.el-input__inner {
            height: 32px;
            line-height: 32px;
            border-radius: 6px;
            border: 1px solid #B9C5E9;
        }

        /deep/.el-form-item__error {
            padding: 0;
            position: relative;
        }

        .img-wrap {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            div {
                width: 160px;
                position: relative;
                height: 175px;
                margin: 5px;
                border-radius: 5px;
                border: 1px solid #ccc;
                text-align: center;
                cursor: pointer;

                .ly {
                    display: inline-block;
                    width: calc(100% - 20px);
                    border-bottom: 1px solid #ccc;
                    font-size: 14px;
                    color: #333;
                    padding: 0 10px;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    /*让长段文本不换行*/
                    white-space: nowrap;
                    /*设置文本超出元素宽度部分隐藏*/
                    overflow-x: hidden;
                    /*设置文本超出部分用省略号显示*/
                    text-overflow: ellipsis;
                }

                img {
                    max-width: 150px;
                    max-height: 138px;
                    object-fit: cover;
                }

                span.bgc {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.3);
                    /*让长段文本不换行*/
                    white-space: nowrap;
                    /*设置文本超出元素宽度部分隐藏*/
                    overflow-x: hidden;
                    /*设置文本超出部分用省略号显示*/
                    text-overflow: ellipsis;
                }
            }

            .l-active {
                border: 2px solid #6881ec;
            }
        }

        .avatar-uploader .el-upload {

            border: 1px solid #B9C5E9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
            border: 1px solid #B9C5E9;
            border-radius: 6px;
        }

        .avatar {
            width: 120px;
            height: 120px;
            display: block;
        }

        .el-upload__tip {
            margin: 0;
            font-size: 12px;

            font-weight: 400;
            color: #999999;
            line-height: 17px;
        }

        .btn_tip {
            color: #606266;
            width: 120px;
            height: 40px !important;
            line-height: 20px !important;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-align: left;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .img_box {
            text-align: center;

            .look_img {
                width: 450px;
                height: 450px;
            }
        }



        .conten_box {
            width: 375px;
        }

        .lookImg {
            /deep/.el-dialog {
                // width: 380px;
                // background: #ffffff;
                // border-radius: 12px;

                .qrcode {
                    display: flex;
                    justify-content: center;
                    margin-top: 5px;
                }

                .tip {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 16px;

                    font-weight: 400;
                    color: #333333;
                    line-height: 22px;
                }
            }
        }

        .addGroup {
            /deep/.el-dialog {
                // width: 500px;
                // height: 200px;
                // background: #ffffff;
                // border-radius: 12px;
                // display: flex;
                // flex-direction: column;
                // margin: 0 !important;
                // position: absolute;
                // top: 50%;
                // left: 50%;
                // transform: translate(-50%, -50%);

                .el-form-item {
                    margin-bottom: 0px !important;
                }


            }
        }

        .addApplet {


            .el-container {
                width: 100%;
                height: 100%;

                .tab {
                    width: 250px !important;
                    height: 100%;
                    background: #FFFFFF;
                    border-radius: 6px;
                    border: 1px solid #B9C5E9;
                    padding: 20px;
                    box-sizing: border-box;

                    .tip {

                        font-size: 12px;

                        font-weight: 400;
                        color: #999999;
                        line-height: 17px;

                        .tip_img {
                            width: 12px;
                            height: 12px;
                            margin-right: 5px;
                        }
                    }

                    .img {
                        width: 207px;
                        height: 164px;
                        background: #D8D8D8;
                        margin: 7px 0 12px 0;
                    }

                    p {

                        font-size: 16px;

                        font-weight: 400;
                        color: #333333;
                        line-height: 22px;
                    }
                }

                .el-main {

                    // height: 100%;
                    /deep/.el-form-item__label {
                        line-height: 32px;
                    }

                    .el-form-item {
                        margin-bottom: 0px !important;
                    }

                    .el-alert {
                        margin-bottom: 20px;
                        background: #FFF7E6;
                        border-radius: 6px;
                        border: 1px solid #F5DAA3;

                        .bg {
                            color: #6881EC;
                        }

                        p {
                            font-size: 14px;

                            font-weight: 400;
                            color: #333333;
                            line-height: 20px;
                            margin-bottom: 8px;
                        }
                    }




                }
            }
        }

        .addText {


            /deep/.el-dialog {
                .el-form-item {
                    margin-bottom: 0px !important;
                }

                .vedio_list {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;

                    .vedio_box {
                        width: 100px;
                        height: 70px;
                        position: relative;
                        margin-right: 20px;

                        .del {
                            position: absolute;
                            width: 12px;
                            height: 12px;
                            top: -6px;
                            right: -6px;
                        }
                    }
                }

                .audio_list {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;

                    .audio_box {
                        width: 80px;
                        position: relative;
                        margin-right: 20px;

                        .button {
                            width: 80px;
                            height: 28px;
                            background: #FFFFFF;
                            border-radius: 6px;
                            border: 1px solid #6881EC;
                            line-height: 28px;
                            text-align: center;

                            .img {
                                width: 36px;
                                height: 13px;
                            }
                        }

                        .del {
                            position: absolute;
                            width: 12px;
                            height: 12px;
                            top: -6px;
                            right: -6px;
                        }

                    }
                }

                .upfile_box {
                    width: 100%;
                    margin-top: 20px;

                    display: flex;
                    flex-wrap: wrap !important;

                    .file_box {
                        margin-right: 10px;
                        width: 120px;
                        position: relative;
                        border-radius: 4px;

                        .img {
                            width: 35px;
                            height: 40px;
                            border-radius: 4px;

                        }

                        .del {
                            position: absolute;
                            top: -6px;
                            left: 41x;
                            width: 12px;
                            height: 12px;
                        }

                        .title {
                            font-size: 16px !important;
                            font-weight: normal !important;
                            line-height: 0 !important;
                        }
                    }
                }

                .upimg_box {
                    width: 100%;
                    margin-top: 20px;
                    display: flex;

                    flex-wrap: wrap;

                    .img_box {
                        margin-right: 10px;
                        width: 60px;
                        height: 60px;
                        position: relative;
                        border-radius: 4px;

                        .img {
                            width: 100%;
                            height: 100%;
                            border-radius: 4px;

                        }

                        .del {
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            width: 12px;
                            height: 12px;
                        }

                        .look {
                            position: absolute;
                            top: 50%-5.5px;
                            right: 50%-7px;
                            width: 14px;
                            height: 11px;
                        }
                    }
                }



            }
        }

        .el-container {
            width: 100%;
            height: calc(100vh - 135px);

            .el-aside {
                // padding: 15px;
                border-radius: 10px;
                border: 1px solid #b9c5e9;
                box-sizing: border-box;

                .el-tree-node:hover .group-name {
                    color: #6881ec;
                }

                .more {
                    visibility: hidden;
                }

                .el-tree-node:hover .more {
                    visibility: visible;
                    color: #6881ec;
                }

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

                        /deep/.el-tree-node>.el-tree-node__children {
                            overflow: auto;
                        }

                        .drop-wrap {
                            position: absolute;
                            right: 20px;
                        }
                    }
                }
            }

            .el-main {
                // height: 100%;
                padding: 0 15px;
                box-sizing: border-box;

                .title i {
                    margin-left: 10px;
                }

                .pagination {
                    position: relative;

                    .total_btn {
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }

                .cont_box {
                    display: flex;
                    align-items: center;

                    .button {
                        width: 80px !important;
                        height: 28px;
                        background: #FFFFFF;
                        border-radius: 6px;
                        border: 1px solid #6881EC;
                        text-align: center;
                        line-height: 28px;
                        margin-right: 15px;

                        img {
                            width: 36px;
                            height: 13px;
                            margin: 0;
                        }
                    }
                }

                .table {
                    height: calc(100% - 260px);
                }

                /deep/.el-table td {
                    padding: 0 !important;
                    min-height: 82px !important;
                }

                /deep/.el-table td .el-button {
                    padding: 8px 0 !important;
                }

                .operation {
                    .el-button {
                        margin: 0 20px 0 0;
                        font-size: 14px;
                        font-weight: 500;
                    }
                }

                .audio {
                    width: 150px;
                }

                .vedio {
                    width: 150px;
                }










                .text_btn {

                    font-size: 16px;

                    font-weight: 400;
                    color: #409EFF;
                    line-height: 22px;
                }

                .search {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;

                    .el-form-item {
                        margin: 0;

                    }

                    .btn {

                        color: #6881EC;
                        background: #FFFFFF;
                        border-radius: 6px;
                        border: 1px solid #6881EC;
                    }

                    .btn-white {
                        font-weight: bold;
                        color: #b9c5e9 !important;
                        background-color: #fff;
                        border-radius: 5px;
                    }

                    .btns {
                        color: #fff;
                        background: #6881EC;
                        border-radius: 6px;
                    }

                    .btn1 {
                        margin-left: 20px;
                        color: #fff;
                        border-radius: 6px;
                        background: #6881EC;
                    }

                    .btn2 {
                        color: #6881EC;
                        border-radius: 6px;
                        border: 1px solid #6881EC;
                    }


                }

                .header-tabs {
                    position: relative;
                    margin: 20px 0;

                    >.el-button {
                        width: 9%;
                        // max-width:122px ;
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

                h4 {

                    font-size: 20px;

                    font-weight: bold;
                    color: #333333;
                    line-height: 28px;

                    .el-icon-question {
                        margin-left: 8px;
                    }
                }

            }
        }
    }
</style>