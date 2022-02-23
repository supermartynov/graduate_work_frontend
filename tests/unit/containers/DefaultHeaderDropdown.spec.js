import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import DefaultHeaderDropdown from '@/components/DefaultHeaderDropdown'

Vue.use(BootstrapVue)

describe('DefaultHeaderDropdown.vue', () => {
  it('has a name', () => {
    expect(DefaultHeaderDropdown.name).toMatch('DefaultHeaderDropdown')
  })
})
