<template>
  <div class="header-title">
    <h1>{{ title }}</h1>
  </div>
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
  font-size: 3rem;
  padding-top: 1.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: .2em;
}
</style>
