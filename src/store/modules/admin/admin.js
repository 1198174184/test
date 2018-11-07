/**
 * Created by 都大爽 on 2017/11/20.
 */
// import selectApi from '../../api/admin/getSelectList'
// import assetsApi from '../../api/admin/assets'
// import App from 'assets/js/libs/admin/app'

const debug = process.env.NODE_ENV !== 'production'

const state = {
  /**
   * 页面标题
   */
  defaultTitle: '系统-',
  /**
   * 当前页
   */
  currentPageName: '',
  currentPath: [
    {
      title: '首页',
      path: '',
      name: 'home_index'
    }
  ],
  /**
   * 菜单相关
   */
  menuList: [],
  openedMenuNames: [],
  activeName: '',
  /**
   * 面包屑
   */
  breadcrumbItems: [{
    title: '首页',
    path: '',
    name: 'home_index'
  }],
  /**
   * 隐藏目录导航
   */
  systemHideMenuText: false,
  /**
   * 用户信息
   */
  user: {
    name: '',
    email: '',
    mobile: '',
    avatar: '../../../images/portrait.png',
    permissions: [], //权限列表
    can: function (permission) {
      return this.permissions.findIndex(item => item === permission) > -1
    }
  }

}

const getters = {}

const actions = {}

const mutations = {
  /**
   * 变更标题
   * @param state
   * @param title
   */
  // setTitle (state, title = '') {
  //   state.title = title
  //   document.title = '崇光科技-' + state.title
  // },
  /**
   * 设置当前用户
   * @param state
   * @param user
   */
  setUser (state, user) {
    debug && console.log(user)
    state.user.id = user.id
    state.user.name = user.name
    state.user.email = user.email
    state.user.mobile = user.mobile
    state.user.permissions = user.permissions
  },
  setCurrentPath (state, pathArr) {
    state.currentPath = pathArr
  },
  /**
   * 菜单相关
   */
  setMenuList (state, menulist) {
    state.menuList = menulist
  },
  /**
   *
   * @param state
   * @param appRouter
   */
  updateMenulist (state, appRouter) {
    state.menuList = checkMenuItem(appRouter)
  },
  updateOpenedMenu (state, route) {
    let matched = route.matched
    let names = []
    matched.forEach((item, index) => {
      if (item.name !== route.name) {
        names.push(item.name)
      }
    })
    state.activeName = route.name
    state.openedMenuNames = names
  },
  /**
   * 面包屑相关
   */
  updateBreadcrumb (state, route) {
    let matched = route.matched
    console.log(matched)
    let items = [{
      title: '首页',
      routeName: 'admin-dashboard'
    }]
    if (route.name !== 'admin-dashboard') {
      matched.forEach((item, index) => {
        if (item.name === route.name) {
          items.push({
            title: item.meta.title,
            routeName: item.name,
            active: true
          })
        } else {
          items.push({
            title: item.meta.title,
            routeName: item.name,
            active: false
          })
        }
      })
    }

    state.breadcrumbItems = items
  },
  setPageTitle (state, title) {
    document.title = state.defaultTitle + title
    state.currentPageName = title
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}

/**
 *
 */
function checkMenuItem (items) {
  let handledItems = []
  items.forEach((item, index) => {
    if (item.meta && item.meta.showOnMenu) {

        let handledItem = {
          title: item.meta.title,
          icon: item.meta.icon,
          routeName: item.name
        }
        if (item.children) {
          let children = checkMenuItem(item.children)
          if (children.length === 1) {
            handledItem = children[0]
          } else {
            handledItem.children = children
          }
        }
        handledItems.push(handledItem)
    }
  })
  return handledItems
}
