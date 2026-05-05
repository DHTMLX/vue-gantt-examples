export interface SampleListItem {
  path: string;
  name: string;
}

export const sampleList: SampleListItem[] = [
  { path: "basic-init", name: "Basic Initialization" },
  { path: "templates", name: "Configs & Templates" },
  { path: "custom-form", name: "Custom Task Form" },
  { path: "custom-edit-view", name: "Custom Edit View" },
  { path: "inline-editors", name: "Inline Editors" },
  { path: "auto-scheduling", name: "Auto Scheduling" },
  { path: "state-management", name: "State Management" },
  { path: "resource-panel", name: "Resource Panel" },
  { path: "export-data", name: "Export" }
];