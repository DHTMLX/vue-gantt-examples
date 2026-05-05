<script setup lang="ts">
import { ref } from "vue";
import {
  VueGantt,
  type BatchChanges,
  type GanttConfigOptions,
  type SerializedLink,
  type SerializedTask,
  type Task
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { applyBatchChanges } from "../shared/applyBatchChanges";
import { formatDateYMD } from "../shared/date";
import { createProjectData } from "../shared/projectData";
import DateEditor from "./editors/DateEditor.vue";
import DurationEditor from "./editors/DurationEditor.vue";
import TextEditor from "./editors/TextEditor.vue";

const dataSet = createProjectData();
const tasks = ref<SerializedTask[]>(dataSet.tasks);
const links = ref<SerializedLink[]>(dataSet.links);

const config: Partial<GanttConfigOptions> = {
  row_height: 40,
  scale_height: 68,
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%d %M" }
  ],
  columns: [
    {
      name: "text",
      tree: true,
      width: 220,
      resize: true,
      editor: { type: "TextEditor", map_to: "text" }
    },
    {
      name: "start_date",
      align: "center",
      width: 170,
      resize: true,
      template: (task: Task) => formatDateYMD(task.start_date),
      editor: { type: "DateEditor", map_to: "start_date", min: 0 }
    },
    {
      name: "duration",
      align: "center",
      width: 90,
      resize: true,
      editor: { type: "DurationEditor", map_to: "duration", min: 0 }
    },
    { name: "add", width: 44 }
  ]
};

const inlineEditors = {
  TextEditor,
  DurationEditor,
  DateEditor
};

const data = {
  batchSave: (changes: BatchChanges) => {
    const next = applyBatchChanges(tasks.value, links.value, changes);
    tasks.value = next.tasks;
    links.value = next.links;
  }
};
</script>

<template>
  <section class="demo-panel" data-cy="inline-editors-demo">
    <VueGantt
      class="demo-gantt"
      :tasks="tasks"
      :links="links"
      :config="config"
      :inlineEditors="inlineEditors"
      :data="data"
    />
  </section>
</template>
