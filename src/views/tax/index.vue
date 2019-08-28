<template>
  <div class="tax">
    <h1 class="title">Simple Tax Calculation App</h1>
    <div class="tax__row">
      <Input class="tax__row__input" label="Monthly Salary" :value.sync="monthlySalary" type="number"/>
    </div>
    <div class="tax__row">
      <Dropdown class="tax__row__dropdown" label="Profile" :value.sync="profile" :options="options"/>
    </div>
    <div class="tax__row" v-if="validationMessage">
      <span>{{validationMessage}}</span>
    </div>
    <div class="tax__result">
      <span>Annual Taxable Income: {{taxableIncome | formatMoney}}</span>
      <span>Annual Tax Income: {{result | formatMoney}}</span>
    </div>
    <div class="tax__buttons">
      <button class="btn-regular secondary" @click="reset">Reset</button>
      <button class="btn-regular primary" @click="calculate">Calculate</button>
    </div>
  </div>
</template>

<script>
import Input from '@/components/input'
import Dropdown from '@/components/dropdown'
import { formatNumber } from '@/lib/filter'

export default {
  name: 'tax-page',
  components: {
    Input,
    Dropdown
  },
  data() {
    return {
      result: 0,
      taxableIncome: 0,
      monthlySalary: null,
      profile: null,
      validationMessage: null,
      taxSchemes: [
        {
          multiplier: 50000000,
          percentage: 0.05
        },
        {
          multiplier: 200000000,
          percentage: 0.15
        },
        {
          multiplier: 250000000,
          percentage: 0.25
        },
        {
          multiplier: null,
          percentage: 0.3
        },
      ],
      options: [
        {
          id: "1",
          label: "Single",
          value: 54000000
        },
        {
          id: "2",
          label: "Married, No Dependant",
          value: 58500000
        },
        {
          id: "3",
          label: "Married, 1 Dependant",
          value: 63000000
        },
        {
          id: "4",
          label: "Married, 2 Dependant",
          value: 67500000
        },
        {
          id: "5",
          label: "Married, 3 Dependant",
          value: 72000000
        },
      ]
    }
  },
  computed: {
    yearlyIncome() {
      return this.monthlySalary * 12
    }
  },
  methods: {
    resetResult() {
      this.result = 0
      this.taxableIncome = 0
    },
    reset() {
      this.profile = null
      this.monthlySalary = null
      this.validationMessage = null
      this.resetResult()
    },
    validate() {
      if (!this.monthlySalary) {
        this.validationMessage = "Monthly salary cannot be empty."
        this.resetResult()
        return false
      }

      if (!this.profile) {
        this.validationMessage = "Profile cannot be empty."
        this.resetResult()
        return false
      }

      if (this.monthlySalary < 0) {
        this.validationMessage = "Monthly salary must be higher than 0."
        this.resetResult()
        return false
      }

      if (this.yearlyIncome < this.options[0].value) {
        this.validationMessage = "Yearly income must be higher than lowest tax relief profile."
        this.resetResult()
        return false
      }

      return true
    },
    calculate() {
      // Simple input validation
      const isValid = this.validate()

      if (isValid) {
        this.validationMessage = null

        this.taxableIncome = this.yearlyIncome - this.profile
  
        let total = 0
        let exit = false
        let remainder = this.taxableIncome
  
        this.taxSchemes.forEach(scheme => {
          if (exit) {
            // Do nothing, handle if the exit condition is fully met before the loop ends.
          } else if (scheme.multiplier && remainder - scheme.multiplier >= 0) {
            total += (scheme.multiplier * scheme.percentage)
            remainder -= scheme.multiplier
          } else {
            total += (remainder * scheme.percentage)
            exit = true
          }
        })
  
        this.result = total
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>