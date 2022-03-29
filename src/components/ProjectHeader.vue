<template>
  <div>
    <NonAuthHeadder v-if="!this.$store.getters.GET_EMAIL"/>
    <DefaultHeaderDropdownAccnt v-if="$store.getters.GET_EMAIL"/>
  </div>
</template>

<script>
import NonAuthHeadder from "@/components/NonAuthHeadder";
import DefaultHeaderDropdownAccnt from "@/components/DefaultHeaderDropdownAccnt";
export default {
  name: "ProjectHeader",
  components: {
    DefaultHeaderDropdownAccnt,
    NonAuthHeadder
  }
}
</script>

<style scoped>

</style>
