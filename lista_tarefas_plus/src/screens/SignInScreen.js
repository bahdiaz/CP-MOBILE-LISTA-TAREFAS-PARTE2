
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import { useAuth } from '../services/auth'
import { useTranslation } from 'react-i18next'
import { AuthProvider } from '../services/auth'

export default function SignInScreen() {
  const { signInEmail, signUpEmail, signInGoogle } = useAuth()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin')
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 12 }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center' }}>{t('signIn')}</Text>
      <TextInput label={t('email')} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput label={t('password')} value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={() => mode === 'signin' ? signInEmail(email, password) : signUpEmail(email, password)}>
        {mode === 'signin' ? t('signIn') : t('createAccount')}
      </Button>
      <Button onPress={() => setMode(m => m === 'signin' ? 'signup' : 'signin')}>{mode === 'signin' ? t('createAccount') : t('signIn')}</Button>
      <Text style={{ textAlign: 'center' }}>{t('or')}</Text>
      <Button mode="outlined" onPress={signInGoogle}>{t('signInWithGoogle')}</Button>
    </View>
  )
}
