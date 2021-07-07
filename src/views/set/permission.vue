<template>
  <div id="PersonnelInformation">
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="权限编码" prop="authorityCode">
        <el-input v-model="authorityCode" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="权限名称" prop="authorityName">
        <el-input v-model="authorityName" placeholder="请输入姓名"></el-input>
      </el-form-item>
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
        <el-button v-if="AuthorityManagementNewAuthority" type="primary" @click="addStaff">新增</el-button>
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
           v-if="PermissionManagementEditPermission"
            type="text"
            size="small"
            @click="EditorialStaffnm(data.data)"
            >编辑</el-button
          >
           <!-- <el-button type="text" size="small" @click="DeletePeople(data.data)"
            >{{data.data.status == '启用'?'未启用':'启用'}}</el-button
          > -->
        </template>
      </tables>
    </div>
    <newstaffahlkq
      :dialogVisible.sync="dialogVisible"
      @CloseTheComponent="CloseTheComponent"
      @toUpdate="toUpdate"
    ></newstaffahlkq>
    <EditorialStaffahlkq
      :ids="ids"
      :EditComponentSwitch.sync="EditComponentSwitch"
      @EditReceive="EditReceive"
      @toUpdate="toUpdate"
    ></EditorialStaffahlkq>
  </div>
</template>
  
  <script>
import { sysPositionDelete,sysAuthorityList } from "@/api/index";
import tables from "@/components/table";
import { formatDay } from "@/utils/date";
import newstaffahlkq from "./NewStaffahlkq/index";
import EditorialStaffahlkq from "./EditorialStaffahlkq/index";
import { timestampToTime } from "@/utils/timeStamp";
export default {
  components: {
    tables,
    newstaffahlkq,
    EditorialStaffahlkq,
  },
  data() {
    return {
      //按钮新增权限
      AuthorityManagementNewAuthority:false,
      //按钮编辑权限
      PermissionManagementEditPermission:false,
       authorityName: "",
       authorityCode: "",
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
        { min: "authorityCode", acd: "权限编码" },
        // { min: "name", acd: "姓名" },
        // { min: "sex", acd: "性别" },
        // { min: "loginDeadline", acd: "最后登录时间" },
        { min: "authorityName", acd: "权限名称" },
        { min: "webUrl", acd: "网页路径" },
        { min: "apiURL", acd: "接口路径" },
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
        pageForm: {  authorityCode: this.authorityCode,authorityName: this.authorityName },
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
      this.$confirm("是否要修改当前状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sysPositionDelete({ id: val.id }).then((res) => {
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
        pageForm: {   authorityCode: this.authorityCode,authorityName: this.authorityName },
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
        pageForm: {   authorityCode: this.authorityCode,authorityName: this.authorityName },
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      sysAuthorityList(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
          item.loginDeadline = timestampToTime(item.loginDeadline);
          item.sex = item.sex == "1" ? "女" : "男";
          item.status =
            item.status == "1"?'未启用':'启用'
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
        pageForm: {    authorityCode: this.authorityCode,authorityName: this.authorityName},
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
      pageForm: {   authorityCode: this.authorityCode,authorityName: this.authorityName },
      dataForm: {
        pageNum: this.CurrentPage,
        pageSize: this.pageSize,
      },
    };
    this.inventorylist(obj);
    this.$store.state.user.buttonPermission.forEach(item=>{
      item.authorityCode == 'au-002'? this.AuthorityManagementNewAuthority = true : false
      item.authorityCode == 'au-003'? this.PermissionManagementEditPermission = true : false
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