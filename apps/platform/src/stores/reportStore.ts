import { create } from 'zustand'
import type { ManualIssue } from '../types/CustomTypes'

interface ReportState {
  manualIssues: ManualIssue[]
  addManualIssue: (issue: Omit<ManualIssue, "id">) => void
  removeManualIssue: (id: string) => void
}

export const useReportStore = create<ReportState>((set) => ({
  manualIssues: [], // Initial state for manual issues

  addManualIssue: (newIssueData) =>
    set((state) => {
      const issue: ManualIssue = {
        ...newIssueData,
        id: Date.now().toString(), // Generate a unique ID
      }
      return { manualIssues: [...state.manualIssues, issue] }
    }),

  removeManualIssue: (id) =>
    set((state) => ({
      manualIssues: state.manualIssues.filter((issue) => issue.id !== id),
    })),
}))