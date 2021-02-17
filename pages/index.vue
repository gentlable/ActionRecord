<template>
  <div class="index">
    <header>
      <nav>
        <div class="buttons">
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="showCategory"
          >
            カテゴリ登録
          </button>
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="showStart"
          >
            記録開始
          </button>
          <logout-button />
        </div>
      </nav>
    </header>
    <main class="main">
      <div class="content">
        <div class="logs">
          <div class="log" v-for="log in logs">
            <div class="img">
              <img :src="initial_img" alt="" v-if="!log.data.category_img">
              <img :src="log.data.category_img" alt="" v-else>
            </div>
            <div class="description">
              <div class="category">
                {{ log.data.category_name }}
              </div>
              <div class="detail">
                {{ log.data.detail }}
              </div>
            </div>
            <div class="time">
              <div class="start">
                {{ dateFormat(log.data.start_date) }}
                {{ timeFormat(log.data.start_time) }}
              </div>
              <div class="to">～</div>
              <div class="end" v-if="!!log.data.end_date">
                {{ dateFormat(log.data.end_date) }}
                {{ timeFormat(log.data.end_time) }}
              </div>
              <div class="duration" v-if="log.data.end_flg === true">
                {{ calcDiffHhmm(log.data.start_date, log.data.start_time, log.data.end_date, log.data.end_time) }}
              </div>
            </div>
            <div class="buttons">
              <button
                type="button"
                name="button"
                class="btn btn-outline-dark"
                @click="showEdit(log)"
              >
                編集
              </button>
              <button
                type="button"
                name="button"
                class="btn btn-outline-dark"
                v-if="!log.data.end_flg"
                @click="showEnd(log)"
              >
                終了
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 記録開始モーダル -->
    <modal
      name="start"
      classes="start-modal modals"
      :adaptive="true"
    >
      <form class="start-form" @submit.prevent="confirmStart">
        <div class="category">
          <span>カテゴリ：</span>
          <img
            :src="initial_img"
            alt=""
            v-if="category_img==''"
            @click="showSelectCategory"
          >
          <img
            :src="category_img"
            alt=""
            v-else
            @click="showSelectCategory"
          >
          <span class="name">{{ category_name }}</span>
        </div>
        <div class="detail">
          <span>内容：</span>
          <input type="text" name="detail" v-model="detail">
        </div>
        <div class="datetime">
          <span>開始時刻：</span>
          <div class="date">
            <input type="date" name="start_date" v-model="start_date" required>
          </div>
          <div class="time">
            <input type="time" name="start-time" v-model="start_time" required>
          </div>
        </div>
        <!--
          <div class="button-wrapper">
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="setStartDateTime"
          >
            現在時刻
          </button>
        </div>
        -->
        <div class="buttons">
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="cancelStart"
          >
            キャンセル
          </button>
          <button
            type="submit"
            name="button"
            class="btn btn-outline-dark"
            :disabled="is_proccessing"
          >
            OK
          </button>
        </div>
      </form>
    </modal>

    <!-- 記録終了モーダル -->
    <modal
      name="end"
      classes="end-modal modals"
      :adaptive="true"
    >
      <form class="end-form" @submit.prevent="confirmEnd">
        <div class="category">
          <span>カテゴリ：</span>
          <img :src="initial_img" alt="" v-if="category_img==''">
          <img :src="category_img" alt="" v-else>
          <span class="name">{{ category_name }}</span>
        </div>
        <div class="start-datetime">
          <span>開始時刻：</span>
          <div class="date">{{ start_date }}</div>
          <div class="time">{{ start_time }}</div>
        </div>
        <div class="end-datetime">
          <span>終了時刻：</span>
          <div class="date">
            <input type="date" name="end-date" v-model="end_date" required>
          </div>
          <div class="time">
            <input type="time" name="end-time" v-model="end_time" required>
          </div>
          <!--
          <div class="button-wrapper">
            <button
              type="button"
              name="button"
              class="btn btn-outline-dark"
              @click="setEndDateTime"
            >
              現在時刻
            </button>
          </div>
          -->
        </div>
        <div class="buttons">
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="cancelEnd"
          >
            キャンセル
          </button>
          <button
            type="submit"
            name="button"
            class="btn btn-outline-dark"
            :disabled="is_proccessing"
          >
            OK
          </button>
        </div>
      </form>
    </modal>

    <!-- 記録編集モーダル -->
    <modal
      name="edit"
      classes="edit-modal modals"
      :adaptive="true"
    >
      <form class="edit-form" @submit.prevent="confirmEdit">
        <div class="category">
          <span>カテゴリ：</span>
          <img
            :src="initial_img"
            alt=""
            v-if="category_img==''"
            @click="showSelectCategory"
          >
          <img
            :src="category_img"
            alt=""
            v-else
            @click="showSelectCategory"
          >
          <span class="name">{{ category_name }}</span>
        </div>
        <div class="detail">
          <span>内容：</span>
          <input type="text" name="detail" v-model="detail">
        </div>
        <div class="start-datetime">
          <span>開始時刻：</span>
          <div class="date">
            <input type="date" name="start_date" v-model="start_date" required>
          </div>
          <div class="time">
            <input type="time" name="start-time" v-model="start_time" required>
          </div>
          <!--
          <div class="button-wrapper" v-if="end_flg === false">
            <button
              type="button"
              name="button"
              class="btn btn-outline-dark"
              @click="setStartDateTime"
            >
              現在時刻
            </button>
          </div>
          -->
        </div>
        <div class="end-datetime" v-if="end_flg === true">
          <span>終了時刻：</span>
          <div class="date">
            <input type="date" name="end-date" v-model="end_date" required>
          </div>
          <div class="time">
            <input type="time" name="end-time" v-model="end_time" required>
          </div>
          <!--
          <div class="button-wrapper">
            <button
              type="button"
              name="button"
              class="btn btn-outline-dark"
              @click="setEndDateTime"
            >
              現在時刻
            </button>
          </div>
          -->
        </div>
        <div class="buttons">
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="deleteLog"
            :disabled="is_proccessing"
          >
            削除
          </button>
          <button
            type="button"
            name="button"
            class="btn btn-outline-dark"
            @click="cancelEdit"
          >
            キャンセル
          </button>
          <button
            type="submit"
            name="button"
            class="btn btn-outline-dark"
            :disabled="is_proccessing"
          >
            OK
          </button>
        </div>
      </form>
    </modal>

    <!-- カテゴリ選択モーダル -->
    <modal
      name="select-category"
      classes="select-category-modal modals"
      :adaptive="true"
    >
      <div class="categorys">
        <div class="row">
          <div class="category" v-for="category in categorys" @click="setCategory(category)">
            <div class="img">
              <img :src="initial_img" alt="" v-if="category.img_name==''">
              <img :src="category.img_name" alt="" v-else>
            </div>
            <div class="description">
              <div class="category-name">
                {{ category.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrapper">
        <button
          type="button"
          name="button"
          class="btn btn-outline-dark"
          @click="closeSelectCategory"
        >
          閉じる
        </button>
      </div>
    </modal>

    <!-- カテゴリモーダル -->
    <modal
      name="category"
      classes="category-modal modals"
      :adaptive="true"
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
          <img 
            :src="initial_img" 
            alt="" 
            v-if="category_img==''" 
            class="test-img"
             @click="fileUpdload"
          >
          <img 
            :src="category_img" 
            alt="" 
            class="test-img" 
            v-else
            @click="fileUpdload"
          >
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
            ref="fileUpdload"
            @change="onImageUploaded"
            class="btn btn-outline-dark file-button"
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

    <!-- 画像選択モーダル -->
    <modal
      name="select-img"
      classes="select-img-modal modals"
      :adaptive="true"
    >
      <div class="row">
        <div class="category" v-for="img in preset_imgs">
          <div class="img">
            <img
              :src="img"
              alt=""
              class="test-img"
              @click="setImg(img)"
            >
          </div>
        </div>
      </div>
      <button
        type="button"
        name="button"
        class="btn btn-outline-dark"
        @click="closeSelectImg"
      >
        閉じる
      </button>
    </modal>

    <!-- ローディング画面 -->
    <!--
    <div id="loading">
      <div class="spinner"></div>
    </div>
    -->

  </div>
</template>

<script>
import init_img from '~/assets/img/icon.png'
import LogoutButton from '~/components/atoms/button/Logout.vue'

export default {
  components: {
    LogoutButton
  },
  middleware: [
    'checkIndex'
  ],
  data: () => ({
    uid: '',
    lod_id: '',
    category_name: '',
    category_img: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    detail: '',
    end_flg: false,
    logs: [],
    categorys: [],
    recent_end_time: '',
    recent_end_date: '',
    is_proccessing: false,
    preset_imgs: '',
    initial_img: init_img
  }),
  mounted: function () {
    this.uid = this.$getUid()
    // この二つ並列化したい
    this.getLogs()
    this.getCategorys()
    // this.getPresets()
  },
  methods: {
    /*
     * 日付フォーマット
     */
    dateFormat(date) {
      return this.$dateFormat(date)
    },
    /*
     * 時間フォーマット
     */
    timeFormat(time) {
      return this.$timeFormat(time)
    },
    /*
     * 記録のデータをdataにセット
     */
    setLog(log) {
      this.log_id = log.id,
      this.category_name = log.data.category_name,
      this.category_img = log.data.category_img,
      this.start_date = log.data.start_date,
      this.start_time = log.data.start_time,
      this.end_date = log.data.end_date,
      this.end_time = log.data.end_time,
      this.detail = log.data.detail,
      this.end_flg = log.data.end_flg
    },
    /*
     * dataクリア
     */
    clear() {
      this.log_id = '',
      this.category_name = '',
      this.category_img = '',
      this.start_date = '',
      this.start_time = '',
      this.end_date = '',
      this.end_time = '',
      this.detail = '',
      this.end_flg = false
    },
    /*
     * ゼロパディング
     * String パディングしたい数
     * Num 何桁までパディングするか
     */
    padding(num, digits) {
      var result = num
      if (num.length < digits) {
        var zero_padding = ''
        for (let i = 0; i < digits - num.length; i++) {
          zero_padding = zero_padding + '0'
        }
        result = zero_padding + num
      }
      return result
    },
    /*
     * 現在時刻取得
     */
    getTime() {
      var now = new Date()
      var hour = now.getHours() + ''
      var min = now.getMinutes() + ''
      var hour_padding = this.padding(hour, 2)
      var min_padding = this.padding(min, 2)
      var time = hour_padding + ':' + min_padding
      return time
    },
    /*
     * 現在日付取得
     */
    getDate() {
      var now = new Date()
      var year = 1900 + now.getYear()
      var month = 1 + now.getMonth() + ''
      var day = now.getDate() + ''
      var month_padding = this.padding(month, 2)
      var day_padding = this.padding(day, 2)
      var date = year + '-' + month_padding + '-' + day_padding
      return date
    },
    /*
     * 現在日時を開始日時にセット
     */
    setStartDateTime() {
      this.start_date = this.getDate()
      this.start_time = this.getTime()
    },
    /*
     * 現在日時を終了日時にセット
     */
    setEndDateTime() {
      this.end_date = this.getDate()
      this.end_time = this.getTime()
    },
    /*
     * 二つの時刻を元に差分時間を計算、日時分形式で返却
     */
    calcDiffHhmm(start_date, start_time, end_date, end_time) {
      let diffHour = (new Date(end_date + ' ' + end_time) - new Date(start_date + ' ' + start_time)) / (60 * 60 * 1000)
      // 整数部分取得し、時間にセット
      let hour = 0
      if (diffHour > 0)
        hour = Math.floor(diffHour)
      else
        hour = Math.ceil(diffHour)
      // 小数部分を取得、×60して小数切りすて、分にセット
      let min = Math.floor(parseFloat("0."+(String(diffHour)).split(".")[1]) * 60)
      let date = Math.floor(hour / 24)
      hour = hour % 24
      let ans = hour + '時' + min + '分'
      if(!!date) {
        ans = date + '日' + ans
      }
      return ans
    },
    /*
     * 行動記録"logs"取得
     */
    async getLogs() {
      let db = this.$firestore

      const ref = db.collection('user').doc(this.uid).collection('logs')
      let logs = []
      const docs = await ref.get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let log = {
              id: doc.id,
              data: doc.data()
            }
            logs.push(log)
          })
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error)
        })

      // レコード作成日時で降順
      logs.sort(function(a, b) {
        if (a.data.createdAt > b.data.createdAt) {
          return -1
        }
        if (a.data.createdAt < b.data.createdAt) {
          return 1
        }
        return 0
      })
      // 記録開始日時で降順
      logs.sort(function(a, b) {
        if (a.data.start_time > b.data.start_time) {
          return -1
        }
        if (a.data.start_time < b.data.start_time) {
          return 1
        }
        return 0
      })
      logs.sort(function(a, b) {
        if (a.data.start_date > b.data.start_date) {
          return -1
        }
        if (a.data.start_date < b.data.start_date) {
          return 1
        }
        return 0
      })
      this.logs = logs

      // 直近終了時間をセット
      for (let i = logs.length - 1; i >= 0; i--) {
        if (logs[i].data.end_flg == true) {
          this.recent_end_date = logs[i].data.end_date
          this.recent_end_time = logs[i].data.end_time
          break;
        }
      }
    },
    /*
     * 登録カテゴリ"categorys"取得
     */
    async getCategorys() {
      let db = this.$firestore

      // firestoreからカテゴリ情報のリストを取得
      const ref = db.collection('user').doc(this.uid).collection('categorys')
      let categorys_info = []
      const docs = await ref.get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            categorys_info.push(doc.data())
          })
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error)
        })

      // リストのimg_nameを元に画像を取得
      let categorys = []
      await Promise.all(categorys_info.map(
        async category => {
          if(category.img_name != '') {
            const file_path = this.uid + '/categorys/' + category.img_name
            let ref = this.$fireStorage.ref().child(file_path)
            await ref.getDownloadURL().then((url) => {
              categorys.push({
                name: category.name,
                img_name: url,
                createdAt: category.createdAt
              })
            })
          } else {
            categorys.push({
              name: category.name,
              img_name: category.img_name,
              createdAt: category.createdAt
            })
          }
        }
      ))

      // レコード作成日時で昇順
      categorys.sort(function(a, b) {
        if (a.createdAt > b.createdAt) {
          return 1
        }
        if (a.createdAt < b.createdAt) {
          return -1
        }
        return 0
      })
      this.categorys = categorys
    },
    /*
     * カテゴリプリセット取得
     */
    getPresets() {
      // プリセットのコンテキストを生成
      const imgs = require.context('~/assets/img/preset_categorys', true, /\.png$/)
      imgs.keys().forEach(key => (
        console.log(imgs(key)),
        this.preset_imgs.push({
          // コンテキストを返す
          path_long: imgs(key),
          path_short: key
        })
      ))
    },
    /*
     * ログアウト
     */
    logout() {
      let result = confirm('ログアウトしますか？')
      if (result) {
        this.$logout()
        this.$router.push('/login')
      }
    },
    /*
     * 開始時刻入力モーダル開く
     */
    showStart() {
      this.clear()
      this.$modal.show('start')
      this.setStartDateTime()
    },
    /*
    * 開始時刻入力モーダル閉じる
    */
    cancelStart() {
      this.$modal.hide('start')
      this.clear()
    },
    /*
     * 開始時刻入力確定
     */
    async confirmStart() {
      this.is_proccessing = true
      let db = this.$firestore

      // fireStoreに登録
      const res = await db.collection('user').doc(this.uid)
        .collection('logs').add({
          category_name: this.category_name,
          category_img: this.category_img,
          start_date: this.start_date,
          start_time: this.start_time,
          end_date: this.end_date,
          end_time: this.end_time,
          detail: this.detail,
          end_flg: false,
          createdAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })
      this.$modal.hide('start')
      this.is_proccessing = false
      this.clear()
      this.getLogs()
    },
    /*
     * 終了時刻入力モーダル開く
     */
     showEnd(log) {
      this.clear()
      this.$modal.show('end')
      this.setLog(log)
      this.setEndDateTime()
    },
    /*
     * 終了時刻入力モーダル閉じる
     */
    cancelEnd() {
      this.$modal.hide('end')
      this.clear()
    },
    /*
     * 終了時刻入力確定
     */
    async confirmEnd() {
      this.is_proccessing = true
      let db = this.$firestore

      // fireStoreを更新
      const res = await db.collection('user').doc(this.uid)
        .collection('logs').doc(this.log_id).update({
          end_date: this.end_date,
          end_time: this.end_time,
          end_flg: true,
          updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })
      this.$modal.hide('end')
      this.is_proccessing = false
      this.clear()
      this.getLogs()
    },
    /*
     * 記録編集モーダル開く
     */
    showEdit(log) {
      this.clear()
      this.$modal.show('edit')
      this.setLog(log)
    },
    /*
     * 記録編集モーダル閉じる
     */
    cancelEdit() {
      this.$modal.hide('edit')
      this.clear()
    },
    /*
     * 記録編集確定
     */
    async confirmEdit() {
      this.is_proccessing = true
      let db = this.$firestore

      // fireStoreを更新
      const res = await db.collection('user').doc(this.uid)
        .collection('logs').doc(this.log_id).update({
          category_name: this.category_name,
          category_img: this.category_img,
          start_date: this.start_date,
          start_time: this.start_time,
          end_date: this.end_date,
          end_time: this.end_time,
          detail: this.detail,
          end_flg: this.end_flg,
          updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })
      this.$modal.hide('edit')
      this.is_proccessing = false
      this.clear()
      this.getLogs()
    },
    /*
     * 記録削除
     */
    async deleteLog() {
      this.is_proccessing = true
      let db = this.$firestore

      // fireStoreを更新
      const res = await db.collection('user').doc(this.uid)
        .collection('logs').doc(this.log_id).delete()
      this.$modal.hide('edit')
      this.is_proccessing = false
      this.clear()
      this.getLogs()
    },
    /*
     * カテゴリモーダル開く
     */
    showCategory() {
      this.clear()
      this.$modal.show('category')
    },
    /*
     * カテゴリモーダル閉じる
     */
    closeCategory() {
      this.$modal.hide('category')
      this.clear()
    },
    /*
     * カテゴリ画像をDataURLとしてdataにセット
     */
    onImageUploaded(e) {
      // event(=e)から画像データを取得する
      const files = e.target.files
      if (files.length !== 0) {
        const image = files[0]
        console.log(image)
        const reader = new FileReader()
        // imageをreaderにDataURLとしてアタッチする
        reader.readAsDataURL(image)
        // readAsDataURLが完了したあと実行される処理
        reader.onload = () => {
          this.category_img = reader.result
        }
      } else {
        this.category_img = ''
      }
    },
    /*
     * カテゴリ追加
     */
    async addCategory() {
      this.is_proccessing = true
      const data_time = Date.now()

      // // 拡張子
      // let extension = ''
      // // チェック（未実装）
      // // const allowed_extensions = ['.jpeg', '.jpg', '.png']
      // console.log(this.extension.type)
      // let pos = '.' + this.extension.type.lastIndexOf('.')
      // if (pos !== -1) {
      //   extension = filename.slice(pos + 1);
      //   console.log(pos)
      //   // ここに拡張子のチェックをいれたいけどめんどいからパス
      // } else {
      //   console.log('拡張子が一致しません。')
      //   return
      // }
      let img_name = ''
      if (this.category_img != '') {
        img_name = this.category_name + data_time
      }
      let db = this.$firestore

      // fireStoreにカテゴリとして登録
      const res = await db.collection('user').doc(this.uid)
        .collection('categorys').add({
          name: this.category_name,
          img_name: img_name,
          createdAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp()
        })

      if (this.category_img != '') {
        const file_path = this.uid + '/categorys/' + img_name
        let ref = this.$fireStorage.ref().child(file_path)

        // Storageに登録
        await ref.putString(this.category_img, 'data_url').then(function(snapshot) {
        })
      }
      this.is_proccessing = false
      this.clear()
    },
    /*
     * カテゴリ画像選択モーダル開く
     */
    showSelectImg() {
      this.$modal.show('select-img')
    },
    /*
     * カテゴリ画像選択モーダル閉じる
     */
    closeSelectImg() {
      this.$modal.hide('select-img')
    },
    /*
     * 選択した画像をアイコンにセット
     */
    setImg(img) {
      const image = require('~/assets/img/preset_categorys' + img.path_short.substr(1))
      this.category_img = require('~/assets/img/preset_categorys' + img.path_short.substr(1))
      console.log(typeof(img.path_long))
      console.log(typeof(image))
      console.log('~/assets/img/preset_categorys' + img.path_short.substr(1))
      console.log(require('~/assets/img/preset_categorys' + img.path_short.substr(1)))
      this.$modal.hide('select-img')
    },
    /*
     * カテゴリ選択モーダル開く
     */
    showSelectCategory() {
      this.$modal.show('select-category')
    },
    /*
     * カテゴリ選択モーダル閉じる
     */
    closeSelectCategory() {
      this.$modal.hide('select-category')
    },
    /*
     * 選択したカテゴリをセットする
     */
    setCategory(category) {
      this.category_name = category.name
      this.category_img = category.img_name
      this.$modal.hide('select-category')
    },
    /*
     * ファイルアップロードボタン押下
     */
    fileUpdload() {
      this.$refs.fileUpdload.click();
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 700px) {
  .index {
    display: grid;
    grid-template:
      "header header header"
      "...... main   ......"
      "footer footer footer"
      / auto 700px auto;
  }

  main {
    .content {
      margin: auto;
      border-left: 1px solid #cbcbcb;
      border-right: 1px solid #cbcbcb;
      .logs {
        .log {
          height: 120px;
          padding: 0.5rem 0;
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #cbcbcb;
          .img {
            width: 5rem;
            margin: auto 0.5rem;
            img {
              width: 4rem;
              height: 4rem;
              object-fit: contain;
              border-radius: 1rem;
            }
          }
          .description {
            flex: 1;
            max-width: 300px;
            text-align: left;
            .detail {
              font-size:.8rem;
            }
          }
          .time {
            width: 150px;
            margin: 0.5rem;
            .to {
              writing-mode: vertical-lr;
              width: min-content;
              margin: auto;
            }
          }
          .buttons {
            .btn {
              display: block;
              margin: 0.5rem;
              font-size: .8rem;
            }
          }
        }
      }
    }
  }

  /*
  * モーダル
  */

  /* 共通 */
  .modals {
    
  }

  /* 記録開始モーダル */
  .start-modal {
    .start-form {
      margin: 20px;
      text-align: left;
      .category {
        img {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          border-radius: 1rem;
        }
        .name {
          margin: 0 10px;
        }
      }
      .detail {
        margin-top: 10px;
        input {
        }
      }
      .datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .buttons {
        margin-top: 10px;
      }
    }
  }

  /* 記録終了モーダル */
  .end-modal {
    .end-form {
      margin: 20px;
      text-align: left;
      .category {
        img {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          border-radius: 1rem;
        }
        .name {
          margin: 0 10px;
        }
      }
      .start-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
      }
      .end-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .buttons {
        margin-top: 10px;
      }
    }
  }

  /* 記録編集モーダル */
  .edit-modal {
    .edit-form {
      margin: 20px;
      text-align: left;
      .category {
        img {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          border-radius: 1rem;
        }
        .name {
          margin: 0 10px;
        }
      }
      .start-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .end-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .buttons {
        margin-top: 10px;
      }
    }
  }

  /* カテゴリモーダル */
  .category-modal {
    .categorys {
      margin: 10px;
      margin-right: 0px;
      height: 7rem;
      overflow-y: scroll;
      .row {
        .category {
          text-align: center;
          margin: 10px;
          .img {
            width: 5rem;
          }
        }
      }
    }
    .category-form {
      margin: 10px;
      .category-img {
      }
      .category-name {
        margin-top: 15px;
      }
      .buttons {
        margin-top: 15px;
      }
    }
  }

  /* カテゴリ選択モーダル */
  .select-category-modal {
    .categorys {
      margin: 10px;
      margin-right: 0px;
      height: 80%;
      overflow-y: scroll;
      .row {
        .category {
          text-align: center;
          margin: 10px;
          .img {
              width: 5rem;
              height: 4rem;
            img {
              max-width: 5rem;
              max-height: 4rem;
            }
          }
        }
      }
    }
    .button-wrapper {
      margin: 10px;
    }
  }
}

@media screen and (max-width: 700px) {
  .index {
    display: grid;
    grid-template:
      "... header ..."
      "... main   ..."
      "... footer ..."
      / auto minmax(400px, 600px) auto;
  }

  header {
    font-size: .8rem;
  }

  main {
    .content {
      margin: auto;
      border-left: 1px solid #cbcbcb;
      border-right: 1px solid #cbcbcb;
      .logs {
        .log {
          height: 100px;
          padding: 0.5rem 0;
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #cbcbcb;
          .img {
            width: 5rem;
            margin: auto 0.5rem;
            img {
              width: 4rem;
              height: 4rem;
              object-fit: contain;
              border-radius: 1rem;
            }
          }
          .description {
            flex: 1;
            text-align: left;
            font-size: .8rem;
            .detail {
              font-size:.7rem;
            }
          }
          .time {
            width: 120px;
            margin: 0.5rem;
            font-size:.8rem;
            .to {
              writing-mode: vertical-lr;
              width: min-content;
              margin: auto;
            }
          }
          .buttons {
            .btn {
              display: block;
              margin: 0.5rem;
              font-size: .8rem;
            }
          }
        }
      }
    }
  }
  /*
  * モーダル
  */

  /* 共通 */
  .modals > * {
    font-size: .8rem !important;
  }

  .modals .btn {
    font-size: .8rem;
  }

  /* 記録開始モーダル */
  .start-modal {
    .start-form {
      margin: 20px;
      text-align: left;
      .category {
        img {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          border-radius: 1rem;
        }
        .name {
          margin: 0 10px;
        }
      }
      .detail {
        margin-top: 10px;
        input {
        }
      }
      .datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .buttons {
        margin-top: 10px;
      }
    }
  }

  /* 記録終了モーダル */
  .end-modal {
    .end-form {
      margin: 20px;
      text-align: left;
      .category {
        img {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          border-radius: 1rem;
        }
        .name {
          margin: 0 10px;
        }
      }
      .start-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
      }
      .end-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .buttons {
        margin-top: 10px;
      }
    }
  }

  /* 記録編集モーダル */
  .edit-modal {
    .edit-form {
      margin: 20px;
      text-align: left;
      .category {
        img {
          width: 4rem;
          height: 4rem;
          object-fit: contain;
          border-radius: 1rem;
        }
        .name {
          margin: 0 10px;
        }
      }
      .start-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .end-datetime {
        display: flex;
        margin-top: 10px;
        span {
          margin: auto 0;
        }
        .date {
          margin: auto 0;
          margin-left: 10px;
        }
        .time {
          margin: auto 0;
          margin-left: 10px;
        }
        .button-wrapper {
          margin-left: 10px;
        }
      }
      .buttons {
        margin-top: 10px;
      }
    }
  }

  /* カテゴリモーダル */
  .category-modal {
    .categorys {
      margin: 10px;
      margin-right: 0px;
      height: 6rem;
      overflow-y: scroll;
      .row {
        .category {
          text-align: center;
          margin: 5px;
          .img {
            width: 4rem;
          }
        }
      }
    }
    .category-form {
      margin: 10px;
      .category-img {
      }
      .category-name {
        margin-top: 15px;
      }
      .buttons {
        margin-top: 15px;
      }
    }
  }

  /* カテゴリ選択モーダル */
  .select-category-modal {
    .categorys {
      margin: 10px;
      margin-right: 0px;
      height: 80%;
      overflow-y: scroll;
      .row {
        .category {
          text-align: center;
          margin: 10px;
          .img {
              width: 5rem;
              height: 4rem;
            img {
              max-width: 5rem;
              max-height: 4rem;
            }
          }
        }
      }
    }
    .button-wrapper {
      margin: 10px;
    }
  }
}

/*
 * 共通
 */
header {
  grid-area: header;
  border-bottom: 1px solid #cbcbcb;
  text-align: center;
  padding-bottom: 0.5rem;
}

main {
  grid-area: main;
  text-align: center;
}

footer {
  grid-area: footer;
}

.test-img {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  border-radius: 1rem;
}

.row {
  margin: 0;
}

.file-button {
  display: none;
}

/*スクロールバー全体*/
::-webkit-scrollbar {
  width: 10px;
}

/*スクロールバーの軌道*/
::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
}

/*スクロールバーの動く部分*/
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 50, .5);
  border-radius: 10px;
  box-shadow:0 0 0 1px rgba(255, 255, 255, .3);
}




</style>
