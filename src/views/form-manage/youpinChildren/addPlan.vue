<template>
  <el-dialog
    title="新增维修计划"
    :visible="visible"
    @close="closeHandle"
    :close-on-click-modal="false"
  >
    <div class="addBox">1090683074
      <el-form
        :model="poster"
        ref="posterFrom"
        label-width="150px"
        size="small"
        :rules="rules"
      >
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="poster.principal"></el-input>
        </el-form-item>
        <el-form-item label="预定维修时间" prop="reserveTime">
          <el-date-picker
            v-model="poster.reserveTime"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="区域" prop="district">
          <el-input v-model="poster.district"></el-input>
        </el-form-item>
        <el-form-item label="面积" prop="area">
          <el-input v-model="poster.area"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="number">
          <el-input v-model="poster.number"></el-input>
        </el-form-item>
        <el-form-item label="部位编号" prop="partId">
          <el-input v-model="poster.partId"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="poster.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="closeHandle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
// import SingleUpload from '@/components/Upload/singleUpload'
export default {
  name: "addSharePoster",
  props: ["id", "postdata"],
  components: {
    // SingleUpload
  },
  data() {
    return {
      visible: true,
      options: [
          {
          value: '-1',
          label: '停用'
          },
          {
          value: '0',
          label: '未启动'
          },
          {
          value: '1',
          label: '已启动'
          },
          {
          value: '2',
          label: '已完结'
          },
        ],
      poster: {
        area: "",
        // createName: "",
        // createTime: "",
        district: "",
        // id: "",
        number: "",
        partId: "",
        principal: "",
        // processId: "",
        // remark: "",
        reserveTime: "",
        status: "",
        // updateName: "",
        // updateTime: "",
      },
      rules: {
        principal: [
          { required: true, message: "请输入负责人名称", trigger: "blur" },
        ],
        reserveTime: [
          { required: true, message: "请输入预定维修时间", trigger: "blur" },
        ],
        district: [
          { required: true, message: "请输入维修区域", trigger: "blur" },
        ],
        area: [{ required: true, message: "请输入维修面积", trigger: "blur" }],
        number: [
          { required: true, message: "请输入维修人数", trigger: "blur" },
        ],
        partId: [
          { required: true, message: "请输入部位编号", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请输入维修状态", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // console.log(123)
  },
  beforeMount() {},
  methods: {
    closeHandle() {
      this.$emit("close");
    },
    onSubmit() {
      this.$refs["posterFrom"].validate((valid) => {
        if (valid) {
          this.$emit("submitPlan", this.poster);
        }
      });
    },
    cancel() {
      this.$emit("update:visible", false);
      this.$emit("update:id", "");
    },
  },
};
</script>

<style scoped>
.el-input {
  width: 70%;
}
.addBox {
  /* width: 600px; */
  padding: 0 35px;
  margin: 0 auto;
}
</style>
<style>
.el-upload-list {
  width: 70% !important;
}
</style>
