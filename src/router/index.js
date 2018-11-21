import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    }
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/dynamic-table',
    name: 'table',
    meta: {
      title: 'Table',
      icon: 'table',
      roles: ['admin']
    },
    children: [
      {
        path: 'dynamic-table',
        component: () => import('@/views/table/approveTestTable'),
        name: 'approveTable',
        meta: { title: 'approveTable' }
      },
      {
        path: 'drag-table',
        component: () => import('@/views/table/complexTable'),
        name: 'complexTable',
        meta: { title: 'complexTable' }
      },
      {
        path: 'identity-table',
        component: () => import('@/views/table/traderIdentityVerification'),
        name: 'traderIdentityVerification',
        meta: { title: 'traderIdentityVerification' }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/fe-error',
    name: 'monitor',
    meta: {
      title: 'monitor',
      icon: 'table',
      roles: ['admin']
    },
    children: [
      {
        path: 'fe-error',
        component: () => import('@/views/monitor/error/index'),
        name: 'Monitor',
        meta: { title: 'Monitor' }
      },
      {
        path: 'fe-device',
        component: () => import('@/views/monitor/device/index'),
        name: 'Device',
        meta: { title: 'Device' }
      }
    ]
  }
]
