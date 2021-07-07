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
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="仓库" prop="warehouseId">
            <el-select v-model="ruleForm.warehouseId" placeholder="请选择仓库">
              <el-option
                v-for="item in warehouseIds"
                :key="item.id"
                :label="item.warehouse"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料名称" prop="materialsId">
            <el-select v-model="ruleForm.materialsId" placeholder="请选择材料名称">
              <el-option
                v-for="item in materialsNames"
                :key="item.id"
                :label="item.materialsName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料规格" prop="cation">
            <el-input v-model="ruleForm.cation" placeholder="请输入材料规格"></el-input>
          </el-form-item>
          <el-form-item label="入库数量" prop="num">
            <el-input v-model="ruleForm.num" placeholder="请输入入库数量"></el-input>
          </el-form-item>
          <!-- <el-form-item label="保质期" prop="expirationDate">
            <el-input
              v-model="ruleForm.expirationDate"
              placeholder="请输入保质期(年)"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="有效截止日期" prop="validityTime">
            <el-date-picker
              v-model="ruleForm.validityTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="出入库日期" prop="changeTime">
            <el-date-picker
              v-model="ruleForm.changeTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="价格" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入价格"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="入库数量" prop="num">
            <el-input v-model="ruleForm.num" placeholder="请输入入库数量"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="principal">
            <el-input v-model="ruleForm.principal" placeholder="请输入负责人"></el-input>
          </el-form-item> -->
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择类型" @change="TypeChange">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="SourceDisplays" label="来源" prop="objectId">
            <el-select v-model="ruleForm.objectId" placeholder="请选择来源">
              <el-option
                v-for="item in objectIds"
                :key="item.id"
                :label="item.workOrderName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="SourceDisplay" label="来源" prop="objectId">
            <el-select v-model="ruleForm.objectId" placeholder="请选择来源">
              <el-option
                v-for="item in objectIds"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
import { inventoryDetailInsert,suppliesDrawDetailtoInsert,inventorytoInsert,paintMaterialListToSelect,warehouseListTwo,ordersListTwo,workOrderListTwo } from "@/api/index";
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
      //来源显示隐藏
      SourceDisplays:false,
      SourceDisplay:false,
      personnel: false,
      //来源
      objectIds:[],
      //仓库下拉
      warehouseIds:[

      ],
      //材料名称下拉
      materialsNames: [
        {
          value: "1",
          label: "女",
        },
        {
          value: "0",
          label: "男",
        },
      ],
      //类型
      types: [
        {
          value: "0",
          label: "入库",
        },
        {
          value: "1",
          label: "出库",
        },
        {
          value: "3",
          label: "回退",
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
        materialsId:"",
        cation:"",
        validityTime:"",
        changeTime:"",
        objectId:"",
        num: "",
       type:"",
       //principal:"",
      },
      rules: {
        warehouseId: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "change",
          },
        ],
        materialsId: [
          {
            required: true,
            message: "请选择材料",
            trigger: "change",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        cation: [
          {
            required: true,
            message: "请输入材料规格",
            trigger: "blur",
          },
        ],
        validityTime: [
          {
            required: true,
            message: "请输入有效截止日期",
            trigger: "blur",
          },
        ],
        changeTime: [
          {
            required: true,
            message: "请输入出入库日期",
            trigger: "blur",
          },
        ],
        warehouseTime: [
          {
            required: true,
            message: "请输入入库时间",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入类型",
            trigger: "blur",
          },
        ],
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
    //类型改变
    TypeChange(val){
    console.log(val)
    if(val == 0){
     ordersListTwo({}).then(res=>{
        this.SourceDisplay = false
       console.log(res)
         this.objectIds = []
       if(res.code == 200){
        this.objectIds = res.data;
        this.SourceDisplays = true
       }
     })
    }else{
      this.SourceDisplays = false
     workOrderListTwo({}).then(res=>{
       console.log(res)
        this.objectIds = []
         if(res.code == 200){
        this.objectIds = res.data;
        this.SourceDisplay = true
       }
     })
    }
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false); 
      this.ruleForm.num = "";
      this.ruleForm.materialsName = "";
      this.ruleForm.cation = "";
      this.ruleForm.validityTime = "";
      this.ruleForm.changeTime = "";
      this.ruleForm.type = "";
      this.ruleForm.expirationDate = "";
      this.ruleForm.price = "";
      // this.ruleForm.account = "";
      // this.ruleForm.name = "";
      // this.ruleForm.password = "";
      // this.ruleForm.sex = "";
      // this.ruleForm.status = "";
      // this.ruleForm.remark = "";
      this.SourceDisplays = false
       this.SourceDisplay = false
      this.clearValidate("ruleForm");
    },
    open() {
      //仓库下拉
      warehouseListTwo({}).then(res=>{
        console.log(res)
        this.warehouseIds = res.data;
      })
      //材料名称
      paintMaterialListToSelect().then(res=>{
       // console.log(res)
        this.materialsNames = res.data
      })
      this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          inventoryDetailInsert(this.ruleForm).then((res) => {
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