//background.js is used to enable and disable the icon when a page's URL matches the one in the condition

console.log("Match with Betfair: background.js loaded");

chrome.runtime.onInstalled.addListener(function () {
  console.log("Match with Betfair: Installed succesfully");
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostSuffix: "betfair.com",
          pathPrefix: "/sport/"
        },
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('.betfair.com') > -1)
    chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.pageAction.onClicked.addListener(function(tab){
  var myName = tab.url.split(".")[0].slice(7);
  if (myName != "www") //ignore main site
    chrome.tabs.update(tab.id, {url: "http://foo.com/foo.html?t=" + myName});
});
