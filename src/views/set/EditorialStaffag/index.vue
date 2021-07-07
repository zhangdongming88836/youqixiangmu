<template>
  <div>
    <el-dialog
      title="编辑"
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
          <!-- <el-form-item label="类别" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option
                v-for="item in categorys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
            <el-form-item label="材料编码" prop="materialsCode">
            <el-input v-model="ruleForm.materialsCode" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="材料名称" prop="materialsName">
            <el-input v-model="ruleForm.materialsName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="材料规格" prop="cation">
            <el-input v-model="ruleForm.cation" placeholder="请输入内容"></el-input>
          </el-form-item>
           <el-form-item label="材料单价" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- <el-form-item label="保质期" prop="expirationDate">
            <el-input v-model="ruleForm.expirationDate" placeholder="请输入内容(年)"></el-input>
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
          <el-form-item label="描述" prop="remark">
            <el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
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
import { Email, Phon,numb } from "../../../utils/verification";
import { paintMaterialUpdate, paintMaterialToUpdate } from "@/api/index";
export default {
  props: ["EditComponentSwitch", "ids"],
  data() {
   var validatprice = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入材料单价"));
      } else if (!numb(value)) {
        callback(new Error("只能输入数字或带小数点的数字"));
      } else {
        callback();
      }
    };
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
      //类别下拉数组
    //  categorys: [
    //       {
    //        value:"0",
    //        label:"工单生成"
    //     },
    //     {
    //        value:"1",
    //        label:"自主采购"
    //     },
    //   ],
    //   //状态选啦数组
    //   statuss: [
    //     {
    //        value:"0",
    //        label:"未审核"
    //     },
    //     {
    //        value:"1",
    //        label:"已审核"
    //     },
    //     {
    //        value:"2",
    //        label:"作废"
    //     },
    //     {
    //        value:"3",
    //        label:"已完结"
    //     },
    //   ],
         ruleForm: {
         materialsCode:"",  
         materialsName: "",
        cation: "",
        // principal: "",
         price: "",
        // expirationDate: "",
        // status: "",
        remark: "",
      },
       rules: {
           materialsCode: [
          {
            required: true,
            message: "请输入材料编码",
            trigger: "blur",
          },
        ],
         materialsName: [
          {
            required: true,
            message: "请输入材料名字",
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
         price: [
          {
            required: true,
            validator: validatprice,
            trigger: "blur",
          },
        ],
        // expirationDate: [
        //   {
        //     required: true,
        //     message: "请输入保质期",
        //     trigger: "blur",
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
      paintMaterialToUpdate(this.ruleForm.id).then((res) => {
        console.log(res,'dsad');
        this.ruleForm.materialsName = res.data.materialsName;
        this.ruleForm.materialsCode = res.data.materialsCode;
      this.ruleForm.cation = res.data.cation;
      this.ruleForm.price = res.data.price;
      this.ruleForm.remark = res.data.remark;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          paintMaterialUpdate(this.ruleForm).then(res=>{
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
</style>