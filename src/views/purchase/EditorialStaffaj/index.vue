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
          <el-form-item label="仓库名称" prop="warehouseId">
            <el-select v-model="ruleForm.warehouseId" placeholder="请选择">
              <el-option
                v-for="item in warehouses"
                :key="item.id"
                :label="item.warehouse"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料名称" prop="materialsName">
            <el-input v-model="ruleForm.materialsName" placeholder="请输入材料名称"></el-input>
          </el-form-item>
          <el-form-item label="材料规格" prop="specification">
            <el-input v-model="ruleForm.specification" placeholder="请输入材料规格"></el-input>
          </el-form-item>
          <el-form-item label="参数" prop="parameter">
            <el-input v-model="ruleForm.parameter" placeholder="请输入参数"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model="ruleForm.num" placeholder="请输入数量"></el-input>
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
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item> -->
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
import { Email, Phon } from "../../../utils/verification";
import { orderLibraryUpdate, orderLibraryToUpdate,inventorytoInsert } from "@/api/index";
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
           value:"1",
           label:"女"
        },
        {
           value:"0",
           label:"男"
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
        // account: "",
        // name: "",
        // password: "",
        // sex: "",
        // // expirationDate: "",
        // status: "",
        // remark: "",
          warehouseId:"",
        materialsName:"",
        specification:"",
        parameter:"",
        num:"",
      },
     rules: {
        warehouseId: [
          {
            required: true,
            message: "请选择仓库名称",
            trigger: 'change',
          },
        ],
        materialsName: [
          {
            required: true,
            message: "请输入材料名称",
            trigger: "blur",
          },
        ],
        specification: [
          {
            required: true,
            message: "请输入材料规格",
            trigger: "blur",
          },
        ],
        parameter: [
          {
            required: true,
            message: "请输入参数",
            trigger: "change",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入数量",
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
         inventorytoInsert().then(res=>{
        console.log(res)
        this.warehouses = res.data
      })
      orderLibraryToUpdate(this.ruleForm.id).then((res) => {
        console.log(res, "dsad");
      this.ruleForm.warehouseId = res.data.warehouseId;     
      this.ruleForm.materialsName = res.data.materialsName;     
      this.ruleForm.specification = res.data.specification;     
      this.ruleForm.parameter = res.data.parameter;     
      this.ruleForm.num = res.data.num;    
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          orderLibraryUpdate(this.ruleForm).then((res) => {
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