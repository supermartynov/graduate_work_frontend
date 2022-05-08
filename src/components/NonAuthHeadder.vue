<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="/img/avatars/user.jpg"
        width="40"
        height="40"
        class="img-avatar"
        alt="user" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>{{$t('account-dropdown.account')}}</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" />
        <router-link v-bind:to="`/` + $i18n.locale + `/authorization`">{{$t('account-dropdown.login')}}</router-link>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" />
        <router-link v-bind:to="`/` + $i18n.locale + `/registration`">{{$t('account-dropdown.register')}}</router-link>
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import {HeaderDropdown as AppHeaderDropdown} from "@coreui/vue";

export default {
name: "NonAuthHeadder",
components: {
  AppHeaderDropdown
},

}
</script>
<style scoped>

</style>
