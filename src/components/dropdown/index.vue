<template>
  <div class="dropdown" @click.stop="toggle">
    <div class="select">
      <input type="text" v-model="computedSelectedValue" required>
      <label class="select__title">{{label}}</label>
    </div>
    <div class="popup" v-if="isShown">
      <div class="popup__background"
        v-for="option in options" :key="option.id">
        <div class="item" @click.stop="onItemClick(option)">
          <span :class="{ 'icon-check': isChecked(option) }"></span>
          <span class="subhead text">{{ option.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'dropdown-component',
  components: {

  },
  props: {
    label: {
      required: false
    },
    options: {
      required: true
    },
    value: {
      required: false
    },
  },
  data() {
    return {
      valid: undefined,
      message: undefined,
      isShown: false,
      selectedText: '',
      selectedItem: undefined
    }
  },
  mounted() {
    this.$nextTick(function () {
      Vue.$broker.$on('app-click', this.onAppClick.bind(this))
    })
  },
  computed: {
    computedSelectedValue: function () {
      const selectedItem = this.options.filter(x => x.value === this.selectedText).pop()
      if (selectedItem) {
        this.$emit(`update:value`, selectedItem.value)
        return selectedItem.label
      }
      return this.selectedText
    }
  },
  watch: {
    value() {
      if (this.value == null) {
        this.selectedText = ''
        this.selectedItem = null
      }
    }
  },
  methods: {
    onAppClick(sender) {
      if (sender === this) return
      this.isShown = false
    },
    toggle() {
      this.isShown = !this.isShown
    },
    onItemClick(item) {
      this.selectedItem = item
      this.selectedText = item.value
      this.isShown = false
      const params = {
        item: item,
        id: this.itemId
      }
      this.$emit(`selected`, params)
    },
    isChecked(item) {
      return this.selectedItem === item
    },
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>