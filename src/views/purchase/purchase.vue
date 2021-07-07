<template>
  <div id="PersonnelInformation">
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工单名称" prop="workOrderName">
        <el-input
          v-model="workOrderName"
          placeholder="请输入工单名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单名称" prop="orderName">
        <el-input v-model="orderName" placeholder="请输入订单名称"></el-input>
      </el-form-item>
      <el-form-item class="item">
        <el-button type="primary" @click="PersonnelInquiry">查询</el-button>
        <el-button type="primary" @click="addStaff">新增</el-button>
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
          <!-- <el-button type="text" size="small" @click="DeletePeople(data.data)"
            >删除</el-button
          > -->
          <el-button
            type="text"
            size="small"
            @click="EditorialStaffnm(data.data)"
            >编辑</el-button
          >
        </template>
      </tables>
    </div>
    <newstaffad
      :dialogVisible.sync="dialogVisible"
      @CloseTheComponent="CloseTheComponent"
      @toUpdate="toUpdate"
    ></newstaffad>
    <EditorialStaffad
      :ids="ids"
      :EditComponentSwitch.sync="EditComponentSwitch"
      @EditReceive="EditReceive"
      @toUpdate="toUpdate"
    ></EditorialStaffad>
  </div>
</template>
  
  <script>
import { orderlists, orderDelete } from "@/api/index";
import tables from "@/components/table";
import { formatDay } from "@/utils/date";
import newstaffad from "./NewStaffad/index";
import EditorialStaffad from "./EditorialStaffad/index";
import { timestampToTime } from "@/utils/timeStamp";
export default {
  components: {
    tables,
    newstaffad,
    EditorialStaffad,
  },
  data() {
    return {
      orderName: "",
      workOrderName: "",
      statuss: [
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
      ids: "",
      dataHeader: [
        { min: "orderCode", acd: "订单编码" },
        { min: "orderName", acd: "订单名称" },
        { min: "category", acd: "类别" },
        { min: "orderTime", acd: "下单日期" },
        { min: "time", acd: "预计送达日期" },
        { min: "money", acd: "支付金额" },
        { min: "principalName", acd: "负责人名称" },
        { min: "workOrderName", acd: "工单名称" },
        { min: "status", acd: "状态" },
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
          workOrderName: this.workOrderName,
          orderName: this.orderName,
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          orderDelete({ id: val.id }).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.toUpdate();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "warning",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //接收條數
    NumberOfArticles(val) {
      console.log(val);
      this.pageSize = val;
      let obj = {
        pageForm: {
          workOrderName: this.workOrderName,
          orderName: this.orderName,
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
          workOrderName: this.workOrderName,
          orderName: this.orderName,
        },
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      orderlists(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          item.time = timestampToTime(item.time);
          item.orderTime = timestampToTime(item.orderTime);
          item.category = item.category == "1" ? "自主采购" : "工单生成";
          item.status =
            item.status == "1"
              ? "已审核"
              : item.status == "2"
              ? "作废"
              : item.status == "3"
              ? "已完结"
              : "未审核";
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
          workOrderName: this.workOrderName,
          orderName: this.orderName,
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
        workOrderName: this.workOrderName,
        orderName: this.orderName,
      },
      dataForm: {
        pageNum: this.CurrentPage,
        pageSize: this.pageSize,
      },
    };
    this.inventorylist(obj);
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



