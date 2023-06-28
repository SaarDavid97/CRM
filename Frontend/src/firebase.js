import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBEul52Ii2PxHwqjklD53U0URTV8m7l5FE',
    authDomain: 'crm-project-96d04.firebaseapp.com',
    projectId: 'crm-project-96d04',
    storageBucket: 'crm-project-96d04.appspot.com',
    messagingSenderId: '699600522882',
    appId: '1:699600522882:web:b16af05e678ea398f7ee9b'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

