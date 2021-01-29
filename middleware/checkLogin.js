export default async function ({ redirect, app}) {
  if (await app.$auth()) {
    //ログイン中ならメインページへ遷移する
    redirect('/')
  }
}
