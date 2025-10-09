import { useMutation } from "@tanstack/react-query";
import type { ManualIssue } from "../types/CustomTypes";
import { reportService } from "../services/api";

const generatePdfReport = async (manualIssues: ManualIssue[]) => {
  // axios interceptor handles auth header; just pass payload
  const blob = await reportService.generateReportPdf(manualIssues);
  return blob;
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: generatePdfReport,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `a11yguard-Report-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log("Report downloaded successfully!");
    },
    onError: (error) => {
      console.error("Error generating report:", error);
    },
  });
};
