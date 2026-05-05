<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

interface DurationEditorProps {
  initialValue: any;
  save: () => void;
  cancel: () => void;
}

const props = defineProps<DurationEditorProps>();

const inputRef = ref<any>(null);
const value = ref(1);

const normalize = (nextValue: any) => {
  const numberValue = Number(nextValue);
  if (Number.isNaN(numberValue) || numberValue < 0) {
    return 0;
  }
  return numberValue;
};

watch(
  () => props.initialValue,
  nextValue => {
    value.value = normalize(nextValue);
  },
  { immediate: true }
);

const getInputElement = () => {
  const candidate = inputRef.value?.$el ?? inputRef.value;
  if (!candidate || typeof candidate.querySelector !== "function") {
    return null;
  }
  return candidate.querySelector("input") as HTMLInputElement | null;
};

const focus = () => {
  inputRef.value?.focus?.();
  getInputElement()?.focus();
};

const setValue = (nextValue: any) => {
  value.value = normalize(nextValue);
};

const onModelUpdate = (nextValue: any) => {
  value.value = normalize(nextValue);
};

const getValue = () => value.value;
const isChanged = (rawValue: any) => normalize(rawValue) !== value.value;
const isValid = () => value.value >= 0;
const save = () => props.save();

onMounted(async () => {
  await nextTick();
  focus();
});

defineExpose({
  focus,
  setValue,
  getValue,
  isChanged,
  isValid,
  save
});
</script>

<template>
  <v-sheet class="editor-shell" border elevation="2" rounded="lg">
    <v-text-field
      ref="inputRef"
      :model-value="String(value)"
      class="editor-field editor-field-duration"
      density="compact"
      hide-details
      min="0"
      step="1"
      type="number"
      variant="outlined"
      @update:model-value="onModelUpdate"
    />
  </v-sheet>
</template>

<style scoped>
.editor-shell {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
}

.editor-field {
  flex: 0 0 auto;
}

.editor-field-duration {
  width: 100%;
  min-width: 100%;
}

</style>
