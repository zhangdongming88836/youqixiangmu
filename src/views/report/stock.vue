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
      <el-table-column fixed prop="date" label="创建者" width="150">
      </el-table-column>
      <el-table-column prop="name" label="油漆批次" width="120">
      </el-table-column>
      <el-table-column prop="province" label="油漆数量" width="120">
      </el-table-column>
      <el-table-column prop="city" label="剩余库存" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="油漆出库时间" width="120">
      </el-table-column>
      <el-table-column prop="address" label="备注" width="300">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="dialogTableVisible = true"
            >查看</el-button -->
          <!-- > -->

          <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column
                property="date"
                label="日期"
                width="150"
              ></el-table-column>
              <el-table-column
                property="name"
                label="姓名"
                width="200"
              ></el-table-column>
              <el-table-column
                property="address"
                label="地址"
              ></el-table-column>
            </el-table>
          </el-dialog> -->
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
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      tableData: [
        {
          date: "吴晨旭",
          name: "二批次",
          province: "1009",
          city: "1000",
          zip: "2020-09-09",
          address: "油漆防腐使用面积为50平方米",
        },
        {
          date: "吴晨旭",
          name: "二批次",
          province: "1009",
          city: "1000",
          zip: "2020-09-09",
          address: "油漆防腐使用面积为50平方米",
        },
        {
          date: "吴晨旭",
          name: "二批次",
          province: "1009",
          city: "1000",
          zip: "2020-09-09",
          address: "油漆防腐使用面积为50平方米",
        },
        {
          date: "吴晨旭",
          name: "二批次",
          province: "1009",
          city: "1000",
          zip: "2020-09-09",
          address: "油漆防腐使用面积为50平方米",
        },
      ],
      value2: "",
      // gridData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      // ],
      // dialogTableVisible: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
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
</style>
