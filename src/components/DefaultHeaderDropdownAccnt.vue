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
      <b-dropdown-header tag="div" class="text-center"><strong>{{ $t('auth-account-dropdown.account') }}</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" />
        {{ $t('auth-account-dropdown.personal-account') }}
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" />
        {{ $t('auth-account-dropdown.messages') }}
      </b-dropdown-item>
      <b-dropdown-header
          tag="div"
          class="text-center">
        <strong>{{ $t('auth-account-dropdown.settings') }}</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-wrench" />
        {{ $t('auth-account-dropdown.account-settings') }}
      </b-dropdown-item>
      <b-dropdown-item @click="goToLoginPage"><i class="fa fa-lock" /> {{ $t('auth-account-dropdown.logout') }}</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import NonAuthHeadder from "@/components/NonAuthHeadder";
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    NonAuthHeadder,
    AppHeaderDropdown
  },
  data: () => {
    return {

    }
  },
  methods: {
    goToLoginPage: function() {
     this.$store.dispatch("LOGOUT");
    }
  },
}
</script>

