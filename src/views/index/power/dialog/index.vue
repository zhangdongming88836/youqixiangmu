<template>
  <el-dialog
    :title="isAdd ? '添加' : '修改'"
    :visible.sync="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="dialogForm" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="dialogForm.id"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if="isAdd">
        <el-input
          type="password"
          show-password
          v-model="dialogForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="dialogForm.section" placeholder="请选择">
          <el-option
            v-for="item in sections"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="dialogForm.role"
          placeholder="请选择"
          @change="handleChange"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-input v-model="dialogForm.section"></el-input>
      </el-form-item> -->
      <el-form-item label="权限">
        <el-checkbox-group v-model="checkedCities">
          <el-checkbox label="1">填报管理</el-checkbox>
          <el-checkbox label="2">统计管理</el-checkbox>
          <el-checkbox label="3">设备生产管理</el-checkbox>
          <el-checkbox label="4">设备资产管理</el-checkbox>
          <el-checkbox label="5">设备统计管理</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="determine">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isAdd: Boolean,
    form: Object,
    dialogVisible: Boolean,
  },
  data() {
    return {
      visible: false,
      checkedCities: [],
      dialogForm: {},
      roles: [
        {
          label: "填报人",
          value: "1",
        },
        {
          label: "统计人员",
          value: "2",
        },
        {
          label: "设备生产管理人",
          value: "3",
        },
        {
          label: "设备资产管理人",
          value: "4",
        },
      ],
      sections: [
        {
          label: "物流",
          value: "物流",
        },
        {
          label: "渤海作业中心",
          value: "渤海作业中心",
        },
        {
          label: "龙口",
          value: "龙口",
        },
        {
          label: "绥中",
          value: "绥中",
        },
        {
          label: "湛江",
          value: "湛江",
        },
        {
          label: "海南",
          value: "海南",
        },
        {
          label: "惠州",
          value: "惠州",
        },
        {
          label: "上海",
          value: "上海",
        },
      ],
    };
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        console.log(val);
        this.dialogForm = val;
        // this.checkedCities = val.power;
        if (val.power) {
          this.checkedCities = ["1"];
        }
      },
    },
    checkedCities(val) {
      // console.log(val);
    },
  },
  mounted() {
    this.visible = this.$props.dialogVisible;
    this.dialogForm = JSON.parse(JSON.stringify(this.$props.form));
    // this.checkedCities = ["1"];
    console.log("this.$props.dialogVisible=" + this.$props.dialogVisible);
  },
  methods: {
    handleClose() {
      this.checkedCities = [];
      this.$emit("close");
    },
    determine() {
      this.checkedCities = [];
      this.$emit("determine", this.dialogForm);
    },
    handleChange(e) {
      console.log(e);
      switch (e) {
        case "1":
          this.checkedCities = ["1"];
          break;
        case "2":
          this.checkedCities = ["2"];
          break;
        case "3":
          this.checkedCities = ["3"];
          break;
        case "4":
          this.checkedCities = ["4"];
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>