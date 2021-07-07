<template>
  <div id="PersonnelInformationfgh">
    <div class="TissueTree">
      <div>
        <el-tree :data="datatree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
   <div style="width:100%;height:100vh; border-left:1px solid #999999;">
    <!-- 查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="组织机构名称" prop="organizationName">
        <el-input v-model="organizationName" placeholder="请输入组织机构名称"></el-input>
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
        <el-button v-if="NewAuthorityOfOrganization" type="primary" @click="addStaff">新增</el-button>
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
            v-if="OrganizationEditingAuthorit"
            type="text"
            size="small"
            @click="EditorialStaffnm(data.data)"
            >编辑</el-button
          >
            <el-button v-if="OrganizationStatusAuthority" type="text" size="small" @click="DeletePeople(data.data)"
            >{{data.data.status == '停用'?'可用':'停用'}}</el-button>
        </template>
      </tables>
    </div>
    <newstaffagqw
      :dialogVisible.sync="dialogVisible"
      @CloseTheComponent="CloseTheComponent"
      @toUpdate="toUpdate"
      @Publitree="Publitree"
    ></newstaffagqw>
    <EditorialStaffagqw
      :ids="ids"
      :EditComponentSwitch.sync="EditComponentSwitch"
      @EditReceive="EditReceive"
      @toUpdate="toUpdate"
    ></EditorialStaffagqw>
  </div>
  </div> 
</template>
  
  <script>
import { sysOrganizationDelete, sysOrganizationList ,sysOrganizationListTwo} from "@/api/index";
import tables from "@/components/table";
import { formatDay } from "@/utils/date";
import newstaffagqw from "./NewStaffagqw/index";
import EditorialStaffagqw from "./EditorialStaffagqw/index";
import { timestampToTime } from "@/utils/timeStamp";
import {Landline} from "@/utils/verification"
export default {
  components: {
    tables,
    newstaffagqw,
    EditorialStaffagqw,
  },
  data() {
    return {
      //按钮新增权限
      NewAuthorityOfOrganization:false,
      //编辑按钮权限
      OrganizationEditingAuthorit:false,
      //状态按钮权限
      OrganizationStatusAuthority:false,
      organizationName: "",
      //树
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
        { min: "organizationName", acd: "组织机构名称" },
        { min: "address", acd: "单位地址" },
        { min: "officePhone", acd: "办公电话" },
        { min: "remark", acd: "备注" },
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
    //树
     handleNodeClick(data) {
        console.log(data);
          let obj = {
      pageForm: { organizationName: data.organizationName },
      dataForm: {
        pageNum: this.CurrentPage,
        pageSize: this.pageSize,
      },
    };
    this.inventorylist(obj);
      },
    //查询
    PersonnelInquiry() {
      let obj = {
        pageForm: { organizationName: this.organizationName },
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
    //修改状态
    DeletePeople(val) {
      let ids = val.id;
      this.$confirm(`是否要修改当前状态`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sysOrganizationDelete({id:ids}).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.toUpdate();
              this.$message({
                type: "success",
                message: `修改成功`,
              });
            } else {
              this.$message({
                type: "warning",
                message: `修改失败`,
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
        pageForm: { organizationName: this.organizationName},
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
        pageForm: {organizationName: this.organizationName},
        dataForm: {
          pageNum: val,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
    inventorylist(val) {
      sysOrganizationList(val).then((res) => {
        // console.log(res)
        this.total = res.data.total;
        let arr = [];
        arr = res.data.list.map((item) => {
        //   item.time = timestampToTime(item.time);
        //   item.category = item.category == "1" ? "自主采购" : "工单生成";
          item.status =
            item.status == "1" ? "停用":'可用'
             
          return item;
        });
        console.log(arr);
        this.tableData = arr;

        if (res.code == 200) {
          this.organizationName = "";
          this.status = "";
        }
      });
    },
    //子组件用新增编辑更新
    toUpdate() {
      let obj = {
        pageForm: { organizationName: this.organizationName },
        dataForm: {
          pageNum: this.CurrentPage,
          pageSize: this.pageSize,
        },
      };
      this.inventorylist(obj);
    },
      //公共组织树
  Publitree(){
    sysOrganizationListTwo({}).then(res=>{
      console.log(res,"dadada")
      this.datatree = res.data
    })
  },
  },
  created() {
    let obj = {
      pageForm: { organizationName: this.organizationName },
      dataForm: {
        pageNum: this.CurrentPage,
        pageSize: this.pageSize,
      },
    };
    this.inventorylist(obj);
    this.Publitree();
    this.$store.state.user.buttonPermission.forEach(item=>{
      item.authorityCode == 'or-002'? this.NewAuthorityOfOrganization = true : false
      item.authorityCode == 'or-003'? this.OrganizationEditingAuthorit = true : false
      item.authorityCode == 'or-004'? this.OrganizationStatusAuthority = true : false
    })
  },
};
</script>
  <style lang="scss" >
#PersonnelInformationfgh {
  display:flex;
  flex-direction: row;
  justify-content:flex-start;
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
  .TissueTree{
    width:300px;
    height:100%;
    padding:10px;
  }
}
</style>
