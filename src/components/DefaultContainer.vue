<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <h4 class="text-white bg-purple rounded">SQL Trainer</h4>
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none ml-auto">
        <b-nav-item class="d-md-down-none">
          <ProjectHeader/>
        </b-nav-item>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="navItems"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <div>
<!--        <a href="https://coreui.io">CoreUI</a>-->
        <span class="ml-1">&copy; 2022 MEPHI</span>
      </div>
<!--      <div class="ml-auto">-->
<!--        <span class="mr-1">Powered by</span>-->
<!--        <a href="https://coreui.io">CoreUI for Vue</a>-->
<!--      </div>-->
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdown from './DefaultHeaderDropdownAccnt.vue'
import ProjectHeader from "@/components/ProjectHeader";
import axios from "../services/api";

export default {
  name: 'DefaultContainer',
  components: {
    ProjectHeader,
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdown,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      navItems: nav.items,
      auth: ''
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => {console.log('route', route); return route.name || route.meta.label })
    }
  },
  beforeCreate() {
    axios.get("http://localhost:2000/logged")
        .then(res => {
          this.$store.commit('UPDATE_EMAIL', res.data.user.email)
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('UPDATE_EMAIL', null)
        })
  }
}
</script>
