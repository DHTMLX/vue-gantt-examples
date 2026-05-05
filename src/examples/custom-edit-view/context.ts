import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import type { InjectionKey, Ref } from "vue";

export interface CustomEditViewContext {
  tasks: Ref<SerializedTask[]>;
  links: Ref<SerializedLink[]>;
  saveTask: (task: SerializedTask) => void;
  upsertTask: (task: SerializedTask) => void;
  deleteTask: (taskId: string | number) => void;
  applyBatch: (changes: BatchChanges) => void;
}

export const CUSTOM_EDIT_VIEW_CONTEXT_KEY: InjectionKey<CustomEditViewContext> = Symbol("custom-edit-view-context");
