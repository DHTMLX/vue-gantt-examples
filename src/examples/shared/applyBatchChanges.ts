import type { BatchChanges, DataCallbackChange, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

const toId = (value: string | number) => String(value);

export function applyTaskChanges(prevTasks: SerializedTask[], changes: DataCallbackChange[] = []): SerializedTask[] {
  const nextTasks = [...prevTasks];

  changes.forEach(change => {
    const index = nextTasks.findIndex(task => toId(task.id as string | number) === toId(change.id));

    if (change.action === "update" && index !== -1) {
      nextTasks[index] = { ...nextTasks[index], ...(change.data as SerializedTask) };
      return;
    }

    if (change.action === "create") {
      nextTasks.push(change.data as SerializedTask);
      return;
    }

    if (change.action === "delete" && index !== -1) {
      nextTasks.splice(index, 1);
    }
  });

  return nextTasks;
}

export function applyLinkChanges(prevLinks: SerializedLink[], changes: DataCallbackChange[] = []): SerializedLink[] {
  const nextLinks = [...prevLinks];

  changes.forEach(change => {
    const index = nextLinks.findIndex(link => toId(link.id as string | number) === toId(change.id));

    if (change.action === "update" && index !== -1) {
      nextLinks[index] = { ...nextLinks[index], ...(change.data as SerializedLink) };
      return;
    }

    if (change.action === "create") {
      nextLinks.push(change.data as SerializedLink);
      return;
    }

    if (change.action === "delete" && index !== -1) {
      nextLinks.splice(index, 1);
    }
  });

  return nextLinks;
}

export function applyBatchChanges(
  tasks: SerializedTask[],
  links: SerializedLink[],
  changes: BatchChanges
): { tasks: SerializedTask[]; links: SerializedLink[] } {
  return {
    tasks: applyTaskChanges(tasks, changes.tasks),
    links: applyLinkChanges(links, changes.links)
  };
}
