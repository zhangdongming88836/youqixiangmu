<template>
  <el-dialog
    title="新增维修记录"
    :visible="visible"
    @close="closeHandle"
    :close-on-click-modal="false"
  >
    <div class="addBox">
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
        <!-- <el-form-item label="预定维修时间" prop="reserveTime">
          <el-date-picker
            v-model="poster.reserveTime"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="设施" prop="facility">
          <el-input v-model="poster.facility"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-input v-model="poster.location"></el-input>
        </el-form-item>
        <el-form-item label="工时" prop="manHour">
          <el-input v-model="poster.manHour"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="number">
          <el-input v-model="poster.number"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="poster.remark"></el-input>
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
      poster: {
        facility: "",
        location: "",
        manHour: "",
        number: "",
        principal: "",
        remark: "",
      },
      rules: {
        principal: [
          { required: true, message: "请输入负责人名称", trigger: "blur" },
        ],
        facility: [
          { required: true, message: "请输入设施", trigger: "blur" },
        ],
        location: [
          { required: true, message: "请输入维修位置", trigger: "blur" },
        ],
        manHour: [
          { required: true, message: "请输入维修工时", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入维修人数", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
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
