import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

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

