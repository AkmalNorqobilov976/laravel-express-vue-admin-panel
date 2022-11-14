import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/user',
    name: 'Users',
    meta: { title: 'Foydalanuvchilar' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/users/user'),
        meta: { title: 'Foydalanuvchilar' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/users/role'),
        meta: { title: 'Foydalanuvchi turlari' }
      }
    ]
  },


  {
    path: '/location',
    component: Layout,
    redirect: '/location/regions',
    meta: { title: 'Manzil' },
    children: [
      {
        path: 'regions',
        name: 'Regions',
        component: () => import('@/views/location/regions/index'),
        meta: { title: 'Viloyatlar' }
      },
      {
        path: 'districts',
        name: 'Districts',
        component: () => import('@/views/location/districts/index'),
        meta: { title: 'Tumanlar' }
      }
    ]
  },

  {
    path: '/orders',
    component: Layout,
    // redirect: '/orders/packages/package',
    name: 'Orders',
    meta: {
      title: 'Buyurtmalar',
      // icon: 'nested'
    },
    children: [
      {
        path: '/packages',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Packages',
        meta: { title: 'Buyurtmalar' },
        children: [
          {
            path: '/package',
            component: () => import('@/views/orders/packages/package/index'),
            name: 'Buyurtma',
            meta: { title: 'Buyurtma' }
          },
          {
            path: '/package-list',
            component: () => import('@/views/orders/packages/package-list/index'),
            name: 'Package-list',
            meta: { title: 'Buyurtmalar ro\'yxati' },
          },

        ]
      },
      {
        path: '/car-orders',
        name: 'Car-orders',
        component: () => import('@/views/orders/car-orders/index'),
        meta: { title: "Yo'lda" }
      },

    ]
  },

  {
    path: '/cargos',
    component: Layout,
    // redirect: '/cargos',
    children: [{
      path: '/cargos',
      name: 'Yuklar',
      component: () => import('@/views/cargos/index'),
      meta: { title: 'Yuklar' }
    }]
  },

  {
    path: '/transports',
    component: Layout,
    redirect: '/transports',
    children: [{
      path: '/transports',
      name: 'Transportlar',
      component: () => import('@/views/transports/index'),
      meta: { title: 'Transportlar' }
    }]
  },

  {
    path: '/storages',
    component: Layout,
    redirect: '/storages',
    children: [{
      path: '/storages',
      name: 'Omborxona',
      component: () => import('@/views/storages/index'),
      meta: { title: 'Omborxona' }
    }]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news',
    children: [{
      path: '/news',
      name: 'Yangiliklar',
      component: () => import('@/views/news/index'),
      meta: { title: 'Yangiliklar' }
    }]
  },

  {
    path: '/helpers',
    component: Layout,
    redirect: '/helpers',
    children: [{
      path: '/helpers',
      name: 'Xizmat ko\'rsatish',
      component: () => import('@/views/helpers/index'),
      meta: { title: 'Xizmat ko\'rsatish' }
    }]
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
