<template>
    <div class="bg-perfectgray rounded-md border-2 border-perfectgreen px-2">
        <input
        @input="updateValue"
        :type="type"
        :placeholder="placeholder"
        :value="props.modelValue"
        class="bg-transparent text-white  outline-none text-md w-[500px] h-[40px]"
        />
        <button
            :disabled="!props.modelValue"
            @mouseenter="showTooltip = !props.modelValue"
            @mouseleave="showTooltip = false"
            @click="isModalOpen = true"
            class="relative"
        >
            <i 
            class="fa-solid fa-arrow-up text-gray-500 rounded-full w-8 h-8 flex justify-center items-center duration-300"
            :class="props.modelValue ? 'text-white' : 'text-gray-500'"></i>
            <span
                v-if="showTooltip"
                class="absolute top-[-5px] left-1/2 transform translate-x-1/2 px-2 py-1 text-xs text-white bg-perfectgray rounded-md shadow-lg z-10"
            >
            Это пустое сообщение
            </span>
        </button>
        <transition name="modal" mode="out-in">
            <AIContainer v-model="isModalOpen" v-if="isModalOpen" key="modal" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAIStore } from '@/widgets/AIContainer/model/state';
import AIContainer from '@/widgets/AIContainer/ui/AIContainer.vue';

const isModalOpen = ref(false);
const aiStore = useAIStore();

interface Props {
    modelValue: string;
    type: string;
    placeholder: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
    aiStore.setAiRequest(target.value);
};

const sendRequest = () => {
    isModalOpen.value = true;
    aiStore.fetchResponse();
};

const showTooltip = ref(false);
</script>

<style scoped>
</style>
  