chrome.action.onClicked.addListener(currentTab => {
    chrome.tabs.create({
      'url': chrome.runtime.getURL("index.html")
    });
  });

