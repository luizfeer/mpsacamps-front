importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyACMLRwix6QLdVH4XaP09sKak41mtV3VCo',
  authDomain: 'federa-api.firebaseapp.com',
  projectId: 'federa-api',
  storageBucket: 'federa-api.appspot.com',
  messagingSenderId: '285883089269',
  appId: '1:285883089269:web:02ae2cbf57aaf3334e133c'
})

const messaging = firebase.messaging()

// Background Message Handler
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const title = payload.notification.title
  const options = {
    body: payload.notification.body,
    icon: '/icons/icon-128x128.png' // Adjust the path to your icon
  }

  return self.registration.showNotification(title, options)
})
