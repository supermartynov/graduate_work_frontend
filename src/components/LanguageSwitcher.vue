<template>
  <div>
    <div>
      <b-dropdown size="sm" text="sm" id="dropdown-2" variant="outline" class="m-md-2">
        <template v-slot:button-content>
          {{$t('langSwitcher')}}
        </template>
        <b-dropdown-item @click="setLocale('ru')">Русский</b-dropdown-item>
        <b-dropdown-item @click="setLocale('en')">English</b-dropdown-item>
        <!--b-dropdown-item>  <img src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/icons/flags/FR.png" /> Français</b-dropdown-item-->
      </b-dropdown>
    </div>

  </div>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'LanguageSwitcher',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {

    }
  },
  methods: {
    setLocale: function (locale) {
      this.$i18n.locale = locale
      this.$router.push({
        params: { lang: locale }
      })
      this.$router.go()
    }
  },
}
</script>
