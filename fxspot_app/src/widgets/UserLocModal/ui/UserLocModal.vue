<template>
    <div v-if="props.modelValue" class="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
    <!-- Контейнер модального окна -->
    <div class="modal-content bg-perfectgray relative rounded-lg shadow-lg p-6">
      <!-- Кнопка закрытия окна -->
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
      
      <h2 class="text-xl font-semibold mb-4">Модальное окно</h2>
      <p>Это содержимое модального окна.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Получаем пропс modelValue через defineProps
const props = defineProps({
  modelValue: Boolean,
});

// Отправляем событие обновления состояния
const emit = defineEmits(['update:modelValue']);

// Метод для закрытия модального окна
const closeModal = () => {
  emit('update:modelValue', false); // Закрытие окна
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>