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
        meta: { title: 'Viloyatlar' },

      },
      {
        path: '/location/regions/create',
        name: "Create-Region",
        hidden: true,
        component: () => import('@/views/location/regions/create'),
        meta: { title: 'Yangi viloyat qo\'shish' }
      },
      {
        path: '/location/regions/update/:id',
        name: "Update-Region",
        hidden: true,
        component: () => import('@/views/location/regions/update'),
        meta: { title: "Viloyatni yangilash" }
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
    path: "/packages",
    component: Layout,
    name: 'packages',
    meta: { title: 'Pochta' },
    children: [
      {
        path: '/packages',
        name: "package-index",
        hidden: true,
        component: () => import('@/views/orders/packages/package/index'),

      },
      {
        path: "create",
        name: "create-package",
        hidden: true,
        component: () => import('@/views/orders/packages/package/create'),
        meta: { title: "Qo'shish" }
      },
      {
        path: "/orders/package/package/update/:id",
        name: "update-package",
        hidden: true,
        component: () => import('@/views/orders/packages/package/update'),
        meta: { title: "Qo'shish" }
      }
    ]
  },
  {
    path: '/package-list',
    component: Layout,
    name: 'Package-list',
    // meta: { title: 'Pochtalar ro\'yxati' },
    children: [
      {
        path: '/package-list',
        component: () => import('@/views/orders/packages/package-list/index'),
        meta: {title: "Pochtalar ro'yxati"}
      }
    ]
  },

  {
    path: '/cab-orders',
    component: Layout,
    name: 'cab-orders',
    // meta: {
    //   title: "Yo'lovchilar",
    //   // icon: 'nested'
    // },
    children: [
      {
        path: '/cab-orders',
        component: () => import('@/views/orders/cab-orders/index'),
        meta: { title: "Yo'lovchilar" },
      },
      {
        path: '/cab-orders/create',
        name: "create-cab-order",
        hidden: true,
        meta: { title: "Qo'shish" },
        component: () => import('@/views/orders/cab-orders/create')
      },
      {
        path: '/cab-orders/update/:id',
        name: "update-cab-order",
        hidden: true,
        meta: { title: "Yangilash" },
        component: () => import('@/views/orders/cab-orders/update')
      }

    ]
  },

  {
    path: '/cargos',
    component: Layout,
    // redirect: '/cargos',
    children: [
      {
        path: '/cargos',
        name: 'cargos',
        component: () => import('@/views/cargos/index'),
        meta: { title: 'Yuklar' }
      },
      {
        path: '/cargos/create',
        name: "create-cargo",
        hidden: true,
        meta: { title: "Qo'shish" },
        component: () => import('@/views/cargos/create')
      },
      {
        path: '/cargos/update/:id',
        name: "update-cargo",
        hidden: true,
        meta: { title: "Yangilash" },
        component: () => import('@/views/cargos/update')
      }
    ]
  },

  {
    path: '/transports',
    component: Layout,
    redirect: '/transports',
    // meta: { title: "Transportlar" },
    children: [
      {
        path: '/transports',
        name: 'Transports',
        meta: { title: "Transportlar" },
        component: () => import('@/views/transports/index'),
      },
      {
        path: '/transports/create',
        name: "New-Transport",
        hidden: true,
        meta: { title: "Qo'shish" },
        component: () => import('@/views/transports/create'),

      },
      {
        path: '/transports/update/:id',
        name: "Update-Transport",
        hidden: true,
        component: () => import('@/views/transports/update'),

      }
    ]
  },

  {
    path: '/storages',
    redirect: "/storages",
    component: Layout,
    meta: { title: 'Filiallar' },
    children: [
      {
        path: '/storages',
        name: 'storage',
        component: () => import('@/views/storages/index'),
        meta: { title: 'Filiallar' }
      },
      {
        path: "/storages/create",
        name: "create-storage",
        hidden: true,
        component: () => import('@/views/storages/create'),
        meta: { title: "Qo'shish" }
      },
      {
        path: "/storages/update/:id",
        name: "update-storage",
        hidden: true,
        meta: {title: "Yangilash"},
        component: () => import('@/views/storages/update')
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news',
    meta: {title: "Yangiliklar"},
    children: [
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/news/index'),
        meta: { title: 'Yangiliklar' },
      },
      {
        path: '/news/create',
        name: "create-news",
        hidden: true,
        component: () => import('@/views/news/create'),
        meta: { title: "Qo'shish" }
      },
      {
        path: '/news/update/:id',
        name: "update-news",
        hidden: true,
        component: () => import('@/views/news/update'),
        meta: { title: "Yangilash" }
      }
    ]
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
