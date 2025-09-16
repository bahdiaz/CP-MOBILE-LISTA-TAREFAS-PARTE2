
import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { baseQuery } from '../services/firestore'

export function useTasks(uid) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!uid) return
    const unsub = onSnapshot(baseQuery(uid), snap => {
      const arr = []
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
      setItems(arr)
      setLoading(false)
    })
    return unsub
  }, [uid])
  return { items, loading }
}
