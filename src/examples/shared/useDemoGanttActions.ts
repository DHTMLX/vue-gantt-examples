import type { Ref } from "vue";
import {
  useGanttActions,
  type VueGanttRef
} from "@dhtmlx/trial-vue-gantt";

type ExportType = "pdf" | "png" | "excel" | "msp";

export function useDemoGanttActions(ganttRef: Ref<VueGanttRef | null>) {
  const actions = useGanttActions(ganttRef);

  const exportByType = (type: ExportType) => {
    if (type === "pdf") {
      actions.exportToPDF();
      return;
    }

    if (type === "png") {
      actions.exportToPNG();
      return;
    }

    if (type === "excel") {
      actions.exportToExcel({ visual: "base-colors" });
      return;
    }

    actions.exportToMSProject();
  };

  return {
    exportByType
  };
}
