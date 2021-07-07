<template>
  <div>
    <el-table
    :data="tableData"
     border
    :header-cell-style="{background:'#eee',color:'#606266'}"
    style="width: 100%">
    <template   v-for="item in dataHeader">
    <el-table-column v-if="item.cfumn === 'slot'" :key="item.id" :prop="item.min" :label="item.acd"  header-align="center"
      align="center" :show-overflow-tooltip='true'> 
        <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"> </slot>
        </template>
    </el-table-column>
    <el-table-column v-else :key="item.id" :prop="item.min" :label="item.acd" :show-overflow-tooltip='true'  header-align="center"
      align="center"> </el-table-column>
  </template>
  </el-table> 
  <div>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="CurrentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </div>
  </div>
</template>
<script>
export default{
    props:['dataHeader','tableData','total'],
    data(){
        return{
            CurrentPage:1,
            total:20,
            pageSize:10
        }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$emit("NumberOfArticles",val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$emit("numberOfPages",val)
      }
    },
}
</script>
<style lang="scss" scoped>

</style>