<template>
  <div>
    <el-dialog
      title="编辑"
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
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="维修计划名称" prop="planName">
            <el-input
              v-model="ruleForm.planName"
              placeholder="请输入维修计划名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="计划维修日期" prop="reserveTime">
            <div class="block">
              <el-date-picker
                v-model="ruleForm.reserveTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="计划间隔天数" prop="intervals">
            <el-input
              v-model="ruleForm.intervals"
              placeholder="请输入计划间隔天数"
            ></el-input>
          </el-form-item>
             <el-form-item label="平台信息" prop="organizationId">
            <el-select v-model="ruleForm.organizationId" placeholder="请选择平台信息">
              <el-option
                v-for="item in organizationIds"
                :key="item.id"
                :label="item.organizationName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部位名称" prop="partId">
            <el-select v-model="ruleForm.partId" placeholder="请选择材料名称">
              <el-option
                v-for="item in partIds"
                :key="item.id"
                :label="item.partName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="区域" prop="district">
            <el-input
              v-model="ruleForm.district"
              placeholder="请输入区域"
            ></el-input>
          </el-form-item>
           <el-form-item label="面积" prop="area">
            <el-input
              v-model="ruleForm.area"
              placeholder="请输入面积"
            ></el-input>
          </el-form-item>
          <el-form-item label="油漆套餐" prop="formulaSetMealId">
            <el-select v-model="ruleForm.formulaSetMealId" placeholder="请选择" @change="PaintPackagechanges">
              <el-option
                v-for="item in formulaSetMealIds"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
           <div>
          <label style="margin-left: 6px">维修计划配方</label>
          <template>
            <div style="margin-left: 99px">
              <table id="customers">
                <tr>
                  <th>序号</th>
                  <!-- <th>操作</th> -->
                  <th>涂漆名称</th>
                  <th>涂层</th>
                  <th>涂层厚度</th>
                  <th>用量</th>
                  <th>最少轮数</th>
                  <th>干膜厚度</th>
                </tr>
                <template  v-for="(item, index) in ruleForm.maintenancePlanningPaintMealList">
                <tr
                  v-if="item.status == 0"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <!-- <td>
                    <el-button type="text" size="mini" @click="DeleteCurrent(index)">删除</el-button>
                  </td> -->
                  <td>
                   <template>
                     <el-input v-model="item.materialsName" disabled></el-input>
                   </template>
                  </td>
                  <td>
                       <template>
                     <el-input v-model="item.coat" disabled></el-input>
                   </template>
                  </td>
                  <td>
                    <template>
                     <el-input v-model="item.coatingThickness" disabled></el-input>
                   </template>
                  </td>
                  <td>
                     <template>
                     <el-input v-model="item.dosage" ></el-input>
                   </template>
                  </td>
                  <td>
                    <template>
                     <el-input v-model="item.sheavesNum" disabled></el-input>
                   </template>
                  </td>
                  <td>
                    <template>
                     <el-input v-model="item.thickness" disabled></el-input>
                   </template>
                  </td>
                </tr>
                </template>
              </table>
              <!-- <div style="text-align: right">
                <el-button type="primary" @click="AddList">新增</el-button>
              </div> -->
            </div>
          </template>
        </div>
        <!--套餐除锈 -->
        <div>
          <label style="margin-left: 6px">维修计划除锈</label>
          <template>
            <div style="margin-left: 99px">
              <table id="customersa">
                <tr>
                  <th>序号</th>
                  <!-- <th>操作</th> -->
                  <th>除锈方式</th>
                </tr>
                <template  v-for="(item, index) in ruleForm.maintenancePlanningDescaMealList">
                <tr
                 v-if="item.status == 0"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <!-- <td>
                    <el-button
                      type="text"
                      size="mini"
                      @click="DeleteCurrents(index)"
                      >删除</el-button
                    >
                  </td> -->
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
                    <template>
                     <el-input v-model="item.descaling" disabled></el-input>
                   </template>
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
                 </template>
              </table>
              <!-- <div style="text-align: right">
                <el-button type="primary" @click="AddLists">新增</el-button>
              </div> -->
            </div>
          </template>
        </div>
             <el-form-item label="人数" prop="number">
            <el-input
              v-model="ruleForm.number"
              placeholder="请输入人数"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="principal">
            <el-select v-model="ruleForm.principal" placeholder="请选择">
              <el-option
                v-for="item in principals"
                :key="item.ids"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
            <el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>
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
import {  maintenancePlanningToUpdate,maintenancePlanningUpdate, partListToSelect,formulaSetMealListToSelect,employeeInsertTwo,formulaSetMealToUpdate,sysOrganizationListFour } from "@/api/index";
import tables from "@/components/table";
export default {
  props: ["EditComponentSwitch", "ids"],
   components: {
    tables,
  },
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
       //查询后显示
      tatoltr:false,
      dataHeader: [
        // { min: "account", acd: "账号" },
        { min: "name", acd: "姓名" },
        // { min: "sex", acd: "性别" },
        { min: "positionName", acd: "职位名称" },
        { min: "organizationName", acd: "部门名称" },
        // { min: "status", acd: "状态" },
        // { min: "loginDeadline", acd: "最后登录时间" },
        // { min: "remark", acd: "备注" },
         { min: "datae", acd: "操作", cfumn: "slot", slotName: "status" },
      ],
      tableData: [
        {
          data: "nihao",
          datas: "ddak",
          datav: "dsada",
        },
      ],
      CurrentPage: 1,
      total: 10,
      pageSize: 10,
      //内层
      innerVisible: false,
      personnel: false,
       name: "",
      //油漆套餐下拉数组
      formulaSetMealIds: [
        {
          value: "1",
          label: "女",
        },
        {
          value: "0",
          label: "男",
        },
      ],
        // 平台下拉
      organizationIds: [
        {
          value: "0",
          label: "未启用",
        },
        {
          value: "1",
          label: "启用",
        },
      ],
      //部位下拉
      partIds: [
        {
          value: "0",
          label: "未启用",
        },
        {
          value: "1",
          label: "启用",
        },
      ],
       // 负责人下拉
      principals: [
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
        planName: "",
        reserveTime: "",
        intervals: "",
        organizationId: "",
        partId: "",
        district: "",
        area: "",
        formulaSetMealId: "",
        number:"",
        principal:"",
        remark: "",
        maintenancePlanningPaintMealList:[],
        maintenancePlanningDescaMealList:[],
        id:"",
      },
     rules: {
        planName: [
          {
            required: true,
            message: "请输入维修计划名称",
            trigger: "blur",
          },
        ],
        reserveTime: [
          {
            required: true,
            message: "请输入计划维修日期",
            trigger: "change",
          },
        ],
        intervals: [
          {
            required: true,
            message: "请输入计划间隔天数",
            trigger: "blur",
          },
        ],
          organizationId: [
          {
            required: true,
            message: "请选择平台",
            trigger: "change",
          },
        ],
        partId: [
          {
            required: true,
            message: "请输入部位名称",
            trigger: "change",
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
        formulaSetMealId: [
          {
            required: true,
            message: "请选择油漆套餐",
            trigger: "change",
          },
        ],
        number: [
          {
            required: true,
            message: "请输入人数",
            trigger: "blur",
          },
        ],
        principal: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
     //油漆套餐下拉改变
    PaintPackagechanges(val){
       // console.log(val)
       formulaSetMealToUpdate(val).then(res=>{
          console.log(res)
         res.data.maintenancePlanningPaintMealList.forEach(item =>{
           var obj = {};
            obj.materialsName = item.materialsName
            obj.coat = item.coat
            obj.coatingThickness = item.coatingThickness
            obj.dosage = item.dosage
            obj.sheavesNum = item.sheavesNum
            obj.thickness = item.thickness
            obj.status = item.status
            obj.id = item.id
            this.ruleForm.maintenancePlanningPaintMealList.push(obj)
         }) 
         //console.log(this.ruleForm.formulaPaintMealList);
         res.data.maintenancePlanningDescaMealList.forEach(item=>{
           var obj = {};
           obj.descaling = item.descaling;
           obj.status = item.status;
           obj.id = item.id;
           this.ruleForm.maintenancePlanningDescaMealList.push(obj)
         })
         // console.log( this.ruleForm.formulaDescaMealList)
       })
    },
     //确定选中员工信息
    SelectEmployeeInformation(){
      this.innerVisible = false;
    },
    //获取当前员工信息
    GetCurrent(val){
      console.log(val)
      this.ruleForm.name = val.name;
      this.ruleForm.employeeId = val.id;
    },
    //接收條數
    NumberOfArticles(val) {
      console.log(val);
      this.pageSize = val;
      let obj = {
        pageForm: { name: this.name },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: val,
        },
      };
      this.inventorylist(obj);
    },
    //接收頁碼
    numberOfPages(val) {
      console.log(val);
      this.CurrentPage = val;
      let obj = {
        pageForm: { name: this.name },
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    //查询员工信息
    PersonnelInquiry() {
      let obj = {
        pageForm: { name: this.name },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      employeelist(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          // item.loginDeadline = timestampToTime(item.loginDeadline);
          item.sex = item.sex == "1" ? "女" : "男";
          item.status = item.status == "1" ? "启用" : "未启用";
          return item;
        });
        console.log(arr);
        this.tableData = arr;

        if (res.code == 200) {
          this.name = "";
          this.status = "";
          this.tatoltr = true;
        }
      });
    },
    //获取员工信息
    GetFocus() {
      this.innerVisible = true;
    },
    close() {
      this.$emit("EditReceive", false);
    },
    open() {
        partListToSelect().then(res=>{
        // console.log(res);
        this.partIds = res.data;
      })
      formulaSetMealListToSelect().then(res=>{
        console.log(res,'sdadasd')
        this.formulaSetMealIds = res.data;
      })
     sysOrganizationListFour({}).then(res=>{
        //console.log(res,'*********************')
        this.organizationIds = res.data;
      })
      employeeInsertTwo({}).then(res=>{
         this.principals = res.data;
      })
      //获取详情信息
     maintenancePlanningToUpdate(this.ruleForm.id).then(res=>{
        console.log(res,123456);
        this.ruleForm.planName = res.data.planName
        this.ruleForm.reserveTime = res.data.reserveTime
        this.ruleForm.intervals = res.data.intervals
        this.ruleForm.partId = res.data.partId
        this.ruleForm.district = res.data.district
        this.ruleForm.area = res.data.area
        this.ruleForm.formulaSetMealId = res.data.formulaSetMealId
        this.ruleForm.number = res.data.number
        this.ruleForm.principal = res.data.principal
        this.ruleForm.remark = res.data.remark
        this.ruleForm.maintenancePlanningDescaMealList = res.data.maintenancePlanningDescaMealList
        this.ruleForm.maintenancePlanningPaintMealList = res.data.maintenancePlanningPaintMealList
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var arr = []
          var arrws = []
          this.ruleForm.maintenancePlanningPaintMealList.forEach(item =>{
           var obj = {};
            obj.materialsName = item.materialsName
            obj.coat = item.coat
            obj.coatingThickness = item.coatingThickness
            obj.dosage = item.dosage
            obj.sheavesNum = item.sheavesNum
            obj.thickness = item.thickness
            obj.status = item.status
            obj.id = item.id
            arr.push(obj)
         }) 
           this.ruleForm.maintenancePlanningPaintMealList =arr
         console.log(this.ruleForm.maintenancePlanningPaintMealList,987);
        this.ruleForm.maintenancePlanningDescaMealList.forEach(item=>{
           var obj = {};
           obj.descaling = item.descaling;
           obj.status = item.status;
           obj.id = item.id;
           arrws.push(obj)
         })
         this.ruleForm.maintenancePlanningDescaMealList = arrws 
         console.log( this.ruleForm.maintenancePlanningDescaMealList,654)
          maintenancePlanningUpdate(this.ruleForm).then((res) => {
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
    #customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 30px;
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
}
</style>