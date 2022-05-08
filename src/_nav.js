import {i18n} from "@/plugin/i18n";
import Vue from 'vue'
import { useI18n } from 'vue-i18n';

export default {
  items: [
    {
      name: i18n.tc('nav.topics'),
      url: `/${i18n.locale}/topics`,
      icon: 'icon-layers',
    },
    {
      name: i18n.tc('nav.tasks'),
      url: `/${i18n.locale}/tasks`,
      icon: 'icon-note',
    }
  ]
}
