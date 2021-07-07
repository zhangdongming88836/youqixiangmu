<template>
    <div id="PersonnelInformation">
      <!-- 查询 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="材料" prop="name">
          <el-input
            v-model="materialsName"
            placeholder="请输入材料名称"
          ></el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" @click="PersonnelInquiry">查询</el-button>
          <!-- <el-button type="primary" @click="addStaff">新增</el-button> -->
        </el-form-item>
      </el-form>
       <div class="borfer">
           <tables :dataHeader="dataHeader" :tableData="tableData" :CurrentPage='CurrentPage' :total="total" :pageSize='pageSize' @NumberOfArticles="NumberOfArticles" @numberOfPages="numberOfPages"> 
               <template v-slot:status="data">
                <el-button type="text" size="small" @click="DeletePeople(data.data)">清理库存</el-button>
                <el-button type="text" size="small" @click="EditorialStaffnm(data.data)">详情</el-button>
               </template>
           </tables>
       </div>
     <newstaffas :dialogVisible.sync="dialogVisible" @CloseTheComponent="CloseTheComponent" @toUpdate="toUpdate"></newstaffas>
     <EditorialStaffas :ids='ids' :EditComponentSwitch.sync="EditComponentSwitch" @EditReceive="EditReceive" @toUpdate="toUpdate"></EditorialStaffas>
    </div>
  </template>
  
  <script>
  import {
    inventorylists,
    inventoryDelete
  } from "@/api/index";
  import tables from "@/components/table"
  import { formatDay } from "@/utils/date";
  import newstaffas from "./NewStaffas/index"
  import EditorialStaffas from "./EditorialStaffas/index"
  import {timestampToTime} from "@/utils/timeStamp"
  export default {
    components: {
     tables,
     newstaffas,
     EditorialStaffas
    },
    data() {
        return{
            materialsName:"",
            ids:"",
            dataHeader:[
                {min:"warehouse",acd:"仓库名称"},
                {min:"code",acd:"库存编码"},
                {min:"batchNumber",acd:"批次号"},
                {min:"materialsName",acd:"材料名称"},
                //{min:"warehouseTime",acd:"入库时间"},
                {min:"num",acd:"数量"},
                //{min:"price",acd:"价格"},
                {min:"expirationDate",acd:"有效期"},
               // {min:"status",acd:"状态"},
               // {min:"remark",acd:"备注"},
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
              pageForm: {materialsName:this.materialsName},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:this.pageSize
           }
         }
        this.inventorylist(obj)
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
          this.$confirm('是否清理库存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      inventoryDelete({id:val.id}).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.toUpdate();
           this.$message({
            type: 'success',
            message:`${res.mag}`
          });
        }else{
          this.$message({
            type: 'warning',
            message: `${res.mag}`
          }); 
        }
      }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清理'
          });          
        });   
      },
        //接收條數
        NumberOfArticles(val){
         console.log(val)
         this.pageSize = val
         let obj ={
              pageForm: {materialsName:this.materialsName},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:val
           }
         }
         this.inventorylist(obj)
        },
        //接收頁碼
        numberOfPages(val){
            console.log(val)
            this.CurrentPage = val
            let obj ={
              pageForm: {materialsName:this.materialsName},
              dataForm: {
            pageNum:val,
            pageSize:this.pageSize
           }
         }
            this.inventorylist(obj)
        },
        inventorylist(val){
      
        inventorylists(val).then(res=>{
            // console.log(res)
            this.total = res.data.total;
            let arr=[]
            arr = res.data.list.map(item=>{
              item.warehouseTime = timestampToTime( item.warehouseTime)
              item.status = item.status == '1'?'过期':'未过期'
              return  item
            })
            console.log(arr)
            this.tableData = arr

            if(res.code == 200){
              this.materialsName = "";
            }
        })
        }, 
        //子组件用新增编辑更新
        toUpdate(){
           let obj ={
              pageForm: {materialsName:this.materialsName},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:this.pageSize
           }
         }
        this.inventorylist(obj)
        } 
    },
    created() {
      let obj ={
              pageForm: {materialsName:this.materialsName},
              dataForm: {
            pageNum:this.CurrentPage,
            pageSize:this.pageSize
           }
         }
        this.inventorylist(obj)
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