import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { applyBatchChanges } from "../examples/shared/applyBatchChanges";
import { createProjectData } from "../examples/shared/projectData";

type ZoomLevel = "day" | "month" | "year";
type Snapshot = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
};

type HistoryState = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

const cloneDate = (value: Date | string | undefined): Date | string | undefined => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  return value;
};

const cloneTask = (task: SerializedTask): SerializedTask => {
  const next: SerializedTask = { ...task };
  next.start_date = cloneDate(task.start_date);
  next.end_date = cloneDate(task.end_date);
  return next;
};

const cloneLink = (link: SerializedLink): SerializedLink => ({ ...link });

const createSnapshot = (state: HistoryState): Snapshot => ({
  tasks: state.tasks.map(cloneTask),
  links: state.links.map(cloneLink),
  zoomLevel: state.zoomLevel
});

export const useGanttStore = defineStore("gantt", {
  state: () => {
    const data = createProjectData();

    return {
      tasks: data.tasks as SerializedTask[],
      links: data.links as SerializedLink[],
      zoomLevel: "day" as ZoomLevel,
      past: [] as Snapshot[],
      future: [] as Snapshot[],
      maxHistory: 50
    };
  },
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    }),
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.tasks = snapshot.tasks.map(cloneTask);
      this.links = snapshot.links.map(cloneLink);
      this.zoomLevel = snapshot.zoomLevel;
    },
    setZoom(level: ZoomLevel) {
      if (this.zoomLevel === level) {
        return;
      }
      this.pushHistory();
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const hasChanges = (changes.tasks?.length ?? 0) > 0 || (changes.links?.length ?? 0) > 0;
      if (!hasChanges) {
        return;
      }
      this.pushHistory();
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    },
    undo() {
      if (this.past.length === 0) {
        return;
      }

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) {
        return;
      }

      const next = this.future[0];
      const current = createSnapshot(this);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});
