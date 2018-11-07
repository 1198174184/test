import AdminMain from '../views/layout/main.vue'

/**
 * 后台路由
 */
export const adminRouter = [
  {
    path: '/',
    name: 'admin',
    component: AdminMain,
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: '控制台',
        icon: 'el-icon-menu',
        component: ( )=> import('../views/dashboard.vue')
      },
      {
        path: 'form',
        meta: '自定义表单',
        name: 'form',
        icon: 'el-icon-tickets',
        component: ( )=> import('../views/form.vue')
     }
    ]
  }
]

export const routers = [
    // loginRouter
  ...adminRouter
  // ...adminOtherRouter,
]