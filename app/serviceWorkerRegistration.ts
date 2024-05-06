export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const worker = await navigator.serviceWorker.register('/serviceWorker.js')
      console.log('Service Worker registered successfully')
      return worker
    } catch (error) {
      console.log('Service Worker registration failed:', error)
    }
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          console.log('granted!')
        }
      })  
    } else {
      console.log('already granted!')      
    }
  }
}