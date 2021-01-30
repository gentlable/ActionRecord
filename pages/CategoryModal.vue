<template>
    <!-- カテゴリモーダル -->
    <modal
      name="category"
      class="category-modal"
      :width="'50%'"
      :height="'60%'"
      :adaptive="true"
      :scrollable="true"
      :draggable="true"
    >
      <!-- カテゴリ一覧 -->
      <div class="categorys">
        <div class="row">
          <div class="category" v-for="category in categorys">
            <div class="img">
              <img :src="initial_img" alt="" v-if="category.img_name==''" class="test-img">
              <img :src="category.img_name" alt="" class="test-img" v-else>
            </div>
            <div class="description">
              <div class="category-name">
                {{ category.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- カテゴリ追加フォーム-->
      <form class="category-form" @submit.prevent="addCategory()">
        <div class="category-img">
          アイコン
          <img :src="initial_img" alt="" v-if="category_img==''" class="test-img">
          <img :src="category_img" alt="" class="test-img" v-else>
          <!-- プリセット作るのよくわからんから一旦マスク -->
          <!--
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="showSelectImg"
          >
            プリセットから選択する
          </button>
          -->
          <!-- type="file"はv-model非対応なので@changeでメソッドを呼んで実装 -->
          <input
            type="file"
            name="category-img"
            @change="onImageUploaded"
            class="btn btn-outline-dark"
          >
        </div>
        <div class="category-name">
          カテゴリ
          <input type="text" name="category-name" v-model="category_name"required>
        </div>
        <div class="buttons">
          <button
            type="submit"
            name="button"
            class="btn btn-outline-dark"
            :disabled="is_proccessing"
          >
            カテゴリ追加
          </button>
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="closeCategory"
          >
            閉じる
          </button>
        </div>
      </form>
    </modal>
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
