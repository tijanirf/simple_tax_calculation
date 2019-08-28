import Vue from "vue"
import formatMoney from 'accounting-js/lib/formatMoney.js'

export const formatNumber = value => {
  return formatMoney(value, { symbol: ``, precision: 0, thousand: `.` })
}

Vue.filter('formatMoney', function (value) {
  return 'Rp ' + formatNumber(value)
})
