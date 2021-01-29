export default async function ({ redirect, app}) {
  if (!await app.$auth()) {
    //ログイン中でないならログインページへ遷移する
    redirect('/login')
  }
}
