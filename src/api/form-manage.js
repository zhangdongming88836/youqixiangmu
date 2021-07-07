import service from "@/utils/request.js"
//维修计划接口
//查询维修计划与分页
export function plan(data){
  return service.request({
      method:"post",
      url:"/plan/list",
      data: data.dataForm,
      params: data.pageForm
  })
}
//新增维修计划
export function planInsert(data){
    return service.request({
        method:"post",
        url:"/plan/insert",
        data: data
    })
}
//删除维修计划
export function planDelete(data){
    return service.request({
        method:"delete",
        url:"/plan/delete",
        params:data
    })
}
//修改维修计划
export function planUpdate(data){
    return service.request({
        method:"post",
        url:"/plan/update",
        data
    })
}


//维修记录接口
//查询维修记录与分页
export function record(data){
    return service.request({
        method:"post",
        url:"/record/list",
        data: data.dataForm,
        params: data.pageForm
    })
  }
  //新增维修记录
  export function recordInsert(data){
      return service.request({
          method:"post",
          url:"/record/insert",
          data: data
      })
  }
  //删除维修记录
  export function recordDelete(data){
      return service.request({
          method:"delete",
          url:"/record/delete",
          params:data
      })
  }
  //修改维修记录
  export function recordUpdate(data){
      return service.request({
          method:"post",
          url:"/record/update",
          data
      })
  }


  //工单接口
  //查询工单与分页
export function workOrderList(data){
    return service.request({
        method:"post",
        url:"/workOrder/list",
        data: data.dataForm,
        params: data.pageForm
    })
  }
  //新增工单
  export function workOrderInsert(data){
      return service.request({
          method:"post",
          url:"/workOrder/insert",
          data: data
      })
  }
  //删除工单
  export function workOrderDelete(data){
      return service.request({
          method:"delete",
          url:"/workOrder/delete",
          params:data
      })
  }
  //修改工单
  export function workOrderUpdate(data){
      return service.request({
          method:"post",
          url:"/workOrder/update",
          data
      })
  }
