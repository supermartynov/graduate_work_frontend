<template>
  <div>
    <!--NonAuthHeadder v-if="!this.$store.getters.GET_EMAIL"/>
    <DefaultHeaderDropdownAccnt v-if="$store.getters.GET_EMAIL"/-->
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none mr-2">
        <LanguageSwitcher/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none"  v-if="!this.$store.getters.GET_EMAIL">
        <NonAuthHeadder/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none" v-if="$store.getters.GET_EMAIL">
        <DefaultHeaderDropdownAccnt/>
      </b-nav-item>
    </b-navbar-nav>
  </div>
</template>

<script>
import NonAuthHeadder from "@/components/NonAuthHeadder";
import DefaultHeaderDropdownAccnt from "@/components/DefaultHeaderDropdownAccnt";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default {
  name: "ProjectHeader",
  data() {
    return {langs: ['ru', 'en']}
  },
  components: {
    LanguageSwitcher,
    DefaultHeaderDropdownAccnt,
    NonAuthHeadder,
  }
}
</script>

<style scoped>

</style>
