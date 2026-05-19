// app/composables/useCollection.js
import { ref } from 'vue'
import { collection, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'

const useCollection = (collectionName) => {
  const { $db } = useNuxtApp()
  const error = ref(null)
  const isPending = ref(false)

  // 添加文檔
  const addDocument = async (data) => {
    error.value = null
    isPending.value = true

    try {
      // 添加一個伺服器時間戳
      const docToAdd = { ...data, createdAt: serverTimestamp() }

      const colRef = collection($db, collectionName)
      const docRef = await addDoc(colRef, docToAdd)

      isPending.value = false
      return docRef.id
    } catch (err) {
      console.error(err.message)
      error.value = '無法添加文檔'
      isPending.value = false
      return null
    }
  }

  // 刪除文檔
  const deleteDocument = async (id) => {
    error.value = null
    isPending.value = true

    try {
      const docRef = doc($db, collectionName, id)
      await deleteDoc(docRef)

      isPending.value = false
    } catch (err) {
      console.error(err.message)
      error.value = '無法刪除文檔'
      isPending.value = false
    }
  }

  // 更新文檔
  const updateDocument = async (id, updates) => {
    error.value = null
    isPending.value = true

    try {
      const docRef = doc($db, collectionName, id)
      await updateDoc(docRef, updates)

      isPending.value = false
    } catch (err) {
      console.error(err.message)
      error.value = '無法更新文檔'
      isPending.value = false
    }
  }

  return { error, isPending, addDocument, deleteDocument, updateDocument }
}

export default useCollection