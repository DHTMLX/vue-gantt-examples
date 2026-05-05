<script setup lang="ts">
import { ref } from "vue";
import {
  VueGantt,
  useWorkTime,
  type CalendarConfig,
  type Marker,
  type VueGanttRef
} from "@dhtmlx/trial-vue-gantt";
import { createProjectData } from "../shared/projectData";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);
const { tasks, links } = createProjectData();

const templates = {
  scale_cell_class: (date: Date) => {
    return workTime.value.isWorkTime({ date }) ? "" : "weekend";
  },
  timeline_cell_class: (task: any, date: Date) => {
    return workTime.value.isWorkTime({ date, task }) ? "" : "weekend";
  }
} as any;

const config = {
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%d %M" }
  ],
  row_height: 46,
  scale_height: 74,
  work_time: true
} as any;

const calendars: CalendarConfig[] = [
  {
    id: "global",
    worktime: {
      hours: ["8:00-12:00", "13:00-17:00"],
      days: {
        weekdays: [0, 1, 1, 1, 1, 1, 0],
        dates: {
          "2025-04-08": false
        }
      }
    }
  } as any
];

const markers: Marker[] = [
  {
    id: "project-start",
    start_date: new Date(2025, 3, 3),
    text: "Project start",
    css: "project-start"
  },
  {
    id: "project-end",
    start_date: new Date(2025, 4, 1),
    text: "Project end",
    css: "project-end"
  }
];
</script>

<template>
  <section class="demo-panel" data-cy="basic-init-demo">
    <VueGantt
      ref="ganttRef"
      class="demo-gantt"
      :tasks="tasks"
      :links="links"
      :config="config"
      :templates="templates"
      :calendars="calendars"
      :markers="markers"
    />
  </section>
</template>
