import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: () =>
            import ("../views/login/index.vue")
    },
    {
        path: "/login",
        name: "login",
        // redirect: "/layout",
        component: () =>
            import ("../views/login/index.vue")
    },
    {
        path: "/layout",
        name: "layout",
        component: () =>import ("../views/layout"),
        children: [
            {
                path: "youpinForm",
                name: "youpinForm",
                component: () =>import ("../views/form-manage/youpinForm.vue")
            },
            {
                path: "dazongliaoForm",
                name: "dazongliaoForm",
                component: () =>import ("../views/form-manage/dazongliaoForm.vue")
            },
            {
                path: "wharfForm",
                name: "wharfForm",
                component: () =>import ("../views/form-manage/wharfForm.vue")
           },
           {
                path: "storeroomForm",
                name: "storeroomForm",
                component: () =>import ("../views/form-manage/storeroomForm.vue")
            },
            {
                path: "plan",
                name: "plan",
                component: () =>import ("../views/form-manage/plan.vue")
            },
            {
                path: "youpinCount",
                name: "youpinCount",
                component: () =>import ("../views/count/youpinCount.vue")
            },
            {
                path: "dazongliaoCount",
                name: "dazongliaoCount",
                component: () =>import ("../views/count/dazongliaoCount.vue")
            },
           {
                path: "storeroomCount",
                name: "storeroomCount",
                component: () =>import ("../views/count/storeroomCount.vue")
            },
            {
                path: "stockBatch",
                name: "stockBatch",
                component: () =>import ("../views/count/stockBatch.vue")
            },
            {
                path: "purchase",
                name: "purchase",
                component: () =>import ("../views/purchase/purchase.vue")
            },
            {
                path: "purchaseIn",
                name: "purchaseIn",
                component: () =>import ("../views/purchase/purchaseIn.vue")
            },
            {
                path: "order",
                name: "order",
                component: () =>import ("../views/report/order.vue")
            },
            {
                path: "servicing",
                name: "servicing",
                component: () =>import ("../views/report/servicing.vue")
            },
            {
                path: "stock",
                name: "stock",
                component: () =>import ("../views/report/stock.vue")
            },
            {
                path: "instock",
                name: "instock",
                component: () =>import ("../views/report/instock.vue")
            },
            {
                path: "permission",
                name: "permission",
                component: () =>import ("../views/set/permission.vue")
            },
            {
                path: "know",
                name: "know",
                component: () =>import ("../views/set/know.vue")
            },
            {
                path: "member",
                name: "member",
                component: () =>import ("../views/set/member.vue")
            },
            {
                path: "logout",
                name: "logout",
                component: () =>import ("../views/set/logout.vue")
            },
            {
                path: "all",
                name: "all",
                component: () =>import ("../views/index/all/all.vue")
            },
            {
                path: "opera",
                name: "opera",
                component: () =>import ("../views/index/opera/opera.vue")
            },
            {
                path: "paintMaterials",
                name: "paintMaterials",
                component: () =>import ("../views/set/paintMaterials.vue")
            },
            {
                path: "PaintInformation",
                name: "PaintInformation",
                component: () =>import ("../views/set/PaintInformation.vue")
            },
            {
                path: "technology",
                name: "technology",
                component: () =>import ("../views/set/technology.vue")
            },
            {
                path: "PositionManagement",
                name: "PositionManagement",
                component: () =>import ("../views/set/PositionManagement.vue")
            },
            {
                path: "Organization",
                name: "Organization",
                component: () =>import ("../views/set/Organization.vue")
            },
            {
                path: "PositionAuthority",
                name: "PositionAuthority",
                component: () =>import ("../views/set/PositionAuthority.vue")
            },
            // {
            //     path: "permission",
            //     name: "permission",
            //     component: () =>import("../views/index/power/index.vue")
            // }//权限路由
        ]
    }
    // {
    //     path: "/index",
    //     name: "index",
    //     component: () =>
    //         import ("../views/index/index.vue"),
    //     children: [{
    //         path: '/power',
    //         name: 'power',
    //         component: () =>
    //             import ('../views/index/power/index.vue')
    //     }]
    // }
];

const router = new VueRouter({
    routes
});

export default router;