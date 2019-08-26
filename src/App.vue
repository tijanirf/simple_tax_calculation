<template>
  <div id="app" @click.stop="onClick">
    <tax-main />
  </div>
</template>

<script>
import Vue from "vue"
import Tax from '@/views/tax'

Vue.$broker = new Vue();

export default {
  name: 'simple_tax_calculation_app',
  components: {
    'tax-main': Tax, 
  },
  methods: {
    onClick(event) {
      Vue.$broker.$emit("app-click");
    },
  }
}
</script>

<style lang="scss">
@import '~@/styles/base.scss';
</style>
