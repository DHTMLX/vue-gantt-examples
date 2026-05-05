<script setup lang="ts">
import { nextTick, onMounted, onUpdated, ref, watch } from "vue";
import { formatDateYMD, parseInputDate } from "../../shared/date";

interface DateEditorProps {
  initialValue: any;
  save: () => void;
  cancel: () => void;
}

const props = defineProps<DateEditorProps>();

const inputRef = ref<any>(null);
const value = ref("");

const normalize = (nextValue: any) => {
  if (nextValue === null || nextValue === undefined || nextValue === "") {
    return "";
  }
  return formatDateYMD(nextValue);
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

const syncInputHook = () => {
  const input = getInputElement();
  input?.setAttribute("data-cy", "inline-date-input");
  return input;
};

const focus = () => {
  inputRef.value?.focus?.();
  syncInputHook()?.focus();
};

const setValue = (nextValue: any) => {
  value.value = normalize(nextValue);
};

const getValue = () => parseInputDate(value.value);
const isChanged = (rawValue: any) => normalize(rawValue) !== value.value;
const isValid = () => Boolean(value.value);
const save = () => props.save();

onMounted(async () => {
  await nextTick();
  syncInputHook();
  focus();
});

onUpdated(() => {
  syncInputHook();
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
  <v-sheet class="editor-shell" border elevation="2" rounded="lg" data-cy="inline-date-editor">
    <v-text-field
      ref="inputRef"
      v-model="value"
      class="editor-field editor-field-date"
      density="compact"
      hide-details
      type="date"
      variant="outlined"
    />
  </v-sheet>
</template>

<style scoped>
.editor-shell {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--dhx-gantt-border-radius);
  /* padding: 6px; */
  background: #fff;
  border: 1px solid #b7c8d8;
}

.editor-field {
  flex: 0 0 auto;
}

.editor-field-date {
  width: 100%;
  min-width: 100%;
}

</style>
