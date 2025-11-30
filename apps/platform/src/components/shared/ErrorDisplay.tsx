import React from "react";
import { AlertCircle, AlertTriangle, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface ErrorDisplayProps {
  /**
   * The error message to display
   */
  message: string;
  
  /**
   * Optional title for the error
   * @default "Something went wrong"
   */
  title?: string;
  
  /**
   * Display mode: 'full' for full-screen, 'inline' for inline display
   * @default 'full'
   */
  variant?: "full" | "inline";
  
  /**
   * Optional action button configuration
   */
  action?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  
  /**
   * Show login action if error is auth-related
   * @default false
   */
  showLoginAction?: boolean;
  
  /**
   * Custom icon to display (overrides default)
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  title = "Something went wrong",
  variant = "full",
  action,
  showLoginAction = false,
  icon,
  className = "",
}) => {
  // Auto-detect login requirement
  const needsLogin = showLoginAction || message.toLowerCase().includes("login") || message.toLowerCase().includes("authentication");

  // Inline variant - compact error display
  if (variant === "inline") {
    return (
      <div
        className={`max-w-md mx-auto p-4 border border-white rounded-lg bg-gradient-to-b from-red-100 to-red-50 flex items-start space-x-3 shadow-md ${className}`}
      >
        <div className="flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center bg-white border border-red-300 rounded-full">
            <span className="text-red-500">
              {icon || (
                <AlertTriangle className="w-6 h-6" />
              )}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-700 text-sm mb-3">{message}</p>
          
          {(action || needsLogin) && (
            <Link
              to={action?.href || "/login"}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
            >
              {action?.icon || <User className="w-4 h-4" />}
              {action?.label || "Go to Login"}
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Full-screen variant
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-rose-50/50 relative overflow-hidden ${className}`}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-red-200/30 to-rose-300/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-red-100/40 to-rose-200/30 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Error card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-100/50 p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-xl">
              {icon || <AlertCircle className="w-10 h-10 text-white" />}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold font-heading text-slate-800 mb-4">
              {title}
            </h1>

            {/* Error message */}
            <p className="text-red-600 font-medium mb-6">{message}</p>

            {/* Action button */}
            {(action || needsLogin) && (
              <Link
                to={action?.href || "/login"}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                {action?.icon || <User className="w-5 h-5" />}
                {action?.label || "Go to Login"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Auth Required - Green theme matching your design
interface AuthRequiredErrorProps {
  message?: string;
  title?: string;
}

export const AuthRequiredError: React.FC<AuthRequiredErrorProps> = ({ 
  message = "Please sign in to access your website snapshots and monitoring dashboard.",
  title = "Authentication Required"
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/50 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-green-200/30 to-emerald-300/20 blur-3xl animate-pulse" />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-green-100/40 to-teal-200/30 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>

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

    <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100/50 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
            {title}
          </h1>
          <p className="text-slate-600 mb-8">{message}</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <User className="w-5 h-5" />
            Sign In to Continue
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// 404 Not Found
export const NotFoundError: React.FC = () => (
  <ErrorDisplay
    title="Page Not Found"
    message="The page you're looking for doesn't exist."
    action={{
      label: "Go Home",
      href: "/",
      icon: <AlertCircle className="w-5 h-5" />,
    }}
  />
);