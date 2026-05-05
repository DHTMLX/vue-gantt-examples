import { createRouter, createWebHashHistory } from "vue-router";
import LayoutShell from "./layout/LayoutShell.vue";
import AutoSchedulingDemo from "./examples/auto-scheduling/Demo.vue";
import BasicInitDemo from "./examples/basic-init/Demo.vue";
import CustomEditViewDemo from "./examples/custom-edit-view/Demo.vue";
import CustomEditViewGantt from "./examples/custom-edit-view/GanttView.vue";
import CustomEditViewTaskEditor from "./examples/custom-edit-view/TaskEditor.vue";
import CustomFormDemo from "./examples/custom-form/Demo.vue";
import ExportDataDemo from "./examples/export-data/Demo.vue";
import InlineEditorsDemo from "./examples/inline-editors/Demo.vue";
import ResourcePanelDemo from "./examples/resource-panel/Demo.vue";
import StateManagementDemo from "./examples/state-management/Demo.vue";
import TemplatesDemo from "./examples/templates/Demo.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: LayoutShell,
      children: [
        {
          path: "",
          redirect: "/basic-init"
        },
        {
          path: "basic-init",
          component: BasicInitDemo
        },
        {
          path: "templates",
          component: TemplatesDemo
        },
        {
          path: "custom-form",
          component: CustomFormDemo
        },
        {
          path: "custom-edit-view",
          component: CustomEditViewDemo,
          children: [
            {
              path: "",
              component: CustomEditViewGantt
            },
            {
              path: "editor/:id",
              component: CustomEditViewTaskEditor,
              props: true
            }
          ]
        },
        {
          path: "inline-editors",
          component: InlineEditorsDemo
        },
        {
          path: "auto-scheduling",
          component: AutoSchedulingDemo
        },
        {
          path: "state-management",
          component: StateManagementDemo
        },
        {
          path: "redux-toolkit",
          redirect: "/state-management"
        },
        {
          path: "resource-panel",
          component: ResourcePanelDemo
        },
        {
          path: "export-data",
          component: ExportDataDemo
        },
        {
          path: "export",
          redirect: "/export-data"
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/basic-init"
    }
  ]
});