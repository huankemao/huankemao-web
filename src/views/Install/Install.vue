<template>
  <div class="install">
    <Header></Header>
    <span class="titles">欢迎使用唤客猫企业微信SCRM系统</span>
    <div class="steps">
      <span :class="active == 1 ? 'circle active' : 'circle active el-icon-check'">{{
        active == 1 ? "1" : ""
      }}</span>
      <span class="text">许可协议</span>
      <span :class="active == 1 ? 'line' : 'line active'"></span>
      <span
        :class="
          active == 1
            ? 'circle'
            : active == 2
            ? 'circle active'
            : 'circle active el-icon-check'
        "
        >{{ active > 2 ? "" : "2" }}</span
      >
      <span class="text">检查环境</span>
      <span :class="active <= 2 ? 'line' : 'line active'"></span>
      <span
        :class="
          active < 3
            ? 'circle'
            : active == 3
            ? 'circle active'
            : 'circle active el-icon-check'
        "
        >{{ active > 3 ? "" : "3" }}</span
      >
      <span class="text">配置系统</span>
      <span :class="active < 4 ? 'line' : 'line active'"></span>
      <span :class="active < 4 ? 'circle' : 'circle active'">4</span>
      <span class="text">安装完成</span>
    </div>
    <!-- 步骤一 -->
    <template v-if="active === 1">
      <div class="content-wrap">
        <span class="border"></span>
        <div class="content">
          <div class="wrap">
            <span class="c-title">《唤客猫企业微信SCRM系统》开源许可协议</span>
            <div class="fonts">
              <h2>中文版授权协议 适用于中文用户</h2>
              <h2>版权所有 ：© 2020-2021 成都唤客猫科技有限公司（以下简称唤客猫公司）保留所有权利。</h2>
              <p class="font-style">
                感谢您选择唤客猫产品。希望我们的努力能为您提供一个高效、快速、强大的SCRM解决方案。唤客猫公司网址为https://huankemao.com
                。
              </p>
              <h2>用户须知：</h2>
              <p class="font-style">
                本协议是您与唤客猫公司之间关于您使用唤客猫公司提供的各种软件产品及服务的法律协议。无论您是个人或组织、盈利与否、用途如何（包括以学习和研究为目的），均需仔细阅读本协议，包括免除或者限制唤客猫责任的免责条款及对您的权利限制。请您审阅并接受或不接受本服务条款。如您不同意本服务条款及/或唤客猫随时对其的修改，您应不使用或主动取消唤客猫公司提供的唤客猫产品。否则，您的任何对唤客猫产品中的相关服务的注册、登陆、下载、查看等使用行为将被视为您对本服务条款全部的完全接受，包括接受唤客猫对服务条款随时所做的任何修改。
              </p>
              <p class="font-style">
                本服务条款一旦发生变更,
                唤客猫将在网页上公布修改内容。修改后的服务条款一旦在网站管理后台上公布即有效代替原来的服务条款。您可随时登陆唤客猫官方网站查阅最新版服务条款。如果您选择接受本条款，即表示您同意接受协议各项条件的约束。如果您不同意本服务条款，则不能获得使用本服务的权利。您若有违反本条款规定，唤客猫公司有权随时中止或终止您对唤客猫产品的使用资格并保留追究相关法律责任的权利。
              </p>
              <p class="font-style">
                在理解、同意、并遵守本协议的全部条款后，方可开始使用唤客猫产品。您可能与唤客猫公司直接签订另一书面协议，以补充或者取代本协议的全部或者任何部分。
              </p>
              <p class="font-style">
                唤客猫拥有本软件的全部知识产权。本软件只供许可协议，并非出售。唤客猫只允许您在遵守本协议各项条款的情况下复制、下载、安装、使用或者以其他方式受益于本软件的功能或者知识产权。
              </p>
              <h2>一、协议许可的权利</h2>
              <p class="font-style">
                1.
                您可以在完全遵守本许可协议的基础上，将本软件应用于非商业用途，而不必支付软件版权许可费用。
              </p>
              <p class="font-style">
                2.
                您可以在协议规定的约束和限制范围内修改唤客猫产品源代码(如果被提供的话)或界面风格以适应您的网站要求。
              </p>
              <p class="font-style">
                3.
                您拥有使用本软件构建的网站中全部会员资料、文章及相关信息的所有权，并独立承担与使用本软件构建的网站内容的审核、注意义务，确保其不侵犯任何人的合法权益，独立承担因使用唤客猫软件和服务带来的全部责任，若造成唤客猫公司或用户损失的，您应予以全部赔偿。
              </p>
              <p class="font-style">
                4.
                若您需将唤客猫软件或服务用于商业用途，必须另行获得唤客猫的书面许可，您在获得商业授权之后，您可以将本软件应用于商业用途，同时依据所购买的授权类型中确定的技术支持期限、技术支持方式和技术支持内容，自购买时刻起，在技术支持期限内拥有通过指定的方式获得指定范围内的技术支持服务。商业授权用户享有反映和提出意见的权力，相关意见将被作为首要考虑，但没有一定被采纳的承诺或保证。
              </p>
              <p class="font-style">
                5.
                您可以从唤客猫提供的应用中心服务中下载适合您网站的应用程序，但应向应用程序开发者/所有者支付相应的费用。
              </p>
              <h2>二、协议规定的约束和限制</h2>
              <p class="font-style">
                1.
                未获唤客猫公司书面商业授权之前，不得将本软件用于商业用途（包括但不限于企业网站、经营性网站、以营利为目或实现盈利的网站）。购买商业授权请登陆https://huankemao.com参考相关说明，也可以致电了解详情。
              </p>
              <p class="font-style">
                2. 不得对本软件或与之关联的商业授权进行出租、出售、抵押或发放子许可证。
              </p>
              <p class="font-style">
                3.
                无论如何，即无论用途如何、是否经过修改或美化、修改程度如何，只要使用唤客猫产品的整体或任何部分，未经书面许可，页面页脚处的唤客猫产品名称和唤客猫公司下属网站（https://huankemao.com）
                的链接都必须保留，而不能清除或修改。
              </p>
              <p class="font-style">
                4.
                禁止在唤客猫产品的整体或任何部分基础上以发展任何派生版本、修改版本或第三方版本用于重新分发。
              </p>
              <p class="font-style">
                5.
                您从应用中心下载的应用程序，未经应用程序开发者/所有者的书面许可，不得对其进行反向工程、反向汇编、反向编译等，不得擅自复制、修改、链接、转载、汇编、发表、出版、发展与之有关的衍生产品、作品等。
              </p>
              <p class="font-style">
                6.
                如果您未能遵守本协议的条款，您的授权将被终止，所许可的权利将被收回，同时您应承担相应法律责任。
              </p>
              <h2>三、 有限担保和免责声明</h2>
              <p class="font-style">
                1.
                本软件及所附带的文件是作为不提供任何明确的或隐含的赔偿或担保的形式提供的。
              </p>
              <p class="font-style">
                2.
                用户出于自愿而使用本软件，您必须了解使用本软件的风险，在尚未购买产品技术服务之前，我们不承诺提供任何形式的技术支持、使用担保，也不承担任何因使用本软件而产生问题的相关责任。
              </p>
              <p class="font-style">
                3.
                唤客猫公司不对使用本软件构建的网站中或者论坛中的文章或信息承担责任，全部责任由您自行承担。
              </p>
              <p class="font-style">
                4.
                唤客猫公司无法全面监控由第三方上传至应用中心的应用程序，因此不保证应用程序的合法性、安全性、完整性、真实性或品质等；您从应用中心下载应用程序时，同意自行判断并承担所有风险，而不依赖于唤客猫公司。但在任何情况下，唤客猫公司有权依法停止应用中心服务并采取相应行动，包括但不限于对于相关应用程序进行卸载，暂停服务的全部或部分，保存有关记录，并向有关机关报告。由此对您及第三人可能造成的损失，唤客猫公司不承担任何直接、间接或者连带的责任。
              </p>
              <p class="font-style">
                5.
                唤客猫公司对唤客猫提供的软件和服务之及时性、安全性、准确性不作担保，由于不可抗力因素、唤客猫公司无法控制的因素（包括黑客攻击、停断电等）等造成软件使用和服务中止或终止，而给您造成损失的，您同意放弃追究唤客猫公司责任的全部权利。
              </p>
              <p class="font-style">
                6.
                唤客猫公司特别提请您注意，唤客猫公司为了保障公司业务发展和调整的自主权，唤客猫公司拥有随时经或未经事先通知而修改服务内容、中止或终止部分或全部软件使用和服务的权利，修改会公布于唤客猫公司网站相关页面上，一经公布视为通知。
                唤客猫公司行使修改或中止、终止部分或全部软件使用和服务的权利而造成损失的，唤客猫公司不需对您或任何第三方负责。
              </p>
              <p class="font-style">
                有关唤客猫产品最终用户授权协议、商业授权与技术服务的详细内容，均由唤客猫公司独家提供。唤客猫公司拥有在不事先通知的情况下，修改授权协议和服务价目表的权利，修改后的协议或价目表对自改变之日起的新授权用户生效。
              </p>
              <p class="font-style">
                一旦您开始安装唤客猫产品，即被视为完全理解并接受本协议的各项条款，在享有上述条款授予的权利的同时，受到相关的约束和限制。协议许可范围以外的行为，将直接违反本授权协议并构成侵权，我们有权随时终止授权，责令停止损害，并保留追究相关责任的权力。
              </p>
              <p class="font-style">
                本许可协议条款的解释，效力及纠纷的解决，适用于中华人民共和国大陆法律。
              </p>
              <p class="font-style">
                若您和唤客猫之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，您在此完全同意将纠纷或争议提交唤客猫所在地成都市高新区人民法院管辖。唤客猫公司拥有对以上各项条款内容的解释权及修改权。
              </p>
              <h2 style="margin: 20px; text-align: right">成都唤客猫科技有限公司</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-checkbox v-model="readFlag"
          >我已仔细阅读，并同意以上协议中规定的内容</el-checkbox
        >
        <el-button
          size="small"
          class="btn-blue right"
          :disabled="!readFlag"
          @click="handleNext(1)"
          >下一步</el-button
        >
      </div>
    </template>
    <!-- 步骤二 -->
    <template v-else-if="active === 2">
      <div class="content-wrap">
        <span class="border"></span>
        <div class="content">
          <div class="wrap">
            <div class="fonts">
              <div class="title-header">
                <span class="icon"></span>
                <span>服务器信息检测</span>
              </div>
              <el-table
                :data="serverData"
                :border="true"
                :row-style="{ height: '30px' }"
                :cell-style="{ padding: '0' }"
                :header-cell-style="{
                  color: '#333',
                  fontSize: '14px',
                  backgroundColor: '#F6F7FB',
                  fontWeight: 'normal',
                  padding: '0',
                }"
                :header-row-style="{ height: '32px' }"
                style="width: 100%"
              >
                <el-table-column prop="option" label="参数" width="300">
                </el-table-column>
                <el-table-column prop="value" label="值" width="400"> </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <i v-show="scope.row.loading" class="el-icon-loading"></i>
                    <i
                      v-show="scope.row.state === 1 && !scope.row.loading"
                      class="el-icon-success success fs16"
                    ></i>
                    <i
                      v-show="scope.row.state !== 1 && !scope.row.loading"
                      class="el-icon-error error fs16"
                    ></i>
                  </template>
                </el-table-column>
              </el-table>

              <div class="title-header">
                <span class="icon"></span>
                <span>PHP环境要求</span>
              </div>
              <div class="info" v-show="!firstFlag && firstShow">
                PHP环境要求必须满足下列所有条件，否则系统或系统部分功能将无法使用。
              </div>
              <el-table
                :data="phpData"
                :border="true"
                :row-style="{ height: '30px' }"
                :cell-style="{ padding: '0' }"
                :header-cell-style="{
                  color: '#333',
                  fontSize: '14px',
                  backgroundColor: '#F6F7FB',
                  fontWeight: 'normal',
                  padding: '0',
                }"
                :header-row-style="{ height: '32px' }"
                style="width: 100%"
              >
                <el-table-column prop="option" label="选项" width="300">
                </el-table-column>
                <el-table-column prop="require" label="要求" width="400">
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <i v-show="scope.row.loading" class="el-icon-loading"></i>
                    <i
                      v-show="scope.row.state === 1 && !scope.row.loading"
                      class="el-icon-success success fs16"
                    ></i>
                    <i
                      v-show="scope.row.state !== 1 && !scope.row.loading"
                      class="el-icon-error error fs16"
                    ></i>
                  </template>
                </el-table-column>
                <el-table-column label="帮助与说明">
                  <template slot-scope="scope">{{
                    scope.row.state == 1 ? "" : scope.row.state
                  }}</template>
                </el-table-column>
              </el-table>
              <div class="title-header">
                <span class="icon"></span>
                <span>目录权限监测</span>
              </div>
              <div class="info" v-show="!lastFlag && lastShow">
                系统要求huankemao开源系统安装目录下的runtime和uploads必须可写，才能使用huankemao开源版本所有功能
              </div>
              <el-table
                :data="directoryData"
                :border="true"
                :row-style="{ height: '30px' }"
                :cell-style="{ padding: '0' }"
                :header-cell-style="{
                  color: '#333',
                  fontSize: '14px',
                  backgroundColor: '#F6F7FB',
                  fontWeight: 'normal',
                  padding: '0',
                }"
                :header-row-style="{ height: '32px' }"
                style="width: 100%"
              >
                <el-table-column prop="option" label="目录" width="300">
                </el-table-column>
                <el-table-column prop="require" label="要求" width="400">
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <i v-show="scope.row.loading" class="el-icon-loading"></i>
                    <i
                      v-show="scope.row.state === 1 && !scope.row.loading"
                      class="el-icon-success success fs16"
                    ></i>
                    <i
                      v-show="scope.row.state !== 1 && !scope.row.loading"
                      class="el-icon-error error fs16"
                    ></i>
                  </template>
                </el-table-column>
                <el-table-column label="帮助与说明">
                  <template slot-scope="scope">{{
                    scope.row.state == 1 ? "" : scope.row.state
                  }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span class="fontStyle" v-if="!nextFlag"
          ><i class="el-icon-loading fs16" style="margin-right: 10px"></i
          >运行环境检测中...</span
        >
        <span class="fontStyle" v-else-if="nextFlag && success">
          <i class="el-icon-success success fs16" style="margin-right: 10px"></i
          >运行环境正常</span
        >
        <span class="fontStyle" v-else-if="nextFlag && !success"
          ><i class="el-icon-error error fs16" style="margin-right: 10px"></i
          >检测异常，请按照要求配置后重新检测</span
        >
        <el-button size="small" class="btn-white right" @click="handlePrev"
          >上一步</el-button
        >
        <el-button size="small" class="btn-blue" @click="reqEnvironment"
          >重新检测</el-button
        >
        <el-button
          size="small"
          class="btn-blue"
          :disabled="!(firstFlag && nextFlag && lastFlag && success)"
          @click="handleNext(2)"
          >下一步</el-button
        >
      </div>
    </template>
    <!-- 步骤三 -->
    <template v-else-if="active === 3">
      <div class="content-wrap">
        <span class="border"></span>
        <div class="content">
          <div class="wrap" ref="wrap">
            <div class="fonts" ref="fonts">
              <div class="title-header">
                <span class="icon"></span>
                <span>数据库账号</span>
              </div>
              <el-form
                style="margin-top: 10px"
                label-position="left"
                label-width="220px"
                ref="form1"
                :model="form"
                :rules="rules"
              >
                <el-form-item label="数据库主机" prop="host">
                  <el-input size="small" v-model="form.host"></el-input>
                </el-form-item>
                <el-form-item label="端口号" prop="port">
                  <el-input size="small" v-model="form.port"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="user">
                  <el-input size="small" v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pas">
                  <el-input type="password" size="small" v-model="form.pas"></el-input>
                </el-form-item>
                <el-form-item label="数据库名" class="flex" prop="database">
                  <el-input
                    :style="{ width: width }"
                    size="small"
                    v-model="form.database"
                  ></el-input>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    class="btn-white"
                    @click="handle"
                    >连通测试
                    <i v-if="iconFlag === 0" class="el-icon-success success"></i>
                    <i v-else-if="iconFlag === 1" class="el-icon-error error"></i>
                  </el-button>
                </el-form-item>
                <el-form-item label="表前缀" prop="prefix">
                  <el-input size="small" v-model="form.prefix"></el-input>
                </el-form-item>
                <el-form-item label="安装测试数据">
                  <el-checkbox v-model="checked"></el-checkbox>
                </el-form-item>
              </el-form>
              <div class="title-header">
                <span class="icon"></span>
                <span>管理员账号</span>
              </div>
              <el-form
                style="margin-top: 10px"
                label-position="left"
                label-width="220px"
                ref="form2"
                :model="form"
                :rules="rules"
              >
                <el-form-item label="管理员手机号" prop="phone">
                  <el-input size="small" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                  <el-input
                    type="password"
                    size="small"
                    maxlength="20"
                    v-model="form.password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码强度" required>
                  <el-progress
                    style="width: 660px; line-height: 40px"
                    :percentage="percentage"
                    :color="bg_color"
                    :format="format"
                  ></el-progress>
                </el-form-item>
              </el-form>

              <div style="margin: 20px 0 0 20px">
                <el-checkbox v-model="configFlag">企业微信配置</el-checkbox>
              </div>
              <div class="title-header" v-show="configFlag">
                <span class="icon"></span>
                <span>企业微信配置</span>
              </div>
              <el-form
                style="margin-top: 10px"
                v-show="configFlag"
                label-position="left"
                label-width="220px"
                ref="form3"
                :model="form"
                :rules="rules"
              >
                <el-form-item label="企业ID" prop="wxk_id">
                  <el-input
                    size="small"
                    @blur="handleIdBlur"
                    v-model="form.wxk_id"
                  ></el-input>
                  <img
                    @click="handleHelp(1)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <el-form-item label="通讯录Secret" prop="wxk_address_book_secret">
                  <el-input
                    size="small"
                    v-model="form.wxk_address_book_secret"
                  ></el-input>
                  <img
                    @click="handleHelp(2)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <el-form-item label="客户管理Secret" prop="wxk_customer_admin_secret">
                  <el-input
                    size="small"
                    v-model="form.wxk_customer_admin_secret"
                  ></el-input>
                  <img
                    @click="handleHelp(3)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <el-form-item label="客户管理回调URL" prop="wxk_customer_callback_url">
                  <el-input
                    style="width: 540px"
                    disabled
                    size="small"
                    v-model="form.wxk_customer_callback_url"
                  ></el-input>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    class="btn-white copy-url-btn"
                    @click="handleCopy($event, form.wxk_customer_callback_url)"
                    >一键复制</el-button
                  >
                  <img
                    @click="handleHelp(4)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <el-form-item
                  label="客户管理回调Token"
                  prop="wxk_customer_callback_token"
                >
                  <el-input
                    style="width: 450px"
                    size="small"
                    @blur="handleTokenBlur"
                    v-model="form.wxk_customer_callback_token"
                  ></el-input>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    class="btn-white"
                    @click="handleRandom('token')"
                    >随机生成</el-button
                  >
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    class="btn-white copy-url-btn"
                    @click="handleCopy($event, form.wxk_customer_callback_token)"
                    >一键复制</el-button
                  >
                  <img
                    @click="handleHelp(5)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <el-form-item
                  label="客户管理回调EncodingAESKey"
                  prop="wxk_customer_callback_key"
                >
                  <el-input
                    style="width: 450px"
                    size="small"
                    @blur="handleKeyBlur"
                    v-model="form.wxk_customer_callback_key"
                  ></el-input>
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    class="btn-white"
                    @click="handleRandom('key')"
                    >随机生成</el-button
                  >
                  <el-button
                    size="small"
                    style="margin-left: 10px"
                    class="btn-white copy-url-btn"
                    @click="handleCopy($event, form.wxk_customer_callback_key)"
                    >一键复制</el-button
                  >
                  <img
                    @click="handleHelp(6)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <div class="title-header">
                  <span class="icon"></span>
                  <span>企业微信自建应用配置</span>
                </div>
                <el-form
                  style="margin-top: 10px"
                  label-position="left"
                  label-width="220px"
                  ref="form4"
                  :model="form"
                  :rules="rules"
                >
                  <el-form-item label="自建应用AgentID" prop="wxk_app_agent_id">
                    <el-input size="small" v-model="form.wxk_app_agent_id"></el-input>
                    <img
                      @click="handleHelp(8)"
                      style="margin-left: 10px; cursor: pointer"
                      src="../../assets/images/help.png"
                      width="14px"
                      alt=""
                    />
                  </el-form-item>
                  <el-form-item label="自建应用Secret" prop="wxk_app_secret">
                    <el-input size="small" v-model="form.wxk_app_secret"></el-input>
                    <img
                      @click="handleHelp(9)"
                      style="margin-left: 10px; cursor: pointer"
                      src="../../assets/images/help.png"
                      width="14px"
                      alt=""
                    />
                  </el-form-item>
                  <el-form-item label="授权登录回调域">
                    <el-input
                      style="width: 540px"
                      disabled
                      size="small"
                      v-model="domain"
                    ></el-input>
                    <el-button
                      size="small"
                      style="margin-left: 10px"
                      class="btn-white copy-url-btn"
                      @click="handleCopy($event, domain)"
                      >一键复制</el-button
                    >
                    <img
                      @click="handleHelp(10)"
                      style="margin-left: 10px; cursor: pointer"
                      src="../../assets/images/help.png"
                      width="14px"
                      alt=""
                    />
                  </el-form-item>
                  <el-form-item label="下载应用Logo">
                    <div class="download">
                      <img src="../../assets/images/logo.png" width="75" alt="" />
                      <el-button
                        size="small"
                        class="btn-blue"
                        @click="
                          () => {
                            downloadIamge();
                          }
                        "
                        >点击下载</el-button
                      >
                    </div>
                  </el-form-item>
                </el-form>
              </el-form>
              <div v-show="!publicFlag" style="margin: 20px 0 100px 20px">
                <el-checkbox v-model="publicFlag">公众号配置</el-checkbox>
              </div>
              <div v-show="publicFlag" style="margin: 20px 0 0 20px">
                <el-checkbox v-model="publicFlag">公众号配置</el-checkbox>
              </div>
              <div v-show="publicFlag" class="title-header">
                <span class="icon"></span>
                <span>公众号配置</span>
              </div>
              <el-form
                v-show="publicFlag"
                style="margin-top: 10px"
                label-position="left"
                label-width="220px"
                ref="form5"
                :model="form"
                :rules="rules"
              >
                <el-form-item label="Appid" prop="wxk_public_app_id">
                  <el-input size="small" v-model="form.wxk_public_app_id"></el-input>
                  <img
                    @click="handleHelp(11)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
                <el-form-item label="AppSecret" prop="wxk_public_app_secret">
                  <el-input size="small" v-model="form.wxk_public_app_secret"></el-input>
                  <img
                    @click="handleHelp(12)"
                    style="margin-left: 10px; cursor: pointer"
                    src="../../assets/images/help.png"
                    width="14px"
                    alt=""
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button size="small" class="btn-white right" @click="handlePrev"
          >上一步</el-button
        >
        <el-button size="small" class="btn-blue" @click="handleNext(3)"
          >完成配置</el-button
        >
      </div>
    </template>
    <!-- 步骤四 -->
    <template v-else-if="active === 4">
      <div class="content-main">
        <div id="footer"></div>
        <remote-js src="https://cdn.wulabh.com/ptsc/1.0.0/ptsc.min.js"></remote-js>
        <remote-js src="https://cdn.wulabh.com/jquery/2.1.4/jquery.min.js"></remote-js>
        <span class="font1">您已安装完成，安装程序已被锁定</span>
        <span class="font2">如需重新安装，请删除应用根目录下install/install.lock</span>
        <span class="font3"
          >{{ time }}秒后自动跳转，<span class="font4" @click="handleLogin"
            >立即跳转</span
          ></span
        >
      </div>
    </template>
    <span class="copyright">COPYRIGHT ©唤客猫 2020-2021 All RIGHTS RESERVED. </span>
    <div class="alert" v-show="alertVisible">
      <div class="alert-main">
        <i class="el-icon-error error fs30"></i>
        <p>
          {{ alertMessage }}
        </p>
        <el-button
          size="small"
          class="btn-white"
          @click="
            () => {
              alertVisible = false;
              iconFlag = 1;
            }
          "
          >关闭</el-button
        >
      </div>
    </div>
    <div class="alert" v-show="confirmVisible">
      <div class="alert-main">
        <i class="el-icon-warning warn fs30"></i>
        <p>检测到数据库有数据存在，是否覆盖？</p>
        <div>
          <el-button
            size="small"
            class="btn-white"
            @click="
              () => {
                confirmVisible = false;
              }
            "
            >取消</el-button
          >
          <el-button
            size="small"
            class="btn-white"
            @click="
              () => {
                confirmVisible = false;
                form.is_cover = 0;
                reqInstall();
              }
            "
            >不覆盖</el-button
          >
          <el-button
            size="small"
            class="btn-blue"
            @click="
              () => {
                confirmVisible = false;
                form.is_cover = 1;
                reqInstall();
              }
            "
            >覆盖</el-button
          >
        </div>
      </div>
    </div>

    <div class="alert" v-show="initVisible">
      <div class="alert-main">
        <i v-show="initFlag === ''" class="el-icon-loading fs30"></i>
        <i v-show="initFlag === 0" class="el-icon-success success fs30"></i>
        <i v-show="initFlag === 1" class="el-icon-error error fs30"></i>
        <p style="height: 60px">
          <span v-if="initFlag === ''">项目初始化同步...</span>
          <span v-else-if="initFlag === 0">项目初始化同步成功 </span>
          <span v-else-if="initFlag === 1">项目初始化同步失败 </span>
        </p>
        <el-button
          v-show="initFlag === 1"
          size="small"
          class="btn-white"
          @click="
            () => {
              initVisible = false;
              initFlag = '';
            }
          "
          >关闭</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./header";
import {
  reqInstall,
  reqEnvironment,
  reqSyncConfig,
  reqDelConfig,
  reqGetConfigRandom,
} from "@/api/index";
import Clipboard from "clipboard";
export default {
  components: {
    Header,
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  data() {
    return {
      // 步骤一参数
      readFlag: false, // 是否勾选协议
      active: 1, //当前步骤
      helpVisible: false,
      publicFlag: false, // 是否开启公众号配置
      domIndex: 0,
      // 步骤二参数
      // 目录数据表
      directoryData: [
        {
          option: "/",
          require: "runtime目录可写",
          state: "",
          key: "runtime",
          loading: true,
        },
        {
          option: "/",
          require: "public/static目录可写",
          state: "",
          key: "uploads",
          loading: true,
        },
        {
          option: "/",
          require: "config/database目录可写",
          state: "",
          key: "database",
          loading: true,
        },
        {
          option: "/",
          require: "public/install目录可写",
          state: "",
          key: "install",
          loading: true,
        },
      ],
      // php数据表格
      phpData: [
        {
          option: "PHP版本",
          require: "7.1或7.1以上",
          state: 1,
          key: "php",
          loading: true,
        },
        {
          option: "MySQL",
          require: "支持（强烈建议支持）",
          state: "",
          key: "mysql",
          loading: true,
        },
        {
          option: "PDO_MYSQL",
          require: "支持（强烈建议支持）",
          state: "",
          key: "pdo",
          loading: true,
        },
        {
          option: "allow_url_fopen ",
          require: "支持（强烈建议支持）",
          state: "",
          key: "allowed",
          loading: true,
        },
        {
          option: "cURL",
          require: "支持（强烈建议支持）",
          state: "",
          key: "curl",
          loading: true,
        },
        {
          option: "GD2",
          require: "支持",
          state: "",
          key: "gd",
          loading: true,
        },
        {
          option: "openssl",
          require: "支持",
          state: "",
          key: "openssl",
          loading: true,
        },
        {
          option: "bcmath",
          require: "支持",
          state: "",
          key: "bcmath",
          loading: true,
        },
        {
          option: "DOM",
          require: "支持",
          state: "",
          key: "DOMDocument",
          loading: true,
        },
        {
          option: "session.auto.start",
          require: "支持",
          state: "",
          key: "auto_start",
          loading: true,
        },
        {
          option: "asp_tags",
          require: "支持",
          state: "",
          key: "asp_tags",
          loading: true,
        },
      ],
      // 服务器数据表格
      serverData: [
        {
          option: "服务器操作系统",
          value: "",
          state: 1,
          key: "os",
          loading: true,
        },
        {
          option: "Web服务器环境",
          value: "",
          state: 1,
          key: "web",
          loading: true,
        },
        {
          option: "PHP版本",
          value: "",
          state: 1,
          loading: true,
          key: "php",
        },
        {
          option: "程序安装目录",
          value: "",
          state: 1,
          loading: true,
          key: "path",
        },
        {
          option: "磁盘空间",
          value: "",
          key: "size",
          state: 1,
          loading: true,
        },
        {
          option: "上传限制",
          value: "",
          key: "upload",
          state: 1,
          loading: true,
        },
      ],
      firstShow: false,
      lastShow: false,
      firstFlag: false,
      lastFlag: false,
      index: 0,
      first: false,
      second: false,
      third: false,
      success: false,
      nextFlag: false,
      // 步骤三参数
      loading: false,
      checked: false,
      options: [],
      configFlag: false,
      domain: "",
      form: {
        host: "127.0.0.1",
        port: "3306",
        user: "huankemao",
        pas: "",
        test: 0,
        way: 0,
        database: "huankemao",
        prefix: "hkm_",
        username: "admin",
        password: "",
        phone: "",
        wxk_customer_callback_url: "",
        wxk_customer_admin_secret: "",
        wxk_id: "",
        wxk_address_book_secret: "",
        wxk_customer_callback_token: "",
        wxk_customer_callback_key: "",
        wxk_app_agent_id: "",
        wxk_app_secret: "",
        is_cover: "",
      },
      rules: {
        host: [
          {
            required: true,
            message: "请输入数据库主机",
            trigger: "blur",
          },
        ],
        port: [
          {
            required: true,
            message: "请输入端口号",
            trigger: "blur",
          },
        ],
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        pas: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        database: [
          {
            required: true,
            message: "请输入数据名",
            trigger: "blur",
          },
        ],
        prefix: [
          {
            required: true,
            message: "请输入表前缀",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入管理员账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        wxk_app_agent_id: [
          {
            required: true,
            message: "请输入自建应用AgentId",
            trigger: "blur",
          },
        ],
        wxk_app_secret: [
          {
            required: true,
            message: "请输入自建应用Secret",
            trigger: "blur",
          },
        ],
        wxk_customer_callback_url: [
          {
            required: true,
            message: "请输入客户管理回调URL",
            trigger: "blur",
          },
        ],
        wxk_customer_admin_secret: [
          {
            required: true,
            message: "请输入客户管理Secret",
            trigger: "blur",
          },
        ],
        wxk_id: [
          {
            required: true,
            message: "请输入企业ID",
            trigger: "blur",
          },
        ],
        wxk_address_book_secret: [
          {
            required: true,
            message: "请输入通讯录Secret",
            trigger: "blur",
          },
        ],
        wxk_customer_callback_token: [
          {
            required: true,
            message: "请输入客户管理回调Token",
            trigger: "blur",
          },
        ],
        wxk_customer_callback_key: [
          {
            required: true,
            message: "请输入客户管理回调EncodingAESKey",
            trigger: "blur",
          },
        ],
        wxk_public_app_id: [
          {
            required: true,
            message: "请输入微信公众号AppID",
            trigger: "blur",
          },
        ],
        wxk_public_app_secret: [
          {
            required: true,
            message: "请输入微信公众号Secret",
            trigger: "blur",
          },
        ],
      },
      // 步骤四参数
      time: 3,
      successIndex: 0,
      iconFlag: "",
      alertMessage: "",
      alertVisible: false,
      alertLoding: false,
      confirmVisible: false,
      initVisible: false,
      initLoading: false,
      initFlag: "",
      width: "540px",
      btnFlag: false,
      percentage: 0,
      bg_color: "#F56C6C",
    };
  },
  watch: {
    checked(val) {
      if (val) {
        this.form.test = 1;
      } else {
        this.form.test = 0;
      }
    },
    active(val) {
      if (val === 2) {
        if (!this.nextFlag) {
          this.reqEnvironment();
        }
      } else if (val === 3) {
        if (!this.form.wxk_customer_callback_url) this.reqGetConfigRandom();
      } else if (val === 4) {
        const timer = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            clearInterval(timer);
            this.$router.push("/login");
          }
        }, 1000);
      }
    },
    iconFlag(val) {
      if (val === "") {
        this.width = "540px";
      } else {
        this.width = "525px";
      }
    },
    configFlag(val) {
      this.$refs.form3.clearValidate();
      this.$refs.form4.clearValidate();
      if (val) {
        if (!this.form.wxk_customer_callback_url) this.reqGetConfigRandom();
        let oDom = this.$refs.wrap;
        setTimeout(() => {
          oDom.scrollTop = 400;
        }, 0);
      }
    },
    publicFlag(val) {
      this.$refs.form5.clearValidate();
      if (val) {
        let oDom = this.$refs.wrap;
        setTimeout(() => {
          oDom.scrollTop = oDom.scrollHeight;
        }, 0);
      }
    },
    form: {
      handler(val) {
        if (val.password) {
          this.percentage = 0;
          this.bg_color = "#F56C6C";
          let level = 0;
          if (val.password.length >= 6) {
            level++;
          }
          if (val.password.length >= 8 && /\W/.test(val.password)) {
            level++;
          }
          if (val.password.length >= 10 && /[a-zA-Z]/.test(val.password)) {
            level++;
          }
          if (level == 1) {
            this.percentage = 33;
            this.bg_color = "#F56C6C";
          } else if (level == 2) {
            this.percentage = 66;
            this.bg_color = "#E6A23C";
          } else if (level == 3) {
            this.percentage = 100;
            this.bg_color = "#67C23A";
          }
        } else {
          this.percentage = 0;
          this.bg_color = "#F56C6C";
        }
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    //  下一步
    handleNext(num) {
      if (num === 1) {
        if (this.readFlag) {
          this.active = 2;
          this.successIndex = 1;
        } else {
          this.active = 1;
          this.$message.warning("请勾选协议，进行下一步");
        }
      } else if (num === 2) {
        if (this.firstFlag && this.nextFlag && this.lastFlag) {
          this.active = 3;
          this.successIndex = 2;
        } else {
          this.active = 2;
          this.successIndex = 1;
          this.$message.warning("需环境监测全部通过后，进行下一步");
        }
      } else if (num === 3) {
        this.handleSubmit();
      }
    },
    format(percentage) {
      return percentage == 33
        ? "弱"
        : percentage == 66
        ? "中"
        : percentage == 100
        ? "强"
        : "无";
    },
    // 上一步
    handlePrev() {
      this.active--;
    },
    // 步骤二方法
    async reqEnvironment() {
      this.first = false;
      this.second = false;
      this.third = false;
      this.nextFlag = false;
      this.firstFlag = false;
      this.lastFlag = false;
      this.lastShow = false;
      this.firstShow = false;
      this.index = 0;

      let res = await reqEnvironment();
      if (res.code == 200) {
        let checkList = [];
        let firstList = [];
        let lastList = [];
        for (let key in res.data) {
          if (
            key != "os" &&
            key != "web" &&
            key != "php" &&
            key != "path" &&
            key != "size" &&
            key != "upload" &&
            key != "pdo" &&
            key != "allowed" &&
            key != "curl"
          ) {
            checkList.push(res.data[key]);
          }
        }
        firstList = checkList.slice(0, checkList.length - 4);
        lastList = checkList.slice(checkList.length - 4, checkList.length);
        this.first = true;
        let arr = [];
        for (let key in res.data) {
          arr.push(res.data[key]);
          this.serverData.map((item) => {
            item.loading = true;
            if (item.key == key) {
              item.value = res.data[key];
            }
          });
          this.directoryData.map((item) => {
            item.loading = true;
            if (item.key == key) {
              item.state = res.data[key];
            }
          });
          this.phpData.map((item) => {
            item.loading = true;
            if (item.key == key && key !== "php") {
              item.state = res.data[key];
            } else if (item.key == key) {
              item.value = res.data[key];
            }
          });
        }
        console.log(this.serverData, this.directoryData, this.phpData);

        const timer = setInterval(() => {
          if (this.first) {
            if (this.index < this.serverData.length) {
              this.serverData[this.index].loading = false;
              this.serverData = JSON.parse(JSON.stringify(this.serverData));
              this.index++;
            } else {
              this.index = 0;
              this.first = false;
              this.second = true;
              this.third = false;
            }
          } else if (this.second) {
            if (this.index < this.phpData.length) {
              this.phpData[this.index].loading = false;
              this.phpData = JSON.parse(JSON.stringify(this.phpData));
              this.index++;
            } else {
              this.index = 0;
              this.first = false;
              this.second = false;
              this.third = true;
              this.firstFlag = firstList.every((res) => {
                return res === 1;
              });
              this.firstShow = true;
            }
          } else if (this.third) {
            if (this.index < this.directoryData.length) {
              this.directoryData[this.index].loading = false;
              this.directoryData = JSON.parse(JSON.stringify(this.directoryData));
              this.index++;
            } else {
              this.index = 0;
              this.first = false;
              this.second = false;
              this.third = false;
              this.lastFlag = lastList.every((res) => {
                return res === 1;
              });
              this.lastShow = true;
            }
          } else {
            this.nextFlag = true;
            this.success = true;
            this.phpData.forEach((item) => {
              if (item.state !== 1) {
                this.success = false;
              }
            });
            this.directoryData.forEach((item) => {
              if (item.state !== 1) {
                this.success = false;
              }
            });
            this.serverData.forEach((item) => {
              if (item.state !== 1) {
                this.success = false;
              }
            });
            clearInterval(timer);
          }
        }, Math.random() * 100);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 步骤三方法
    // 项目初始化同步
    async reqSyncConfig() {
      this.initVisible = true;
      this.initLoading = true;
      let res = await reqSyncConfig({});
      this.initLoading = false;
      if (res.code === 200) {
        this.initFlag = 0;
        setTimeout(() => {
          this.initVisible = false;
          this.active = 4;
        }, 1500);
      } else {
        this.initFlag = 1;
        this.reqDelConfig();
      }
    },
    // 删除初始化配置
    async reqDelConfig() {
      let res = await reqDelConfig({});
      this.btnFlag = true;
    },
    // 完成配置
    async reqInstall() {
      let res = await reqInstall(this.form);
      if (res.code == 200) {
        if (this.form.way == 1) {
          this.iconFlag = 0;
          this.$message({
            type: "success",
            message: res.msg,
            center: true,
          });
        } else {
          if (this.configFlag) {
            this.reqSyncConfig();
          } else {
            this.active = 4;
          }
        }
      } else if (res.code == 201) {
        this.confirmVisible = true;
      } else {
        if (this.form.way == 1) {
          this.alertVisible = true;
          this.alertMessage = res.msg;
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    // 获取全部配置信息
    async reqGetConfigRandom(option) {
      let res = await reqGetConfigRandom({ type: 3 });
      if (res.code === 200) {
        this.form.wxk_customer_callback_url = res.data.path;
        this.form.wxk_customer_callback_token = res.data.token;
        this.form.wxk_customer_callback_key = res.data.aes_key;
        this.domain = res.data.domain;
      } else {
        this.$message.error(res.msg);
        this.form.wxk_customer_callback_url = "";
        this.form.wxk_customer_callback_token = "";
        this.form.wxk_customer_callback_key = "";
        this.domain = "";
      }
    },
    // 获取回调Token
    async getToken() {
      let res = await reqGetConfigRandom({ type: 1 });
      if (res.code === 200) {
        this.form.wxk_customer_callback_token = res.data.token;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取回调密钥
    async getKey() {
      let res = await reqGetConfigRandom({ type: 2 });
      if (res.code === 200) {
        this.form.wxk_customer_callback_key = res.data.aes_key;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 修改ID
    async editId() {
      let res = await reqGetConfigRandom({
        type: 6,
        wxk_id: this.form.wxk_id,
      });
    },
    // 修改token
    async editToken() {
      let res = await reqGetConfigRandom({
        type: 4,
        wxk_customer_callback_token: this.form.wxk_customer_callback_token,
      });
    },
    // 修改key
    async editKey() {
      let res = await reqGetConfigRandom({
        type: 5,
        wxk_customer_callback_aes_key: this.form.wxk_customer_callback_key,
      });
    },
    //  检测
    handle() {
      this.form.way = 1;
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.reqInstall();
        }
      });
    },
    // 提交
    handleSubmit() {
      let oP = [];
      this.$refs.form1.validate((valid) => {
        if (valid) {
          oP[0] = true;
        } else {
          oP[0] = false;
        }
      });
      this.$refs.form2.validate((valid) => {
        if (valid) {
          oP[1] = true;
        } else {
          oP[1] = false;
        }
      });

      if (this.configFlag) {
        this.$refs.form3.validate((valid) => {
          if (valid) {
            oP[2] = true;
          } else {
            oP[2] = false;
          }
        });
        this.$refs.form4.validate((valid) => {
          if (valid) {
            oP[3] = true;
          } else {
            oP[3] = false;
          }
        });
      } else {
        oP[2] = true;
        oP[3] = true;
      }

      if (this.publicFlag) {
        this.$refs.form5.validate((valid) => {
          if (valid) {
            oP[4] = true;
          } else {
            oP[4] = false;
          }
        });
      } else {
        oP[4] = true;
      }
      Promise.all(oP).then((res) => {
        if (res[0] && res[1] && res[2] && res[3] && res[4]) {
          this.form.way = 0;
          this.reqInstall();
        }
      });
    },
    // 图片下载
    downloadIamge(name) {
      var alink = document.createElement("a");
      alink.href = "/logo.png";
      alink.download = "自建应用Logo"; //图片名
      alink.click();
    },
    // 步骤四方法
    handleLogin() {
      this.$router.push("/login");
    },
    // 一键复制
    handleCopy(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text });
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.onClick(e);
    },
    // 随机生成
    handleRandom(option) {
      if (option === "token") {
        this.getToken();
      } else if (option === "key") {
        this.getKey();
      }
    },
    // 帮助
    handleHelp(domIndex) {
      this.$bus.$emit("showHelp", domIndex);
    },
    // 关闭帮助弹窗
    close(val) {
      this.helpVisible = val;
    },
    // 修改ID
    handleIdBlur() {
      if (this.form.wxk_id) {
        this.editId();
      }
    },
    // 修改token
    handleTokenBlur() {
      if (/^[0-9a-zA-Z]{1,30}$/gi.test(this.form.wxk_customer_callback_token)) {
        this.editToken();
      } else {
        this.$message.warning("请输入长度30位以内的字母、数字");
      }
    },
    // 修改key
    handleKeyBlur() {
      if (/^[0-9a-zA-Z]{43}$/gi.test(this.form.wxk_customer_callback_key)) {
        this.editKey();
      } else {
        this.$message.warning("请输入固定长度43位的字母、数字");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.install {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 800px;
  background-image: url("../../assets/images/install_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .titles {
    margin: 20px 0;
    height: 28px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    line-height: 28px;
  }
  .steps {
    width: 1200px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    span + span {
      margin-left: 10px;
    }

    .circle {
      line-height: 30px;
      text-align: center;
      width: 30px;
      height: 30px;
      background: #e5ebfb;
      border-radius: 50%;
      color: #fff;
    }
    .text {
      font-weight: bold;
      height: 22px;
      font-size: 14px;
      color: #333333;
      line-height: 22px;
    }

    .line {
      width: 200px;
      height: 10px;
      background: #e5ebfb;
      border-radius: 5px;
      flex-grow: 1;
    }
    .el-icon-check {
      font-size: 20px;
      font-weight: bold;
    }
    .active {
      background-color: #6881ec;
    }
  }
  .content-wrap {
    position: relative;
    width: 100%;
    height: calc(100% - 330px);
    margin-top: 30px;
    z-index: 1000;
    // overflow: hidden;

    .border {
      position: absolute;
      top: 0;
      left: 50%;
      width: 1200px;
      height: 100%;
      border-radius: 8px;
      transform: translateX(-50%);
      border: 1px solid #b9c5e9;
      background-color: #fff;
    }
    .content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 10px;
        left: 0;
        right: -5px;
        bottom: 20px;
        overflow-x: hidden;
        overflow-y: scroll;
        .title-header {
          display: flex;
          align-items: center;
          font-size: 14px;
          height: 36px;
          background: #e5ebfb;
          border-radius: 4px 4px 0px 0px;
          margin-top: 10px;
          .icon {
            width: 3px;
            height: 16px;
            background: #6881ec;
            border-radius: 2px;
            margin-right: 10px;
            margin-left: 20px;
          }
          > :nth-child(2) {
            color: #6881ec;
          }
        }
        .el-form {
          /deep/.el-form-item {
            margin-bottom: 15px;
          }
          .el-form-item.flex /deep/.el-form-item__content {
            display: flex;
            align-items: center;
          }
        }
        .c-title {
          margin: 20px 0;
          height: 25px;
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          line-height: 25px;
        }
        .fonts {
          width: 1140px;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 22px;
          .font-style {
            text-indent: 2em;
          }
        }
      }
    }
  }
  .content-main {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 860px;
    height: 220px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #b9c5e9;
    .font1 {
      font-size: 16px;

      font-weight: bold;
      color: #333333;
      line-height: 25px;
      margin-top: 50px;
    }
    .font2 {
      font-size: 12px;

      font-weight: 400;
      color: #333333;
      line-height: 20px;
      margin-top: 30px;
    }
    .font3 {
      margin-top: 20px;
      font-size: 12px;

      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }
    .font4 {
      cursor: pointer;
      color: #6881ec;
      text-decoration: underline;
    }
  }
  .footer {
    /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
      color: #6881ec;
    }
    padding-top: 15px;
    width: 1200px;
    display: flex;
    align-items: center;
    padding-bottom: 100px;
  }
  .copyright {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: 400;
    color: #333333;
    line-height: 17px;
  }
  .info {
    width: calc(100% - 14px);
    height: 32px;
    background: #fff7e6;
    border-radius: 4px;
    border: 1px solid #f5daa3;
    font-size: 14px;

    font-weight: 400;
    color: #333333;
    line-height: 32px;
    padding-left: 12px;
    margin: 10px 0;
  }
  .el-input {
    width: 630px;
  }
  /deep/.el-form-item__label {
    margin-left: 20px;
  }
  .intensity {
    display: flex;
    height: 40px;
    width: 540px;
    align-items: center;
    justify-content: space-between;
    span {
      width: 170px;
      height: 32px;
      background: #fff;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;

      font-weight: 400;
      color: #333333;
      line-height: 32px;
      border: 1px solid #ccc;
    }
    .weak {
      background-color: #ffbbc0;
      border: 1px solid #fff;
    }
    .center {
      background-color: #f5daa3;
      border: 1px solid #fff;
    }
    .strong {
      background-color: #9ad2c9;
      border: 1px solid #fff;
    }
  }
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    .alert-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 290px;
      height: 160px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(47, 75, 168, 0.2);
      border-radius: 6px;
      padding: 15px;

      > i {
        display: block;
        margin: 20px auto;
        text-align: center;
      }
      p {
        width: 100%;
        font-size: 14px;

        font-weight: 400;
        color: #333333;
        line-height: 2;
        text-align: center;
      }
      > div {
        position: absolute;
        bottom: 20px;
        left: 10%;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      > .el-button {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  /deep/.el-form-item__error {
    left: 20px;
  }
  .fontStyle {
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 14px;
    img {
      margin-right: 10px;
    }
  }
}
/deep/.el-form-item__error {
  position: relative !important;
}
/deep/.el-form-item {
  margin-bottom: 0 !important;
}

.download {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    margin-bottom: 15px;
  }
  .el-button {
    margin-left: 0px;
  }
}
</style>
