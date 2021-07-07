import service from "@/utils/request.js"
//查找员工信息
export function employeelist(data){
    return service.request({
        method:"post",
        url:"/employee/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//查询员工信息下拉负责人
export function employeeInsertTwo(data){
    return service.request({
        method:"post",
        url:"/employee/listTwo",
        data
    })
}
//新增员工信息
export function employeeInsert(data){
    return service.request({
        method:"post",
        url:"/employee/insert",
        data
    })
}
//修改员工信息
export function employeeUpdate(data){
    return service.request({
        method:"post",
        url:'/employee/update',
        data
    })
}
//根据id查询员工信息
export function employeeToUpdate (data){
    return service.request({
        method:"get",
        url:`/employee/toUpdate/${data}`,
    })
}
//删除员工信息
export function employeeDelete (data){
    console.log(data)
    return service.request({
        method:"post",
        url:'/employee/updateEmployeeStateById',
        data
    })
}
/********************库存信息接口*************************************************** */
//查询库存信息
export function inventorylists(data){
    return service.request({
        method:"post",
        url:"/inventory/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//查询仓库信息下拉
export function warehouseListTwo(data){
    return service.request({
        method:"post",
        url:"/warehouse/listTwo",
        data
    })
}
//新增库存信息
export function inventoryInsert(data){
    return service.request({
        method:"post",
        url:"/inventory/insert",
        data
    })
}
//修改库存信息
export function inventoryUpdate(data){
    return service.request({
        method:"post",
        url:'/inventory/update',
        data
    })
}
//根据id查询库存信息
export function inventoryToUpdate (data){
    return service.request({
        method:"get",
        url:`/inventory/toUpdate/${data}`,
    })
}
//删除库存信息
export function inventoryDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:'/inventory/delete',
        params:data
    })
}
//新增库存信息前操作（显示仓库名称）
export function inventorytoInsert (data){
    return service.request({
        method:"get",
        url:'/inventory/toInsert',
        data
    })
}
//新增物料领取明细前操作（显示材料名称）
export function suppliesDrawDetailtoInsert (data){
    return service.request({
        method:"get",
        url:'/suppliesDrawDetail/toInsert',
        data
    })
}
/********************************采购订单接口************************************************************ */
//查询采购订单信息
export function orderlists(data){
    return service.request({
        method:"post",
        url:"/orders/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//查询采购订单信息下拉
export function ordersListTwo(data){
    return service.request({
        method:"post",
        url:"/orders/listTwo",
        data
    })
}
//新增采购订单信息
export function orderInsert(data){
    return service.request({
        method:"post",
        url:"/orders/insert",
        data
    })
}
//修改采购订单信息
export function orderUpdate(data){
    return service.request({
        method:"post",
        url:'/orders/update',
        data
    })
}
//根据id查询采购订单信息
export function orderToUpdate (data){
    return service.request({
        method:"get",
        url:`/orders/toUpdate/${data}`,
    })
}
//修改订单信息
export function orderDelete (data){
    console.log(data)
    return service.request({
        method:"post",
        url:'/orders/updateState',
        data
    })
}
/*********************************维修部位接口******************************************************* */
//查询工序信息
export function processlists(data){
    return service.request({
        method:"post",
        url:"/part/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
// //查询维修部位信息下拉
// export function partListToSelect(data){
//     return service.request({
//         method:"post",
//         url:"/part/listToSelect",
//         data
//     })
// }
//新增工序信息
export function processInsert(data){
    return service.request({
        method:"post",
        url:"/part/insert",
        data
    })
}
//修改工序信息
export function processUpdate(data){
    return service.request({
        method:"post",
        url:'/part/update',
        data
    })
}
//根据id查询工序信息
export function processToUpdate (data){
    return service.request({
        method:"get",
        url:`/part/toUpdate/${data}`,
    })
}
//修改工序信息
export function processDelete (data){
    console.log(data)
    return service.request({
        method:"post",
        url:'/part/delete',
        data
    })
}
/****************************油漆材料信息接口***************************************************************** */
//查询油漆材料信息
export function paintMateriallists(data){
    return service.request({
        method:"post",
        url:"/paintMaterial/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//新增油漆材料信息
export function paintMaterialInsert(data){
    return service.request({
        method:"post",
        url:"/paintMaterial/insert",
        data
    })
}
//修改油漆材料信息
export function paintMaterialUpdate(data){
    return service.request({
        method:"post",
        url:'/paintMaterial/update',
        data
    })
}
//根据id查询油漆材料信息
export function paintMaterialToUpdate (data){
    return service.request({
        method:"get",
        url:`/paintMaterial/toUpdate/${data}`,
    })
}
//获取油漆材料信息 
export function paintMaterialListToSelect(data){
    return service.request({
        method:"post",
        url:'/paintMaterial/listToSelect',
        data
    })
}
//删除油漆材料信息
export function paintMaterialDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:'/paintMaterial/delete',
        data
    })
}
/*************************************用户信息接口************************************************************** */
//查询用户信息
export function userlists(data){
    return service.request({
        method:"post",
        url:"/user/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//新增用户信息
export function userInsert(data){
    return service.request({
        method:"post",
        url:"/user/insert",
        data
    })
}
//修改用户信息
export function userUpdate(data){
    return service.request({
        method:"post",
        url:'/user/update',
        data
    })
}
//根据id查询用户信息
export function userToUpdate (data){
    return service.request({
        method:"get",
        url:`/user/toUpdate/${data}`,
    })
}
//删除用户信息
export function userDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:'/user/delete',
        params:data
    })
}
/******************************************采购入库单*************************************************** */
//查询采购入库单信息
export function orderLibrarylists(data){
    return service.request({
        method:"post",
        url:"/orderLibrary/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//新增采购入库单信息
export function orderLibraryInsert(data){
    return service.request({
        method:"post",
        url:"/orderLibrary/insert",
        data
    })
}
//修改采购入库单信息
export function orderLibraryUpdate(data){
    return service.request({
        method:"post",
        url:'/orderLibrary/update',
        data
    })
}
//根据id查询采购入库单信息
export function orderLibraryToUpdate (data){
    return service.request({
        method:"get",
        url:`/orderLibrary/toUpdate/${data}`,
    })
}
//删除采购入库单信息
export function orderLibraryDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:'/orderLibrary/delete',
        params:data
    })
}
/*************************************物料领取明细接口********************************************************* */
//查询物料领取明细信息
export function suppliesDrawDetaillists(data){
    return service.request({
        method:"post",
        url:"/suppliesDrawDetail/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//新增物料领取明细信息
export function suppliesDrawDetailInsert(data){
    return service.request({
        method:"post",
        url:"/suppliesDrawDetail/insert",
        data
    })
}
//修改物料领取明细信息
export function suppliesDrawDetailUpdate(data){
    return service.request({
        method:"post",
        url:'/suppliesDrawDetail/update',
        data
    })
}
//根据id查询物料领取明细信息
export function suppliesDrawDetailToUpdate (data){
    return service.request({
        method:"get",
        url:`/suppliesDrawDetail/toUpdate/${data}`,
    })
}
//删除物料领取明细信息
export function suppliesDrawDetailDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:'/suppliesDrawDetail/delete',
        params:data
    })
}

/******************************查询维修预警信息*********************************************************** */
//查询维修预警信息
export function alarmlists(data){
    return service.request({
        method:"post",
        url:"/alarm/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
/**************************************库存变动明细******************************************************** */
//查询库存明细信息
export function inventoryDetaillists(data){
    return service.request({
        method:"post",
        url:"/inventoryDetail/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//新增库存明细信息
export function inventoryDetailInsert(data){
    return service.request({
        method:"post",
        url:"/inventoryDetail/insert",
        data
    })
}
//修改库存明细信息
export function inventoryDetailUpdate(data){
    return service.request({
        method:"post",
        url:'/inventoryDetail/update',
        data
    })
}
//根据id查询库存明细信息
export function inventoryDetailToUpdate (data){
    return service.request({
        method:"get",
        url:`/inventoryDetail/toUpdate/${data}`,
    })
}
//删除库存明细信息
export function inventoryDetailDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:'/inventoryDetail/delete',
        params:data
    })
}
/****************************职位信息接口************************************ */
//获取职位下拉框信息
export function sysPositionToInsert(data){
    console.log(1111111)
    return  service.request({
        method:"get",
        url:"/sysPosition/ListTwo",
        data
    })
}
//查询职位信息
export function sysPositionList(data){
    return service.request({
        method:"post",
        url:"/sysPosition/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//改变状态职位信息
export function sysPositionDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:`/sysPosition/delete`,
        data
    })
}
//新增职位信息
export function sysPositionInsert(data){
    return service.request({
        method:"post",
        url:"/sysPosition/insert",
        data
    })
}
//根据id查询职位信息
export function sysPositionToUpdate (data){
    return service.request({
        method:"get",
        url:`/sysPosition/toUpdate/${data}`,
    })
}
//修改职位信息
export function sysPositionUpdate(data){
    return service.request({
        method:"post",
        url:'/sysPosition/update',
        data
    })
}
/**************************组织机构信息接口******************************** */
//用于获取组织机构名称
export function sysOrganizationToInsert(data){
    return service.request({
        method:"get",
        url:"/sysOrganization/toInsert",
        data
    })
}
//查询组织机构信息
export function sysOrganizationList(data){
    return service.request({
        method:"post",
        url:"/sysOrganization/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//获取组织机构树
export function sysOrganizationListTwo(data){
    return service.request({
        method:"post",
        url:"/sysOrganization/listTwo",
         data
    })
}
//删除组织机构信息
export function sysOrganizationDelete (data){
    console.log(data)
    return service.request({
        method:"delete",
        url:`sysOrganization/delete`,
        data
    })
}
//新增组织机构信息
export function sysOrganizationInsert(data){
    return service.request({
        method:"post",
        url:"/sysOrganization/insert",
        data
    })
}
//修改组织机构信息
export function sysOrganizationUpdate(data){
    return service.request({
        method:"post",
        url:'/sysOrganization/update',
        data
    })
}
//根据id查询组织机构信息
export function sysOrganizationToUpdate (data){
    return service.request({
        method:"get",
        url:`/sysOrganization/toUpdate/${data}`,
    })
}
//查询组织机构信息---平台
export function sysOrganizationListFour (data){
    return service.request({
        method:"post",
        url:`/sysOrganization/listFour`,
        data
    })
}
/********************************油漆套餐************************************ */
//查询油漆套餐信息
export function formulaSetMealList(data){
    return service.request({
        method:"post",
        url:"/formulaSetMeal/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//新增油漆套餐信息
export function formulaSetMealInsert(data){
    return service.request({
        method:"post",
        url:"/formulaSetMeal/insertTwo",
        data
    })
}
//根据id查询油漆套餐信息
export function formulaSetMealToUpdate (data){
   
    return service.request({
        method:"get",
        url:`/formulaSetMeal/toUpdate/${data}`,
    })
}
//获取部位名称
export function partListToSelect(data){
  return service.request({
      method:"post",
      url:"/part/listToSelect"
  })
}
//修改油漆套餐信息
export function formulaSetMealUpdate(data){
    return service.request({
        method:"post",
        url:'/formulaSetMeal/update',
        data
    })
}
//获取油漆套餐信息下拉
export function formulaSetMealListToSelect(data){
    return service.request({
        method:"post",
        url:'/formulaSetMeal/listToSelect',
        data
    })
}
///删除油漆套餐信息
export function paintMaterialUpdateStateById(data){
    return service.request({
        method:"post",
        url:'formulaSetMeal/updateStateById',
        data
    })
}
/**********************************权限管理************************************************ */
//查询权限信息
export function sysAuthorityList(data){
    return service.request({
        method:"post",
        url:"/sysAuthority/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//查询权限信息
export function sysAuthorityListTwo(data){
    return service.request({
        method:"post",
        url:"/sysAuthority/listTwo",
        data
    })
}
//新增权限信息
export function sysAuthorityInsert(data){
    return service.request({
        method:"post",
        url:"/sysAuthority/insert",
        data
    })
}
//根据id权限信息
export function sysAuthorityToUpdate (data){
   
    return service.request({
        method:"get",
        url:`/sysAuthority/toUpdate/${data}`,
    })
}
//修改权限
export function sysAuthorityUpdate(data){
    return service.request({
        method:"post",
        url:'/sysAuthority/update',
        data
    })
}
/**************************职位权限***************************** */
//查询职位权限信息
//查询权限信息
export function orgPositionAuthList(data){
    return service.request({
        method:"post",
        url:"/orgPositionAuth/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
///删除职位权限信息
export function orgPositionAuthUpdateStateById(data){
    return service.request({
        method:"post",
        url:'/orgPositionAuth/updateEmployeeStateById',
        data
    })
}
//新增职位权限信息
export function orgPositionAuthInsert(data){
    return service.request({
        method:"post",
        url:"/orgPositionAuth/insert",
        data
    })
}
//根据id查询职位权限信息
export function orgPositionAuthToUpdate (data){
   
    return service.request({
        method:"get",
        url:`/orgPositionAuth/toUpdate/${data}`,
    })
}
//修改职位权限信息
export function orgPositionAuthUpdate(data){
    return service.request({
        method:"post",
        url:'/orgPositionAuth/update',
        data
    })
}
/****************************维修计划*************************************** */
//查询维修计划信息
export function maintenancePlanningList(data){
    return service.request({
        method:"post",
        url:"/maintenancePlanning/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//查询维修计划信息下拉
export function maintenancePlanninglistTwo(data){
    return service.request({
        method:"post",
        url:"/maintenancePlanning/listTwo",
        data
    })
}
//新增维修计划信息
export function maintenancePlanningInsert(data){
    return service.request({
        method:"post",
        url:"/maintenancePlanning/insert",
        data
    })
}
//根据id维修计划信息
export function maintenancePlanningToUpdate (data){
   
    return service.request({
        method:"get",
        url:`/maintenancePlanning/toUpdate/${data}`,
    })
}
//修改维修计划信息
export function maintenancePlanningUpdate(data){
    return service.request({
        method:"post",
        url:'/maintenancePlanning/update',
        data
    })
}
//删除维修计划信息
export function maintenancePlanningUpdateStateById(data){
    return service.request({
        method:"post",
        url:'/maintenancePlanning/updatePlanningStateById',
        data
    })
}
/**********************************工单信息接口********************************************************** */
//查询工单信息
export function workOrderList(data){
    return service.request({
        method:"post",
        url:"/workOrder/list",
        data:data.pageForm,
        params:data.dataForm
    })
}
//查询工单信息下拉
export function workOrderListTwo(data){
    return service.request({
        method:"post",
        url:"/workOrder/listTwo",
        data
    })
}
//修改工单状态信息
export function workOrderUpdateState(data){
    return service.request({
        method:"post",
        url:'/workOrder/updateState',
        data
    })
}
//根据id工单涂层明细
export function workOrderPaintMealToUpdate (data){
   
    return service.request({
        method:"get",
        url:`/workOrderPaintMeal/toUpdate/${data}`,
    })
}
//根据id工单除锈信息
export function workOrderDescMealToUpdate (data){
   
    return service.request({
        method:"get",
        url:`/workOrderDescMeal/toUpdate/${data}`,
    })
}
//新增工单信息
export function workOrderInsert(data){
    return service.request({
        method:"post",
        url:"/workOrder/insert",
        data
    })
}
//根据id查询工单信息
export function workOrderToUpdate (data){
    return service.request({
        method:"get",
        url:`/workOrder/toUpdate/${data}`,
    })
}
//修改工单信息
export function workOrderUpdate (data){
    return service.request({
        method:"post",
        url:`/workOrder/update`,
        data
    })
}
