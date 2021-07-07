import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import md5 from 'js-md5';
Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/permission' // permission control
//注册全局按钮权限自定指令
Vue.directive('has',{
    inserted: function(el,bindings,vnode){
        console.log(vnode)
        let buttonPermissionV = bindings.value;
        let boolean = vnode.context.$store.state.user.buttonPermission[buttonPermissionV];
        !boolean && el.parentNode.removeChild(el);
     }
});
Vue.use(ElementUI)
Vue.prototype.$md5 = md5;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");