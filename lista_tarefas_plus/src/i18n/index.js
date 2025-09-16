
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

const resources = {
  en: {
    translation: {
      signIn: "Sign in",
      email: "Email",
      password: "Password",
      createAccount: "Create account",
      or: "or",
      signInWithGoogle: "Sign in with Google",
      tasks: "Tasks",
      newTask: "New Task",
      title: "Title",
      description: "Description",
      dueDate: "Due date",
      save: "Save",
      cancel: "Cancel",
      settings: "Settings",
      theme: "Theme",
      language: "Language",
      dark: "Dark",
      light: "Light",
      logout: "Logout",
      scheduleNotif: "Schedule notification",
      fetchQuote: "Fetch quote"
    }
  },
  pt: {
    translation: {
      signIn: "Entrar",
      email: "E-mail",
      password: "Senha",
      createAccount: "Criar conta",
      or: "ou",
      signInWithGoogle: "Entrar com Google",
      tasks: "Tarefas",
      newTask: "Nova Tarefa",
      title: "Título",
      description: "Descrição",
      dueDate: "Prazo",
      save: "Salvar",
      cancel: "Cancelar",
      settings: "Configurações",
      theme: "Tema",
      language: "Idioma",
      dark: "Escuro",
      light: "Claro",
      logout: "Sair",
      scheduleNotif: "Agendar notificação",
      fetchQuote: "Buscar frase"
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

AsyncStorage.getItem('@lang').then(l => { if (l) i18n.changeLanguage(l) })

export default i18n
