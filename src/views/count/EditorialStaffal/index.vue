<template>
  <div>
    <el-dialog
      title="详情"
      :visible.sync="personnel"
      width="70%"
      @open="open"
      @close="close"
    >
       <div class="centebt">
        <div class="ProjectViewLayout">
            <div class="titlea">
              仓库
            </div>
            <div class="GetMessage">{{ruleForm.warehouseName}}</div>
             <div class="titlea">
              材料名称
            </div>
            <div class="GetMessage">{{ruleForm.materialsName}}</div>
         </div>
        <div class="ProjectViewLayout">
            <div class="titlea">
              材料规格
            </div>
            <div class="GetMessage">{{ruleForm.cation}}</div>
             <div class="titlea">
             入库数量
            </div>
            <div class="GetMessage">{{ruleForm.num}}</div>
         </div>
        <div class="ProjectViewLayout">
            <div class="titlea">
              有效截止日期
            </div>
            <div class="GetMessage">{{ruleForm.validityTime}}</div>
             <div class="titlea">
              出入库日期
            </div>
            <div class="GetMessage">{{ruleForm.changeTime}}</div>
         </div>
        <div class="ProjectViewLayout">
            <div class="titlea">
              类型
            </div>
            <div class="GetMessage">{{ruleForm.type}}</div>
             <!-- <div class="titlea">
              来源
            </div>
            <div class="GetMessage">22</div> -->
         </div> 
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditComponentSwitch = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Email, Phon } from "../../../utils/verification";
import { inventoryDetailUpdate, inventoryDetailToUpdate,suppliesDrawDetailtoInsert,inventorytoInsert } from "@/api/index";
import { timestampToTime } from "@/utils/timeStamp";
export default {
  props: ["EditComponentSwitch", "ids"],
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
        // password: "",
        // sex: "",
        // // expirationDate: "",
        // status: "",
        // remark: "",
        warehouseId:"",
        warehouseNam:"",
        materialsName:"",
        materialsId:"",
        cation:"",
        validityTime:"",
        changeTime:"",
        objectId:"",
        num: "",
       type:"",
        id:"",
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
    close() {
      this.$emit("EditReceive", false);
    },
    open() {
      //  console.log(this.ruleForm.id,'474koiko')
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
      inventoryDetailToUpdate(this.ruleForm.id).then((res) => {
        console.log(res, "dsad");
     this.ruleForm.num = res.data.num;
      this.ruleForm.warehouseName = res.data.warehouseName;
      this.ruleForm.materialsName = res.data.materialsName;
      this.ruleForm.cation = res.data.cation;
      this.ruleForm.validityTime = res.data.validityTime;
      this.ruleForm.changeTime = res.data.changeTime;
      this.ruleForm.type = res.data.type;
     // this.ruleForm.price = res.data.price;
      //  this.ruleForm.account = res.data.account;     
      // this.ruleForm.name = res.data.name;     
      // this.ruleForm.password = res.data.password;     
      // this.ruleForm.sex = res.data.sex;     
      // this.ruleForm.status = res.data.status;     
      // this.ruleForm.remark = res.data.remark;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          inventoryDetailUpdate(this.ruleForm).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: `${res.msg}`,
                type: "success",
              });
              this.$emit("EditReceive", false);
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
    EditComponentSwitch: {
      handler(newName, oldName) {
        // console.log(newName, 'wqeqeq')
        this.personnel = newName;
      },
      immediate: true,
      deep: true,
    },
    ids: {
      handler(newName, oldName) {
        console.log(newName, "wqeqeq");
        this.ruleForm.id = newName;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss">
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
    .centebt {
    width: 842px;
    margin: 0 auto;
    border: solid 1px #cccccc;
  }
  .ProjectViewLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .titlea {
    width: 128px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessage {
    width: 281px;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    border-bottom: solid 1px #cccccc;
  }
  .titlead {
    width: 156px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessager {
    width: 95%;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    border-bottom: solid 1px #cccccc;
  }
    .titleadsd {
    width: 156px;
    height: 100%;
    text-align: center;
     line-height: 100%;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessagersd {
    width: 95%;
    height: 100%;
    padding-left: 10px;
    // line-height: 60px;
    border-bottom: solid 1px #cccccc;
  }
  .ove {
    overflow-y: hidden;
  }
</style>