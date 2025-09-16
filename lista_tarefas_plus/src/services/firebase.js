
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCq1usqNB8ixCCBRbFc_k9SdGEyyuTKB6Q",
  authDomain: "mobile-50728.firebaseapp.com",
  projectId:  "mobile-50728",
  storageBucket: "mobile-50728.firebasestorage.app",
  messagingSenderId: "166877844500",
  appId: "1:166877844500:web:905fde1e28012bd56dc301",
  measurementId: "G-DWBX2FWBD5"
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
