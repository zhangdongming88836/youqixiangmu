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
           <!-- <el-form-item label="仓库名称" prop="warehouseId">
            <el-select v-model="ruleForm.warehouseId" placeholder="请选择仓库名称">
              <el-option
                v-for="item in warehouses"
                :key="item.id"
                :label="item.warehouse"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料名称" prop="inventoryId">
             <el-select v-model="ruleForm.inventoryId" placeholder="请选择材料名称">
              <el-option
                v-for="item in materialsNames"
                :key="item.id"
                :label="item.materialsName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保质期" prop="expirationDate">
            <el-input
              v-model="ruleForm.expirationDate"
              placeholder="请输入保质期(年)"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="领取日期" prop="drawTime">
            <el-date-picker
              v-model="ruleForm.drawTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item> -->
           <el-form-item label="套餐编码" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输套餐编码"></el-input>
          </el-form-item>
          <el-form-item label="套餐名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入套餐名称"></el-input>
          </el-form-item>
          <el-form-item label="部位名称" prop="partId">
            <el-select v-model="ruleForm.partId" placeholder="请选择材料名称">
              <el-option
                v-for="item in materialsNames"
                :key="item.id"
                :label="item.partName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="套餐图层" prop="name">
             <el-table :data="ruleForm.evidenceTemplateList" stripe border style="width: 100%" size="mini">
				<el-table-column  type="index" label="序号" min-width="20" align="center"></el-table-column>
				<el-table-column align="center" label="操作" min-width="20">
					<template slot-scope="scope">
						<el-button  type="text"  @click="delSealRow(scope.row,scope.$index)" icon="el-icon-delete" size="small"></el-button>
					</template>
				</el-table-column>
				<el-table-column label="印鉴名称" min-width="50" align="center">
					<template slot-scope="scope" >
						<el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealName'" :rules='rules.sealName'>
				       		<el-input  v-model="scope.row.sealName" size="small" :maxlength="30"></el-input>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column   label="印鉴保管人部门"   align="center">
					<template slot-scope="scope">
						<el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperDepartment'">
			            	<el-input  v-model="scope.row.sealKeeperDepartment" size="small" :maxlength="30" ></el-input>
			            </el-form-item>
			        </template>
				</el-table-column>
				<el-table-column   label="印鉴保管人职务"   align="center">
					<template slot-scope="scope">
						<el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperJob'">
			            	<el-input  v-model="scope.row.sealKeeperJob" size="small"></el-input>
			           </el-form-item>
			        </template>
				</el-table-column>
				<el-table-column  label="印鉴保管人姓名"  align="center">
					<template slot-scope="scope">
						<el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperName'">	
			            	<el-input  v-model="scope.row.sealKeeperName" size="small"></el-input>
			           </el-form-item>
			       </template>
				</el-table-column>
				<el-table-column   label="更新时间"  align="center">
					<template slot-scope="scope">
						<el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.updateDate'">
							<el-date-picker v-model="scope.row.updateDate" :disabled="true" type="date" size="small"></el-date-picker>
						</el-form-item>
			        </template>
				</el-table-column>
				<el-table-column    label="更新者"   align="center">
					<template slot-scope="scope">
						<el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.updateUser'">
			            	<el-input  v-model="scope.row.updateUser" size="small" :disabled="true"></el-input>
			           </el-form-item>
			        </template>
				</el-table-column>
			</el-table>
          </el-form-item>
            <el-form-item label="套餐除锈" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入套餐名称"></el-input>
          </el-form-item>
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
          <!-- <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
          </el-form-item>-->
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
import { suppliesDrawDetailUpdate, partListToSelect,formulaSetMealToUpdate,formulaSetMealUpdate } from "@/api/index";
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
      removeSealDescriptionIdArray:[],//要删除的table每一行 的SealDescriptionId数组
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
        code:"",
        partId:"",
        name:"", 
        evidenceTemplateList:[],
      },
      rules: {
         code: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "blur",
          },
        ],
        partId: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        name: [
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
        sealName:[
						{ required: true, message: '请输入印鉴名称', trigger: 'blur'}
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
         //部位名称
      partListToSelect().then(res=>{
        console.log(res)
        this.materialsNames = res.data
      })
      //材料名称
      // suppliesDrawDetailtoInsert().then(res=>{
      //   console.log(res)
      //   this.materialsNames = res.data
      // })
      formulaSetMealToUpdate(this.ruleForm.id).then((res) => {
        console.log(res, "dsad");
      this.ruleForm.code = res.data.code;
      this.ruleForm.name = res.data.name;
      this.ruleForm.partId = res.data.partId;
      // this.ruleForm.expirationDate = res.data.expirationDate;
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
          formulaSetMealUpdate(this.ruleForm).then((res) => {
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