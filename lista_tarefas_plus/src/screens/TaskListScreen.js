
import React, { useMemo } from 'react'
import { View, FlatList } from 'react-native'
import { Appbar, FAB, List, IconButton } from 'react-native-paper'
import { useAuth } from '../services/auth'
import { useTasks } from '../hooks/useTasks'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { removeTask, updateTask } from '../services/firestore'
import { useQuery } from '@tanstack/react-query'

export default function TaskListScreen() {
  const { user, signOutApp } = useAuth()
  const { items } = useTasks(user?.uid)
  const { t } = useTranslation()
  const nav = useNavigation()
  const { data: quote } = useQuery({
    queryKey: ['quote'],
    queryFn: async () => {
      const r = await fetch('https://api.quotable.io/random')
      const j = await r.json()
      return j?.content
    }
  })
  const headerSubtitle = useMemo(() => quote || '', [quote])
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={t('tasks')} subtitle={headerSubtitle} />
        <Appbar.Action icon="cog" onPress={() => nav.navigate('Settings')} />
        <Appbar.Action icon="logout" onPress={signOutApp} />
      </Appbar.Header>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.description}
            left={props => <List.Icon {...props} icon={item.completed ? 'check-circle' : 'progress-clock'} />}
            right={props => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton icon={item.completed ? 'checkbox-marked' : 'checkbox-blank-outline'} onPress={() => updateTask(user.uid, item.id, { completed: !item.completed })} />
                <IconButton icon="delete" onPress={() => removeTask(user.uid, item.id)} />
              </View>
            )}
            onPress={() => nav.navigate('TaskForm', { item })}
          />
        )}
      />
      <FAB icon="plus" style={{ position: 'absolute', bottom: 24, right: 24 }} onPress={() => nav.navigate('TaskForm')} />
    </View>
  )
}
