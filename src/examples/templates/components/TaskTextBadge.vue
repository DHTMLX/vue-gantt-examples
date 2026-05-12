<script setup lang="ts">
import type { Task } from "@dhtmlx/trial-vue-gantt";

interface TaskTextBadgeProps {
  task: Task & { completed?: boolean };
}

defineProps<TaskTextBadgeProps>();

const emit = defineEmits<{
  toggle: [];
}>();

const onToggleClick = (event: MouseEvent) => {
  event.stopPropagation();
  emit("toggle");
};
</script>

<template>
  <div class="task-text-badge" data-cy="templates-task-text">
    <v-tooltip
      :text="task.completed ? 'Status: Completed' : 'Status: Pending'"
      location="top"
    >
      <template #activator="{ props: tooltipProps }">
        <button
          v-bind="tooltipProps"
          type="button"
          class="task-text-badge__toggle"
          data-cy="templates-task-text-toggle"
          @click="onToggleClick"
        >
          {{ task.completed ? "✓" : "○" }}
        </button>
      </template>
    </v-tooltip>
    <span class="task-text-badge__text">{{ task.text }}</span>
  </div>
</template>

<style scoped>
.task-text-badge {
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
}

.task-text-badge__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  color: inherit;
}

.task-text-badge__toggle:hover {
  background: rgba(0, 0, 0, 0.08);
}

.task-text-badge__text {
  font-weight: 500;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
