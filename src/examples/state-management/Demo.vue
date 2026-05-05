<script setup lang="ts">
import { storeToRefs } from "pinia";
import { VueGantt } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../../stores/ganttStore";
import { createBatchSaveData } from "../shared/useDemoBatchState";

const ganttStore = useGanttStore();
const { tasks, links, config, zoomLevel, canUndo, canRedo } = storeToRefs(ganttStore);

const data = createBatchSaveData(changes => ganttStore.applyBatch(changes));

const setZoom = (level: "day" | "month" | "year") => {
  ganttStore.setZoom(level);
};
</script>

<template>
  <section class="demo-panel" data-cy="state-management-demo">
    <div class="demo-toolbar">
      <button data-cy="state-undo" type="button" :disabled="!canUndo" @click="ganttStore.undo()">Undo</button>
      <button data-cy="state-redo" type="button" :disabled="!canRedo" @click="ganttStore.redo()">Redo</button>
      <button data-cy="zoom-day" :class="{ active: zoomLevel === 'day' }" type="button" @click="setZoom('day')">
        Day
      </button>
      <button data-cy="zoom-month" :class="{ active: zoomLevel === 'month' }" type="button" @click="setZoom('month')">
        Month
      </button>
      <button data-cy="zoom-year" :class="{ active: zoomLevel === 'year' }" type="button" @click="setZoom('year')">
        Year
      </button>
    </div>

    <VueGantt class="demo-gantt" :tasks="tasks" :links="links" :config="config" :data="data" />
  </section>
</template>
