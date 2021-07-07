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
          label-width="110px"
          class="demo-ruleForm"
        >
         <el-form-item label="维修部位名称" prop="partName">
            <el-input v-model="ruleForm.partName"></el-input>
          </el-form-item>
          <el-form-item label="设施" prop="facility">
            <el-input v-model="ruleForm.facility"></el-input>
          </el-form-item>
          <el-form-item label="区域" prop="district">
            <el-input v-model="ruleForm.district" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="面积" prop="area">
            <el-input v-model="ruleForm.area" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="是否特殊体质" prop="isSpecialMaterial">
            <el-select v-model="ruleForm.isSpecialMaterial" placeholder="请选择">
              <el-option
                v-for="item in isSpecialMaterials"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
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
import { Email, Phon } from "../../../utils/verification";
import { processUpdate, processToUpdate } from "@/api/index";
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

      ruleForm: {
        partName: "",
        facility: "",
        district: "",
        area: "",
        isSpecialMaterial: "",
        remark: "",
      },
      rules: {
         partName: [
          {
            required: true,
            message: "请输入维修部位名称",
            trigger: "blur",
          },
        ],
        facility: [
          {
            required: true,
            message: "请输入设施",
            trigger: "blur",
          },
        ],
        district: [
          {
            required: true,
            message: "请输入区域",
            trigger: "blur",
          },
        ],
        area: [
          {
            required: true,
            message: "请输入面积",
            trigger: "blur",
          },
        ],
        isSpecialMaterial: [
          {
            required: true,
            message: "请选择是否特殊体质",
            trigger: "change",
          },
        ],
      },
      isSpecialMaterials:[
           {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ]
      // options: [
      //   {
      //     value: "1",
      //     label: "女",
      //   },
      //   {
      //     value: "0",
      //     label: "男",
      //   },
      // ],
    };
  },
  methods: {
    close() {
      this.$emit("EditReceive", false);
    },
    open() {
      //  console.log(this.ruleForm.id,'474koiko')
      processToUpdate(this.ruleForm.id).then((res) => {
        console.log(res);
         this.ruleForm.partName = res.data.partName;
      this.ruleForm.facility = res.data.facility;
      this.ruleForm.district = res.data.district;
      this.ruleForm.area = res.data.area;
      this.ruleForm.isSpecialMaterial = res.data.isSpecialMaterial;
      this.ruleForm.remark = res.data.remark;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          processUpdate(this.ruleForm).then(res=>{
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