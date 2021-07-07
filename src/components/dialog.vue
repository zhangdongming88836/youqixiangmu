<template>
  <div>
                <!-- <el-button type="text" @click="dialogTableVisible = true"
            >查看</el-button
          > -->

          <el-dialog title="库存详情" :visible="true" @close="$emit('dialogClose')">
                      <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible"> -->
            <el-table :data="gridData">
              <el-table-column
                property="date"
                label="油漆名称"
                width="150"
              ></el-table-column>
              <el-table-column
                property="name"
                label="入库数量"
                width="200"
              ></el-table-column>
              <el-table-column
                property="address"
                label="所属作业区"
              ></el-table-column>
            </el-table>
          </el-dialog>
  </div>
</template>

<script>
export default {
data() {
      return {
        gridData: [{
          date: '长江七号',
          name: '2349',
          address: '作业区二'
        }, {
          date: '长江七号',
          name: '2349',
          address: '作业区二'
        }, {
          date: '长江七号',
          name: '2349',
          address: '作业区二'
        }, {
          date: '长江七号',
          name: '2349',
          address: '作业区二'
        }],
        dialogTableVisible: false,
      }
}
}
</script>

<style>

</style>