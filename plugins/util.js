// appにインジェクト
export default ({ app }, inject) => {
  // 非同期処理を並列に行う関数
  inject('pararels', () => {
  })

  // 日付フォーマット関数
  inject('dateFormat', (date) => {
    date = date + ' 00:00:00'
    try {
      date = new Date(date)
      return (date.getMonth() + 1) + '月' + date.getDate() + '日'
    } catch(e) {
      console.log('dateFormatError')
    }
  })

  // 時間フォーマット関数
  inject('timeFormat', (time) => {
    time = '1900-01-01 ' + time + ':00'
    try {
      time = new Date(time)
      return time.getHours() + '時' + time.getMinutes() + '分'
    } catch(e) {
      console.log('timeFormatError')
    }
  })
 }


// function pararels(...promises: (() => Promise<any>)[]) {
//   return Promise.all(promises.map(p => p()));
// }
