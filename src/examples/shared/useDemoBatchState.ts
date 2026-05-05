import { ref } from "vue";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { applyBatchChanges } from "./applyBatchChanges";

export interface DemoDataSet {
  tasks: SerializedTask[];
  links: SerializedLink[];
}

export function createBatchSaveData(applyBatch: (changes: BatchChanges) => void) {
  return {
    batchSave: applyBatch
  };
}

export function useDemoBatchState(initialData: DemoDataSet) {
  const tasks = ref<SerializedTask[]>(initialData.tasks);
  const links = ref<SerializedLink[]>(initialData.links);

  const applyBatch = (changes: BatchChanges) => {
    const next = applyBatchChanges(tasks.value, links.value, changes);
    tasks.value = next.tasks;
    links.value = next.links;
  };

  return {
    tasks,
    links,
    applyBatch,
    data: createBatchSaveData(applyBatch)
  };
}
