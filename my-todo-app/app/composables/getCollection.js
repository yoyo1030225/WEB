// app/composables/getCollection.js
import { ref, watchEffect } from 'vue'
import { collection, onSnapshot, query } from 'firebase/firestore'

const getCollection = (collectionName, queryOptions = []) => {
  const { $db } = useNuxtApp()
  const documents = ref(null)
  const error = ref(null)
  const isPending = ref(true)

  // 設置查詢
  const collectionRef = collection($db, collectionName)
  const q = query(collectionRef, ...queryOptions)

  // 實時監聽資料變更
  const unsubscribe = onSnapshot(q, (snapshot) => {
    // 將文件轉換為數組
    const results = []
    snapshot.docs.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() })
    })

    // 更新數據
    documents.value = results
    error.value = null
    isPending.value = false
  }, (err) => {
    console.error(err.message)
    documents.value = null
    error.value = err.message
    isPending.value = false
  })

  // 清理函數，停止監聽
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe())
  })

  return { documents, error, isPending }
}

export default getCollection