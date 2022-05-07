import Vue from 'vue'
import VueI18n from 'vue-i18n'
import FlagIcon from 'vue-flag-icon'

Vue.use(VueI18n)
Vue.use(FlagIcon)

export const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'ru',
    messages: {
        en: {
            someMessage: 'Hello world'
        },
        ru: {
            someMessage: 'привет мир'
        }
    }
})

