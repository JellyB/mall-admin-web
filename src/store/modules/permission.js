import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 判断是否有权限访问该菜单
 * @param menus 用户角色列表
 * @param route 单个路由信息
 */
function hasPermission(menus, route) {
  if (route.name) {
    const currentMenu = getMenu(route.name, menus)
    if (currentMenu) {
      // 设置菜单的标题、图标和可见性
      if (currentMenu.title != null && currentMenu.title !== '') {
        route.meta.title = currentMenu.title
      }
      if (currentMenu.icon != null && currentMenu.title !== '') {
        route.meta.icon = currentMenu.icon
      }
      if (currentMenu.hidden != null) {
        route.hidden = currentMenu.hidden !== 0
      }
      if (currentMenu.sort != null && currentMenu.sort !== '') {
        route.sort = currentMenu.sort
      }
      return true
    } else {
      route.sort = 0
      if (route.hidden !== undefined && route.hidden === true) {
        route.sort = -1
        return true
      } else {
        return false
      }
    }
  } else {
    return true
  }
}

/**
 * 根据路由名称获取菜单
 * @param name 路由名称
 * @param menus 菜单列表
 */
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (name === menu.name) {
      return menu
    }
  }
  return null
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes 系统配置的权限
 * @param menus 用户菜单
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

/**
 * data 用户菜单
 * 通过用户菜单生成用户路由列表
 */
const actions = {
  generateRoutes({ commit }, data) {
    const { roles, menus } = data
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('超级管理员')) {
        console.log('超级管理员')
        accessedRoutes = asyncRoutes || []
      } else {
        console.log('普通用户')
        accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
      }
      console.log('accessedRoutes', accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
