<template>
    <div v-if="props.modelValue" class="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 text-white ">
    <!-- Контейнер модального окна -->
    <div class="modal-content basis-1/2 h-1/2 bg-perfectgray relative rounded-lg shadow-lg p-6 rounded-md shadow-lg shadow-perfectgreen">
      <!-- Кнопка закрытия окна -->
      <button @click="closeModal" class="absolute top-2 right-3 text-gray-500 hover:text-gray-700">✖</button>
      <h2 class="text-xl font-semibold mb-4">Ответ от AI</h2>
      <p v-if="loading">Загрузка...</p>
      <p v-else-if="error">{{ error }}</p>
      <div v-else class="w-full h-[17rem] bg-semiaccent px-4 py-2 mt-4">
        <span class="text-white">{{ response }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from 'vue';
import { useAIStore } from '@/widgets/AIContainer/model/state';

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

const aiStore = useAIStore();
const { response, loading, error } = aiStore;

// Подписываемся на изменения состояния
onMounted(() => {
  aiStore.fetchResponse();
});

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