export function Email(val){
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(val)?false:true
}
export function Phon(val){
    let reg = /^1[3-9][0-9]{9}$/
    return !reg.test(val)?false:true
}
export function Landline(val){
    let reg = /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/
    return !reg.test(val)?false:true
}
export function numb(val){
    // let reg = /^[0-9\.]+$/
    let reg = /^([0-9]+||[0-9]+\.[0-9]+)$/
    return !reg.test(val)?false:true
}