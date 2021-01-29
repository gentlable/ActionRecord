if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/pwa/sw.js')
      .then(
        (reg) => {
          console.log('Service worker registered.', reg)
        },
        (error) => {
          console.log(error)
        });
}