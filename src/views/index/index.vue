<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="index" :unique-opened="true">
        <div v-for="(item, index) of navData" :key="index + '-'">
          <router-link
            v-if="item.children.length === 0"
            :key="index"
            :to="item.url === null ? '' : item.url"
          >
            <el-menu-item :index="index + ''">
              <i class="el-icon-user-solid"></i>
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </router-link>
          <el-submenu v-else :key="index" :index="index + ''">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.menuName}}</span>
            </template>
            <div
              v-for="(child, indx) of item.children"
              :key="index + '-' + indx"
            >
              <router-link
                :to="child.url === null ? '' : child.url"
                :key="index + '' + indx"
              >
                <el-menu-item :index="index + '' + indx">
                  <span slot="title">{{ child.menuName}}</span>
                </el-menu-item>
              </router-link>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <!-- <el-container>
      <el-header style="text-align: right; font-size: 16px"
        ><span style="margin-right: 15px">王小虎</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container> -->
  </el-container>
</template>
<script>
import { menu } from '../../api/login'
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      index: "/power",
      navData: [
        {
          name: "管理员首页",
          url: "/layout/all",
          children: []
        },
        {
          name: "操作员首页",
          url: "/layout/opera",
          children: []
        },
        {
          name: "平台维修管理",
          children: [
            // {
            //   name: "维修计划",
            //   url: "/layout/plan"
            // },
            {
              name: "维修计划",
              url: "/layout/youpinForm"
            },
            {
              name: "工单管理",
              url: "/layout/dazongliaoForm"
            },
            {
              name: "维修记录",
              url: "/layout/storeroomForm"
            },
            {
              name: "维修警告",
              url: "/layout/wharfForm"
            },
          ]
        },
        {
          name: "库存管理",
          children: [
            {
              name: "库存列表",
              url: "/layout/youpinCount"
            },
            {
              name: "库存变动明细",
              url: "/layout/dazongliaoCount"
            },
            {
              name: "库存批次",
              url: "/layout/stockBatch"
            },
            {
              name: "物料详情",
              url: "/layout/storeroomCount"
            },
          ]
        },
        {
          name:"采购管理",
          children: [
            {
              name: "采购订单",
              url: "/layout/purchase"
            },
            {
              name: "采购入库单",
              url: "/layout/purchaseIn"
            }
          ]
        },
        {
          name: "报表管理",
          children: [
            {
              name: "维修统计报表",
              url: "/layout/servicing"
            },
            {
              name: "库存统计报表",
              url: "/layout/stock"
            },
            {
              name: "入库汇总报表",
              url: "/layout/instock"
            },
            {
              name: "订单汇总报表",
              url: "/layout/order"
            }
          ]
        },
        {
          name: "权限管理",
          children: [
            {
              name: "权限管理(部门)",
              url: "/layout/permission"
            },
            {
              name: "用户管理",
              url: "/layout/member"
            },
                   {
              name: "职位管理",
              url: "/layout/PositionManagement"
            },  
                   {
              name: "职位权限",
              url: "/layout/PositionAuthority"
            },  
          ]
        },
        {
          name: "基本资料",
          children: [
            {
              name: "油漆材料",
              url: "/layout/paintMaterials"
            },
            {
              name: "油漆套餐",
              url: "/layout/paintInformation"
            },
            {
              name: "维修部位",
              url: "/layout/technology"
            },
              {
              name: "员工信息",
              url: "/layout/know"
            },
              {
              name: "组织机构",
              url: "/layout/Organization"
            },
          ]
        }
      ]
    };
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu(){
      menu()
      .then(res => {
        if(res.code === 200) {
          this.navData = res.data.menus;
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped></style>
