<!-- app/components/todos/TodoList.vue -->
<script setup>
import { ref } from 'vue'
import { orderBy } from 'firebase/firestore'
import getCollection from '@/composables/getCollection'
import useCollection from '@/composables/useCollection'

// 使用 getCollection 獲取待辦事項列表，按創建時間排序
const { documents: todos, error, isPending } = getCollection(
  'todos',
  [orderBy('createdAt', 'desc')]
)

// 使用 useCollection 進行 CRUD 操作
const {
  addDocument,
  deleteDocument,
  updateDocument,
  error: collectionError,
  isPending: collectionIsPending
} = useCollection('todos')

// 新待辦事項標題
const newTodoTitle = ref('')

// 添加新待辦事項
const addTodo = async () => {
  if (newTodoTitle.value.trim()) {
    const newTodo = {
      title: newTodoTitle.value,
      completed: false
      // createdAt 會在 addDocument 函數中自動添加
    }

    await addDocument(newTodo)
    newTodoTitle.value = '' // 清空輸入框
  }
}

// 切換待辦事項完成狀態
const toggleTodo = async (todo) => {
  await updateDocument(todo.id, {
    completed: !todo.completed
  })
}

// 刪除待辦事項
const deleteTodo = async (id) => {
  await deleteDocument(id)
}
</script>

<template>
  <div class="todo-list">
    <h2>待辦事項清單</h2>

    <!-- 載入狀態 -->
    <div v-if="isPending" class="loading">載入中...</div>

    <!-- 錯誤訊息 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 待辦事項列表 -->
    <ul v-if="todos">
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <span>{{ todo.title }}</span>
        <div class="actions">
          <button @click="toggleTodo(todo)">{{ todo.completed ? '還原' : '完成' }}</button>
          <button @click="deleteTodo(todo.id)" class="delete">刪除</button>
        </div>
      </li>
      <li v-if="todos.length === 0" class="empty">目前沒有待辦事項</li>
    </ul>

    <!-- 添加新待辦事項 -->
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodoTitle"
        placeholder="輸入新的待辦事項..."
        required
      >
      <button type="submit" :disabled="collectionIsPending">新增</button>
    </form>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete {
  background-color: #f44336;
}

form {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading, .error, .empty {
  text-align: center;
  padding: 10px;
}

.error {
  color: #f44336;
}
</style>