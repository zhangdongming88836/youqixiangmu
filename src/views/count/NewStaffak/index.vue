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
          <el-form-item label="仓库名称" prop="warehouseId">
            <el-select v-model="ruleForm.warehouseId" placeholder="请选择仓库名称">
              <el-option
                v-for="item in warehouses"
                :key="item.id"
                :label="item.warehouse"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料名称" prop="inventoryId">
             <el-select v-model="ruleForm.inventoryId" placeholder="请选择材料名称">
              <el-option
                v-for="item in materialsNames"
                :key="item.id"
                :label="item.materialsName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保质期" prop="expirationDate">
            <el-input
              v-model="ruleForm.expirationDate"
              placeholder="请输入保质期(年)"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="领取日期" prop="drawTime">
            <el-date-picker
              v-model="ruleForm.drawTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="价格" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model="ruleForm.num" placeholder="请输入数量"></el-input>
          </el-form-item>
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
          <!-- <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
          </el-form-item>-->
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
import { suppliesDrawDetailInsert,suppliesDrawDetailtoInsert,inventorytoInsert } from "@/api/index";
export default {
  props: ["dialogVisible"],
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
      personnel: false,
      //仓库下拉数组
      warehouses: [
        {
          value: "1",
          label: "女",
        },
        {
          value: "0",
          label: "男",
        },
      ],
      // //材料选啦数组
      materialsNames: [
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
        // account: "",
        // name: "",
        //  password: "",
        //  sex: "",
        // // expirationDate: "",
        //  status: "",
        // remark: "",
        warehouseId:"",
        inventoryId:"",
        expirationDate:"",
        price:"",
        num: "",
     
      },
      rules: {
        warehouseId: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "blur",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        inventoryId: [
          {
            required: true,
            message: "请选择材料",
            trigger: "change",
          },
        ],
        expirationDate: [
          {
            required: true,
            message: "请输入保质期",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        // password: [
        //   {
        //     required: true,
        //     message: "请输入密码",
        //     trigger: "blur",
        //   },
        // ],
        // sex: [
        //   {
        //     required: true,
        //     message: "请选择性别",
        //     trigger: "change",
        //   },
        // ],
        // status: [
        //   {
        //     required: true,
        //     message: "请选择状态",
        //     trigger: "change",
        //   },
        // ],
      },
    };
  },
  methods: {
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false); 
      this.ruleForm.num = "";
      this.ruleForm.warehouseId = "";
      this.ruleForm.inventoryId = "";
      this.ruleForm.expirationDate = "";
      this.ruleForm.price = "";
      // this.ruleForm.account = "";
      // this.ruleForm.name = "";
      // this.ruleForm.password = "";
      // this.ruleForm.sex = "";
      // this.ruleForm.status = "";
      // this.ruleForm.remark = "";
      this.clearValidate("ruleForm");
    },
    open() {
      //仓库名称
      inventorytoInsert().then(res=>{
        console.log(res)
        this.warehouses = res.data
      })
      //材料名称
      suppliesDrawDetailtoInsert().then(res=>{
        console.log(res)
        this.materialsNames = res.data
      })
      this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          suppliesDrawDetailInsert(this.ruleForm).then((res) => {
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