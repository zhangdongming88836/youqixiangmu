export default{
    inserted(el,bindings,vnode){
       console.log(vnode)
       let buttonPermissionV = bindings.value;
       let boolean = vnode.context.$store.state.user.buttonPermission[buttonPermissionV];
       !boolean && el.parentNode.removeChild(el);
    }
}