<template>
    <div class="bg-perfectgray rounded-md border-2 border-perfectgreen px-2">
        <input
        @input="updateValue"
        :type="type"
        :placeholder="placeholder"
        :value="props.modelValue"
        class="bg-transparent text-white  outline-none text-md w-[500px] h-[40px]"
        />
        <button><i class="fa-solid fa-arrow-up text-gray-500 rounded-full w-8 h-8 flex justify-center items-center"></i></button>
    </div>
</template>

<script setup lang="ts">
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
};
</script>

<style scoped>
</style>
  