<script setup lang="ts">
interface TaskDeleteDialogProps {
  modelValue: boolean;
  text: string;
  title?: string;
}

const props = withDefaults(defineProps<TaskDeleteDialogProps>(), {
  title: "Delete task"
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
  cancel: [];
}>();

const onCancel = () => {
  emit("update:modelValue", false);
  emit("cancel");
};

const onConfirm = () => {
  emit("update:modelValue", false);
  emit("confirm");
};
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    max-width="420"
    persistent
    data-cy="templates-delete-dialog"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <v-card>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text>{{ props.text }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          data-cy="templates-delete-cancel"
          variant="text"
          @click="onCancel"
        >
          No
        </v-btn>
        <v-btn
          data-cy="templates-delete-confirm"
          color="error"
          variant="flat"
          autofocus
          @click="onConfirm"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
