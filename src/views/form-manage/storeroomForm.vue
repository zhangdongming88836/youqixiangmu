<template>
  <div>
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <!-- <div class="block">
        <span class="demonstration">时间</span>
        <el-date-picker
          v-model="form.dataForm.reserveTime"
          type="date"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </div> -->
      <el-form-item label="负责人" prop="principal">
        <el-input
          v-model="form.dataForm.principal"
          placeholder="负责人"
        ></el-input>
      </el-form-item>
      <el-form-item class="item">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addDialogShow = true">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表单数据 -->
    <el-table :data="tableData" border style="width: 100%" header-align=:center>
      <el-table-column fixed prop="principal" label="负责人" align="center">
      </el-table-column>
      <el-table-column
        prop="facility"
        label="设施"
        type="date"
        align="center"
      >
        <!-- <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.reserveTime | formatData
          }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="location" label="位置" align="center">
      </el-table-column>
      <el-table-column prop="manHour" label="工时" align="center"> </el-table-column>
      <el-table-column prop="number" label="人数" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>
      <!-- <el-table-column prop="status" label="状态" width="130">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toUpdateRow(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            @click="toDeleteClass(scope.row.id)"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="text-align:right">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
   </div>
    <add-plan
      v-if="addDialogShow"
      @close="addDialogShow = false"
      @submitPlan="submitPlan"
    ></add-plan>

    <edit-Plan
      v-if="updateDialogShow"
      :updateData="updateData"
      @close="updateDialogShow = false"
      @submitUpdate="submitUpdate"
    >
    </edit-Plan>
  </div>
</template>

<script>
import {
  record,
  recordInsert,
  recordDelete,
  recordUpdate,
} from "../../api/form-manage";
import addPlan from "./stoChildren/addPlan";
import editPlan from "./stoChildren/editPlan";
import { formatDay } from "@/utils/date";
export default {
  components: {
    addPlan,
    editPlan,
  },
  data() {
    return {
      updateDialogShow: false,
      addDialogShow: false,
      pageSize: 20,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [],
      updateData: {},
      currentPage: 1,
      pageSize: 5,
      total: 0,
      list: [],
      form: {
        pageForm: {
          pageSize: 5,
          pageNum: 1,
        },
        dataForm: {
          facility: "",
          location: "",
          number: "",
          manHour: "",
          principal: "",
          remark: ""
        },
      },
      pickerOptions: {},
    };
  },
  filters: {
    formatData(value) {
      return formatDay(value);
    },
  },
  created() {
    this.getPlanlist(this.form);
  },
  methods: {
    //查询以及分页
    onSubmit() {
      this.form.pageForm.pageSize = "5";
      this.form.pageForm.pageNum = "1";
      this.getPlanlist(this.form);
    },

    //分页功能
    handleSizeChange: function(size) {
      this.form.pageForm.pageSize = size;
      this.getPlanlist(this.form);
    },
    handleCurrentChange: function(currentPage) {
      this.form.pageForm.pageNum = currentPage;
      this.getPlanlist(this.form);
    },

    //编辑功能
    toUpdateRow(data) {
      this.updateData = data;
      this.updateDialogShow = true;
    },

    submitUpdate(data) {
      this.updateDialogShow = false;
      recordUpdate(data)
        .then((res) => {
          if (res.code === 200) {
            this.getPlanlist(this.form);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取列表数据
    getPlanlist(data) {
      record(data).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },

    //触发事件添加新维修计划
    submitPlan(data) {
      this.addDialogShow = false;
      recordInsert(data)
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.getPlanlist(this.form);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //根据id删除维修计划
    toDeleteClass(id) {
      // 删除区域
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          recordDelete({ id: id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // this.getList()
              this.getPlanlist(this.form);
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
  },
};
</script>

<style scoped>
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
</style>
