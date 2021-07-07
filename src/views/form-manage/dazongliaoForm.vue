<template>
  <div id="PersonnelInformation">
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline" label-width="100px">
      <el-form-item label="维修工单名称" prop="name">
        <el-input v-model="name" placeholder="请输入维修工单名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="部位名称" prop="partName">
        <el-input v-model="partName" placeholder="请输入部位名称"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="维修计划名称" prop="planName">
        <el-select v-model="principal" placeholder="请选择">
          <el-option
            v-for="item in principals"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="油漆套餐名称" prop="formulaSetMealId">
        <el-select v-model="formulaSetMealId" placeholder="请选择">
          <el-option
            v-for="item in formulaSetMealIds"
            :key="item.id"
            :label="item.materialsName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item class="item">
        <el-button type="primary" @click="PersonnelInquiry">查询</el-button>
        <el-button type="primary" @click="addStaff">新增</el-button>
      </el-form-item> -->
      <el-form-item class="item">
        <el-button type="primary" @click="PersonnelInquiry">查询</el-button>
        <el-button type="primary" @click="addStaff">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- <div style="text-align:right;margin-right:10px;padding-bottom:10px;" >
       <el-button type="primary" @click="PersonnelInquiry">查询</el-button>
      <el-button type="primary" @click="addStaff">新增</el-button>
    </div> -->
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
            v-if="data.data.status == 0"
            type="text"
            size="small"
            @click="EditorialStaffnm(data.data)"
            >编辑</el-button
          >
          <!-- <el-button v-if="data.data.status == 0" type="text" size="small" @click="DeletePeople({data:data.data,status:'-1'})"
            >停用</el-button
          > -->
          <!-- <el-button v-if="data.data.status == 0" type="text" size="small" @click="DeletePeople({data:data.data,status:'1'})"
            >启用</el-button
          > -->
        </template>
      </tables>
    </div>
    <NewmaintenancePlanss
      :dialogVisible.sync="dialogVisible"
      @CloseTheComponent="CloseTheComponent"
      @toUpdate="toUpdate"
    ></NewmaintenancePlanss>
    <EditmaintenancePlanss
      :ids="ids"
      :EditComponentSwitch.sync="EditComponentSwitch"
      @EditReceive="EditReceive"
      @toUpdate="toUpdate"
    ></EditmaintenancePlanss>
  </div>
</template>
  
  <script>
import { workOrderList, workOrderUpdateState } from "@/api/index";
import tables from "@/components/table";
import { formatDay } from "@/utils/date";
import NewmaintenancePlanss from "@/views/set/NewmaintenancePlanss/index";
import EditmaintenancePlanss from "@/views/set/EditmaintenancePlanss/index";
import { timestampToTime } from "@/utils/timeStamp";
export default {
  components: {
    tables,
    NewmaintenancePlanss,
    EditmaintenancePlanss,
  },
  data() {
    return {
      name: "",
      partName: "",
      principal: "",
      formulaSetMealId: "",
      //   status:'',
      formulaSetMealIds: [
        {
          value: "0",
          label: "未审核",
        },
        {
          value: "1",
          label: "已审核",
        },
        {
          value: "2",
          label: "作废",
        },
        {
          value: "3",
          label: "已完结",
        },
      ],
      principals: [],
      ids: "",
      dataHeader: [
        { min: "district", acd: "区域" },
        { min: "area", acd: "面积" },
        { min: "paintMealName", acd: "油漆套餐" },
        { min: "organizationName", acd: "平台信息" },
        { min: "name", acd: "维修工单名称" },
        { min: "number", acd: "人数" },
        { min: "partName", acd: "部位名称" },
        { min: "planName", acd: "维修名称" },
        { min: "principalName", acd: "负责人名称" },
        { min: "statusName", acd: "状态" },
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
    };
  },
  methods: {
    //查询
    PersonnelInquiry() {
      let obj = {
        pageForm: {
          name: this.name,
          partName: this.planName,
        },
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
    //接收新增组件开关
    CloseTheComponent(val) {
      this.dialogVisible = val;
    },
    //接收编辑组件开关
    EditReceive(val) {
      this.EditComponentSwitch = val;
    },
    //删除人员
    DeletePeople(val) {
      console.log(val);
      this.$confirm("是否要修改当前状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          workOrderUpdateState({
            id: val.data.id,
            status: `${val.status}`,
          }).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.toUpdate();
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            } else {
              this.$message({
                type: "warning",
                message: "修改失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    //接收條數
    NumberOfArticles(val) {
      console.log(val);
      this.pageSize = val;
      let obj = {
        pageForm: {
          name: this.name,
          partName: this.planName,
        },
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
        pageForm: {
           name: this.name,
          partName: this.planName,
        },
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      workOrderList(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          item.loginDeadline = timestampToTime(item.loginDeadline);
          item.sex = item.sex == "1" ? "女" : "男";
          //  item.status =
          //    item.status == "1"?'未启用':'启用'
          return item;
        });
        console.log(arr);
        this.tableData = arr;

        if (res.code == 200) {
          this.name = "";
          this.status = "";
        }
      });
    },
    //子组件用新增编辑更新
    toUpdate() {
      let obj = {
        pageForm: {
          name: this.name,
          partName: this.planName,
        },
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
      pageForm: {
       name: this.name,
       partName: this.planName,
      },
      dataForm: {
        pageNum: this.CurrentPage,
        pageSize: this.pageSize,
      },
    };
    this.inventorylist(obj);
    paintMaterialListToSelect().then((res) => {
      this.formulaSetMealIds = res.data;
    });
    employeeInsertTwo({}).then((res) => {
      this.principals = res.data;
    });
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
  .el-form--inline {
    padding-top: 10px;
  }
  .el-form--inline .el-form-item {
    margin-left: 10px;
  }
}
</style>
  

