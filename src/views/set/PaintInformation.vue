<template>
  <div id="PersonnelInformation">
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="套餐名称" prop="name">
        <el-input v-model="name" placeholder="请输入材料名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="领取日期" prop="drawTime">
        <el-date-picker
          v-model="drawTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="状态" prop="status">
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statuss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="item">
        <el-button type="primary" @click="PersonnelInquiry">查询</el-button>
        <el-button v-if="NewOermissionsForPaintPackage" type="primary" @click="addStaff">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="borfer">
      <tables
        :dataHeader="dataHeader"
        :tableData="tableData"
        :CurrentPage="CurrentPage"
        :total="total"
        :pageSize="pageSize"
        @NumberOfArticles="NumberOfArticles"
        @numberOfPages="numberOfPages"
      >
      
        <template v-slot:status="data">
          <el-button
           v-if="PaintPackagedetailspermissions"
            type="text"
            size="small"
            @click="DetailsOpen(data.data)"
            >详情</el-button
          >
          <!-- <el-button
            type="text"
            size="small"
            @click="EditorialStaffnm(data.data)"
            >编辑</el-button
          > -->
           <el-button v-if="StatusPermission" type="text" size="small" @click="DeletePeople(data.data)"
            >{{data.data.statusName == '停用'?'可用':'停用'}}</el-button>
        </template>
      </tables>
    </div>
    <newstaffqw
      :dialogVisible.sync="dialogVisible"
      @CloseTheComponent="CloseTheComponent"
      @toUpdate="toUpdate"
    ></newstaffqw>
    <EditorialStaffqw
      :ids="ids"
      :EditComponentSwitch.sync="EditComponentSwitch"
      @EditReceive="EditReceive"
      @toUpdate="toUpdate"
    ></EditorialStaffqw>
    <PackageDetails :DetailSwitch.sync="DetailSwitch" @AcceptanceDetails="AcceptanceDetails"   :ids="ids"></PackageDetails>
  </div>
</template>
  
  <script>
import { formulaSetMealList,paintMaterialUpdateStateById,formulaSetMealToUpdate} from "@/api/index";
import tables from "@/components/table";
import { formatDay } from "@/utils/date";
import newstaffqw from "./NewStaffqw/index";
import EditorialStaffqw from "./EditorialStaffqw/index";
import { timestampToTime } from "@/utils/timeStamp";
import PackageDetails from "./PackageDetails/index"
export default {
  components: {
    tables,
    newstaffqw,
    EditorialStaffqw,
    PackageDetails,
  },
  data() {
    return {
      //新增按钮权限
      NewOermissionsForPaintPackage:false,
      //详情按钮权限
      PaintPackagedetailspermissions:false,
      //状态按钮权限
      StatusPermission:false,
      name: "",
      // drawTime:"",
      //   status:'',
      //   statuss:[
      //     {
      //       value:'0',
      //       label:"未审核"
      //     },
      //     {
      //       value:'1',
      //       label:"已审核"
      //     },
      //     {
      //       value:'2',
      //       label:"作废"
      //     },
      //     {
      //       value:'3',
      //       label:"已完结"
      //     },
      //   ],
      ids: "",
      dataHeader: [
        { min: "code", acd: "套餐编号" },
        { min: "name", acd: "套餐名称" },
        { min: "partName", acd: "部位名称" },
        { min: "statusName", acd: "状态" },
        // { min: "num", acd: "数量" },
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
      //添加的组件开关
      dialogVisible: false,
      //编辑组件开关
      EditComponentSwitch: false,
      //详情组件的开关
      DetailSwitch:false,
    };
  },
  methods: {
    //获取详情
     EditorialStaffnmd(val){
     console.log(val)
     },
    //查询
    PersonnelInquiry() {
      let obj = {
        pageForm: { name: this.name  },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    //点击新增按钮
    addStaff() {
      this.dialogVisible = true;
    },
    //点击编辑按钮
    EditorialStaffnm(val) {
      this.ids = val.id;
      this.EditComponentSwitch = true;
    },
    //点击详情按钮
    DetailsOpen(val){
      this.ids = val.id;
      this.DetailSwitch = true;
    },
    //接收新增组件开关
    CloseTheComponent(val) {
      this.dialogVisible = val;
    },
    //接收编辑组件开关
    EditReceive(val) {
      this.EditComponentSwitch = val;
    },
    //接受详情组件数据
    AcceptanceDetails(val){
     this.DetailSwitch = val
    },
    //删除人员
    DeletePeople(val) {
      this.$confirm("是否要改变当前状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          paintMaterialUpdateStateById({ id: val.id }).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.toUpdate();
              this.$message({
                type: "success",
                message: "改变成功!",
              });
            } else {
              this.$message({
                type: "warning",
                message: "改变失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消改变",
          });
        });
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
    inventorylist(val) {
      formulaSetMealList(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          // item.expirationDate = timestampToTime(item.expirationDate);
          item.sex = item.sex == "1" ? "女" : "男";
          item.status = item.status == "1" ? "启用" : "未启用";
          return item;
        });
        console.log(arr);
        this.tableData = arr;

        if (res.code == 200) {
          this.name = "";
          this.receiver = "";
        }
      });
    },
    //子组件用新增编辑更新
    toUpdate() {
      let obj = {
        pageForm: { name: this.name  },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
  },
  created() {
    let obj = {
      pageForm: { name: this.name },
      dataForm: {
        pageNum: this.CurrentPage,
        pageSize: this.pageSize,
      },
    };
    this.inventorylist(obj);
     this.$store.state.user.buttonPermission.forEach(item=>{
       item.authorityCode == 'fo-002'? this.NewOermissionsForPaintPackage = true : false
       item.authorityCode == 'fo-003'? this.PaintPackagedetailspermissions = true : false
       item.authorityCode == 'fo-004'? this.StatusPermission = true : false
     })
  },
};
</script>
  <style lang="scss" >
#PersonnelInformation {
  .demo-form-inline {
    display: flex;
    flex-direction: row;
  }
  .item {
    padding-left: 10px;
  }
  .demonstration {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 12px;
  }
  .borfer {
    text-align: right;
  }
  .el-form--inline .el-form-item {
    margin-left: 10px;
  }
}
</style>