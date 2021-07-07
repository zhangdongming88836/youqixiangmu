<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-s-custom"
      style="margin-bottom: 20px"
      @click="add"
      >添加用户</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="账号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="section" label="部门" width="180" align="center">
      </el-table-column>
      <el-table-column prop="role" label="角色" align="center">
      </el-table-column>
      <el-table-column prop="type" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="power" label="权限" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="alter(scope.row)">修改</el-button>
          <el-button type="text" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 10px">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
    <Dialog
      :dialogVisible="dialog"
      :form="detailForm"
      :isAdd="isAdd"
      @close="dialogClose"
      @determine="determine"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "./dialog/index.vue";
export default {
  components: {
    Dialog,
  },
  methods: {
    // 模态框关闭
    dialogClose() {
      this.dialog = false;
      this.detailForm = {};
    },
    // 模态框的确定事件
    determine(data) {
      console.log(data);
      this.dialog = false;
      this.detailForm = {};
    },
    // 操作修改
    alter(row) {
      this.dialog = true;
      this.isAdd = false;
      this.detailForm = row;
    },
    // 点击添加用户事件
    add() {
      this.dialog = true;
      this.isAdd = true;
      this.detailForm = {};
    },
    // 删除事件
    del(del) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  data() {
    return {
      dialog: false,
      isAdd: true,
      detailForm: {},
      tableData: [
        {
          id: "guogs",
          section: "龙口",
          role: "填报人",
          type: "启用",
          power: "填报管理",
        },
        {
          id: "guogs",
          section: "龙口",
          role: "填报人",
          type: "启用",
          power: "填报管理",
        },
        {
          id: "guogs",
          section: "龙口",
          role: "填报人",
          type: "启用",
          power: "填报管理",
        },
        {
          id: "guogs",
          section: "龙口",
          role: "填报人",
          type: "启用",
          power: "填报管理",
        },
      ],
    };
  },
};
</script>

<style>
</style>