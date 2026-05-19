// app/composables/getDocument.js
import { ref, watchEffect } from 'vue'
import { doc, onSnapshot } from 'firebase/firestore'

const getDocument = (collectionName, id) => {
  const { $db } = useNuxtApp()
  const document = ref(null)
  const error = ref(null)
  const isPending = ref(true)

  // 獲取文檔引用
  const docRef = doc($db, collectionName, id)

  // 實時監聽文檔變更
  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      document.value = { id: doc.id, ...doc.data() }
      error.value = null
      isPending.value = false
    } else {
      document.value = null
      error.value = "文檔不存在"
      isPending.value = false
    }
  }, (err) => {
    document.value = null
    error.value = err.message
    isPending.value = false
  })

  // 清理函數
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe())
  })

  return { document, error, isPending }
}

export default getDocument