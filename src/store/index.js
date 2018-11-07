/**
 * Created by 都大爽 on 2017/11/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin/admin'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {},

  mutations: {

    /**
     * 设置当前页
     * @param state
     * @param route
     */
    // setCurrentPage (state, route) {
    //   state.currentPage.name = route.name
    //   state.currentPage.path = route.fullPath
    //   state.currentPage.title = route.meta.title
    // }
  },
  actions: {},
  modules: {admin},
  strict: debug
})