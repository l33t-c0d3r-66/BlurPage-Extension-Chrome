const toggle = document.getElementById("toggle-switch");

// Load the saved state from chrome.storage
chrome.storage.sync.get({ isHidden: false }, function (data) {
  toggle.checked = data.isHidden;
});

// Save the toggle state to chrome.storage when it changes
toggle.addEventListener("change", function () {
  const isHidden = toggle.checked;
  chrome.storage.sync.set({ isHidden: isHidden }, function () {
    // Send a message to the background script to apply or remove the blur effect
    chrome.runtime.sendMessage({ toggleState: isHidden });
  });
});
