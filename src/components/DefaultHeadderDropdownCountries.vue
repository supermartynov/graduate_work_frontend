<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      {{ $t('someMessage') }}
    </template>\
    <template slot="dropdown">

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
