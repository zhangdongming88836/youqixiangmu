<template>
    <div id="PersonnelInformation">
      <!-- 查询 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button  type="primary" @click="PersonnelInquiry">查询</el-button>
          <el-button v-if="NewDisplayOfemployeeinformation" type="primary" @click="addStaff">新增</el-button>
        </el-form-item>
      </el-form>
       <div class="borfer">
           <tables :dataHeader="dataHeader" :tableData="tableData" :CurrentPage='CurrentPage' :total="total" :pageSize='pageSize' @NumberOfArticles="NumberOfArticles" @numberOfPages="numberOfPages"> 
               <template v-slot:status="data">
                <el-button v-if="EmployeeEditPermission" type="text" size="small" @click="EditorialStaffnm(data.data)">编辑</el-button>
                <el-button v-if="EmployeeStatusPermission" type="text" size="small" @click="DeletePeople(data.data)">{{data.data.status == '停用'?'可用':'停用'}}</el-button>
               </template>
           </tables>
       </div>
     <newstaff :dialogVisible.sync="dialogVisible" @CloseTheComponent="CloseTheComponent" @toUpdate="toUpdate"></newstaff>
     <EditorialStaff :ids='ids' :EditComponentSwitch.sync="EditComponentSwitch" @EditReceive="EditReceive" @toUpdate="toUpdate"></EditorialStaff>
    </div>
  </template>
  
  <script>
  import {
    employeelist,
    employeeDelete
  } from "@/api/index";
  import tables from "@/components/table"
  import { formatDay } from "@/utils/date";
  import newstaff from "./NewStaff/index"
  import EditorialStaff from "./EditorialStaff/index"
  export default {
    components: {
     tables,
     newstaff,
     EditorialStaff
    },
    data() {
        return{
            //按钮新增的显示或隐藏
            NewDisplayOfemployeeinformation:false,
            //按钮编辑的显示隐藏
            EmployeeEditPermission:false,
            //按钮状态权限
            EmployeeStatusPermission:false,
            name:"",
            ids:"",
            dataHeader:[
                {min:"name",acd:"名字"},
                {min:"email",acd:"邮箱"},
                {min:"phone",acd:"号码"},
                {min:"sex",acd:"性别"},
                {min:"positionName",acd:"职位"},
                {min:"organizationName",acd:"组织机构"},
                {min:"status",acd:"状态"},
                {min:"datae",acd:"操作",cfumn:"slot",slotName:"status"},
            ],
            tableData:[
                {
                    data:"nihao",
                    datas:"ddak",
                    datav:"dsada",
                    
                },
            ],
            CurrentPage:1,
            total:10,
            pageSize:10,
            //添加的组件开关
            dialogVisible:false,
            //编辑组件开关
            EditComponentSwitch:false
        }
    },
    methods: {
      //查询
      PersonnelInquiry(){
         let obj ={
              pageForm: {name:this.name},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:this.pageSize
           }
         }
        this.PublicQuery(obj)
      },
      //点击新增按钮
      addStaff(){
        this.dialogVisible = true;
      },
      //点击编辑按钮
      EditorialStaffnm(val){
        this.ids = val.id
        this.EditComponentSwitch = true;
      },
      //接收新增组件开关
      CloseTheComponent(val){
        this.dialogVisible = val;
      },
      //接收编辑组件开关
      EditReceive(val){
        this.EditComponentSwitch = val;
      },
      //删除人员
      DeletePeople(val){
          this.$confirm(`是否要修改当前状态`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      employeeDelete(val).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.toUpdate();
           this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }else{
          this.$message({
            type: 'warning',
            message: '修改失败!'
          }); 
        }
      }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });   
      },
        //接收條數
        NumberOfArticles(val){
         console.log(val)
         this.pageSize = val
         let obj ={
              pageForm: {name:this.name},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:val
           }
         }
         this.PublicQuery(obj)
        },
        //接收頁碼
        numberOfPages(val){
            console.log(val)
            this.CurrentPage = val
            let obj ={
              pageForm: {name:this.name},
              dataForm: {
            pageNum:val,
            pageSize:this.pageSize
           }
         }
            this.PublicQuery(obj)
        },
        PublicQuery(val){
      
        employeelist(val).then(res=>{
            // console.log(res)
            this.total = res.data.total;
            let arr=[]
            arr = res.data.list.map(item=>{
              item.sex = item.sex == 1 ? '女' :'男'
               item.status = item.status == "1" ? "停用":'可用'
              return  item
            })
           // console.log(arr)
            this.tableData = arr
            if(res.code == 200){
              this.name = "";
            }
        })
        }, 
        //子组件用新增编辑更新
        toUpdate(){
           let obj ={
              pageForm: {name:this.name},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:this.pageSize
           }
         }
        this.PublicQuery(obj)
        } 
    },
    created() {
      let obj ={
              pageForm: {name:this.name},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:this.pageSize
           }
         }
        this.PublicQuery(obj)
        console.log(this.$store.state.user.buttonPermission)
        this.$store.state.user.buttonPermission.forEach(item=>{
          item.authorityCode == 'em-002'? this.NewDisplayOfemployeeinformation = true : false
          item.authorityCode == 'em-003'? this.EmployeeEditPermission = true : false
          item.authorityCode == 'em-004'? this.EmployeeStatusPermission = true : false
        })
    },
  };
  </script>
  <style lang="scss" >
    #PersonnelInformation{
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
  .borfer{
    text-align: right;
  }
 .el-form--inline .el-form-item{
   margin-left:10px;
 }
 }
  </style>
  