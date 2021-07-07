<template>
  <el-dialog
    title="修改维修记录"
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
          <el-button type="primary" @click="submitUpdate">提交</el-button>
          <el-button @click="closeHandle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "editSharePoster",
  props: ["updateData"],
  //   components: {
  //   },
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
        location: [
          { required: true, message: "请输入维修位置", trigger: "blur" },
        ],
        manHour: [
          { required: true, message: "请输入维修工时", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入维修人数", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // console.log(123)
  },
  beforeMount() {
    this.poster.id = this.updateData.id;
    this.poster.location = this.updateData.location;
    this.poster.manHour = this.updateData.manHour;
    this.poster.number = this.updateData.number;
    this.poster.remark = this.updateData.remark;
    this.poster.principal = this.updateData.principal;
  },
  methods: {
    closeHandle() {
      this.$emit("close");
    },
    submitUpdate() {
      this.$refs["posterFrom"].validate((valid) => {
        if (valid) {
          this.$emit("submitUpdate", this.poster);
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
