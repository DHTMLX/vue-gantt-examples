<script setup lang="ts">
import { computed, h, ref } from "vue";
import {
  VueGantt,
  type GanttConfigOptions,
  type SerializedLink,
  type SerializedTask,
  type Task,
  type VueGanttRef
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import DoneToggleButton from "./components/DoneToggleButton.vue";
import FilterDropdown, { type TemplateFilterMode } from "./components/FilterDropdown.vue";
import { createProjectData } from "../shared/projectData";

type TaskWithCompleted = SerializedTask & {
  completed?: boolean;
};

const dataSet = createProjectData();
const tasks = ref<TaskWithCompleted[]>(
  dataSet.tasks.map(task => ({
    ...task,
    completed: task.progress === 1
  }))
);
const links = ref<SerializedLink[]>(dataSet.links);

const ganttRef = ref<VueGanttRef | null>(null);
const theme = ref("terrace");
const localeCycle = ["en", "es", "de", "cn"] as const;
type LocaleCode = (typeof localeCycle)[number];
const locale = ref<LocaleCode>("en");
const filterMode = ref<TemplateFilterMode>("all");

const filter = computed<((task: Task) => boolean) | undefined>(() => {
  if (filterMode.value === "done") {
    return task => Boolean((task as TaskWithCompleted).completed);
  }

  if (filterMode.value === "notDone") {
    return task => !Boolean((task as TaskWithCompleted).completed);
  }

  return undefined;
});

const onFilterModeChange = (nextMode: TemplateFilterMode) => {
  filterMode.value = nextMode;
};

const toggleCompleted = (taskId: string | number) => {
  tasks.value = tasks.value.map(task => {
    if (String(task.id) !== String(taskId)) {
      return task;
    }

    return {
      ...task,
      completed: !Boolean(task.completed)
    };
  });
};

const config = computed<Partial<GanttConfigOptions>>(() => ({
  row_height: 44,
  scale_height: 70,
  columns: [
    { name: "text", tree: true, width: 220, resize: true },
    { name: "start_date", align: "center", width: 130, resize: true },
    { name: "duration", align: "center", width: 90, resize: true },
    {
      name: "status",
      align: "center",
      width: 180,
      resize: true,
      label: h(FilterDropdown, {
        modelValue: filterMode.value,
        "onUpdate:modelValue": onFilterModeChange
      }),
      template: (task: Task) =>
        h(DoneToggleButton, {
          done: Boolean((task as TaskWithCompleted).completed),
          onToggle: () => toggleCompleted(task.id)
        })
    },
    { name: "add", width: 44 }
  ],
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F" },
    { unit: "day", step: 1, format: "%d %M" }
  ]
}));

const toggleTheme = () => {
  theme.value = theme.value === "terrace" ? "dark" : "terrace";
};

const switchLocale = () => {
  const index = localeCycle.indexOf(locale.value);
  locale.value = localeCycle[(index + 1) % localeCycle.length];
};

const collapseAll = () => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) {
    return;
  }

  gantt.eachTask((task: Task & { $open?: boolean }) => {
    task.$open = false;
  });
  gantt.render();
};

const expandAll = () => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) {
    return;
  }

  gantt.eachTask((task: Task & { $open?: boolean }) => {
    task.$open = true;
  });
  gantt.render();
};
</script>

<template>
  <section class="demo-panel" data-cy="templates-demo">
    <div class="demo-toolbar">
      <button data-cy="templates-toggle-theme" type="button" @click="toggleTheme">Switch Theme</button>
      <button data-cy="templates-switch-locale" type="button" @click="switchLocale">Switch Locale</button>
      <button data-cy="templates-collapse-all" type="button" @click="collapseAll">Collapse All</button>
      <button data-cy="templates-expand-all" type="button" @click="expandAll">Expand All</button>
    </div>

    <VueGantt
      ref="ganttRef"
      class="demo-gantt"
      :tasks="tasks"
      :links="links"
      :filter="filter"
      :theme="theme"
      :locale="locale"
      :config="config"
    />
  </section>
</template>
