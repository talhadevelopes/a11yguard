import { useParams, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useWebsiteDetails } from "../../hooks/useWebsiteDetails";
import {
  ArrowLeft,
  Globe,
  Gauge,
  Layers,
  ScanLine,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  Activity,
  Shield,
  Zap,
} from "lucide-react";
import {
  PerformanceCharts,
  InteractiveElements,
  SnapshotDisplay,
  EnhancedAccessibilitySection,
  AccessibilityChatbot,
  ErrorDisplay,
  AuthRequiredError,
} from "../../components";

export default function WebsiteDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const websiteId = id || "";
  const { token, user } = useAuthStore();

  const {
    snapshots,
    accessibilityIssues,
    aiRecommendations,
    overallError,
    snapshotsError,
    accessibilityError,
    isValidWebsiteId,
    loadingAi,
    isErrorAi,
    aiError,
    handleGenerateRecommendations,
    handleRetry,
    handleRetryAI,
  } = useWebsiteDetails({ websiteId });

  if (!user || !token) {
    return (
      <AuthRequiredError
        title="Website Details"
        message="Please login to view website details and snapshots."
      />
    );
  }

  if (!isValidWebsiteId) {
    return (
      <ErrorDisplay
        title="Invalid Website ID"
        message={`The website ID "${websiteId}" is not valid.`}
        action={{
          label: "Back to Websites",
          href: "/websites",
          icon: <ArrowLeft className="w-4 h-4" />,
        }}
      />
    );
  }

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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-green-50/50 to-emerald-100/30 blur-2xl animate-pulse"
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

      <div className="relative z-10 max-w-7xl mx-auto p-4 py-24">
        {/* Header Section with enhanced styling */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Link
                      to="/websites"
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Websites
                    </Link>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Globe className="w-4 h-4 text-green-500" /> {websiteId}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    Website Details
                  </h1>
                  <p className="text-slate-600 flex items-center gap-2 mt-1">
                    <Activity className="w-4 h-4 text-green-500" />
                    Website ID: {websiteId}
                  </p>
                </div>
              </div>

              {/* Quick action button */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display with enhanced styling */}
        {overallError && (snapshotsError || accessibilityError) && (
          <div className="mb-6">
            <div className="bg-red-50/80 backdrop-blur-xl border border-red-200/50 rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-red-700 mb-4">
                    {(snapshotsError || accessibilityError)?.message}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    >
                      Try Again
                    </button>
                    {(snapshotsError?.message?.includes("login") ||
                      accessibilityError?.message?.includes("login")) && (
                      <Link
                        to="/login"
                        className="px-4 py-2 rounded-lg border border-red-300 text-red-700 font-medium hover:bg-red-50 transition-colors"
                      >
                        Go to Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced summary cards with better styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 floating-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500 opacity-60" />
            </div>
            <div className="text-sm text-slate-500 mb-2">Total Snapshots</div>
            <div className="text-3xl font-bold font-heading text-slate-800 mb-1">
              {snapshots?.length || 0}
            </div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Available
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 floating-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <Activity className="w-5 h-5 text-green-500 opacity-60" />
            </div>
            <div className="text-sm text-slate-500 mb-2">
              Accessibility Issues
            </div>
            <div className="text-3xl font-bold font-heading text-slate-800 mb-1">
              {accessibilityIssues?.length || 0}
            </div>
            <div className="text-xs text-amber-600 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {(accessibilityIssues?.length || 0) > 0
                ? "Needs attention"
                : "All clear"}
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 floating-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <ScanLine className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="w-5 h-5 text-green-500 opacity-60" />
            </div>
            <div className="text-sm text-slate-500 mb-2">
              AI Recommendations
            </div>
            <div className="text-3xl font-bold font-heading text-slate-800 mb-1">
              {aiRecommendations ? "Ready" : "Generate"}
            </div>
            <div className="text-xs text-purple-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {aiRecommendations ? "Available" : "Click to generate"}
            </div>
          </div>
        </div>

        {/* Performance Charts Section */}
        {snapshots && snapshots.length > 0 && (
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 overflow-visible">
              <div className="px-6 py-5 border-b border-green-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-slate-800">
                      Performance Analytics
                    </h2>
                    <p className="text-sm text-slate-500">
                      Visual insights and performance metrics
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <PerformanceCharts snapshot={snapshots[0]} />
              </div>
            </div>
          </div>
        )}

        {/* Interactive Elements Section */}
        {snapshots &&
          snapshots.length > 0 &&
          snapshots[0]?.interactiveElements && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 overflow-visible">
                <div className="px-6 py-5 border-b border-green-100/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <ScanLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-heading text-slate-800">
                        Interactive Elements
                      </h2>
                      <p className="text-sm text-slate-500">
                        Buttons, links, forms, and input analysis
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <InteractiveElements snapshot={snapshots[0]} />
                </div>
              </div>
            </div>
          )}

        {/* Enhanced Snapshots section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 overflow-visible">
            <div className="px-6 py-5 border-b border-green-100/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-slate-800">
                      Website Snapshots
                    </h2>
                    <p className="text-sm text-slate-500">
                      {snapshots?.length || 0} snapshots captured
                    </p>
                  </div>
                </div>

                {snapshots && snapshots.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Latest:
                      {new Date(Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <SnapshotDisplay snapshots={snapshots || []} />
            </div>
          </div>
        </div>

        {/* Enhanced Accessibility section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 overflow-visible">
            <div className="px-6 py-5 border-b border-green-100/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Gauge className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-slate-800">
                      Accessibility Analysis
                    </h2>
                    <p className="text-sm text-slate-500">
                      AI-powered accessibility insights and recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Enhanced</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <EnhancedAccessibilitySection
                accessibilityIssues={accessibilityIssues}
                aiRecommendations={aiRecommendations}
                loadingAi={loadingAi}
                isErrorAi={isErrorAi}
                aiError={aiError}
                onGenerateRecommendations={handleGenerateRecommendations}
                onRetryAI={handleRetryAI}
                websiteId={websiteId}
              />
            </div>
          </div>
        </div>
        <div>
          <AccessibilityChatbot
            websiteId={websiteId}
            snapshotId={
              snapshots && snapshots.length > 0
                ? //@ts-ignore
                  snapshots[0]._id || snapshots[0].id || snapshots[0].snapshotId
                : null
            }
          />
        </div>

        {/* Enhanced bottom section with tech badges */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 mb-6">
            <Link
              to="/websites"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Websites Dashboard
            </Link>
          </div>

          {/* Tech badges */}
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Accessibility Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span>Real-time Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
