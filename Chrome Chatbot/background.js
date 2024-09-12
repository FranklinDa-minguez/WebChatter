// Query the current active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id; // Get the ID of the active tab

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js'] // The script that extracts data from the webpage
  });
});

// Listen for message from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Data extracted from page:", message);
  
    // do vector database stuff here
  });
  