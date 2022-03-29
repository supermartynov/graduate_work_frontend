import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import DefaultHeaderDropdown from '@/components/DefaultHeaderDropdownAccnt.vue'

Vue.use(BootstrapVue)

describe('DefaultHeaderDropdownAccnt.vue', () => {
  it('has a name', () => {
    expect(DefaultHeaderDropdown.name).toMatch('DefaultHeaderDropdown')
  })
})
