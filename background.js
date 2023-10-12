chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const isHidden = message.toggleState;
  if (isHidden) {
    // Send a message to the content script of the active tab to apply blur
    chrome.tabs.query({}, function (tabs) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return; // Handle the error here
      }

      console.log(tabs);
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: function () {
            document.documentElement.style.filter = "blur(5px)";
          }
        });
      });
    });
  } else {
    // Send a message to the content script of the active tab to remove blur
    chrome.tabs.query({ }, function (tabs) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return; // Handle the error here
      }

      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: function () {
            document.documentElement.style.filter = "none";
          }
        });
      });
    });
  }
});
