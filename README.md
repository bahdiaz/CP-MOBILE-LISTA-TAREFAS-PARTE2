# Lista Tarefas Plus 📱⚡

RM'S
BÁRBARA DIAS SANTOS - RM556974
NATASHA LOPES - RM554816
JUAN PABLO RUIZ SOUZA - RM557727

LINK VÍDEO 
https://youtu.be/pwBtuRnKu4o


[![Expo](https://img.shields.io/badge/Expo-SDK%2051-000?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-61dafb?logo=react)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-ffca28?logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-licença)

Aplicativo de **lista de tarefas** com autenticação (Google + e-mail/senha), **login persistente**, **sincronização em tempo real** no Firestore, **tema claro/escuro**, **i18n (PT/EN)**, **notificações locais** e **TanStack Query** para buscar frase motivacional.

> Projeto pensado para **entrega acadêmica**: inclui requisitos, roteiro de vídeo, passos de build (APK) e troubleshooting.

---

## ✨ Funcionalidades

- 🔐 **Autenticação** com **Google** e **E-mail/Senha** (Firebase Auth)
- 🔁 **Login persistente** (auto-login com `onAuthStateChanged`)
- ☁️ **Firestore por usuário**: `users/{uid}/tasks/{taskId}`
- 🔄 **Tempo real**: stream com `onSnapshot`
- 🌓 **Tema claro/escuro** com persistência (`AsyncStorage`)
- 🌎 **Internacionalização** **PT/EN** (troca dinâmica)
- 🔔 **Notificações locais** (agendadas por tarefa)
- 📡 **TanStack Query** consumindo API externa (frase motivacional no header)

---

## 🧱 Tecnologias

- **Expo** (SDK 51) • **React Native 0.74**
- **React Navigation** (`@react-navigation/native-stack`)
- **React Native Paper** (UI)
- **Firebase v10** (Auth + Firestore)
- **i18next + react-i18next**
- **@tanstack/react-query**
- **expo-notifications**
- **AsyncStorage**

---

## 📂 Estrutura do projeto

src/
App.js
navigation/
index.js
screens/
SignInScreen.js
TaskListScreen.js
TaskFormScreen.js
SettingsScreen.js
services/
firebase.js
auth.js
firestore.js
hooks/
useTasks.js
theme/
ThemeContext.js
i18n/
index.js
query.js
assets/


---

## 🚀 Começando

### 1) Instalação

```bash
npm install
# (se ocorrer conflito de peer deps)
# npm install --legacy-peer-deps

DateTimePicker (compatível com Expo 51):

npx expo install @react-native-community/datetimepicker
# ou, manualmente:
# npm install @react-native-community/datetimepicker@^7.6.1

2) Configurar Firebase

Crie um projeto em Firebase Console.

Em Project settings → Your apps → Web, copie o firebaseConfig e cole em src/services/firebase.js:

// src/services/firebase.js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "123",
  appId: "1:123:web:abc"
}


Em Build → Authentication → Sign-in method: habilite Email/Password e Google.

Em Build → Firestore Database: Create database (Production ou Test).

Regras do Firestore (aba Rules → publicar):

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}

3) Login com Google (AuthSession)

Crie um OAuth Client ID (Web) no Google Cloud do mesmo projeto e informe o Client ID no app:

Opção A (simples): app.json → extra.googleClientId

Opção B: variável do EAS EXPO_PUBLIC_GOOGLE_CLIENT_ID

// app.json (trecho)
"extra": {
  "eas": { "projectId": "SEU-PROJECT-ID" },
  "googleClientId": "SEU_CLIENT_ID_WEB.apps.googleusercontent.com"
}

4) Rodando o App
npx expo start -c
# pressione "a" para abrir no Android, ou escaneie no Expo Go


Se não for usar Web, remova "web" de platforms e qualquer bloco "web" no app.json.

🧪 Campos da Tarefa
{
  "title": "Estudar React Native",
  "description": "Focar no TanStack Query e Notificações",
  "completed": false,
  "dueDate": "2025-09-10T14:00:00.000Z",
  "createdAt": "(serverTimestamp)",
  "updatedAt": "(serverTimestamp)"
}

🧭 Navegação e Telas

SignInScreen: login/cadastro, botão “Entrar com Google”

TaskListScreen: lista em tempo real, concluir/excluir, FAB “+”, header com frase (TanStack Query)

TaskFormScreen: criar/editar tarefa, escolher data/hora, agendar notificação

SettingsScreen: tema (claro/escuro) + idioma (PT/EN) + logout

🧠 Arquitetura (resumo)

services/auth.js: AuthProvider (auto-login com onAuthStateChanged)

services/firestore.js: CRUD + serverTimestamp()

hooks/useTasks.js: onSnapshot (tempo real)

theme/ThemeContext.js: tema e persistência (AsyncStorage)

i18n/index.js: i18next + persistência de idioma

query.js: QueryClient (TanStack)

navigation/index.js: proteção de rotas por user

📦 Build (APK) com EAS
npx expo login
npx eas login

# (opcional) criar secret para o Client ID do Google
eas secret:create --name EXPO_PUBLIC_GOOGLE_CLIENT_ID --value "SEU_CLIENT_ID_WEB.apps.googleusercontent.com"

# build
eas build -p android --profile production

🐞 Troubleshooting rápido

ERESOLVE i18n
react-i18next@15.x pede i18next >= 25.4.1

rmdir /S /Q node_modules & del package-lock.json
npm install i18next@^25.4.1 react-i18next@^15.7.3
npm install


DatetimePicker exige Expo ≥ 52
Use versão compatível com Expo 51:

npx expo install @react-native-community/datetimepicker
# ou npm i @react-native-community/datetimepicker@^7.6.1


Mensagem pedindo deps de Web
Instale: npx expo install react-native-web react-dom @expo/metro-runtime
ou remova "web" de platforms e blocos "web" no app.json.

“static/server rendering requer expo-router”
Remova "output": "static" (ou todo o bloco "web") do app.json.

✅ Checklist de Requisitos (Entrega)

 Auth Google + E-mail/Senha

 Login persistente

 Firestore por usuário

 Sync em tempo real

 Tema claro/escuro (persistente)

 i18n PT/EN (dinâmico)

 Notificações locais (agendamento)

 TanStack Query (API externa)

 README + build EAS (APK)


📜 Licença

Este projeto está sob a licença MIT — fique à vontade para usar e adaptar.
