<template>
  <div id="NewInventory">
    <el-dialog
      title="新增"
      :visible.sync="personnel"
      width="30%"
      @open="open"
      @close="close"
    >
      <div class="contebn">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- <el-form-item label="名称" prop="materialName">
            <el-select v-model="ruleForm.materialName" placeholder="请选择">
              <el-option
                v-for="item in categorys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="账号" prop="account">
            <el-input
              v-model="ruleForm.account"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入姓名"
              @focus="GetFocus"
            ></el-input>
          </el-form-item>
          <el-dialog
            width="60%"
            title="员工信息"
            :visible.sync="innerVisible"
            append-to-body
          >
            <div>
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="员工姓名" prop="name">
                  <el-input v-model="name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态" prop="status">
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statuss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
                <el-form-item class="item">
                  <el-button type="primary" @click="PersonnelInquiry"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div class="borfer" v-if="tatoltr">
              <tables
                :dataHeader="dataHeader"
                :tableData="tableData"
                :CurrentPage="CurrentPage"
                :total="total"
                :pageSize="pageSize"
                @NumberOfArticles="NumberOfArticles"
                @numberOfPages="numberOfPages"
              >
          <template v-slot:status="data">
      
          <el-button
            type="text"
            size="small"
            @click="GetCurrent(data.data)"
            >选择</el-button
          >
        </template>
              </tables>
            </div>
                <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="SelectEmployeeInformation"
          >确 定</el-button
        >
      </span>
          </el-dialog>
          <!-- <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择">
              <el-option
                v-for="item in statuss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Email, Phon } from "../../../utils/verification";
import { userInsert,employeelist } from "@/api/index";
import tables from "@/components/table";
export default {
  props: ["dialogVisible"],
  components: {
    tables,
  },
  data() {
    // var validateEmail = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入邮箱"));
    //   } else if (!Email(value)) {
    //     callback(new Error("邮箱格式错误"));
    //   } else {
    //     callback();
    //   }
    // };
    // var validatePhone = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入手机号"));
    //   } else if (!Phon(value)) {
    //     callback(new Error("手机号格式错误"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      //查询后显示
      tatoltr:false,
      dataHeader: [
        // { min: "account", acd: "账号" },
        { min: "name", acd: "姓名" },
        // { min: "sex", acd: "性别" },
        { min: "positionName", acd: "职位名称" },
        { min: "organizationName", acd: "部门名称" },
        // { min: "status", acd: "状态" },
        // { min: "loginDeadline", acd: "最后登录时间" },
        // { min: "remark", acd: "备注" },
         { min: "datae", acd: "操作", cfumn: "slot", slotName: "status" },
      ],
      tableData: [
        {
          data: "nihao",
          datas: "ddak",
          datav: "dsada",
        },
      ],
      CurrentPage: 1,
      total: 10,
      pageSize: 10,
      //内层
      innerVisible: false,
      personnel: false,
       name: "",
      //性别下拉数组
      sexs: [
        {
          value: "1",
          label: "女",
        },
        {
          value: "0",
          label: "男",
        },
      ],
      // //状态选啦数组
      statuss: [
        {
          value: "0",
          label: "未启用",
        },
        {
          value: "1",
          label: "启用",
        },
      ],
      ruleForm: {
        account: "",
        name: "",
        employeeId: "",
        password: "",
        sex: "",
        // expirationDate: "",
        status: "",
        remark: "",
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //确定选中员工信息
    SelectEmployeeInformation(){
      this.innerVisible = false;
    },
    //获取当前员工信息
    GetCurrent(val){
      console.log(val)
      this.ruleForm.name = val.name;
      this.ruleForm.employeeId = val.id;
    },
    //接收條數
    NumberOfArticles(val) {
      console.log(val);
      this.pageSize = val;
      let obj = {
        pageForm: { name: this.name },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: val,
        },
      };
      this.inventorylist(obj);
    },
    //接收頁碼
    numberOfPages(val) {
      console.log(val);
      this.CurrentPage = val;
      let obj = {
        pageForm: { name: this.name },
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    //查询员工信息
    PersonnelInquiry() {
      let obj = {
        pageForm: { name: this.name },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      employeelist(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          // item.loginDeadline = timestampToTime(item.loginDeadline);
          item.sex = item.sex == "1" ? "女" : "男";
          item.status = item.status == "1" ? "启用" : "未启用";
          return item;
        });
        console.log(arr);
        this.tableData = arr;

        if (res.code == 200) {
          this.name = "";
          this.status = "";
          this.tatoltr = true;
        }
      });
    },
    //获取员工信息
    GetFocus() {
      this.innerVisible = true;
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false);
      this.ruleForm.account = "";
      this.ruleForm.name = "";
      this.ruleForm.password = "";
      this.ruleForm.sex = "";
      this.ruleForm.status = "";
      this.ruleForm.remark = "";
      this.ruleForm.employeeName = "";
      this.clearValidate("ruleForm");
    },
    open() {
      this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userInsert(this.ruleForm).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: `${res.msg}`,
                type: "success",
              });
              this.$emit("CloseTheComponent", false);
              this.$emit("toUpdate");
            } else {
              this.$message({
                message: `${res.msg}`,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    dialogVisible: {
      handler(newName, oldName) {
        console.log(newName, "wqeqeq");
        this.personnel = newName;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss">
#NewInventory {
  .el-dialog__body {
    padding-right: 70px !important;
  }
    .tableaf {
    width: 775px;
    padding-left: 20px;
    overflow: auto;
  }
   /************************************ */
  .el-transfer-panel {
    width: 220px !important;
    height: 435px !important;
  }
  .el-transfer-panel__list.is-filterable {
    height: 200px;
  }
  .el-dialog__header {
    background-color: #0075cb;
  }
  .el-dialog__title {
    margin-left: -0% !important;
    width: 32px;
    height: 22px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .el-icon-close:before {
    color: #e4e4e4;
  }
}
</style>