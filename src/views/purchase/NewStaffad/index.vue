<template>
  <div id="NewInventory">
    <el-dialog
      title="新增"
      :visible.sync="personnel"
      width="60%"
      @open="open"
      @close="close"
    >
      <div class="contebn">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类别" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option
                v-for="item in categorys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单编码" prop="orderCode">
            <el-input
              v-model="ruleForm.orderCode"
              placeholder="请输入订单编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单名称" prop="orderName">
            <el-input
              v-model="ruleForm.orderName"
              placeholder="请输入订单名称"
            ></el-input>
          </el-form-item>
              <el-form-item label="工单名称" prop="workOrderId">
            <el-select v-model="ruleForm.workOrderId" placeholder="请选择">
              <el-option
                v-for="item in workOrderIds"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="principal">
            <el-select v-model="ruleForm.principal" placeholder="请选择">
              <el-option
                v-for="item in principals"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="价格" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入内容"></el-input>
          </el-form-item> -->
          <el-form-item label="下单日期" prop="orderTime">
            <el-date-picker
              v-model="ruleForm.orderTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

            <el-form-item label="支付金额" prop="money">
            <el-input
              v-model="ruleForm.money"
              placeholder="请输入支付金额"
            ></el-input>
          </el-form-item>
            <el-form-item label="送达日期" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择">
              <el-option
                v-for="item in statuss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="ruleForm.remark"
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <label style="margin-left:20px">采购订单表</label>
          <template>
            <div style="margin-left: 99px">
              <table id="customers">
                <tr>
                  <th>序号</th>
                  <th>操作</th>
                  <th>材料名称</th>
                  <th>采购数量</th>
                  <th>采购单价</th>
                </tr>
                <tr
                  v-for="(item, index) in ruleForm.orderDetailList"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <el-button
                      type="text"
                      size="mini"
                      @click="DeleteCurrent(index)"
                      >删除</el-button
                    >
                  </td>
                  <td>
                    <el-select v-model="item.materialsId" placeholder="请选择">
                      <el-option
                        v-for="items in paintMaterialIds"
                        :key="items.id"
                        :label="items.materialsName"
                        :value="items.id"
                      >
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      v-model="item.num"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      v-model="item.price"
                      placeholder="请输入"
                    ></el-input>
                  </td>
                  <!-- <td>
                    <el-input
                      v-model="item.dosage"
                      placeholder="请输入"
                    ></el-input>
                  </td> -->
                  <!-- <td>
                    <el-input
                      v-model="item.sheavesNum"
                      placeholder="请输入"
                    ></el-input>
                  </td> -->
                  <!-- <td>
                    <el-input
                      v-model="item.thickness"
                      placeholder="请输入"
                    ></el-input>
                  </td> -->
                </tr>
              </table>
              <div style="text-align: right">
                <el-button type="primary" @click="AddList">新增</el-button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Email, Phon } from "../../../utils/verification";
import {
  orderInsert,
  employeeInsertTwo,
  paintMaterialListToSelect,
  workOrderListTwo,
} from "@/api/index";
export default {
  props: ["dialogVisible"],
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
      personnel: false,
      //工单下拉
      workOrderIds:[],
      //类别下拉数组
      categorys: [
        {
          value: "0",
          label: "工单生成",
        },
        {
          value: "1",
          label: "自主采购",
        },
      ],
      //负责人下拉数组
      principals: [
        {
          value: "0",
          label: "工单生成",
        },
        {
          value: "1",
          label: "自主采购",
        },
      ],
      //状态选啦数组
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
      //油漆材料下拉
      paintMaterialIds: [],
      objs: {
        materialsId: "",
        num: "",
        price: "",
      },
      ruleForm: {
        //订单编码
        orderCode: "",
        //订单名称
        orderName: "",
        //下单日期
        orderTime: "",
        //订单详情
        //支付金额
        money:"",
        //工单名称
        workOrderId:"",
        //预计送达时间
        time:"",
        orderDetailList: [
          {
            materialsId: "",
            num: "",
            price: "",
          },
        ],
        category: "",
        name: "",
        principal: "",
        // price: "",
        // expirationDate: "",
        status: "",
        remark: "",
      },
      rules: {
        category: [
          {
            required: true,
            message: "请选择类别",
            trigger: "change",
          },
        ],
        workOrderId: [
          {
            required: true,
            message: "请选择工单名称",
            trigger: "change",
          },
        ],
        orderCode: [
          {
            required: true,
            message: "请输入订单编码",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "请输入支付金额",
            trigger: "blur",
          },
        ],
        orderName: [
          {
            required: true,
            message: "请输入订单名称",
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: "请选择送达时间",
            trigger: "change",
          },
        ],
        orderTime: [
          {
            required: true,
            message: "请选择下单日期",
            trigger: "change",
          },
        ],
        principal: [
          {
            required: true,
            message: "请输入负责人",
            trigger: "blur",
          },
        ],
        // price: [
        //   {
        //     required: true,
        //     message: "请输入价格",
        //     trigger: "blur",
        //   },
        // ],
        // expirationDate: [
        //   {
        //     required: true,
        //     message: "请输入保质期",
        //     trigger: "blur",
        //   },
        // ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //删除当前表格
    DeleteCurrent(val) {
      //console.log(val)
      this.ruleForm.orderDetailList.splice(val, 1);
    },
    //新增表格
    AddList() {
      let obja = Object.assign({}, this.objs);
      this.ruleForm.orderDetailList.push(obja);
    },
    //清空验证
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    close() {
      this.$emit("CloseTheComponent", false);
      this.ruleForm.orderDetailList = [
         {
            materialsId: "",
            num: "",
            price: "",
          },
      ];
      this.ruleForm.time = "";
      this.ruleForm.workOrderId = "";
      this.ruleForm.money = "";
      this.ruleForm.orderTime = "";
      this.ruleForm.orderName = "";
      this.ruleForm.orderCode = "";
      this.ruleForm.category = "";
      this.ruleForm.name = "";
      this.ruleForm.principal = "";
      // this.ruleForm.price = "";
      // this.ruleForm.expirationDate = "";
      this.ruleForm.status = "";
      this.ruleForm.remark = "";
      this.clearValidate("ruleForm");
    },
    open() {
      //负责人下拉
      employeeInsertTwo({}).then((res) => {
        //console.log(res);
        this.principals = res.data;
      });
      paintMaterialListToSelect().then((res) => {
        //console.log(res);
        this.paintMaterialIds = res.data;
      });
      workOrderListTwo({}).then(res=>{
        console.log(res);
        this.workOrderIds = res.data;
      })
      this.clearValidate("ruleForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          orderInsert(this.ruleForm).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: `${res.msg}`,
                type: "success",
              });
              this.$emit("CloseTheComponent", false);
              this.$emit("toUpdate");
            } else {
              this.$message({
                message: `${res.msg}`,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    dialogVisible: {
      handler(newName, oldName) {
        console.log(newName, "wqeqeq");
        this.personnel = newName;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss">
#NewInventory {
  .el-dialog__body {
    padding-right: 70px !important;
  }
    .tableaf {
    width: 775px;
    padding-left: 20px;
    overflow: auto;
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