<script setup lang="ts">
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import {
  defineGanttEvents,
  VueGantt,
  type Task
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { createBatchSaveData } from "../shared/useDemoBatchState";
import { CUSTOM_EDIT_VIEW_CONTEXT_KEY } from "./context";

const router = useRouter();
const context = inject(CUSTOM_EDIT_VIEW_CONTEXT_KEY);

if (!context) {
  throw new Error("Custom edit view context is not provided");
}

const events = defineGanttEvents({
  onBeforeLightbox: (taskId: string | number) => {
    router.push(`/custom-edit-view/editor/${taskId}`);
    return false;
  },
  onTaskCreated: (task: Task) => {
    context.upsertTask({ ...(task as any), $new: true });
    router.push(`/custom-edit-view/editor/${task.id}`);
    return false;
  }
});

const data = createBatchSaveData(context.applyBatch);

const tasks = computed(() => context.tasks.value);
const links = computed(() => context.links.value);
</script>

<template>
  <VueGantt class="demo-gantt" :tasks="tasks" :links="links" :events="events" :data="data" />
</template>
