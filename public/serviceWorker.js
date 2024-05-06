
const serviceWorkerInstance = self

setTimeout(() => {
  serviceWorkerInstance.registration.showNotification('通知テスト！', {
    body: '⭐いやーん、テストだよ。'
  })
}, 3500)

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  clients.openWindow("/");
}, false);