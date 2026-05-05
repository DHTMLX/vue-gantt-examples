import type { SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

export interface ResourceDemoData {
  tasks: SerializedTask[];
  links: SerializedLink[];
  resources: any[];
}

const baseData: ResourceDemoData = {
  tasks: [
    { id: 1, text: "Office itinerancy", type: "project", start_date: "02-04-2025 00:00", duration: 12, progress: 0.4, owner: [{ resource_id: "6", value: 3 }], parent: 0, open: true },
    { id: 2, text: "Office facing", type: "project", start_date: "02-04-2025 00:00", duration: 8, progress: 0.6, owner: [{ resource_id: "6", value: 4 }], parent: 1, open: true },
    { id: 3, text: "Furniture installation", type: "task", start_date: "11-04-2025 00:00", duration: 6, progress: 0.6, owner: [{ resource_id: "7", value: 5 }], parent: 2 },
    { id: 4, text: "Integration", type: "task", start_date: "13-04-2025 00:00", duration: 4, progress: 0.5, owner: [{ resource_id: "8", value: 2 }], parent: 2 },
    { id: 5, text: "Testing", type: "task", start_date: "16-04-2025 00:00", duration: 3, progress: 0.3, owner: [{ resource_id: "9", value: 4 }], parent: 2 },
    { id: 6, text: "Documentation", type: "task", start_date: "20-04-2025 00:00", duration: 5, progress: 0.2, owner: [{ resource_id: "6", value: 2 }], parent: 2 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: "0" },
    { id: 2, source: 2, target: 3, type: "0" },
    { id: 3, source: 3, target: 4, type: "0" },
    { id: 4, source: 4, target: 5, type: "0" },
    { id: 5, source: 5, target: 6, type: "0" }
  ],
  resources: [
    { id: 6, text: "John", unit: "hours/day" },
    { id: 7, text: "Mike", unit: "hours/day" },
    { id: 8, text: "Anna", unit: "hours/day" },
    { id: 9, text: "Bill", unit: "hours/day" }
  ]
};

const cloneObject = <T>(source: T): T => JSON.parse(JSON.stringify(source));

export function createResourceDemoData(): ResourceDemoData {
  return {
    tasks: cloneObject(baseData.tasks),
    links: cloneObject(baseData.links),
    resources: cloneObject(baseData.resources)
  };
}
