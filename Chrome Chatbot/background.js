console.log('Service Worker loaded.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Service Worker installed.');
});
