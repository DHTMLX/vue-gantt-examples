<script setup lang="ts">
import { provide } from "vue";
import { RouterView } from "vue-router";
import type { SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { createProjectData } from "../shared/projectData";
import { useDemoBatchState } from "../shared/useDemoBatchState";
import { CUSTOM_EDIT_VIEW_CONTEXT_KEY } from "./context";

const { tasks, links, applyBatch } = useDemoBatchState(createProjectData());

const upsertTask = (task: SerializedTask) => {
  const index = tasks.value.findIndex(item => String(item.id) === String(task.id));
  if (index === -1) {
    tasks.value = [...tasks.value, task];
    return;
  }

  const nextTasks = [...tasks.value];
  nextTasks[index] = { ...nextTasks[index], ...task };
  tasks.value = nextTasks;
};

const saveTask = (task: SerializedTask) => {
  const nextTask = { ...task } as any;
  if (nextTask.$new) {
    delete nextTask.$new;
  }
  upsertTask(nextTask);
};

const deleteTask = (taskId: string | number) => {
  tasks.value = tasks.value.filter(task => String(task.id) !== String(taskId));
};

provide(CUSTOM_EDIT_VIEW_CONTEXT_KEY, {
  tasks,
  links,
  saveTask,
  upsertTask,
  deleteTask,
  applyBatch
});
</script>

<template>
  <section class="demo-panel" data-cy="custom-edit-view-demo">
    <RouterView />
  </section>
</template>
