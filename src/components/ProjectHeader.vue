<template>
  <div>
    <!--NonAuthHeadder v-if="!this.$store.getters.GET_EMAIL"/>
    <DefaultHeaderDropdownAccnt v-if="$store.getters.GET_EMAIL"/-->
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none">
        <DefaultHeaderDropdownAccnt v-if="$store.getters.GET_EMAIL"/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <DefaultHeadderDropdownCountries v-if="$store.getters.GET_EMAIL"/>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <div class="locale-changer">
          <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>      </b-nav-item>
    </b-navbar-nav>
  </div>
</template>

<script>
import NonAuthHeadder from "@/components/NonAuthHeadder";
import DefaultHeaderDropdownAccnt from "@/components/DefaultHeaderDropdownAccnt";
import DefaultHeadderDropdownCountries from "@/components/DefaultHeadderDropdownCountries";
export default {
  name: "ProjectHeader",
  data() {
    return { langs: ['ru', 'en'] }
  },
  components: {
    DefaultHeaderDropdownAccnt,
    NonAuthHeadder,
    DefaultHeadderDropdownCountries
  }
}
</script>

<style scoped>

</style>
