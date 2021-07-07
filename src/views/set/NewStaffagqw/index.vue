<template>
  <div id="NewInventory">
    <el-dialog
      title="新增"
      :visible.sync="personnel"
      width="30%"
      @open="open"
      @close="close"
    >
     <el-dialog
      width="30%"
       title="组织机构"
      :visible.sync="innerVisible"
      append-to-body>
      <div class="contebn">
        <el-tree :data="datatree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="dialog-footer" style="text-align:right;margin-top:5px;">
         <span slot="footer" >
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="Select"
          >确 定</el-button
        >
      </span>
      </div>
    </el-dialog>
      <div class="contebn">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
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
             <el-form-item label="父级机构名称" prop="ParentOrganization">
            <el-input v-model="ParentOrganization" placeholder="请输入内容" @focus="GetFocusTrigger"></el-input>
          </el-form-item>
            <el-form-item label="组织机构名称" prop="organizationName">
            <el-input v-model="ruleForm.organizationName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="单位地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="办公电话" prop="officePhone">
            <el-input v-model="ruleForm.officePhone" placeholder="请输入内容"></el-input>
          </el-form-item>
           <!-- <el-form-item label="材料单价" prop="remark">
            <el-input v-model="ruleForm.price" placeholder="请输入内容"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="保质期" prop="expirationDate">
            <el-input v-model="ruleForm.expirationDate" placeholder="请输入内容(年)"></el-input>
          </el-form-item>  -->
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
            <el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
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
import { Email, Phon,numb } from "../../../utils/verification";
import { sysOrganizationInsert,sysOrganizationListTwo } from "@/api/index";
export default {
  props: ["dialogVisible"],
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
      //内层的对话框
      innerVisible:false,
      personnel: false,
       datatree: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'organizationName'
        },
      //类别下拉数组
      // categorys: [
      //     {
      //      value:"0",
      //      label:"工单生成"
      //   },
      //   {
      //      value:"1",
      //      label:"自主采购"
      //   },
      // ],
      // //状态选啦数组
      // statuss: [
      //   {
      //      value:"0",
      //      label:"未审核"
      //   },
      //   {
      //      value:"1",
      //      label:"已审核"
      //   },
      //   {
      //      value:"2",
      //      label:"作废"
      //   },
      //   {
      //      value:"3",
      //      label:"已完结"
      //   },
      // ],
          //父级机构名称
      ParentOrganization:"",
      ruleForm: {
         //父级的id
      parentId:"",
        organizationName:"",
        address: "",
        officePhone: "",
        // principal: "",
        //price: "",
        // expirationDate: "",
        // status: "",
        remark: "",
      },
      rules: {
        organizationName: [
          {
            required: true,
            message: "请输入组织机构名称",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入单位地址",
            trigger: "blur",
          },
        ],
        officePhone: [
          {
            required: true,
            message: "请输入办公电话",
            trigger: "blur",
          },
        ],
        // price: [
        //   {
        //     required: true,
        //     validator: validatprice,
        //     trigger: "blur",
        //   },
        // ],
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
    //确定选中组织机构
    Select(){
      this.innerVisible = false  
    },
    //选中树节点
      handleNodeClick(data) {
        console.log(data);
        this.ParentOrganization = data.organizationName;
        this.ruleForm.parentId = data.id;
      },
    //获取焦点触发树
    GetFocusTrigger(){
      this.innerVisible = true;
        sysOrganizationListTwo({}).then(res=>{
      console.log(res,"dadada")
      this.datatree = res.data
    })
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false);
      this.ruleForm.organizationName = "";     
      this.ruleForm.address = "";     
      this.ruleForm.officePhone = "";     
      this.ruleForm.remark = "";
      this.ruleForm.ParentId = "";
      this.ParentOrganization = ""
      this.clearValidate("ruleForm");
    },
    open() {
      this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sysOrganizationInsert(this.ruleForm).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: `${res.msg}`,
                type: "success",
              });
              this.$emit("CloseTheComponent", false);
              this.$emit("toUpdate");
              this.$emit("Publitree");
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
  .dialog-footer{
    text-align:right;
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