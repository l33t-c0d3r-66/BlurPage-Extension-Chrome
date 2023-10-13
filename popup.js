const toggle = document.getElementById("btn");

// Load the saved state from chrome.storage
chrome.storage.sync.get({ isEnabled: false }, function (data) {
  toggle.checked = data.isEnabled;
});

// Save the toggle state to chrome.storage when it changes
toggle.addEventListener("change", function () {
  const isEnabled = toggle.checked;
  chrome.storage.sync.set({ isEnabled: isEnabled }, function () {
    // Send a message to the background script to apply or remove the blur effect
    chrome.runtime.sendMessage({ toggleState: isEnabled });
  });
});
