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
          <el-form-item label="权限编码" prop="authorityCode">
            <el-input
              v-model="ruleForm.authorityCode"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限名称" prop="authorityName">
            <el-input
              v-model="ruleForm.authorityName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="网页路径" prop="webUrl">
            <el-input v-model="ruleForm.webUrl" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="接口路径" prop="apiURL">
            <el-input v-model="ruleForm.apiURL" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="按钮权限" prop="ButtonPermissions">
            <el-checkbox-group v-model="ruleForm.checkList">
              <el-checkbox label="aa">新增</el-checkbox>
              <el-checkbox label="ss">编辑</el-checkbox>
              <el-checkbox label="dd">停用</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->

          <!-- <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item> -->
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
import { sysAuthorityInsert } from "@/api/index";
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
          label: "启用",
        },
        {
          value: "1",
          label: "未启用",
        },
      ],
      ruleForm: {
        // //按钮权限数组
        // checkList:[],
        authorityCode: "",
        // name: "",
        //  password: "",
        apiURL: "",
        webUrl: "",
        authorityName: "",
        remark: "",
      },
      rules: {
        authorityCode: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur",
          },
        ],
        authorityName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        // apiURL: [
        //   {
        //     required: true,
        //     message: "请输入接口路径",
        //     trigger: "blur",
        //   },
        // ],
        // webUrl: [
        //   {
        //     required: true,
        //     message: "请输入网页路径",
        //     trigger: "blur",
        //   },
        // ],
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
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false);
      this.ruleForm.authorityCode = "";
      this.ruleForm.apiURL = "";
      this.ruleForm.webUrl = "";
      this.ruleForm.authorityName = "";
      this.ruleForm.status = "";
      this.ruleForm.remark = "";
      this.clearValidate("ruleForm");
    },
    open() {
      this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sysAuthorityInsert(this.ruleForm).then((res) => {
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