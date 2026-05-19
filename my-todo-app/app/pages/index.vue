<script setup>
</script>

<template>
  <div class="container">
    <h1>我的待辦事項</h1>
    
    <ClientOnly>
      <TodosTodoList />
      
      <template #fallback>
        <p class="loading-text">正在載入待辦事項系統...</p>
      </template>
    </ClientOnly>
    
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.loading-text {
  text-align: center;
  color: #666;
  padding: 20px;
}
</style>