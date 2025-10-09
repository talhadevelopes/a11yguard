import { Trash2, Calendar, User, Globe, AlertTriangle } from "lucide-react";
import type { ManualIssue } from "../../types/CustomTypes";

interface IssueListProps {
  issues: ManualIssue[];
  onRemoveIssue: (id: string) => void;
  getPriorityColor: (priority: string) => string;
  getPriorityTextColor: (priority: string) => string;
}

export default function IssueList({
  issues,
  onRemoveIssue,
  getPriorityColor,
  getPriorityTextColor,
}: IssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-lg">
          <AlertTriangle className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No Issues Added Yet</h3>
        <p className="text-slate-600">
          Start by adding your first issue using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-green-100/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Current Issues ({issues.length})
          </h3>
          <p className="text-slate-600 text-sm">
            Manage and track your assigned tasks
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {issues.map((issue) => {
          const isOverdue = issue.dueDate && new Date(issue.dueDate) < new Date();
          
          return (
            <div
              key={issue.id}
              className="group relative bg-gradient-to-r from-white/90 to-slate-50/90 backdrop-blur-sm rounded-xl border border-slate-200/50 p-5 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Priority indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityColor(issue.priority)}`} />
              
              {/* Overdue indicator */}
              {isOverdue && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              )}

              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-semibold text-slate-800 text-lg">{issue.title}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(issue.priority)}`}
                    >
                      {issue.priority}
                    </span>
                    {isOverdue && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Overdue
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">{issue.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    {issue.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span className="font-medium">Website:</span>
                        <span>{issue.website}</span>
                      </div>
                    )}
                    {issue.assignedTo && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Assigned:</span>
                        <span>{issue.assignedTo}</span>
                      </div>
                    )}
                    {issue.dueDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Due:</span>
                        <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                          {new Date(issue.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveIssue(issue.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
