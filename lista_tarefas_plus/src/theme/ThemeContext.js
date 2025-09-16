
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

const Ctx = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light')
  useEffect(() => {
    AsyncStorage.getItem('@theme').then(v => { if (v) setMode(v) })
  }, [])
  useEffect(() => {
    AsyncStorage.setItem('@theme', mode)
  }, [mode])
  const paperTheme = useMemo(() => mode === 'dark' ? { ...MD3DarkTheme, dark: true } : { ...MD3LightTheme, dark: false }, [mode])
  const toggle = () => setMode(m => m === 'dark' ? 'light' : 'dark')
  return <Ctx.Provider value={{ mode, toggle, paperTheme }}>{children}</Ctx.Provider>
}

export function useThemeContext() {
  return useContext(Ctx)
}
