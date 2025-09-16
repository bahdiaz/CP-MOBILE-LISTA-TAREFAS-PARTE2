
import React, { useEffect, useState, useContext, createContext } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithCredential } from 'firebase/auth'
import * as AuthSession from 'expo-auth-session'
import { auth } from './firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleAuthProvider } from 'firebase/auth'
import Constants from 'expo-constants'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async u => {
      setUser(u)
      setInitializing(false)
      if (u) await AsyncStorage.setItem('@auth_user', u.uid)
      else await AsyncStorage.removeItem('@auth_user')
    })
    return unsub
  }, [])
  const signInEmail = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const signUpEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const signOutApp = () => signOut(auth)
  const signInGoogle = async () => {
    const clientId = Constants.expoConfig.extra.googleClientId || process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true })
    const discovery = { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth", tokenEndpoint: "https://oauth2.googleapis.com/token" }
    const res = await AuthSession.startAsync({
      authUrl: `${discovery.authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent('profile email')}`
    })
    if (res.type === 'success' && res.params.access_token) {
      const credential = GoogleAuthProvider.credential(null, res.params.access_token)
      await signInWithCredential(auth, credential)
    }
  }
  return <Ctx.Provider value={{ user, initializing, signInEmail, signUpEmail, signOutApp, signInGoogle }}>{children}</Ctx.Provider>
}

export function useAuth() {
  return useContext(Ctx)
}
