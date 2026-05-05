<script setup lang="ts">
import { ref } from "vue";
import { VueGantt, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { createProjectData } from "../shared/projectData";
import { useDemoGanttActions } from "../shared/useDemoGanttActions";

const ganttRef = ref<VueGanttRef | null>(null);
const { tasks, links } = createProjectData();

const plugins = {
  export_api: true
};

const { exportByType } = useDemoGanttActions(ganttRef);
</script>

<template>
  <section class="demo-panel" data-cy="export-demo">
    <div class="demo-toolbar">
      <button data-cy="export-pdf" type="button" @click="exportByType('pdf')">Export PDF</button>
      <button data-cy="export-png" type="button" @click="exportByType('png')">Export PNG</button>
      <button data-cy="export-excel" type="button" @click="exportByType('excel')">Export Excel</button>
      <button data-cy="export-msp" type="button" @click="exportByType('msp')">Export MSP</button>
    </div>

    <VueGantt ref="ganttRef" class="demo-gantt" :tasks="tasks" :links="links" :plugins="plugins" />
  </section>
</template>
