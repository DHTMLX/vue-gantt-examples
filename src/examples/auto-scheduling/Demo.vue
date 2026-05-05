<script setup lang="ts">
import { ref } from "vue";
import {
  defineGanttConfig,
  defineGanttTemplates,
  VueGantt,
  useWorkTime,
  type GanttConfigOptions,
  type Task,
  type VueGanttRef
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";
import { createProjectData } from "../shared/projectData";
import { useDemoBatchState } from "../shared/useDemoBatchState";

const { tasks, links, data } = useDemoBatchState(createProjectData());

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);

const plugins = {
  auto_scheduling: true,
  critical_path: true
};

const config = ref<Partial<GanttConfigOptions>>(
  defineGanttConfig({
    work_time: true,
    auto_scheduling: {
      enabled: true,
      apply_constraints: false,
      gap_behavior: "compress",
      schedule_on_parse: true
    },
    highlight_critical_path: false,
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" }
    ]
  })
);

const templates = defineGanttTemplates({
  scale_cell_class: (date: Date) => {
    return workTime.value.isWorkTime({ date }) ? "" : "weekend";
  },
  timeline_cell_class: (task: Task, date: Date) => {
    return workTime.value.isWorkTime({ date, task }) ? "" : "weekend";
  },
  parse_date: ((date: unknown) => new Date(date as Date | string | number)) as any,
  format_date: ((date: Date) => new Date(date)) as any
});

const toggleCriticalPath = () => {
  const nextHighlightState = !config.value.highlight_critical_path;

  config.value = {
    ...config.value,
    highlight_critical_path: nextHighlightState
  };

};
</script>

<template>
  <section class="demo-panel" data-cy="auto-scheduling-demo">
    <div class="demo-toolbar">
      <button data-cy="auto-toggle-critical" type="button" @click="toggleCriticalPath">
        Toggle Critical Path
      </button>
    </div>

    <VueGantt
      ref="ganttRef"
      class="demo-gantt"
      :tasks="tasks"
      :links="links"
      :plugins="plugins"
      :config="config"
      :templates="templates"
      :data="data"
    />
  </section>
</template>
