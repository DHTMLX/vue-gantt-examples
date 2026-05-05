<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Task } from "@dhtmlx/trial-vue-gantt";
import { CUSTOM_EDIT_VIEW_CONTEXT_KEY } from "./context";

const router = useRouter();
const route = useRoute();
const context = inject(CUSTOM_EDIT_VIEW_CONTEXT_KEY);

if (!context) {
  throw new Error("Custom edit view context is not provided");
}

const currentId = computed(() => String(route.params.id || ""));

const currentTask = computed(() => {
  const found = context.tasks.value.find(task => String(task.id) === currentId.value);
  if (found) {
    return found;
  }

  return {
    id: currentId.value,
    text: "",
    duration: 1,
    progress: 0,
    start_date: new Date(),
    parent: 0
  } as Task;
});

const text = ref("");
const duration = ref(1);

watch(
  currentTask,
  nextTask => {
    text.value = String((nextTask as any).text || "");
    duration.value = Number((nextTask as any).duration || 1);
  },
  { immediate: true }
);

const save = () => {
  context.saveTask({ ...(currentTask.value as any), text: text.value, duration: duration.value });
  router.push("/custom-edit-view");
};

const remove = () => {
  context.deleteTask(currentTask.value.id as string | number);
  router.push("/custom-edit-view");
};

const cancel = () => {
  router.push("/custom-edit-view");
};
</script>

<template>
  <div class="task-editor" data-cy="custom-edit-editor">
    <h3>Edit Task {{ currentTask.id }}</h3>

    <label class="field">
      <span>Task Text</span>
      <input data-cy="custom-edit-text" type="text" v-model="text" />
    </label>

    <label class="field">
      <span>Duration</span>
      <input type="number" min="1" v-model.number="duration" />
    </label>

    <div class="actions">
      <button data-cy="custom-edit-save" type="button" @click="save">Save</button>
      <button data-cy="custom-edit-cancel" type="button" @click="cancel">Cancel</button>
      <button data-cy="custom-edit-delete" type="button" @click="remove">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.task-editor {
  width: min(460px, 100%);
  margin: 16px;
  border: 1px solid #cfd8e2;
  background: #fff;
  padding: 14px;
}

h3 {
  margin: 0 0 12px;
}

.field {
  display: block;
  margin-bottom: 10px;
}

.field span {
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
  color: #475e74;
}

.field input {
  width: 100%;
  border: 1px solid #cfd8e2;
  padding: 8px;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  border: 1px solid #cfd8e2;
  background: #fff;
  padding: 6px 10px;
  cursor: pointer;
}
</style>