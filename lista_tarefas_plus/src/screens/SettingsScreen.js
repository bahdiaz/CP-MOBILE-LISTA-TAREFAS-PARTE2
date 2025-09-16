
import React, { useState } from 'react'
import { View } from 'react-native'
import { Appbar, List, Switch, Button } from 'react-native-paper'
import { useThemeContext } from '../theme/ThemeContext'
import i18n from '../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../services/auth'
import { useNavigation } from '@react-navigation/native'

export default function SettingsScreen() {
  const nav = useNavigation()
  const { mode, toggle } = useThemeContext()
  const [lang, setLang] = useState(i18n.language)
  const { signOutApp } = useAuth()
  const changeLang = async l => { setLang(l); i18n.changeLanguage(l); await AsyncStorage.setItem('@lang', l) }
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title="Configurações" />
      </Appbar.Header>
      <List.Section>
        <List.Item title="Tema" description={mode} right={() => <Switch value={mode === 'dark'} onValueChange={toggle} />} />
        <List.Item title="Idioma" description={lang.toUpperCase()} right={() => (
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => changeLang('pt')}>PT</Button>
            <Button onPress={() => changeLang('en')}>EN</Button>
          </View>
        )} />
        <List.Item title="Sair" onPress={signOutApp} />
      </List.Section>
    </View>
  )
}
