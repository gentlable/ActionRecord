<template>
  <button
    type="button"
    name="button"
    class="btn btn-outline-dark"
    @click="logout"
  >
    カテゴリ登録
  </button>
</template>

<script>
export default {
  methods: {
     /*
     * ログアウト
     */
    logout() {
      let result = confirm('ログアウトしますか？')
      if (result) {
        this.$logout()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
