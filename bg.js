let color = 'blue';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
});
