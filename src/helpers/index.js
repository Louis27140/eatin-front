import Vue from 'vue'

import formHelpers from './formHelpers'

export default {
  install: () => {
    Vue.prototype.formhelpers = formHelpers
    Vue.formHelpers = formHelpers
  }
}