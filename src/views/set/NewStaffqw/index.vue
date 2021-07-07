<template>
  <div id="NewInventorysf">
    <el-dialog
      title="新增"
      :visible.sync="personnel"
      width="60%"
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
            <el-input
              v-model="ruleForm.code"
              placeholder="请输套餐编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="套餐名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入套餐名称"
            ></el-input>
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
          <!-- <el-form-item label="套餐图层" prop="name">
            <el-table
              :data="ruleForm.evidenceTemplateList"
              stripe
              border
              style="width: 100%"
              size="mini"
            >
            </el-table>
          </el-form-item>
          <el-form-item label="套餐除锈" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入套餐名称"
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
          <!-- <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
          </el-form-item>-->
        </el-form>
        <div>
          <label style="margin-left: 30px">套餐图层</label>
          <template>
            <div style="margin-left: 99px">
              <table id="customers">
                <tr>
                  <th>序号</th>
                  <th>操作</th>
                  <th>涂漆名称</th>
                  <th>涂层</th>
                  <th>涂层厚度</th>
                  <th>用量</th>
                  <th>最少轮数</th>
                  <th>干膜厚度</th>
                </tr>
                <tr v-for="(item, index) in ruleForm.formulaPaintMealList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <el-button type="text" size="mini" @click="DeleteCurrent(index)">删除</el-button>
                  </td>
                  <td>
                    <el-select
                      v-model="item.paintMaterialId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="items in paintMaterialIds"
                        :key="items.id"
                        :label="items.materialsName"
                        :value="items.id"
                      >
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      v-model="item.coat"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.coatingThickness"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.dosage"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.sheavesNum"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.thickness"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                </tr>
              </table>
              <div style="text-align: right">
                <el-button type="primary" @click="AddList">新增</el-button>
              </div>
            </div>
          </template>
        </div>
        <!--套餐除锈 -->
           <div>
          <label style="margin-left: 30px">套餐除锈</label>
          <template>
            <div style="margin-left: 99px">
              <table id="customersa">
                <tr>
                  <th>序号</th>
                  <th>操作</th>
                  <th>除锈方式</th>
                </tr>
                <tr v-for="(item, index) in ruleForm.formulaDescaMealList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <el-button type="text" size="mini" @click="DeleteCurrents(index)">删除</el-button>
                  </td>
                  <!-- <td>
                    <el-select
                      v-model="item.paintMaterialId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="items in paintMaterialIds"
                        :key="items.id"
                        :label="items.materialsName"
                        :value="items.id"
                      >
                      </el-option>
                    </el-select>
                  </td> -->
                  <td>
                    <el-input
                      v-model="item.descaling"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <!-- <td>
                    <el-input
                      v-model="item.coatingThickness"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.dosage"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.sheavesNum"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.thickness"
                      placeholder="请输入"
                    ></el-input>
                  </td> -->
                </tr>
              </table>
              <div style="text-align: right">
                <el-button type="primary" @click="AddLists">新增</el-button>
              </div>
            </div>
          </template>
        </div> 
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
import {
  formulaSetMealInsert,
  partListToSelect,
  inventorytoInsert,
  paintMaterialListToSelect
} from "@/api/index";
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
      input: "",
      objs: {
        paintMaterialId: "",
        coat: "",
        coatingThickness: "",
        dosage: "",
        sheavesNum: "",
        thickness: "",
      },
        ob: {
        descaling: "",
      
      },
      // trList:[
      //  {
      //  materialsName:"",
      //  coat:"",
      //  coatingThickness:"",
      //  dosage:"",
      //  sheavesNum:"",
      //  thickness:"",
      //  }
      // ],
      removeSealDescriptionIdArray: [], //要删除的table每一行 的SealDescriptionId数组
      personnel: false,
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
      paintMaterialIds:[],
      ruleForm: {
        // account: "",
        // name: "",
        //  password: "",
        //  sex: "",
        // // expirationDate: "",
        //  status: "",
        // remark: "",
        code: "",
        partId: "",
        name: "",
        formulaPaintMealList: [
          {
            paintMaterialId: "",
            coat: "",
            coatingThickness: "",
            dosage: "",
            sheavesNum: "",
            thickness: "",
          },
        ],
        formulaDescaMealList:[
          {
             descaling:"",
          }
        ],
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入套餐编码",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入套餐名称",
            trigger: "blur",
          },
        ],
        partId: [
          {
            required: true,
            message: "请输入部位名称",
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
        sealName: [
          { required: true, message: "请输入印鉴名称", trigger: "blur" },
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
    //删除当前表格
    DeleteCurrent(val){
      console.log(val)
       this.ruleForm.formulaPaintMealList.splice(val,1);
    },
    DeleteCurrents(val){
      console.log(val)
       this.ruleForm.formulaDescaMealList.splice(val,1);
    },
    //新增表格
    AddList() {
      let obja = Object.assign({}, this.objs);
      this.ruleForm.formulaPaintMealList.push(obja);
    },
    AddLists(){
       let obj = Object.assign({}, this.ob);
       this.ruleForm.formulaDescaMealList.push(obj);
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false);
      this.ruleForm.code = "";
      this.ruleForm.name = "";
      this.ruleForm.partId = "";
      // this.ruleForm.expirationDate = "";
      // this.ruleForm.price = "";
      // this.ruleForm.account = "";
      // this.ruleForm.name = "";
      // this.ruleForm.password = "";
      // this.ruleForm.sex = "";
      // this.ruleForm.status = "";
      // this.ruleForm.remark = "";
      this.clearValidate("ruleForm");
    },
    open() {
      //部位名称
      partListToSelect().then((res) => {
        console.log(res);
        this.materialsNames = res.data;
      });
      paintMaterialListToSelect().then(res=>{
        console.log(res)
        this.paintMaterialIds = res.data
    })
      //材料名称
      //   suppliesDrawDetailtoInsert().then(res=>{
      //     console.log(res)
      //     this.materialsNames = res.data
      //   })
      //   this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          formulaSetMealInsert(this.ruleForm).then((res) => {
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
#NewInventorysf {
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
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 30px;
}

#customers td,
#customers th {
  border: 1px solid #dcdcdc;
  text-align: center;
  padding: 8px;
  font-family: PingFang SC;
  font-weight: normal;
  font-stretch: normal;
  color: #666666;
}

#customers tr:nth-child(even) {
  background-color: #f6f6f6;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #ecf5ff;
  font-family: PingFang SC;
  font-weight: 600;
  font-stretch: normal;
  text-align: center;
  color: #333333;
}
#customersa {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 30px;
}

#customersa td,
#customersa th {
  border: 1px solid #dcdcdc;
  text-align: center;
  padding: 8px;
  font-family: PingFang SC;
  font-weight: normal;
  font-stretch: normal;
  color: #666666;
}

#customersa tr:nth-child(even) {
  background-color: #f6f6f6;
}

#customersa tr:hover {
  background-color: #ddd;
}

#customersa th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #ecf5ff;
  font-family: PingFang SC;
  font-weight: 600;
  font-stretch: normal;
  text-align: center;
  color: #333333;
}
</style>