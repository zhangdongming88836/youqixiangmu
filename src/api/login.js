import service from "@/utils/request.js"
//登录api
// export function echartss(){
//   return service.request({
//       method:"get",
//       url:"/sta/simple",
//   })
// }
//获取验证码api
export function Hcode(data){
    return service.request({
        method:"get",
        url:"/web/check",
        data
    })

}
//退出API
export function logout(){
    return service.request({
        method:"get",
        url:"/web/logout",
    })
}
//获取系统菜单API
export function menu(){
    return service.request({
        method:"get",
        url:"/sysMenu/indexMenu"
    })
}
//登录的api
export function login(data){
    return service.request({
        method:"post",
        url:"/user/login",
        params:data
    })
}
//目前没有用的接口
export function getInfo(){
    return service.request({
        method:"get",
        url:"/web/menu/indexMenu"
    })
}
//目前没有用的接口
export function mobileLogin(){
    return service.request({
        method:"get",
        url:"/web/menu/indexMenu"
    })
}
