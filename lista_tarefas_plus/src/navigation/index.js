
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import TaskListScreen from '../screens/TaskListScreen'
import TaskFormScreen from '../screens/TaskFormScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { useAuth } from '../services/auth'

const Stack = createNativeStackNavigator()

export function AppNavigator() {
  const auth = useAuth()
  if (!auth) return null
  const { user, initializing } = auth
  if (initializing) return null
  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Tasks" component={TaskListScreen} options={{ title: 'Lista' }} />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Tarefa' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
        </>
      )}
    </Stack.Navigator>
  )
}
