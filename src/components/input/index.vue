<template>
  <div class="input">
    <input v-model="inputValue" :type="type" required>
    <label>{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'input-component',
  components: {

  },
  props: {
    label: {
      required: false
    },
    value: {
      required: false
    },
    type: {
      required: false
    }
  },
  data() {
    return {
      inputValue: undefined
    }
  },
  mounted() {
    this.inputValue = this.value
  },
  watch: {
    inputValue() {
      this.$emit(`update:value`, this.inputValue)
    },
    value() {
      this.inputValue = this.value
    },
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>