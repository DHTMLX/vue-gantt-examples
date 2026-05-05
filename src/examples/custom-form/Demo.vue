<script setup lang="ts">
import { VueGantt } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { createProjectData } from "../shared/projectData";
import { useDemoBatchState } from "../shared/useDemoBatchState";
import CustomLightbox from "./CustomLightbox.vue";

const { tasks, links, data } = useDemoBatchState(createProjectData());
</script>

<template>
  <section class="demo-panel" data-cy="custom-form-demo">
    <VueGantt
      class="demo-gantt"
      :tasks="tasks"
      :links="links"
      :customLightbox="CustomLightbox"
      :data="data"
    />
  </section>
</template>
