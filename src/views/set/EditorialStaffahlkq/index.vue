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
          <!-- <el-form-item label="姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
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
import { sysAuthorityUpdate, sysAuthorityToUpdate } from "@/api/index";
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
    close() {
      this.$emit("EditReceive", false);
    },
    open() {
      //  console.log(this.ruleForm.id,'474koiko')
      sysAuthorityToUpdate(this.ruleForm.id).then((res) => {
        console.log(res, "dsad");
        // console.log(this.$md5(res.data.password))
        this.ruleForm.authorityCode = res.data.authorityCode;
        // this.ruleForm.name = res.data.name;
        this.ruleForm.webUrl = res.data.webUrl;
        this.ruleForm.apiURL = res.data.apiURL;
        this.ruleForm.authorityName = res.data.authorityName;
        this.ruleForm.remark = res.data.remark;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sysAuthorityUpdate(this.ruleForm).then((res) => {
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
</style>