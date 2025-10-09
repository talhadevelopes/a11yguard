import { 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Clock,
  Users,
  Globe,
  BarChart3,
  TrendingUp
} from "lucide-react";

interface ReportGeneratorProps {
  manualIssuesCount: number;
  generating: boolean;
  error: string;
  reportError: any;
  onGenerateReport: () => void;
}

export default function ReportGenerator({
  manualIssuesCount,
  generating,
  error,
  reportError,
  onGenerateReport,
}: ReportGeneratorProps) {
  const reportContents = [
    { icon: Users, text: "Team overview and member details" },
    { icon: Globe, text: "Website tracking statistics" },
    { icon: AlertCircle, text: "Accessibility issues breakdown by severity" },
    { icon: BarChart3, text: "Interactive elements analysis (links, buttons, forms)" },
    { icon: TrendingUp, text: "30-day trend analysis" },
    { icon: FileText, text: "Detailed issue descriptions with context" },
    { icon: Clock, text: "Snapshot capture statistics" },
  ];

  if (manualIssuesCount > 0) {
    reportContents.push({
      icon: CheckCircle2,
      text: `Admin assigned tasks (${manualIssuesCount})`,
    });
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Comprehensive Accessibility Report</h2>
          <p className="text-slate-600">
            Generate a detailed PDF report containing all your team's accessibility data, website analysis, and statistics
            {manualIssuesCount > 0
              ? `, including ${manualIssuesCount} admin assigned task${manualIssuesCount > 1 ? "s" : ""}`
              : ""}
            .
          </p>
        </div>
      </div>

      {/* Report Contents */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-xl p-6 border border-blue-200/50 mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Report Contents:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reportContents.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-blue-700">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-3 h-3" />
              </div>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {(error || reportError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-800">Error</h4>
          </div>
          <p className="text-red-600">
            {error || reportError?.message || "An unknown error occurred."}
          </p>
        </div>
      )}

      {/* Generate Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <button
          onClick={onGenerateReport}
          disabled={generating}
          className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Generate PDF Report
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Professional PDF format</span>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-3 h-3 text-emerald-600" />
          </div>
          <div>
            <p className="text-emerald-800 font-medium mb-1">💡 Pro Tip</p>
            <p className="text-emerald-700 text-sm">
              The report includes data from all your tracked websites and team members. Make sure
              you have captured some snapshots and run accessibility checks for comprehensive results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
