<script setup lang="ts">
import { computed } from "vue";

export type TemplateFilterMode = "all" | "done" | "notDone";

const props = defineProps<{
  modelValue: TemplateFilterMode;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: TemplateFilterMode];
}>();

const currentLabel = computed(() => {
  if (props.modelValue === "done") {
    return "Done";
  }
  if (props.modelValue === "notDone") {
    return "Not Done";
  }
  return "All";
});

const options: Array<{
  value: TemplateFilterMode;
  label: string;
  dataCy: string;
}> = [
  { value: "done", label: "Show Done", dataCy: "templates-filter-option-done" },
  { value: "notDone", label: "Show Not Done", dataCy: "templates-filter-option-not-done" },
  { value: "all", label: "Show All", dataCy: "templates-filter-option-all" }
];

const selectOption = (value: TemplateFilterMode) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <v-menu location="bottom start">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        data-cy="templates-filter-menu-trigger"
        size="small"
        variant="text"
      >
        Show: {{ currentLabel }}
      </v-btn>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="option in options"
        :key="option.value"
        :title="option.label"
        :data-cy="option.dataCy"
        @click="selectOption(option.value)"
      />
    </v-list>
  </v-menu>
</template>
