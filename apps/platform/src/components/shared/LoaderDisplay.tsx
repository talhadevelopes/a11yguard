import React from "react";

export interface LoadingDisplayProps {
  /**
   * Optional message to display below the loader
   */
  message?: string;
  
  /**
   * Display mode: 'full' for full-screen, 'inline' for inline display
   * @default 'full'
   */
  variant?: "full" | "inline";
  
  /**
   * Loader color (Tailwind color class)
   * @default "bg-blue-600"
   */
  color?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const LoadingDisplay: React.FC<LoadingDisplayProps> = ({
  message,
  variant = "full",
  color = "bg-blue-600",
  className = "",
}) => {
  // Inline variant - compact loader for cards/sections
  if (variant === "inline") {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
        <div className="relative w-16 h-16">
          <div className={`jimu-primary-loading ${color}`}></div>
        </div>
        {message && (
          <p className="mt-4 text-slate-600 text-sm font-medium">{message}</p>
        )}
      </div>
    );
  }

  // Full-screen variant with gradient background
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden ${className}`}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-300/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-200/30 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          {/* Loader */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className={`jimu-primary-loading ${color}`}></div>
          </div>

          {/* Message */}
          {message && (
            <p className="text-slate-600 text-lg font-medium animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Loader styles */}
      <style>{`
        .jimu-primary-loading:before,
        .jimu-primary-loading:after {
          position: absolute;
          top: 0;
          content: '';
        }
        .jimu-primary-loading:before {
          left: -19.992px;
        }
        .jimu-primary-loading:after {
          left: 19.992px;
          animation-delay: 0.32s !important;
        }
        .jimu-primary-loading:before,
        .jimu-primary-loading:after,
        .jimu-primary-loading {
          animation: loading-keys-app-loading 0.8s infinite ease-in-out;
          width: 13.6px;
          height: 32px;
        }
        .jimu-primary-loading {
          text-indent: -9999em;
          margin: auto;
          position: absolute;
          right: calc(50% - 6.8px);
          top: calc(50% - 16px);
          animation-delay: 0.16s !important;
        }
        @keyframes loading-keys-app-loading {
          0%,
          80%,
          100% {
            opacity: .75;
            box-shadow: 0 0;
            height: 32px;
          }
          40% {
            opacity: 1;
            box-shadow: 0 -8px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

// Specific loading states for common use cases
export const WebsiteLoadingDisplay: React.FC<{ message?: string }> = ({ 
  message = "Loading website data..." 
}) => (
  <LoadingDisplay 
    message={message}
    color="bg-green-600"
    className="from-slate-50 via-green-50/30 to-emerald-50/50"
  />
);

export const SnapshotLoadingDisplay: React.FC<{ message?: string }> = ({ 
  message = "Loading snapshots..." 
}) => (
  <LoadingDisplay 
    message={message}
    color="bg-blue-600"
  />
);

export const DashboardLoadingDisplay: React.FC<{ message?: string }> = ({ 
  message = "Loading dashboard..." 
}) => (
  <LoadingDisplay 
    message={message}
    color="bg-purple-600"
    className="from-slate-50 via-purple-50/30 to-indigo-50/50"
  />
);