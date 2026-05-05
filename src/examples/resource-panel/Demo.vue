<script setup lang="ts">
import { computed, ref } from "vue";
import { VueGantt } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { createResourceDemoData } from "../shared/resourceData";

const dataSet = createResourceDemoData();

const tasks = ref(dataSet.tasks);
const links = ref(dataSet.links);
const resources = ref(dataSet.resources);

const selectedResourceId = ref("");

const resourceFilter = computed(() => {
  if (!selectedResourceId.value) {
    return undefined;
  }

  return (resource: any) => String(resource.id) === selectedResourceId.value;
});

const resourceConfig = {
  scale_height: 30,
  row_height: 40,
  scales: [{ unit: "day", step: 1, date: "%d %M" }],
  columns: [
    {
      name: "name",
      label: "Name",
      tree: true,
      width: 220,
      template: (resource: any) => resource.text,
      resize: true
    }
  ]
};

const config = {
  columns: [
    { name: "text", tree: true, width: 220, resize: true },
    { name: "start_date", align: "center", width: 120, resize: true },
    { name: "duration", align: "center", width: 80, resize: true },
    { name: "add", width: 44 }
  ],
  resources: true,
  resource_store: "resource",
  resource_property: "owner",
  resource_render_empty_cells: true,
  open_tree_initially: true,
  layout: {
    css: "gantt_container",
    rows: [
      {
        gravity: 2,
        cols: [
          { view: "grid", group: "grids", scrollY: "scrollVer" },
          { resizer: true, width: 1 },
          { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
          { view: "scrollbar", id: "scrollVer", group: "vertical" }
        ]
      },
      { resizer: true, width: 1, next: "resources" },
      {
        gravity: 1,
        id: "resources",
        config: resourceConfig,
        cols: [
          { view: "resourceGrid", group: "grids", scrollY: "resourceVScroll" },
          { resizer: true, width: 1 },
          { view: "resourceHistogram", capacity: 24, scrollX: "scrollHor", scrollY: "resourceVScroll" },
          { view: "scrollbar", id: "resourceVScroll", group: "vertical" }
        ]
      },
      { view: "scrollbar", id: "scrollHor" }
    ]
  }
};
</script>

<template>
  <section class="demo-panel" data-cy="resource-panel-demo">
    <div class="demo-toolbar">
      <label for="resource-filter">Resource</label>
      <select id="resource-filter" data-cy="resource-filter" v-model="selectedResourceId">
        <option value="">All</option>
        <option v-for="resource in resources" :key="resource.id" :value="String(resource.id)">
          {{ resource.text }}
        </option>
      </select>
    </div>

    <VueGantt
      class="demo-gantt"
      :tasks="tasks"
      :links="links"
      :resources="resources"
      :config="config"
      :resourceFilter="resourceFilter"
    />
  </section>
</template>
