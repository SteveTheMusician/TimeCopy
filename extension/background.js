chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updatePanelContent') {
    chrome.runtime.sendMessage({ action: 'updateContent', content: message.content });
  }
});
