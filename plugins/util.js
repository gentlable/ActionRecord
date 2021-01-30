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

  // 時間⇔日時変換関数
  inject('dateTimeConvert', (time) => {
    try {
      hours = time.slice(0, 2)
      let minutes = time.slice(3, 5)
      let date = Math.floor(hours / 24)
      hours = hours % 24
      return date + '日' + hours + '時' + minutes + '分'
    } catch(e) {
      console.log('dateTimeConvert')
    }
  })
}


// function pararels(...promises: (() => Promise<any>)[]) {
//   return Promise.all(promises.map(p => p()));
// }
