<template>
  <h4 class="header-title">{{ title }}</h4>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}
</style>
