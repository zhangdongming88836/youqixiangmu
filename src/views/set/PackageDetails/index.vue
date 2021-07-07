<template>
  <div id="LogView">
    <el-dialog
      title="详情"
      :visible.sync="DetailSwitch"
      width="70%"
      @open="open"
      @close="close"
    >
      <div class="centebt">
        <!-- <div class="ProjectViewLayout">
            <div class="titlea">
              套餐编码
            </div>
            <div class="GetMessage"></div>
             <div class="titlea">
              套餐名称
            </div>
            <div class="GetMessage"></div>
         </div> -->
        <!-- <div class="ProjectViewLayout">
            <div class="titlea">
              部位名称
            </div>
            <div class="GetMessage"></div>
             <div class="titlea">
              操作时间
            </div>
            <div class="GetMessage"></div>
         </div> -->
        <!-- <div class="ProjectViewLayout">
            <div class="titlea">
              操作状态
            </div>
            <div class="GetMessage"></div>
             <div class="titlea">
              操作人
            </div>
            <div class="GetMessage"></div>
         </div> -->
        <!-- <div class="ProjectViewLayout">
            <div class="titlea">
              创建时间
            </div>
            <div class="GetMessage">22</div>
             <div class="titlea">
              修改人
            </div>
            <div class="GetMessage">22</div>
         </div>  -->
        <div class="ProjectViewLayout">
          <div class="titlead">套餐编码</div>
          <div class="GetMessager">{{DetailedData.code}}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlead">套餐名称</div>
          <div class="GetMessager">{{DetailedData.name}}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlead">部位名称</div>
          <div class="GetMessager">{{DetailedData.partName}}</div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlead">套餐图层</div>
          <div class="GetMessagersd">
             <template>
            <div >
              <table id="customers">
                <tr>
                  <!-- <th>序号</th> -->
                  <!-- <th>操作</th> -->
                  <th>涂漆名称</th>
                  <th>涂层</th>
                  <th>涂层厚度</th>
                  <th>用量</th>
                  <th>最少轮数</th>
                  <th>干膜厚度</th>
                  <th>状态</th>
                </tr>
                <tr v-for="(item, index) in DetailedData.formulaPaintMealList" :key="index">
                  <!-- <td>{{ index + 1 }}</td> -->
                  <!-- <td>
                    <el-button type="text" size="mini" @click="DeleteCurrent(index)">删除</el-button>
                  </td> -->
                  <td>
                  {{item.materialsName}}
                  </td>
                  <td>
                    {{item.coat}}
                  
                  </td>
                  <td>
                  {{item.coatingThickness}}
                  </td>
                  <td>
                  {{item.dosage}}
                  </td>
                  <td>
                 {{item.sheavesNum}}
                  </td>
                  <td>
                  {{item.thickness}}
                  </td>
                  <td>
                  {{item.statusName}}
                  </td>
                </tr>
              </table>
              <!-- <div style="text-align: right">
                <el-button type="primary" @click="AddList">新增</el-button>
              </div> -->
            </div>
          </template>
          </div>
        </div>
        <div class="ProjectViewLayout">
          <div class="titlead">套餐除锈</div>
          <div class="GetMessagersd">
             <template>
            <div>
              <table id="customersa">
                <tr>
                  <!-- <th>操作</th> -->
                  <th>除锈方式</th>
                </tr>
                <tr v-for="(item, index) in DetailedData.formulaDescaMealList" :key="index">
                  <!-- <td>{{ index + 1 }}</td> -->
                  <!-- <td>
                    <el-button type="text" size="mini" @click="DeleteCurrents(index)">删除</el-button>
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
                  <td>{{item.descaling}}</td>
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
              </table>
              <!-- <div style="text-align: right">
                <el-button type="primary" @click="AddLists">新增</el-button>
              </div> -->
            </div>
          </template>
          </div>
        </div>
        <!-- <div class="ProjectViewLayout">
            <div class="titlead">
              请求参数
            </div>
            <div class="GetMessager">
            <el-input class="ove" type="textarea" :rows="2" placeholder="请输入内容"  :autosize="{minRows:2.7, maxRows:2.7}"> </el-input>
            </div>
         </div> -->
        <!-- <div class="ProjectViewLayout">
            <div class="titlead">
            
            </div>
            <div class="GetMessager">
            <el-input class="ove" type="textarea" :rows="2" placeholder="请输入内容"  :autosize="{minRows:2.7, maxRows:2.7}"> </el-input>
            </div>
         </div> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Email, Phon } from "../../../utils/verification";
import {
  suppliesDrawDetailUpdate,
  partListToSelect,
  formulaSetMealToUpdate,
  formulaSetMealUpdate,
  formulaSetMealList
} from "@/api/index";
import { timestampToTime } from "@/utils/timeStamp";
export default {
  props: ["DetailSwitch", "ids"],
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      DetailSwitch: false,
      ruleForm: {
        // account: "",
        // name: "",
        // password: "",
        // sex: "",
        // // expirationDate: "",
        // status: "",
        // remark: "",
        id: "",
        code: "",
        partId: "",
        name: "",
        evidenceTemplateList: [],
      },
      //详情数据
      DetailedData:[],
      rules: {
        code: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "blur",
          },
        ],
        partId: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请选择材料",
            trigger: "change",
          },
        ],
        expirationDate: [
          {
            required: true,
            message: "请输入保质期",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        sealName: [
          { required: true, message: "请输入印鉴名称", trigger: "blur" },
        ],

        // password: [
        //   {
        //     required: true,
        //     message: "请输入密码",
        //     trigger: "blur",
        //   },
        // ],
        // sex: [
        //   {
        //     required: true,
        //     message: "请选择性别",
        //     trigger: "change",
        //   },
        // ],
        // status: [
        //   {
        //     required: true,
        //     message: "请选择状态",
        //     trigger: "change",
        //   },
        // ],
      },
    };
  },
  methods: {
    close() {
      this.$emit("AcceptanceDetails", false);
    },
    open() {
        console.log(this.ruleForm.id,'474koiko')
      //部位名称
      // let obj = {
      //   pageForm: { id: this.ruleForm.id },
      //   dataForm: {
      //     pageNum: 1,
      //     pageSize: 999,
      //   },
      // };
      formulaSetMealToUpdate(this.ruleForm.id).then((res) => {
        console.log(res);
       this.DetailedData = res.data;
      });
      //材料名称
      // suppliesDrawDetailtoInsert().then(res=>{
      //   console.log(res)
      //   this.materialsNames = res.data
      // })
    //   formulaSetMealToUpdate(this.ruleForm.id).then((res) => {
    //     console.log(res);
    //   });
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       formulaSetMealUpdate(this.ruleForm).then((res) => {
    //         if (res.code == 200) {
    //           this.$message({
    //             message: `${res.msg}`,
    //             type: "success",
    //           });
    //           this.$emit("AcceptanceDetails", false);
    //           this.$emit("toUpdate");
    //         } else {
    //           this.$message({
    //             message: `${res.msg}`,
    //             type: "warning",
    //           });
    //         }
    //       });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
     },
  },
  watch: {
    DetailSwitch: {
      handler(newName, oldName) {
        // console.log(newName, 'wqeqeq')
        this.DetailSwitch = newName;
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
<style lang="scss" >
#LogView {
  .centebt {
    width: 842px;
    margin: 0 auto;
    border: solid 1px #cccccc;
  }
  .ProjectViewLayout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .titlea {
    width: 140px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessage {
    width: 281px;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    border-bottom: solid 1px #cccccc;
  }
  .titlead {
    width: 156px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessager {
    width: 95%;
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    border-bottom: solid 1px #cccccc;
  }
    .titleadsd {
    width: 156px;
    height: 100%;
    text-align: center;
     line-height: 100%;
    color: #333333;
    border-bottom: solid 1px #cccccc;
    background-color: #f6f6f6;
  }
  .GetMessagersd {
    width: 95%;
    height: 100%;
    padding-left: 10px;
    // line-height: 60px;
    border-bottom: solid 1px #cccccc;
  }
  .ove {
    overflow-y: hidden;
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
  #customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 30px;
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
}
</style>