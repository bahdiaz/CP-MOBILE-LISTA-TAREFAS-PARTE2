
import { db } from './firebase'
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, where, orderBy } from 'firebase/firestore'

export function tasksCol(uid) {
  return collection(db, 'users', uid, 'tasks')
}

export async function createTask(uid, data) {
  const payload = {
    title: data.title,
    description: data.description,
    completed: !!data.completed,
    dueDate: data.dueDate,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
  return await addDoc(tasksCol(uid), payload)
}

export async function updateTask(uid, id, data) {
  const ref = doc(db, 'users', uid, 'tasks', id)
  return await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

export async function removeTask(uid, id) {
  const ref = doc(db, 'users', uid, 'tasks', id)
  return await deleteDoc(ref)
}

export function baseQuery(uid) {
  return query(tasksCol(uid), orderBy('createdAt', 'desc'))
}
