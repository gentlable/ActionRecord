// appにインジェクト
export default ({ app }, inject) => {
  // authが以下の関数を示す
  inject('auth', () => {
    // ログイン状態を返却
    return new Promise((resolve) => {
      app.$fireAuth.onAuthStateChanged((auth) => {
        resolve(auth || null)
      })
    })
  }),
  // ログアウト
  inject('logout', () => {
    app.$fireAuth.onAuthStateChanged( (user) => {
      app.$fireAuth.signOut().then(()=>{
        console.log("ログアウトしました");
      })
      .catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`)
      })
    })
  }),
  // firebase uidを取得
  inject('getUid', () => {
    return app.$fireAuth.currentUser.uid
  })
}
