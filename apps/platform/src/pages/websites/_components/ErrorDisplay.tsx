import { Link } from "react-router-dom";

interface ErrorDisplayProps {
  error: Error | null;
  onRetry?: () => void;
  showLoginLink?: boolean;
}

export default function ErrorDisplay({ error, onRetry, showLoginLink = false }: ErrorDisplayProps) {
  if (!error) return null;

  const isLoginError = error.message?.includes("login") || error.message?.includes("Session expired");

  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
      <p className="text-red-500 font-semibold">Error:</p>
      <p className="text-red-600">{error.message || "An unknown error occurred."}</p>
      
      {isLoginError || showLoginLink ? (
        <Link
          to="/login"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Go to Login
        </Link>
      ) : (
        onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            🔄 Retry
          </button>
        )
      )}
    </div>
  );
}
