
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Appbar, Button, TextInput, Switch, HelperText } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRoute, useNavigation } from '@react-navigation/native'
import { createTask, updateTask } from '../services/firestore'
import { useAuth } from '../services/auth'
import * as Notifications from 'expo-notifications'
import { useTranslation } from 'react-i18next'

export default function TaskFormScreen() {
  const route = useRoute()
  const nav = useNavigation()
  const { user } = useAuth()
  const { t } = useTranslation()
  const editing = route.params?.item
  const [title, setTitle] = useState(editing?.title || '')
  const [description, setDescription] = useState(editing?.description || '')
  const [completed, setCompleted] = useState(!!editing?.completed)
  const [dueDate, setDueDate] = useState(editing?.dueDate ? new Date(editing.dueDate) : new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [scheduleNotif, setScheduleNotif] = useState(false)
  const invalid = !title.trim()

  useEffect(() => {
    Notifications.requestPermissionsAsync()
  }, [])

  const onSave = async () => {
    const payload = { title, description, completed, dueDate: dueDate.toISOString() }
    if (editing) await updateTask(user.uid, editing.id, payload)
    else await createTask(user.uid, payload)
    if (scheduleNotif) {
      await Notifications.scheduleNotificationAsync({
        content: { title, body: description || title },
        trigger: { date: dueDate }
      })
    }
    nav.goBack()
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title={editing ? t('save') : t('newTask')} />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 12 }}>
        <TextInput label={t('title')} value={title} onChangeText={setTitle} />
        <HelperText type="error" visible={invalid}>{invalid ? 'Título obrigatório' : ''}</HelperText>
        <TextInput label={t('description')} value={description} onChangeText={setDescription} multiline />
        <Button mode="outlined" onPress={() => setShowPicker(true)}>{t('dueDate')}: {dueDate.toLocaleString()}</Button>
        {showPicker && (
          <DateTimePicker value={dueDate} onChange={(e, d) => { setShowPicker(false); if (d) setDueDate(d) }} mode="datetime" />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <HelperText type="info" visible>{t('scheduleNotif')}</HelperText>
          <Switch value={scheduleNotif} onValueChange={setScheduleNotif} />
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button mode="contained" onPress={onSave} disabled={invalid}>{t('save')}</Button>
          <Button onPress={() => nav.goBack()}>{t('cancel')}</Button>
        </View>
      </View>
    </View>
  )
}
