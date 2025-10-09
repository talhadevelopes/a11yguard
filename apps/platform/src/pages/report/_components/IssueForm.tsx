import { useState } from "react";
import { Plus, X, Calendar, User, Globe, AlertTriangle } from "lucide-react";
import type { ManualIssue } from "../../types/CustomTypes";

interface IssueFormProps {
  newIssue: Omit<ManualIssue, "id">;
  setNewIssue: (issue: Omit<ManualIssue, "id">) => void;
  showAddIssue: boolean;
  setShowAddIssue: (show: boolean) => void;
  onAddIssue: () => void;
  error: string;
}

export default function IssueForm({
  newIssue,
  setNewIssue,
  showAddIssue,
  setShowAddIssue,
  onAddIssue,
  error,
}: IssueFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onAddIssue();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Assigned Tasks</h2>
            <p className="text-slate-600">
              Add custom issues or tasks that will be included in your accessibility report.
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddIssue(!showAddIssue)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          {showAddIssue ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAddIssue ? "Cancel" : "Add New Issue"}
        </button>
      </div>

      {showAddIssue && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Add New Issue</h3>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newIssue.title}
                onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                placeholder="e.g., Fix color contrast on login button"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                value={newIssue.description}
                onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                placeholder="Detailed description of the issue and what needs to be done..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 resize-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Priority
              </label>
              <select
                value={newIssue.priority}
                onChange={(e) => setNewIssue({ ...newIssue, priority: e.target.value as any })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              >
                <option value="Critical">🔴 Critical</option>
                <option value="High">🟠 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Assigned To
              </label>
              <input
                type="text"
                value={newIssue.assignedTo}
                onChange={(e) => setNewIssue({ ...newIssue, assignedTo: e.target.value })}
                placeholder="e.g., Frontend Team"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Website/Page
              </label>
              <input
                type="text"
                value={newIssue.website}
                onChange={(e) => setNewIssue({ ...newIssue, website: e.target.value })}
                placeholder="e.g., Homepage, Login Page"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Due Date
              </label>
              <input
                type="date"
                value={newIssue.dueDate}
                onChange={(e) => setNewIssue({ ...newIssue, dueDate: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Issue
                </>
              )}
            </button>
            <button
              onClick={() => setShowAddIssue(false)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-200"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
