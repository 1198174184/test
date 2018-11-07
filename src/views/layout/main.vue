<template>
    <div class="main-container container-fluid p-0">
        <div class="row no-gutters h-100">
            <div class="col-auto sidebar-container">
                <side-bar></side-bar>
            </div>
            <div class="col">
                <div class="body-container">
                    <layout-header></layout-header>
                    <!--<tab-bar></tab-bar>-->
                    <div class="page-container container-fluid mt-3">
                        <keep-alive :include="cachePage">
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import header from './header.vue'
  import SideBar from './sidebar.vue'
  import { mapState } from 'vuex'

  // import routerConfig from 'assets/js/router/index'

  export default {
    components: {
      'layout-header': header,
      SideBar
    },
    computed: {
      ...mapState({
        hideMenuText: state => state.admin.systemHideMenuText,
        cachePage: 'cachePage'
      })
    }
  }
</script>