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
          <el-form-item label="名字" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="组织机构" prop="organizationName">
            <el-input
              v-model="ruleForm.organizationName"
              @focus="GetFocusTrigger"
            ></el-input>
          </el-form-item>
            <el-dialog
            width="30%"
            title="组织机构"
            :visible.sync="innerVisible"
            append-to-body
          >
            <div class="contebn">
              <el-tree
                :data="datatree"
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </div>
            <div
              class="dialog-footer"
              style="text-align: right; margin-top: 5px"
            >
              <span slot="footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="Select">确 定</el-button>
              </span>
            </div>
          </el-dialog>
          <el-form-item label="职位" prop="positionName">
            <el-select v-model="ruleForm.positionId" placeholder="请选择">
              <el-option
                v-for="item in positionNames"
                :key="item.id"
                :label="item.positionName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
import {
  employeeUpdate,
  employeeToUpdate,
  sysPositionToInsert,
  sysOrganizationToInsert,
  sysOrganizationListTwo
} from "@/api/index";
export default {
  props: ["EditComponentSwitch", "ids"],
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!Email(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!Phon(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
        //内层的对话框
      innerVisible: false,
      datatree: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "organizationName",
      },
      personnel: false,

      ruleForm: {
        name: "",
        positionId: "",
        email: "",
        phone: "",
        sex: "",
        id: "",
        organizationId:"",
        organizationName: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名字",
            trigger: "blur",
          },
        ],
        positionId: [
          {
            required: true,
            message: "请选择职位",
            trigger: "change",
          },
        ],
        organizationId: [
          {
            required: true,
            message: "请选择组织机构",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请输入名字",
            trigger: "change",
          },
        ],
      },
      options: [
        {
          value: "1",
          label: "女",
        },
        {
          value: "0",
          label: "男",
        },
      ],
      positionNames: [
        {
          value: "1",
          label: "经理",
        },
        {
          value: "0",
          label: "员工",
        },
      ],
      organizationName: [
        {
          value: "1",
          label: "经理",
        },
        {
          value: "0",
          label: "员工",
        },
      ],
    };
  },
  methods: {
    //确定选中组织机构
    Select() {
      this.innerVisible = false;
    },
    //选中树节点
    handleNodeClick(data) {
      console.log(data);
      this.ruleForm.organizationName = data.organizationName;
      this.ruleForm.organizationId = data.id;
    },
    //获取焦点触发树
    GetFocusTrigger() {
      this.innerVisible = true;
      sysOrganizationListTwo({}).then((res) => {
        console.log(res, "dadada");
        this.datatree = res.data;
      });
    },
    close() {
      this.$emit("EditReceive", false);
    },
    open() {
      //  console.log(this.ruleForm.id,'474koiko')
      sysPositionToInsert().then((res) => {
        console.log(res);
        this.positionNames = res.data;
      });
      sysOrganizationToInsert().then((res) => {
        //  console.log(res)
        this.organizationNames = res.data;
      });
      employeeToUpdate(this.ruleForm.id).then((res) => {
        console.log(res);
        this.ruleForm.name = res.data.name;
        this.ruleForm.email = res.data.email;
        this.ruleForm.phone = res.data.phone;
        this.ruleForm.organizationId = res.data.organizationId;
        this.ruleForm.positionId = res.data.positionId;
        this.ruleForm.positionNameS = res.data.phone;
        this.ruleForm.sex = res.data.sex;
        this.ruleForm.organizationName = res.data.organizationName;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          employeeUpdate(this.ruleForm).then((res) => {
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