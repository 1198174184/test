<template>
    <div class="container-fluid main-header-container">
        <nav class="navbar  align-items-center p-0 py-1 border-bottom">
            <ul class="navbar-nav flex-row align-items-center ml-md-auto">
                <li class="nav-item ml-2 d-flex align-items-center">
                    <el-dropdown @command="handleCommand" class="mr-2">
                      <span class="el-dropdown-link">
                        用户名<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                            <el-dropdown-item command="resetpass">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <img class="user-avator img-fluid rounded-circle" src="../../assets/images/portrait.png" />
                </li>
            </ul>
        </nav>
        <div class="row header-title-container py-3 align-items-center border-bottom">
            <div class="col">
                <span class="h5">{{currentPageName}}</span>
            </div>
            <!--<div class="col">-->
            <!--<bs4-breadcrumb :items="breadcrumbItems"-->
            <!--breadcrumbClass="d-flex align-items-end float-right m-0 p-0"></bs4-breadcrumb>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'AdminLayoutHeader',
    data () {
      return {
        messageCount: 0
      }
    },
    computed: {
      ...mapState({
        currentPageName: state => state.admin.currentPageName
      })
    },
    methods: {
//        登出
      logout(){
         return axios.post('admin/logout').then(function () {
//             刷新页面
                 window.location.reload();
         });
      },
      handleCommand (name) {
        switch (name) {
          case 'profile':
            this.$router.push({name: 'profile'})
            break
            case 'resetpass':
                this.$router.push({name: 'resetpass'})
                break
            case 'logout':
            this.logout()

        }
      }
    }
  }
</script>
