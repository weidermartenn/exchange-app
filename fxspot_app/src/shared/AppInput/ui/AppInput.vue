<template>
  <div>
    <input
      @input="updateValue"
      :type="type"
      :placeholder="placeholder"
      :value="props.modelValue"
      class="bg-perfectgray text-white rounded-md border-2 border-perfectgreen outline-none px-4 py-2 text-xl"
    />
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

<style scoped></style>
