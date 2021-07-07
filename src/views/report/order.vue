<template>
<div>
  <el-form :inline="true" class="demo-form-inline">
    <div class="block">
      <span class="demonstration">时间查询</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <el-form-item class="item">
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="date" label="采购者" width="150">
    </el-table-column>
    <el-table-column prop="name" label="订单编号" width="120"> </el-table-column>
    <el-table-column prop="province" label="订单总量" width="120">
    </el-table-column>
    <el-table-column prop="city" label="金额" width="120"> </el-table-column>
    <el-table-column prop="zip" label="采购时间" width="120"> </el-table-column>
    <el-table-column prop="address" label="备注" width="300"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >查看</el-button
        >
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [{
          date: '吴晨旭',
          name: '24923530853986',
          province: '300',
          city: '50000',
          zip: '2020-09-09',
          address: '采购用于三号作业区得防腐工作'
        }, {
          date: '吴晨旭',
          name: '24923530853986',
          province: '300',
          city: '50000',
          zip: '2020-09-09',
          address: '采购用于三号作业区得防腐工作'
        }, {
          date: '吴晨旭',
          name: '24923530853986',
          province: '300',
          city: '50000',
          zip: '2020-09-09',
          address: '采购用于三号作业区得防腐工作'
        }, {
          date: '吴晨旭',
          name: '24923530853986',
          province: '300',
          city: '50000',
          zip: '2020-09-09',
          address: '采购用于三号作业区得防腐工作'
        }],
        value2: ''
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
            handleClick(row) {
        console.log(row);
      }
   }
}
</script>

<style scoped>
.demo-form-inline {
  display: flex;
  flex-direction: row;
}
.item {
  padding-left: 10px;
}
</style>

