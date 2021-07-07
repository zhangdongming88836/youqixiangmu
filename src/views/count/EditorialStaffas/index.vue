<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="personnel"
      width="70%"
      @open="open"
      @close="close"
    >
     <div class="centebt">
        <div class="ProjectViewLayout">
            <div class="titlea">
              仓库名称
            </div>
            <div class="GetMessage">{{ruleForm.warehouseName}}</div>
             <div class="titlea">
              批次号
            </div>
            <div class="GetMessage">{{ruleForm.batchNumber}}</div>
         </div>
        <div class="ProjectViewLayout">
            <div class="titlea">
              库存编码
            </div>
            <div class="GetMessage">{{ruleForm.code}}</div>
             <div class="titlea">
             材料名称
            </div>
            <div class="GetMessage">{{ruleForm.materialsName}}</div>
         </div>
        <div class="ProjectViewLayout">
            <div class="titlea">
              数量
            </div>
            <div class="GetMessage">{{ruleForm.num}}</div>
             <div class="titlea">
              有效期
            </div>
            <div class="GetMessage">{{ruleForm.validityTime}}</div>
         </div>
        <div class="ProjectViewLayout">
            <div class="titlea">
              备注
            </div>
            <div class="GetMessage">{{ruleForm.remark}}</div>
             <!-- <div class="titlea">
              修改人
            </div>
            <div class="GetMessage">22</div> -->
         </div> 
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Email, Phon } from "../../../utils/verification";
import {  inventoryToUpdate,inventorytoInsert } from "@/api/index";
import {timestampToTime} from "@/utils/timeStamp"
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
      warehouses: [],
      //状态选啦数组
      statuss: [
        {
           value:"0",
           label:"未过期"
        },
        {
           value:"1",
           label:"过期"
        },
      ],
         ruleForm: {
        warehouseId: "",
        materialsName: "",
        num: "",
        price: "",
        expirationDate: "",
        status: "",
        remark: "",
        id:"",
      },
       rules: {
        warehouseId: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "change",
          },
        ],
        materialsName: [
          {
            required: true,
            message: "请输入材料",
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
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        expirationDate: [
          {
            required: true,
            message: "请输入保质期",
            trigger: "blur",
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
    close() {
      this.$emit("EditReceive", false);
    },
    open() {
      //  console.log(this.ruleForm.id,'474koiko')
      inventoryToUpdate(this.ruleForm.id).then((res) => {
        console.log(res);
      this.ruleForm.warehouseName = res.data.warehouseName;
      this.ruleForm.batchNumber = res.data.batchNumber;
      this.ruleForm.num = res.data.num;
      this.ruleForm.code = res.data.code;
      this.ruleForm.materialsName = res.data.materialsName;
      this.ruleForm.validityTime = timestampToTime( res.data.validityTime)
      this.ruleForm.remark = res.data.remark;
      });
      // inventorytoInsert().then(res=>{
      //   console.log(res);
      //   this.warehouses = res.data;
      // })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          inventoryUpdate(this.ruleForm).then(res=>{
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
          })
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