<template>
    <div class="sidebar-container " v-show="!hideMenuText">
        <div class="logo-container d-flex align-items-center">
            <img src="../../assets/images/logo.png" key="max-logo" class="m-auto"/>
        </div>
        <el-menu default-active="dashboard" class="menu-sidebar" @select="onMenuSelect">
            <template v-for="items in menuList" >
                <template v-for="item in items.children" >
                    <el-menu-item :index="item.name">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.meta}}</span>
                    </el-menu-item>
                </template>

            </template>
        </el-menu>
    </div>
</template>

<script>
  import { adminRouter } from '@/router/admin'
  import { mapState } from 'vuex'
  export default {
    name: 'Sidebar',
    data () {
      return {
        currentPageName: this.$route.name,
        openedSubmenuArr: [this.$route.matched[0].name]
      }
    },
    props: {
      slotTopClass: String,
      iconSize: Number
    },
    methods: {
      onMenuSelect (index, indexPath) {
        this.$router.push({
          name: index
        })
      },
    },
    computed: {
      ...mapState({
        hideMenuText: state => state.admin.systemHideMenuText
      }),
      menuList () {
        return adminRouter
      }
    },
//    updated () {
//      this.$nextTick(() => {
//        this.$refs.sideMenu.updateOpened()
//      })
//    },
  }
</script>
