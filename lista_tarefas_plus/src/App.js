
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider, useThemeContext } from './theme/ThemeContext'
import { AppNavigator } from './navigation'
import { queryClient } from './query'
import './i18n'
import { AuthProvider } from './services/auth'

function Inner() {
  const { paperTheme } = useThemeContext()
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={paperTheme}>
        <StatusBar style={paperTheme.dark ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
         <Inner />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
