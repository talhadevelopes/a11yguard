import { useState } from "react";
import { useGenerateReport } from "../../mutations/useReportMutations";
import { useWebsitesQuery } from "../../queries/useWebsiteQueries";
import { useWebsiteAccessibilityIssues } from "../../queries/useAccessibilityQueries";
import type { ManualIssue } from "../../types/CustomTypes";
import type { AccessibilityIssue } from "../../types/websiteTypes";

export const useReportPage = () => {
  // Manual issues local store (can be replaced by Zustand later)
  const [manualIssues, setManualIssues] = useState<ManualIssue[]>([]);
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [error, setError] = useState("");
  const [newIssue, setNewIssue] = useState<Omit<ManualIssue, "id">>({
    title: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
    dueDate: "",
    website: "",
  });

  // Queries
  const { data: websites = [] } = useWebsitesQuery();
  // Aggregate all websites' accessibility issues (simple approach: just pick first website's issues)
  const firstWebsiteId = websites[0]?.id || "";
  const { data: accessibilityIssues = [], isLoading: isLoadingAccessibility, error: accessibilityError } = useWebsiteAccessibilityIssues(firstWebsiteId);

  // Mutation
  const { mutate: generateReport, status, error: reportError } = useGenerateReport();
  const generating = status === "pending";

  // Handlers
  const addManualIssueHandler = () => {
    if (!newIssue.title.trim() || !newIssue.description.trim()) {
      setError("Please fill in at least the title and description");
      return;
    }
    const withId: ManualIssue = { ...newIssue, id: crypto.randomUUID() };
    setManualIssues((prev) => [withId, ...prev]);
    setNewIssue({ title: "", description: "", priority: "Medium", assignedTo: "", dueDate: "", website: "" });
    setShowAddIssue(false);
    setError("");
  };

  const removeManualIssue = (id: string) => {
    setManualIssues((prev) => prev.filter((i) => i.id !== id));
  };

  const handleGenerateReport = () => {
    setError("");
    generateReport(manualIssues);
  };

  // Helpers
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600";
      case "High":
        return "text-orange-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Sample data helper for UI demo
  const addSampleData = () => {
    const sample: ManualIssue[] = [
      { id: crypto.randomUUID(), title: "Fix color contrast on login button", description: "The login button has insufficient color contrast.", priority: "Critical", assignedTo: "Frontend Team", dueDate: new Date(Date.now() + 7*86400000).toISOString().split('T')[0], website: "Login Page" },
      { id: crypto.randomUUID(), title: "Add alt text to hero image", description: "Hero image missing alt text.", priority: "High", assignedTo: "Content Team", dueDate: new Date(Date.now() + 3*86400000).toISOString().split('T')[0], website: "Homepage" },
    ];
    setManualIssues((prev) => [...sample, ...prev]);
  };

  // Statistics (basic aggregation)
  const stats = {
    totalManualIssues: manualIssues.length,
    manualCriticalIssues: manualIssues.filter(i => i.priority === "Critical").length,
    manualHighIssues: manualIssues.filter(i => i.priority === "High").length,
    manualMediumIssues: manualIssues.filter(i => i.priority === "Medium").length,
    manualLowIssues: manualIssues.filter(i => i.priority === "Low").length,
    overdueIssues: manualIssues.filter(i => i.dueDate && new Date(i.dueDate) < new Date()).length,

    totalAccessibilityIssues: (accessibilityIssues as AccessibilityIssue[]).length,
    accessibilityCriticalIssues: (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "Critical" || (i as any).priority === "Critical").length,
    accessibilityHighIssues: (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "High" || (i as any).priority === "High").length,
    accessibilityMediumIssues: (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "Medium" || (i as any).priority === "Medium").length,
    accessibilityLowIssues: (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "Low" || (i as any).priority === "Low").length,

    totalIssues: manualIssues.length + (accessibilityIssues as AccessibilityIssue[]).length,
    criticalIssues: manualIssues.filter(i => i.priority === "Critical").length + (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "Critical" || (i as any).priority === "Critical").length,
    highIssues: manualIssues.filter(i => i.priority === "High").length + (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "High" || (i as any).priority === "High").length,
    mediumIssues: manualIssues.filter(i => i.priority === "Medium").length + (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "Medium" || (i as any).priority === "Medium").length,
    lowIssues: manualIssues.filter(i => i.priority === "Low").length + (accessibilityIssues as AccessibilityIssue[]).filter(i => (i as any).severity === "Low" || (i as any).priority === "Low").length,
  };

  return {
    // Data
    manualIssues,
    accessibilityIssues,
    newIssue,
    stats,

    // State
    showAddIssue,
    error,
    generating,
    reportError,
    isLoadingAccessibility,
    accessibilityError,

    // Actions
    setNewIssue,
    setShowAddIssue,
    setError,
    addManualIssueHandler,
    removeManualIssue,
    handleGenerateReport,
    addSampleData,

    // Helpers
    getPriorityColor,
    getPriorityTextColor,
  };
};
