// src/ui/popup-ui.js - Simplified for chatbot-only functionality

document.addEventListener("DOMContentLoaded", () => {
  console.log("a11yguard.AI popup loaded, initializing chatbot...")
  initializePopup()
})

function initializePopup() {
  console.log("Initializing chatbot popup...")
  initializePageInfo()
  initializeChatbot()
  console.log("Chatbot popup initialization complete")
}

function initializePageInfo() {
  const pageUrl = document.getElementById("page-url")

  window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url) {
      try {
        const url = new URL(tabs[0].url)
        pageUrl.textContent = url.hostname
      } catch (e) {
        console.error("Invalid URL:", e)
        pageUrl.textContent = "Unknown"
      }
    } else {
      pageUrl.textContent = "Unknown"
    }
  })
}