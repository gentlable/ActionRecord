<template>
  <div class="login">
    <header>
      <h2>ログイン</h2>
    </header>
    <div class="content">
      <form @submit.prevent="onSubmit">
        <div class="button-wrapper">
          <button type="submit" name="button" class="btn btn-outline-dark">Googleでログイン</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },
  middleware: [
    'checkLogin'
  ],
  methods: {
    onSubmit() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$fireAuth.signInWithRedirect(provider)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 3rem;
  text-align: center;
  .content {
    .button-wrapper {
      margin: 1.5rem;
    }
  }
}
</style>
