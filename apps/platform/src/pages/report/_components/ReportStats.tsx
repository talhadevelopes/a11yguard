import {
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  BarChart3,
  Calendar,
  Users,
  Globe,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface ReportStatsProps {
  stats: {
    // Manual issues
    totalManualIssues: number;
    manualCriticalIssues: number;
    manualHighIssues: number;
    manualMediumIssues: number;
    manualLowIssues: number;
    overdueIssues: number;

    // Accessibility issues
    totalAccessibilityIssues: number;
    accessibilityCriticalIssues: number;
    accessibilityHighIssues: number;
    accessibilityMediumIssues: number;
    accessibilityLowIssues: number;

    // Combined totals
    totalIssues: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
  };
  accessibilityIssues: any[];
  onAddSampleData?: () => void;
}

export default function ReportStats({
  stats,
  accessibilityIssues,
  onAddSampleData,
}: ReportStatsProps) {
  const [showIssueDetails, setShowIssueDetails] = useState(false);

  // If no issues, show a different message
  if (stats.totalIssues === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800">
              Issue Statistics
            </h3>
            <p className="text-slate-600 text-sm">
              No issues added yet - start by creating your first task
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200/50 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-8 h-8 text-slate-500" />
          </div>
          <h4 className="text-lg font-semibold text-slate-800 mb-2">
            Ready to Get Started?
          </h4>
          <p className="text-slate-600 mb-4">
            Add your first accessibility issue or task to see statistics and
            insights here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 font-medium border border-green-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Use the form below to add issues</span>
            </div>
            {onAddSampleData && (
              <button
                onClick={onAddSampleData}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Add Sample Data</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Helper function to get priority color
  const getPriorityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "border-red-200 bg-red-50 text-red-800";
      case "high":
        return "border-orange-200 bg-orange-50 text-orange-800";
      case "medium":
        return "border-yellow-200 bg-yellow-50 text-yellow-800";
      case "low":
        return "border-green-200 bg-green-50 text-green-800";
      default:
        return "border-gray-200 bg-gray-50 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              Accessibility Dashboard
            </h3>
            <p className="text-slate-600">
              Comprehensive overview of all issues across your websites
            </p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.totalIssues}
            </div>
            <div className="text-sm text-blue-700 font-medium">
              Total Issues
            </div>
            <div className="text-xs text-blue-600 mt-1">
              {stats.totalManualIssues} manual +{" "}
              {stats.totalAccessibilityIssues} automated
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-200">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {stats.criticalIssues}
            </div>
            <div className="text-sm text-red-700 font-medium">Critical</div>
            <div className="text-xs text-red-600 mt-1">
              {stats.manualCriticalIssues} manual +{" "}
              {stats.accessibilityCriticalIssues} automated
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-200">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {stats.highIssues}
            </div>
            <div className="text-sm text-orange-700 font-medium">
              High Priority
            </div>
            <div className="text-xs text-orange-600 mt-1">
              {stats.manualHighIssues} manual + {stats.accessibilityHighIssues}{" "}
              automated
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {stats.overdueIssues}
            </div>
            <div className="text-sm text-purple-700 font-medium">Overdue</div>
            <div className="text-xs text-purple-600 mt-1">
              Manual tasks past due
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Issues Display */}
      {accessibilityIssues.length > 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Detected Accessibility Issues
                </h3>
                <p className="text-slate-600 text-sm">
                  {accessibilityIssues.length} issues found across your websites
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowIssueDetails(!showIssueDetails)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors"
            >
              {showIssueDetails ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show Details
                </>
              )}
            </button>
          </div>

          {showIssueDetails && (
            <div className="space-y-3">
              {accessibilityIssues.map((issue, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getPriorityColor(
                    issue.severity || issue.priority
                  )}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                            issue.severity || issue.priority
                          )}`}
                        >
                          {issue.severity || issue.priority || "Unknown"}
                        </span>
                        {issue.websiteName && (
                          <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                            {issue.websiteName}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed">
                        {issue.message ||
                          issue.description ||
                          issue.title ||
                          "No description available"}
                      </p>
                      {issue.type && (
                        <p className="text-slate-500 text-xs mt-2">
                          Issue Type: {issue.type}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Overview */}
        <div className="space-y-4"></div>

        {/* Issue Sources & Additional Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Issue Sources & Insights
          </h4>

          {/* Issue Sources */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
            <h5 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Issue Sources
            </h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h6 className="font-medium text-slate-800">
                      Manual Issues
                    </h6>
                    <p className="text-sm text-slate-600">
                      Tasks added by your team
                    </p>
                  </div>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {stats.totalManualIssues}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h6 className="font-medium text-slate-800">
                      Automated Issues
                    </h6>
                    <p className="text-sm text-slate-600">
                      Detected by accessibility scanner
                    </p>
                  </div>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {stats.totalAccessibilityIssues}
                </div>
              </div>
            </div>
          </div>

          {/* Overdue Tasks */}
          {stats.overdueIssues > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h5 className="font-semibold text-slate-800">Overdue Tasks</h5>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {stats.overdueIssues}
              </div>
              <p className="text-sm text-slate-600">
                Manual tasks past their due date
              </p>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
            <h5 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              Progress Overview
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Issues</span>
                <span className="font-medium text-slate-800">
                  {stats.totalIssues}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Critical & High Priority</span>
                <span className="font-medium text-red-600">
                  {stats.criticalIssues + stats.highIssues}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Medium & Low Priority</span>
                <span className="font-medium text-green-600">
                  {stats.mediumIssues + stats.lowIssues}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
