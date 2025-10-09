// content-script-dashboard.js
// This script runs on the dashboard page (e.g., http://localhost:5173)

console.log("a11yguard: Content script for dashboard loaded.");

// Listen for messages from the dashboard's main window (React app)
window.addEventListener("message", (event) => {
  // We only accept messages from ourselves and with a specific type
  if (
    event.source !== window ||
    !event.data.type ||
    event.data.type !== "a11yguard_AUTH_UPDATE"
  ) {
    return;
  }

  console.log(
    "a11yguard: Received auth update from dashboard page:",
    event.data.payload
  );

  // Forward the message to the extension's background script
  chrome.runtime.sendMessage({
    action: "dashboardAuthUpdate",
    payload: event.data.payload,
  });
});
