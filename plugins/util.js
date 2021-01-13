// appにインジェクト
export default ({ app }, inject) => {
  // 非同期処理を並列に行う関数
  inject('pararels', () => {
  })
}


// function pararels(...promises: (() => Promise<any>)[]) {
//   return Promise.all(promises.map(p => p()));
// }
