
# Lista Tarefas Plus

Stack: Expo, Firebase Auth + Firestore, React Navigation, React Native Paper, i18next, Expo Notifications, TanStack Query.

## Requisitos atendidos
- Autenticação com Google e e-mail/senha via Firebase
- Login persistente
- Firestore por usuário em `users/{uid}/tasks`
- Lista com sincronização em tempo real via onSnapshot
- Tema claro/escuro com persistência (AsyncStorage)
- Internacionalização PT/EN com troca dinâmica
- Notificações locais com agendamento
- TanStack Query consumindo API externa de frases
- APK via EAS
- README com instruções e arquitetura

## Campos da tarefa
- title: string
- description: string
- completed: boolean
- dueDate: ISO string
- createdAt: serverTimestamp
- updatedAt: serverTimestamp

## Como rodar
1. `npm install`
2. Criar projeto no Firebase e preencher `src/services/firebase.js`
3. Definir `EXPO_PUBLIC_GOOGLE_CLIENT_ID` no `eas.json` ou `app.json > extra`
4. `npm run start`
5. Testar login e criação de tarefas

## Build (APK)
- `eas build -p android --profile production`

## Anotações de configuração
- Google OAuth: obtenha o Client ID do Expo no Console do Google, adicione o esquema `listaplus://` e o redirect do Expo
- Firestore Rules mínimas para testes:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/tasks/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Arquitetura
- `src/services/firebase.js`: inicialização
- `src/services/auth.js`: contexto de auth e Google OAuth
- `src/services/firestore.js`: CRUD
- `src/hooks/useTasks.js`: stream em tempo real
- `src/navigation/`: rotas e proteção por auth
- `src/theme/ThemeContext.js`: tema e persistência
- `src/i18n/`: i18next
- `src/screens/`: SignIn, TaskList, TaskForm, Settings
- `src/query.js`: QueryClient

