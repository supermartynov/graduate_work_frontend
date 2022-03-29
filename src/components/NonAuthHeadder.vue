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
      <b-dropdown-header tag="div" class="text-center"><strong>Аккаунт</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" />
        <router-link to="authorization">Войти в личный кабинет</router-link>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" />
       <router-link to="registration">Зарегистрироваться</router-link>
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
}
}
</script>
<style scoped>

</style>
