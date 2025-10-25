import { Link } from "react-router-dom";

import {
  ArrowLeft,
  BarChart3,
  FileText,
  Calendar,
  Plus,
  Settings,
  Download,
  Eye,
} from "lucide-react";
import { useReportPage } from "../../features/report/useReportPage";
import IssueForm from "./_components/IssueForm";
import IssueList from "./_components/IssueList";
import ReportGenerator from "./_components/ReportGenerator";
import ComingSoon from "./_components/ComingSoon";

const ReportsPage = () => {
  const {
    manualIssues,
    newIssue,
    stats,
    showAddIssue,
    error,
    generating,
    reportError,
    isLoadingAccessibility,
    accessibilityError,
    setNewIssue,
    setShowAddIssue,
    addManualIssueHandler,
    removeManualIssue,
    handleGenerateReport,
    getPriorityColor,
    getPriorityTextColor,
    addSampleData,
  } = useReportPage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-300/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-green-100/40 to-teal-200/30 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-blue-50/50 to-indigo-100/30 blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 p-4 max-w-7xl mx-auto mt-28">
        {/* Header */}
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-green-200 text-green-700 hover:bg-green-50 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
        </div>

        {/* Loading State */}
        {isLoadingAccessibility && (
          <div className="mb-4 bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-slate-600">Loading accessibility data...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {accessibilityError && (
          <div className="mb-4 bg-red-50/80 backdrop-blur-xl rounded-lg shadow border border-red-200 p-4">
            <div className="flex items-center gap-2 text-red-600">
              <span className="text-sm font-medium">Error loading data: {accessibilityError.message}</span>
            </div>
          </div>
        )}

        {/* Statistics - Only the metric cards, no insights section */}
        <div className="mb-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Accessibility Dashboard</h2>
                <p className="text-sm text-slate-500">Comprehensive overview of all issues across your websites</p>
              </div>
            </div>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalIssues}</div>
                <div className="text-sm font-medium text-slate-700 mb-1">Total Issues</div>
                <div className="text-xs text-slate-500">{stats.totalManualIssues} manual • {stats.totalAccessibilityIssues} automated</div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200">
                <div className="text-2xl font-bold text-red-600 mb-1">{stats.criticalIssues}</div>
                <div className="text-sm font-medium text-slate-700 mb-1">Critical</div>
                <div className="text-xs text-slate-500">0 manual • 0 automated</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-1">{stats.highIssues}</div>
                <div className="text-sm font-medium text-slate-700 mb-1">High Priority</div>
                <div className="text-xs text-slate-500">0 manual • 0 automated</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
                <div className="text-sm font-medium text-slate-700 mb-1">Overdue</div>
                <div className="text-xs text-slate-500">Manual tasks past due</div>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Sources & Insights - Fixed Layout */}
        <div className="mb-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Issue Sources & Insights
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Issue Sources */}
              <div>
                <h4 className="text-base font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  Issue Sources
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">Manual Issues</div>
                        <div className="text-sm text-slate-500">Tasks added by your team</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-blue-600">{stats.totalManualIssues}</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">Automated Issues</div>
                        <div className="text-sm text-slate-500">Detected by accessibility scanner</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-green-600">{stats.totalAccessibilityIssues}</div>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div>
                <h4 className="text-base font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  Progress Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Total Issues</span>
                    <span className="text-lg font-bold text-slate-800">{stats.totalIssues}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border-b border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Critical & High Priority</span>
                    <span className="text-lg font-bold text-red-600">{stats.criticalIssues + stats.highIssues}</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm font-medium text-slate-700">Medium & Low Priority</span>
                    <span className="text-lg font-bold text-green-600">{stats.mediumIssues + stats.lowIssues}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid - Tight Layout */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Left Column - Issue Management */}
          <div className="col-span-8 space-y-4">
            
            {/* Add Issue Form - Compact */}
            <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-green-600" />
                  Add New Issue
                </h3>
                <button
                  onClick={() => setShowAddIssue(!showAddIssue)}
                  className="px-3 py-1 text-sm text-green-600 hover:text-green-700 font-medium border border-green-300 rounded-md hover:bg-green-50 transition-colors"
                >
                  {showAddIssue ? "Cancel" : "Show Form"}
                </button>
              </div>
              {showAddIssue && (
                <div className="mt-3">
                  <IssueForm
                    newIssue={newIssue}
                    setNewIssue={setNewIssue}
                    showAddIssue={showAddIssue}
                    setShowAddIssue={setShowAddIssue}
                    onAddIssue={addManualIssueHandler}
                    error={error}
                  />
                </div>
              )}
            </div>

            {/* Issue List - Compact */}
            <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Manual Issues ({manualIssues.length})
              </h3>
              <IssueList
                issues={manualIssues}
                onRemoveIssue={removeManualIssue}
                getPriorityColor={getPriorityColor}
                getPriorityTextColor={getPriorityTextColor}
              />
            </div>

            {/* Report Generator - Full width in left column */}
            <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-purple-600" />
                Report Generation
              </h3>
              <ReportGenerator
                manualIssuesCount={manualIssues.length}
                generating={generating}
                error={error}
                reportError={reportError}
                onGenerateReport={handleGenerateReport}
              />
            </div>

          </div>

          {/* Right Sidebar - Actions & Status */}
          <div className="col-span-4 space-y-4">
            
            {/* Quick Actions - Compact */}
            <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-green-600" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowAddIssue(!showAddIssue)}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 text-green-700 font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add New Issue
                </button>
                <button
                  onClick={addSampleData}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-blue-700 font-medium text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  Add Sample Data
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 hover:from-yellow-100 hover:to-amber-100 transition-all duration-200 text-yellow-700 font-medium text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Refresh Data
                </button>
                <button
                  onClick={handleGenerateReport}
                  disabled={generating}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 hover:from-purple-100 hover:to-violet-100 transition-all duration-200 text-purple-700 font-medium disabled:opacity-50 text-sm"
                >
                  <Download className="w-4 h-4" />
                  {generating ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>

            {/* Status Overview - Compact */}
            <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow border border-green-100/50 p-4">
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                Status Overview
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-red-50 to-rose-50 rounded border border-red-200">
                  <span className="text-sm font-medium text-slate-700">Critical</span>
                  <span className="text-base font-bold text-red-600">{stats.criticalIssues}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded border border-orange-200">
                  <span className="text-sm font-medium text-slate-700">High</span>
                  <span className="text-base font-bold text-orange-600">{stats.highIssues}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded border border-yellow-200">
                  <span className="text-sm font-medium text-slate-700">Medium</span>
                  <span className="text-base font-bold text-yellow-600">{stats.mediumIssues}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-green-200">
                  <span className="text-sm font-medium text-slate-700">Low</span>
                  <span className="text-base font-bold text-green-600">{stats.lowIssues}</span>
                </div>
              </div>
            </div>

            {/* Coming Soon - Compact */}
            <div className="flex-1">
              <ComingSoon />
            </div>

          </div>
        </div>

        {/* Bottom tech badges - Compact */}
        <div className="mt-4 text-center opacity-60">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3 text-green-500" />
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3 text-green-500" />
              <span>Reports</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-green-500" />
              <span>Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;