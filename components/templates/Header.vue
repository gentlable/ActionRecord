<template>
  <nav class="header">
    <app-title title="ActionRecord" />
  </nav>
</template>

<script>
import HeaderTitle from '~/components/atoms/text/HeaderTitle.vue'
import AppTitle from '~/components/atoms/text/AppTitle.vue'
import LogoutButton from '~/components/atoms/button/Logout.vue'
import SubmitCategoryButton from '~/components/atoms/button/SubmitCategory.vue'

export default {
  components: {
    AppTitle,
    HeaderTitle,
    LogoutButton,
    SubmitCategoryButton
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width:992px) {
  nav {
    margin: auto;
    width: 800px;
  }
}

@media screen and (max-width:992px) {
  nav {
    margin: auto;
  }
}
</style>
