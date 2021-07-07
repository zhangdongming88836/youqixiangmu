<template>
  <div id="PersonnelInformation">
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="材料名称" prop="materialsName">
        <el-input v-model="materialsName" placeholder="请输入材料名称"></el-input>
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
            >详情</el-button
          >
        </template>
      </tables>
    </div>
    <newstaffal
      :dialogVisible.sync="dialogVisible"
      @CloseTheComponent="CloseTheComponent"
      @toUpdate="toUpdate"
    ></newstaffal>
    <EditorialStaffal
      :ids="ids"
      :EditComponentSwitch.sync="EditComponentSwitch"
      @EditReceive="EditReceive"
      @toUpdate="toUpdate"
    ></EditorialStaffal>
  </div>
</template>
  
  <script>
import { inventoryDetaillists,inventoryDetailDelete} from "@/api/index";
import tables from "@/components/table";
import { formatDay } from "@/utils/date";
import newstaffal from "./NewStaffal/index";
import EditorialStaffal from "./EditorialStaffal/index";
import { timestampToTime } from "@/utils/timeStamp";
export default {
  components: {
    tables,
    newstaffal,
    EditorialStaffal,
  },
  data() {
    return {
      materialsName: "",
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
        { min: "warehouseName", acd: "仓库名称" },
        { min: "materialsName", acd: "材料名称" },
        { min: "materialsCode", acd: "材料编号" },
        { min: "cation", acd: "材料规格" },
         { min: "num", acd: "入库数量" },
         { min: "validityTime", acd: "有效截止日期" },
        { min: "changeTime", acd: "出入库日期" },
        { min: "detailName", acd: "详情名称" },
         { min: "statusName", acd: "状态名称" },
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
        pageForm: { materialsName: this.materialsName  },
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
          inventoryDetailDelete({ id: val.id }).then((res) => {
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
        pageForm: { materialsName: this.materialsName },
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
        pageForm: { materialsName: this.materialsName },
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      inventoryDetaillists(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          item.validityTime = timestampToTime(item.validityTime);
          item.changeTime = timestampToTime(item.changeTime);
          // item.sex = item.sex == "1" ? "女" : "男";
          // item.status = item.status == "1" ? "启用" : "未启用";
          return item;
        });
        console.log(arr);
        this.tableData = arr;

        if (res.code == 200) {
          this.materialsName = "";
          this.receiver = "";
        }
      });
    },
    //子组件用新增编辑更新
    toUpdate() {
      let obj = {
        pageForm: { materialsName: this.materialsName  },
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
      pageForm: { materialsName: this.materialsName },
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
